import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import * as core from '../public/core.js';
import { course as shippedCourse } from '../public/course.js';

const file = name => new URL(`../public/${name}`, import.meta.url);
const source = name => readFileSync(file(name), 'utf8');

test('HTML supplies a Polish accessible local-only application shell', () => {
  assert.ok(existsSync(file('index.html')), 'public/index.html must exist');
  const html = source('index.html');
  assert.match(html, /<html lang="pl">/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /Wersja lokalna/);
  assert.match(html, /href="#main"/);
  assert.match(html, /<main[^>]+id="main"[^>]+tabindex="-1"/);
  assert.match(html, /id="storage-status"[^>]+role="status"/);
  assert.match(html, /<script type="module" src="\/app.js"><\/script>/);
  assert.match(html, /href="\/styles.css"/);
  for (const route of ['#start', '#panel', '#materialy']) assert.ok(html.includes(`href="${route}"`));
  assert.doesNotMatch(html, /<style|\sstyle=|\son\w+=|https?:\/\//i);
});

// Purpose-built DOM boundary, not a replacement for the browser acceptance run.
class Element {
  constructor(tagName) { this.tagName = tagName; this.children = []; this.attributes = {}; this.events = {}; this.hidden = false; this.checked = false; this.value = ''; this._text = ''; }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(child => typeof child === 'string' ? child : child.textContent).join(''); }
  append(...children) { this.children.push(...children); for (const child of children) if (typeof child !== 'string') child.parentNode = this; }
  replaceChildren(...children) { this._text = ''; this.children = []; this.append(...children); }
  replaceWith(node) { const parent = this.parentNode; parent.children.splice(parent.children.indexOf(this), 1, node); node.parentNode = parent; this.parentNode = null; }
  setAttribute(key, value) { this.attributes[key] = String(value); }
  removeAttribute(key) { delete this.attributes[key]; }
  addEventListener(type, fn) { this.events[type] = fn; }
  focus() { this.focused = true; }
  click() { return this.events.click?.({ preventDefault() {} }); }
}
const descendants = element => [element, ...element.children.filter(child => typeof child !== 'string').flatMap(descendants)];
const fixtureCourse = {
  id: 'fixture-course', title: 'Kurs testowy', description: 'Opis testowy',
  modules: Array.from({ length: 5 }, (_, m) => ({ id: `m${m}`, title: `Moduł ${m + 1}`, lessons: Array.from({ length: 3 }, (_, l) => ({
    id: `m${m}-l${l}`, title: `Lekcja ${m + 1}.${l + 1}`, duration: '10 min',
    sections: [{ heading: 'Praktyka', paragraphs: ['Przykładowy tekst lekcji.'] }],
    exercise: { prompt: 'Przećwicz na fikcyjnych danych.', placeholder: 'Przykład do wykonania samodzielnie' },
    quiz: { question: 'Co sprawdzić?', options: ['Zakres', 'Nic'], correctIndex: 0, explanation: 'Zakres jest podstawą.' }
  })) }))
};
function sharedStorage(raw = null, { locked = false } = {}) {
  let stored = raw;
  let queue = Promise.resolve();
  const clients = [];
  const pendingEvents = [];
  const lockNames = [];
  const locks = locked ? { request(name, options, action) {
    assert.equal(options.mode, 'exclusive');
    lockNames.push(name);
    const result = queue.then(action);
    queue = result.catch(() => {});
    return result;
  } } : undefined;
  return {
    locks, lockNames,
    connect(events, writes) {
      const client = { events };
      clients.push(client);
      return {
        getItem() { return stored; },
        setItem(key, value) {
          const oldValue = stored;
          stored = value;
          writes.push({ key, value });
          if (oldValue !== value) for (const other of clients) {
            if (other !== client) pendingEvents.push(() => other.events.storage?.({ key, oldValue, newValue: value, storageArea: other.storage }));
          }
        },
        attach(storage) { client.storage = storage; }
      };
    },
    flushEvents() { while (pendingEvents.length) pendingEvents.shift()(); },
    get stored() { return stored; }
  };
}
function boot({ hash = '#start', raw = null, blocked = false, writeBlocked = false, confirm = true, courseData = fixtureCourse, shared } = {}) {
  assert.ok(existsSync(file('app.js')), 'public/app.js must exist');
  const main = new Element('main');
  const skip = new Element('a');
  const status = new Element('div');
  const nav = ['start', 'panel', 'materialy'].map(name => { const link = new Element('a'); link.dataset = { nav: name }; return link; });
  const writes = [];
  const events = {};
  let stored = raw;
  let confirms = 0;
  const scrolls = [];
  const document = {
    title: '', getElementById: id => id === 'main' ? main : id === 'skip-link' ? skip : status,
    createElement: tag => new Element(tag), querySelectorAll: () => nav
  };
  const window = { location: { hash }, scrollTo: options => scrolls.push(options), addEventListener: (type, fn) => { events[type] = fn; }, confirm: () => { confirms++; return confirm; } };
  const sharedClient = shared?.connect(events, writes);
  const localStorage = {
    getItem() { if (blocked) throw new Error('blocked'); return sharedClient ? sharedClient.getItem() : stored; },
    setItem(key, value) { if (blocked || writeBlocked) throw new Error('blocked'); if (sharedClient) sharedClient.setItem(key, value); else { stored = value; writes.push({ key, value }); } },
    removeItem() { stored = null; }
  };
  sharedClient?.attach(localStorage);
  const context = vm.createContext({ ...core, course: courseData, document, window, localStorage, navigator: { locks: shared?.locks }, console });
  vm.runInContext(source('app.js').replace(/^import .+;\r?\n/gm, ''), context);
  return {
    main, status, writes, document, scrolls, nodes: () => descendants(main),
    skipToContent() { let prevented = false; skip.events.click?.({ preventDefault() { prevented = true; } }); return prevented; },
    route(hash) { window.location.hash = hash; events.hashchange(); },
    get confirms() { return confirms; }, get stored() { return shared ? shared.stored : stored; }
  };
}

test('application renders separate landing, all 15 lessons, materials, and an unknown route fallback', () => {
  const app = boot();
  assert.match(app.main.textContent, /ofert/i);
  assert.equal(app.nodes().filter(node => node.tagName === 'h1').length, 1);
  app.route('#panel');
  const lessonLinks = app.nodes().filter(node => node.tagName === 'a' && /^#lekcja\//.test(node.href));
  assert.equal(new Set(lessonLinks.map(node => node.href)).size, 15);
  app.route('#lekcja/m0-l0');
  assert.match(app.main.textContent, /Lekcja 1.1/);
  assert.match(app.main.textContent, /Przykładowy tekst lekcji/);
  assert.equal(app.nodes().filter(node => node.type === 'radio').length, 2);
  app.route('#materialy');
  const downloads = app.nodes().filter(node => node.tagName === 'a' && node.download !== undefined);
  assert.deepEqual(downloads.map(node => node.href).sort(), ['/downloads/brief.md', '/downloads/cennik.csv', '/downloads/follow-up.md', '/downloads/oferta.md', '/downloads/wizja-lokalna.md']);
  app.route('#lekcja/missing');
  assert.match(app.main.textContent, /nie znaleziono/i);
  app.route('#unknown');
  assert.match(app.main.textContent, /nie znaleziono/i);
});

test('skip-to-content focuses the current course view without treating its anchor as an application route', () => {
  const app = boot({ hash: '#panel' });
  const before = app.main.textContent;
  assert.equal(app.skipToContent(), true, 'skip link must preserve the lesson route by preventing native fragment replacement');
  assert.equal(app.main.focused, true);
  app.route('#main');
  assert.equal(app.main.textContent, before);
  assert.equal(app.main.focused, true);
});

test('route changes return to the beginning without jumping on lesson completion', () => {
  const app = boot({ hash: '#panel' });
  app.route('#lekcja/m0-l0');
  assert.equal(app.scrolls.length, 1);
  assert.equal(app.scrolls[0].top, 0);
  completeButton(app).click();
  assert.equal(app.scrolls.length, 1);
});

test('quiz announces missing, incorrect and correct answers without persisting answers', () => {
  const app = boot({ hash: '#lekcja/m0-l0' });
  const check = app.nodes().find(node => node.tagName === 'button' && /Sprawdź odpowiedź/.test(node.textContent));
  assert.ok(check, 'quiz must have an answer-checking button');
  const feedback = app.nodes().find(node => node.attributes['aria-live'] === 'polite' && /quiz-feedback/.test(node.className));
  assert.ok(feedback, 'quiz needs a persistent live region');
  check.click();
  assert.match(feedback.textContent, /wybierz/i);
  const radios = app.nodes().filter(node => node.type === 'radio');
  radios[1].checked = true;
  check.click();
  assert.match(feedback.textContent, /niepoprawna/i);
  assert.match(feedback.textContent, /Zakres jest podstawą/);
  radios[1].checked = false;
  radios[0].checked = true;
  check.click();
  assert.match(feedback.textContent, /poprawna/i);
  assert.match(feedback.className, /is-correct/);
  assert.equal(app.writes.length, 0);
});

const progressKey = 'ofertownik.progress.v1';
function completeButton(app) { return app.nodes().find(node => node.tagName === 'button' && /Oznacz jako ukończoną/.test(node.textContent)); }

test('stale tabs merge the latest persisted IDs even before storage events arrive (no Web Locks fallback)', async () => {
  const shared = sharedStorage();
  const a = boot({ hash: '#lekcja/m0-l0', shared });
  const b = boot({ hash: '#lekcja/m0-l1', shared });
  await completeButton(a).click();
  await completeButton(b).click();
  assert.deepEqual(JSON.parse(shared.stored), { version: 1, completedIds: ['m0-l0', 'm0-l1'] });
  assert.match(b.main.textContent, /2 z 15 lekcji ukończonych/);
});

test('storage events synchronize completion and reset without destroying the current quiz', async () => {
  const shared = sharedStorage();
  const a = boot({ hash: '#lekcja/m0-l0', shared });
  const b = boot({ hash: '#lekcja/m0-l0', shared });
  const radio = b.nodes().find(node => node.type === 'radio');
  radio.checked = true;
  b.nodes().find(node => node.tagName === 'button' && /Sprawdź odpowiedź/.test(node.textContent)).click();
  const feedback = b.nodes().find(node => /quiz-feedback/.test(node.className));
  await completeButton(a).click();
  shared.flushEvents();
  assert.match(b.main.textContent, /1 z 15 lekcji ukończonych/);
  assert.match(b.main.textContent, /Lekcja ukończona/);
  assert.ok(b.nodes().includes(radio), 'keep the same quiz DOM and selection');
  assert.equal(radio.checked, true);
  assert.ok(b.nodes().includes(feedback));
  assert.match(feedback.className, /is-correct/);
  a.route('#panel');
  await a.nodes().find(node => /reset-button/.test(node.className)).click();
  shared.flushEvents();
  assert.match(b.main.textContent, /0 z 15 lekcji ukończonych/);
  assert.ok(completeButton(b), 'reset re-enables completion in the other tab');
  assert.ok(b.nodes().includes(radio));
  assert.equal(b.writes.length, 0, 'storage synchronization must not write back');
});

test('a reset is authoritative even when another tab has stale IDs and delayed storage events', async () => {
  const shared = sharedStorage(JSON.stringify({ version: 1, completedIds: ['m0-l0'] }));
  const a = boot({ hash: '#panel', shared });
  const b = boot({ hash: '#lekcja/m0-l1', shared });
  await a.nodes().find(node => /reset-button/.test(node.className)).click();
  await completeButton(b).click();
  assert.deepEqual(JSON.parse(shared.stored), { version: 1, completedIds: ['m0-l1'] });
  shared.flushEvents();
  assert.match(a.main.textContent, /1 z 15 lekcji ukończonych/);
  assert.match(b.main.textContent, /1 z 15 lekcji ukończonych/);
});

test('Web Locks serialize simultaneous tab updates using the same exclusive lock', async () => {
  const shared = sharedStorage(null, { locked: true });
  const a = boot({ hash: '#lekcja/m0-l0', shared });
  const b = boot({ hash: '#lekcja/m0-l1', shared });
  const first = completeButton(a).click();
  const second = completeButton(b).click();
  assert.equal(a.writes.length + b.writes.length, 0, 'no read-modify-write before acquiring the lock');
  await Promise.all([first, second]);
  assert.deepEqual(shared.lockNames, [progressKey, progressKey]);
  assert.deepEqual(JSON.parse(shared.stored), { version: 1, completedIds: ['m0-l0', 'm0-l1'] });
  shared.flushEvents();
  assert.match(a.main.textContent, /2 z 15 lekcji ukończonych/);
  assert.match(b.main.textContent, /2 z 15 lekcji ukończonych/);
});

test('reset shares the update lock and queued completion never resurrects pre-reset IDs', async () => {
  const shared = sharedStorage(JSON.stringify({ version: 1, completedIds: ['m0-l0'] }), { locked: true });
  const a = boot({ hash: '#panel', shared });
  const b = boot({ hash: '#lekcja/m0-l1', shared });
  const reset = a.nodes().find(node => /reset-button/.test(node.className)).click();
  const complete = completeButton(b).click();
  assert.equal(a.writes.length + b.writes.length, 0);
  await Promise.all([reset, complete]);
  assert.deepEqual(shared.lockNames, [progressKey, progressKey]);
  assert.deepEqual(JSON.parse(shared.stored), { version: 1, completedIds: ['m0-l1'] });
  shared.flushEvents();
  assert.match(a.main.textContent, /1 z 15 lekcji ukończonych/);
});

for (const failure of ['throw', 'reject']) {
  test(`Web Locks ${failure} before callback degrades completion and reset to session-only progress`, async () => {
    for (const options of [{}, { blocked: true }, { writeBlocked: true }]) {
      const raw = JSON.stringify({ version: 1, completedIds: ['m0-l0'] });
      const shared = sharedStorage(raw);
      shared.locks = { request() {
        if (failure === 'throw') throw new Error('Lock unavailable');
        return Promise.reject(new Error('Lock unavailable'));
      } };
      const app = boot({ ...options, hash: '#lekcja/m0-l1', shared });
      await assert.doesNotReject(async () => completeButton(app).click());
      assert.match(app.main.textContent, options.blocked ? /1 z 15 lekcji ukończonych/ : /2 z 15 lekcji ukończonych/);
      assert.match(app.status.textContent, /tylko w tej sesji.*zniknie po odświeżeniu/);
      assert.equal(app.status.hidden, false);
      assert.doesNotMatch(app.status.className, /is-notice/);

      // Real click listeners ignore returned promises: neither action may leak a rejection.
      app.route('#lekcja/m0-l2');
      completeButton(app).click();
      await new Promise(resolve => setImmediate(resolve));
      assert.match(app.main.textContent, options.blocked ? /2 z 15 lekcji ukończonych/ : /3 z 15 lekcji ukończonych/);
      app.route('#panel');
      app.nodes().find(node => /reset-button/.test(node.className)).click();
      await new Promise(resolve => setImmediate(resolve));
      assert.match(app.main.textContent, /0 z 15 lekcji ukończonych/);
      assert.match(app.status.textContent, /tylko w tej sesji.*zniknie po odświeżeniu/);
      app.route('#lekcja/m0-l2');
      await completeButton(app).click();
      assert.match(app.main.textContent, /1 z 15 lekcji ukończonych/);
      assert.equal(shared.stored, raw, 'failed lock must never write or reset shared storage');
      assert.equal(app.writes.length, 0);
    }
  });
}

test('Web Locks failures after callback entry report an error without retrying completion or reset', async () => {
  for (const failure of ['throw', 'reject']) for (const operation of ['complete', 'reset']) for (const callbackFails of [false, true]) {
    const shared = sharedStorage(JSON.stringify({ version: 1, completedIds: ['m0-l0'] }));
    shared.locks = { request(name, options, action) {
      const run = () => { action(); throw new Error('Lock failed after callback'); };
      if (failure === 'throw') return run();
      return Promise.resolve().then(run);
    } };
    const app = boot({ hash: operation === 'complete' ? '#lekcja/m0-l1' : '#panel', shared });
    const action = operation === 'complete' ? completeButton(app) : app.nodes().find(node => /reset-button/.test(node.className));
    let refreshes = 0;
    // Count refresh attempts, retaining the probe when the sidebar is replaced.
    if (operation === 'complete') {
      const observe = node => {
        const replaceWith = node.replaceWith.bind(node);
        node.replaceWith = next => {
          refreshes++;
          if (callbackFails) throw new Error('Render failed');
          replaceWith(next);
          observe(next);
        };
      };
      observe(app.main.children[0].children[0]);
    } else {
      const replaceChildren = app.main.replaceChildren.bind(app.main);
      app.main.replaceChildren = (...children) => {
        refreshes++;
        if (callbackFails) throw new Error('Render failed');
        replaceChildren(...children);
      };
    }
    refreshes = 0;
    await assert.doesNotReject(async () => action.click());
    assert.equal(refreshes, 1, 'callback must not be retried after entry, even if rendering throws');
    assert.equal(app.writes.length, 1);
    assert.deepEqual(JSON.parse(shared.stored).completedIds, operation === 'complete' ? ['m0-l0', 'm0-l1'] : []);
    assert.match(app.status.textContent, /nie udało.*nie została ponowiona/i);
    assert.doesNotMatch(app.status.textContent, /tylko w tej sesji/);
  }
});

test('queued completion followed by reset leaves both tabs empty under Web Locks', async () => {
  const shared = sharedStorage(JSON.stringify({ version: 1, completedIds: ['m0-l0'] }), { locked: true });
  const a = boot({ hash: '#lekcja/m0-l1', shared });
  const b = boot({ hash: '#panel', shared });
  const complete = completeButton(a).click();
  const reset = b.nodes().find(node => /reset-button/.test(node.className)).click();
  assert.equal(a.writes.length + b.writes.length, 0);
  await Promise.all([complete, reset]);
  assert.deepEqual(shared.lockNames, [progressKey, progressKey]);
  assert.deepEqual(JSON.parse(a.writes[0].value).completedIds, ['m0-l0', 'm0-l1']);
  assert.equal(b.writes.length, 1);
  assert.deepEqual(JSON.parse(shared.stored), { version: 1, completedIds: [] });
  shared.flushEvents();
  assert.match(a.main.textContent, /0 z 15 lekcji ukończonych/);
  assert.match(b.main.textContent, /0 z 15 lekcji ukończonych/);
});

test('blocked storage retains multiple session completions and a session reset', async () => {
  for (const locked of [false, true]) for (const options of [{ blocked: true }, { writeBlocked: true }]) {
    const shared = sharedStorage(null, { locked });
    const app = boot({ ...options, hash: '#lekcja/m0-l0', shared });
    const radio = app.nodes().find(node => node.type === 'radio');
    radio.checked = true;
    await completeButton(app).click();
    assert.ok(app.nodes().includes(radio), 'local completion also preserves the quiz');
    assert.equal(radio.checked, true);
    app.route('#lekcja/m0-l1');
    await completeButton(app).click();
    assert.match(app.main.textContent, /2 z 15 lekcji ukończonych/);
    app.route('#panel');
    await app.nodes().find(node => /reset-button/.test(node.className)).click();
    assert.match(app.main.textContent, /0 z 15 lekcji ukończonych/);
    app.route('#lekcja/m0-l2');
    await completeButton(app).click();
    assert.match(app.main.textContent, /1 z 15 lekcji ukończonych/);
    assert.match(app.status.textContent, /tej sesji/);
    assert.equal(shared.stored, null);
    assert.equal(app.writes.length, 0);
  }
});

test('follow-up lesson accurately describes the two downloadable message skeletons', () => {
  const paragraphs = core.flattenLessons(shippedCourse).flatMap(lesson => lesson.sections.flatMap(section => section.paragraphs));
  const description = paragraphs.find(text => text.includes('W pliku follow-up.md'));
  assert.match(description, /dwa szkielety wiadomości/);
  assert.equal((source('downloads/follow-up.md').match(/^Temat:/gm) || []).length, 2);
});

test('completion persists only versioned lesson IDs, updates progress, and resumes at the next incomplete lesson', () => {
  const app = boot({ hash: '#lekcja/m0-l0' });
  assert.ok(completeButton(app), 'lesson needs a completion button');
  completeButton(app).click();
  assert.equal(app.writes.length, 1);
  assert.equal(app.writes[0].key, progressKey);
  assert.deepEqual(JSON.parse(app.stored), { version: 1, completedIds: ['m0-l0'] });
  assert.match(app.main.textContent, /1 z 15 lekcji ukończonych/);
  assert.match(app.main.textContent, /Lekcja ukończona/);
  const next = app.nodes().find(node => node.tagName === 'a' && /Następna lekcja/.test(node.textContent));
  assert.equal(next?.href, '#lekcja/m0-l1');
  const restored = boot({ hash: '#panel', raw: app.stored });
  assert.match(restored.main.textContent, /1 z 15 lekcji ukończonych/);
  const resume = restored.nodes().find(node => node.tagName === 'a' && /Kontynuuj naukę/.test(node.textContent));
  assert.equal(resume?.href, '#lekcja/m0-l1');
  const allDone = boot({ hash: '#panel', raw: JSON.stringify({ version: 1, completedIds: core.flattenLessons(fixtureCourse).map(lesson => lesson.id) }) });
  assert.match(allDone.main.textContent, /15 z 15 lekcji ukończonych/);
  assert.match(allDone.main.textContent, /Cały proces jest już za Tobą/);
});

test('corrupt, obsolete, or blocked storage is explained while lessons remain usable', () => {
  for (const raw of ['{broken', 'null', JSON.stringify({ version: 2, completedIds: [] }), JSON.stringify({ version: 1, completedIds: 'm0-l0' })]) {
    const app = boot({ hash: '#panel', raw });
    assert.match(app.status.textContent, /uszkodzony|niezgodny/i);
    assert.equal(app.status.hidden, false);
    assert.match(app.main.textContent, /0 z 15 lekcji ukończonych/);
  }
  const repaired = boot({ hash: '#panel', raw: JSON.stringify({ version: 1, completedIds: ['m0-l0', 'm0-l0', 'missing', 4] }) });
  assert.match(repaired.main.textContent, /1 z 15 lekcji ukończonych/);
  assert.match(repaired.status.textContent, /pominięto/i);
  for (const options of [{ blocked: true }, { writeBlocked: true }]) {
    const app = boot({ ...options, hash: '#lekcja/m0-l0' });
    completeButton(app).click();
    assert.match(app.status.textContent, /nie można zapisać/i);
    assert.match(app.status.textContent, /tej sesji/i);
    assert.match(app.main.textContent, /1 z 15 lekcji ukończonych/);
    assert.equal(app.writes.length, 0);
  }
});

test('reset requires confirmation and updates the persisted progress without clearing unrelated storage', () => {
  const raw = JSON.stringify({ version: 1, completedIds: ['m0-l0'] });
  for (const confirmed of [false, true]) {
    const app = boot({ hash: '#panel', raw, confirm: confirmed });
    const reset = app.nodes().find(node => node.tagName === 'button' && /Wyzeruj postęp/.test(node.textContent));
    assert.ok(reset, 'panel needs an explicit reset control');
    reset.click();
    assert.equal(app.confirms, 1);
    assert.match(app.main.textContent, confirmed ? /0 z 15 lekcji ukończonych/ : /1 z 15 lekcji ukończonych/);
    assert.deepEqual(JSON.parse(app.stored).completedIds, confirmed ? [] : ['m0-l0']);
    assert.equal(app.writes.length, confirmed ? 1 : 0);
  }
  assert.doesNotMatch(source('app.js'), /localStorage\.clear/);
});

test('presentation is responsive, keyboard-visible, dependency-free and compatible with strict CSP', () => {
  assert.ok(existsSync(file('styles.css')), 'public/styles.css must exist');
  const css = source('styles.css');
  assert.match(css, /Segoe UI/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /@media[^\{]+max-width/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /@import|url\(/);
  const app = source('app.js');
  assert.doesNotMatch(app, /innerHTML|outerHTML|insertAdjacentHTML|eval\(|new Function|\.style\.|fetch\(/);
  assert.match(app, /textContent/);
  assert.match(app, /createElement/);
  assert.doesNotMatch(app, /https?:\/\//);
});

test('integration smoke renders every shipped lesson and resolves all five download files', () => {
  assert.equal(shippedCourse.modules.length, 5);
  const shippedLessons = core.flattenLessons(shippedCourse);
  assert.equal(shippedLessons.length, 15);
  const app = boot({ courseData: shippedCourse });
  for (const lesson of shippedLessons) {
    app.route(`#lekcja/${lesson.id}`);
    assert.equal(app.nodes().find(node => node.tagName === 'h1')?.textContent, lesson.title);
    assert.ok(app.main.textContent.includes(lesson.exercise.prompt));
    assert.ok(app.main.textContent.includes(lesson.sections[0].paragraphs[0]));
    assert.equal(app.nodes().filter(node => node.type === 'radio').length, lesson.quiz.options.length);
  }
  app.route('#materialy');
  const downloads = app.nodes().filter(node => node.tagName === 'a' && node.download !== undefined);
  assert.equal(downloads.length, 5);
  for (const download of downloads) {
    assert.ok(existsSync(file(download.href.slice(1))), `${download.href} must exist`);
    assert.ok(source(download.href.slice(1)).length > 100);
  }
});
