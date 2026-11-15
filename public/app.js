import { course } from './course.js';
import { flattenLessons, normaliseProgress, calculateProgress, getNextLesson, evaluateQuiz } from './core.js';

const main = document.getElementById('main');
const storageStatus = document.getElementById('storage-status');
const lessons = flattenLessons(course);
const storageKey = 'ofertownik.progress.v1';
const validIds = lessons.map(lesson => lesson.id);
let sessionOnly = false;
let completedIds = loadProgress();
let refreshLessonProgress = null;

function refreshProgress() {
  if (refreshLessonProgress) refreshLessonProgress();
  else render();
}

function storageMessage(text, success = false) {
  storageStatus.textContent = text;
  storageStatus.className = success ? 'storage-status is-notice' : 'storage-status';
  storageStatus.hidden = false;
}
function loadProgress(fallback = []) {
  let raw;
  try {
    raw = localStorage.getItem(storageKey);
  } catch {
    sessionOnly = true;
    storageMessage('Pamięć przeglądarki jest niedostępna. Postęp działa tylko w tej sesji i zniknie po odświeżeniu.');
    return fallback;
  }
  if (raw === null) return [];
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !Array.isArray(value.completedIds)) throw new Error('Invalid progress');
    const clean = normaliseProgress(value.completedIds, validIds);
    if (clean.length !== value.completedIds.length) storageMessage('Odczytano postęp, ale pominięto nieprawidłowe lub powtórzone identyfikatory lekcji.');
    return clean;
  } catch {
    storageMessage('Zapis postępu jest uszkodzony lub niezgodny z tą wersją. Kurs działa od początku. Następne ukończenie lekcji zastąpi błędny zapis.');
    return [];
  }
}
function persistProgress() {
  try {
    if (sessionOnly) throw new Error('Session-only progress');
    const value = JSON.stringify({ version: 1, completedIds });
    localStorage.setItem(storageKey, value);
    if (localStorage.getItem(storageKey) !== value) throw new Error('Progress verification failed');
    storageMessage('Postęp zapisany na tym urządzeniu. Zapis zawiera tylko identyfikatory ukończonych lekcji.', true);
    return true;
  } catch {
    sessionOnly = true;
    storageMessage('Nie można zapisać postępu w pamięci przeglądarki. Postęp działa tylko w tej sesji i zniknie po odświeżeniu.');
    return false;
  }
}

function updateProgress(lessonId = null) {
  const update = () => {
    // Storage is authoritative: merging this tab's old IDs would undo a reset.
    if (!sessionOnly) completedIds = loadProgress(completedIds);
    completedIds = lessonId === null ? [] : normaliseProgress([...completedIds, lessonId], validIds);
    const saved = persistProgress();
    if (saved && lessonId === null) storageMessage('Postęp kursu został wyzerowany na tym urządzeniu.', true);
    refreshProgress();
  };
  if (typeof navigator !== 'undefined' && navigator.locks?.request) {
    let callbackStarted = false;
    const lockFailed = () => {
      if (callbackStarted) {
        storageMessage('Nie udało się zaktualizować postępu. Operacja nie została ponowiona.');
        return;
      }
      sessionOnly = true;
      update();
    };
    try {
      return Promise.resolve(navigator.locks.request(storageKey, { mode: 'exclusive' }, () => {
        callbackStarted = true;
        update();
      })).catch(lockFailed);
    } catch {
      return lockFailed();
    }
  }
  // Best-effort fallback: re-read before writing, but no cross-tab atomicity without Web Locks.
  return update();
}

const materials = [
  { file: 'brief.md', title: 'Brief pierwszej rozmowy', format: 'MD', description: 'Zbierz zakres, termin i pytania, zanim zaczniesz wyceniać.' },
  { file: 'wizja-lokalna.md', title: 'Lista na wizję lokalną', format: 'MD', description: 'Sprawdź warunki, pomiary i niewiadome na miejscu.' },
  { file: 'cennik.csv', title: 'Twój cennik roboczy', format: 'CSV', description: 'Uporządkuj własne stawki i jednostki w arkuszu.' },
  { file: 'oferta.md', title: 'Szablon czytelnej oferty', format: 'MD', description: 'Opisz zakres, wyłączenia, warunki i kolejny krok.' },
  { file: 'follow-up.md', title: 'Ponowny kontakt bez nacisku', format: 'MD', description: 'Przygotuj rzeczową wiadomość po wysłaniu oferty.' }
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function link(text, href, className = '') {
  const node = element('a', className, text);
  node.href = href;
  return node;
}
function button(text, className, action) {
  const node = element('button', className, text);
  node.type = 'button';
  node.addEventListener('click', action);
  return node;
}
function kicker(text) { return element('p', 'eyebrow', text); }
function number(value) { return String(value).padStart(2, '0'); }
function lessonHref(id) { return `#lekcja/${id}`; }
function progressBlock(compact = false) {
  const progress = calculateProgress(course, completedIds);
  const wrapper = element('div', compact ? 'progress-block compact' : 'progress-block');
  const heading = element('div', 'progress-heading');
  heading.append(element('span', '', 'Twój postęp'), element('strong', '', `${progress.percent}%`));
  const bar = element('progress', 'progress-bar');
  bar.max = progress.total;
  bar.value = progress.completed;
  bar.setAttribute('aria-label', `Ukończono ${progress.completed} z ${progress.total} lekcji`);
  wrapper.append(heading, bar, element('p', 'muted small', `${progress.completed} z ${progress.total} lekcji ukończonych`));
  return wrapper;
}
function sidebar(currentId = '') {
  const aside = element('aside', 'course-sidebar');
  const details = element('details', 'course-outline');
  details.open = window.matchMedia ? window.matchMedia('(min-width: 901px)').matches : true;
  const summary = element('summary', '', 'Spis kursu i postęp');
  const content = element('div', 'sidebar-body');
  content.append(kicker('TWÓJ WARSZTAT'), link('Od zapytania do oferty', '#panel', 'sidebar-title'), progressBlock(true));
  const nav = element('nav', 'lesson-nav');
  nav.setAttribute('aria-label', 'Moduły i lekcje');
  course.modules.forEach((module, index) => {
    const group = element('div', 'sidebar-module');
    group.append(element('h2', 'sidebar-module-title', `${number(index + 1)} / ${module.title}`));
    module.lessons.forEach((lesson, lessonIndex) => {
      const done = completedIds.includes(lesson.id);
      const active = lesson.id === currentId;
      const item = link('', lessonHref(lesson.id), `lesson-link${active ? ' is-active' : ''}${done ? ' is-done' : ''}`);
      if (active) item.setAttribute('aria-current', 'page');
      const ordinal = element('span', 'lesson-ordinal', done ? '✓' : `${index + 1}.${lessonIndex + 1}`);
      ordinal.setAttribute('aria-hidden', 'true');
      const title = element('span', 'lesson-link-copy');
      title.append(element('span', '', lesson.title), element('small', '', `${lesson.duration}${done ? ' · ukończona' : ''}`));
      item.append(ordinal, title);
      group.append(item);
    });
    nav.append(group);
  });
  content.append(nav, link('Materiały do warsztatu ↗', '#materialy', 'sidebar-materials'));
  details.append(summary, content);
  aside.append(details);
  return aside;
}
function courseFrame(content, currentId = '') {
  const wrapper = element('div', 'course-layout');
  wrapper.append(sidebar(currentId), content);
  main.replaceChildren(wrapper);
}
function renderStart() {
  document.title = 'Ofertownik — dobra oferta zaczyna się wcześniej';
  const page = element('div', 'landing');
  const hero = element('section', 'landing-hero');
  const intro = element('div', 'hero-copy');
  intro.append(kicker('PRAKTYCZNY KURS DLA FIRM WYKONAWCZYCH'), element('h1', '', 'Dobra oferta zaczyna się przed wyceną.'));
  intro.append(element('p', 'hero-lead', 'Zamień „proszę o cenę” w uporządkowany proces. Od pierwszej rozmowy, przez własny cennik, po ofertę i spokojny ponowny kontakt.'));
  const actions = element('div', 'actions');
  actions.append(link('Wejdź do kursu ↗', '#panel', 'button primary'), link('Zajrzyj do pierwszej lekcji →', lessonHref(lessons[0].id), 'text-link'));
  intro.append(actions, element('p', 'local-note', 'Pełny kurs w tej wersji lokalnej. Bez konta, płatności i podawania danych.'));
  const sheet = element('div', 'workshop-sheet');
  const sheetHeading = element('div', 'sheet-heading');
  sheetHeading.append(kicker('OFERTOWNIK / PLAN PRACY'), element('span', 'sheet-label', 'WARSZTAT 01'));
  sheet.append(sheetHeading, element('h2', '', 'Od zapytania do kolejnego kroku.'));
  const outline = element('ol', 'sheet-outline');
  course.modules.forEach((module, index) => {
    const row = element('li', '');
    row.append(element('span', 'sheet-number', number(index + 1)), element('span', '', module.title));
    outline.append(row);
  });
  sheet.append(outline, element('p', 'sheet-footer', 'Własne stawki. Jasne ustalenia. Twoja decyzja.'));
  hero.append(intro, sheet);
  const facts = element('div', 'course-facts');
  facts.append(element('p', '', `${course.modules.length} modułów / ${lessons.length} lekcji`), element('p', '', 'Tekst · ćwiczenia · quizy'), element('p', '', `${materials.length} szablonów do własnej pracy`));
  const curriculum = element('section', 'landing-curriculum');
  const caption = element('div', 'section-intro');
  caption.append(kicker('PROGRAM, NIE OBIETNICE'), element('h2', '', 'Jeden proces. Krok po kroku.'), element('p', 'muted', 'Dla małych firm remontowych, instalacyjnych i ogrodniczych. Pracujesz na przykładach, a potem dostosowujesz je do swojej firmy.'));
  curriculum.append(caption);
  const list = element('div', 'curriculum-list');
  course.modules.forEach((module, index) => {
    const row = link('', lessonHref(module.lessons[0].id), 'curriculum-row');
    const content = element('div', '');
    content.append(element('h3', '', module.title), element('p', 'muted', module.lessons.map(lesson => lesson.title).join(' · ')));
    row.append(element('span', 'curriculum-number', number(index + 1)), content, element('span', 'row-arrow', '↗'));
    list.append(row);
  });
  curriculum.append(list);
  const principle = element('section', 'principle');
  principle.append(kicker('AI JAKO POMOCNIK, NIE AUTOR DECYZJI'), element('h2', '', 'Szkic może zrobić AI. Cenę i obietnice zatwierdzasz Ty.'), element('p', '', 'Korzystaj z własnego cennika, weryfikuj obliczenia i zakres. W ćwiczeniach używaj wyłącznie fikcyjnych danych — bez nazwisk, adresów i informacji klientów.'));
  page.append(hero, facts, curriculum, principle);
  main.replaceChildren(page);
}
function renderPanel() {
  document.title = 'Mój kurs — Ofertownik';
  const content = element('div', 'panel-content');
  const header = element('header', 'page-heading');
  header.append(kicker('PANEL KURSANTA / WERSJA LOKALNA'), element('h1', '', 'Warsztat dobrych ofert.'), element('p', 'page-lead', 'Jedna lekcja, jedno ćwiczenie, jeden krok bliżej uporządkowanej pracy. Ucz się we własnym tempie.'));
  const next = getNextLesson(course, completedIds);
  const continuation = element('section', 'continue-panel');
  const copy = element('div', '');
  copy.append(kicker(next ? (completedIds.length ? 'WRÓĆ DO PRACY' : 'ZACZNIJ OD PODSTAW') : 'WARSZTAT UKOŃCZONY'), element('h2', '', next ? next.title : 'Cały proces jest już za Tobą.'), element('p', '', next ? `${next.moduleTitle} · ${next.duration}` : 'Wróć do dowolnej lekcji lub pobierz materiały i przećwicz proces ponownie.'));
  continuation.append(copy, link(next ? (completedIds.length ? 'Kontynuuj naukę →' : 'Rozpocznij kurs →') : 'Przejdź do materiałów →', next ? lessonHref(next.id) : '#materialy', 'button light'));
  content.append(header, continuation, progressBlock());
  const heading = element('div', 'section-heading');
  heading.append(element('h2', '', 'Twój program'), element('span', 'muted small', 'Wszystkie lekcje są dostępne'));
  content.append(heading);
  course.modules.forEach((module, index) => {
    const section = element('section', 'module-section');
    const title = element('div', 'module-heading');
    const done = module.lessons.filter(lesson => completedIds.includes(lesson.id)).length;
    title.append(element('span', 'module-number', number(index + 1)), element('h3', '', module.title), element('span', 'muted small', `${done}/${module.lessons.length}`));
    section.append(title);
    module.lessons.forEach((lesson, lessonIndex) => {
      const row = link('', lessonHref(lesson.id), 'panel-lesson');
      row.append(element('span', 'panel-lesson-number', `${index + 1}.${lessonIndex + 1}`), element('span', 'panel-lesson-title', lesson.title), element('span', 'lesson-duration', String(lesson.duration)), element('span', completedIds.includes(lesson.id) ? 'status-complete' : 'status-open', completedIds.includes(lesson.id) ? '✓ Ukończona' : 'Czytaj →'));
      section.append(row);
    });
    content.append(section);
  });
  const privacy = element('section', 'privacy-panel');
  privacy.append(element('h2', '', 'Postęp zostaje na tym urządzeniu'), element('p', 'muted', 'Zapisywane są wyłącznie identyfikatory ukończonych lekcji. Bez danych osobowych, notatek i wyników quizów. Wyczyszczenie danych przeglądarki usunie postęp. Ćwiczenia wykonujesz we własnym zakresie.'));
  privacy.append(button('Wyzeruj postęp', 'reset-button', () => {
    if (!window.confirm('Wyzerować postęp całego kursu na tym urządzeniu? Tej operacji nie można cofnąć.')) return;
    return updateProgress();
  }));
  content.append(privacy);
  courseFrame(content);
}
function lessonCompletion(lesson) {
  const completion = element('section', 'lesson-completion');
  const done = completedIds.includes(lesson.id);
  const completionStatus = element('p', 'completion-status', done ? '✓ Lekcja ukończona. Możesz wrócić do niej w każdej chwili.' : 'Przeczytane i przećwiczone? Zaznacz swój postęp.');
  completionStatus.setAttribute('role', 'status');
  const complete = button(done ? '✓ Ukończona' : 'Oznacz jako ukończoną', 'button primary', () => updateProgress(lesson.id));
  complete.disabled = done;
  completion.append(completionStatus, complete);
  if (done) {
    const next = getNextLesson(course, completedIds);
    completion.append(link(next ? `Następna lekcja → ${next.title}` : 'Wszystkie lekcje ukończone → Pobierz materiały', next ? lessonHref(next.id) : '#materialy', 'next-lesson'));
  }
  return completion;
}
function renderLesson(lesson) {
  document.title = `${lesson.title} — Ofertownik`;
  const index = lessons.findIndex(item => item.id === lesson.id);
  const content = element('div', 'lesson-content');
  const breadcrumb = element('nav', 'breadcrumbs');
  breadcrumb.setAttribute('aria-label', 'Ścieżka nawigacji');
  breadcrumb.append(link('Mój kurs', '#panel'), element('span', '', '/'), element('span', '', lesson.moduleTitle));
  const article = element('article', 'lesson-article');
  const header = element('header', 'lesson-header');
  header.append(kicker(`LEKCJA ${number(index + 1)} / ${number(lessons.length)} · ${lesson.duration}`), element('h1', '', lesson.title), element('p', 'lesson-format', 'Lekcja tekstowa / ćwiczenie / sprawdzenie wiedzy'));
  article.append(header);
  lesson.sections.forEach(section => {
    const block = element('section', 'lesson-section');
    block.append(element('h2', '', section.heading));
    section.paragraphs.forEach(paragraph => block.append(element('p', '', paragraph)));
    article.append(block);
  });
  const exercise = element('section', 'exercise');
  exercise.append(kicker('TERAZ TWOJA KOLEJ'), element('h2', '', 'Przełóż to na praktykę'), element('p', '', lesson.exercise.prompt), element('p', 'exercise-example', lesson.exercise.placeholder), element('p', 'small muted', 'Wykonaj ćwiczenie we własnym dokumencie, na fikcyjnych danych. Nie wprowadzaj danych klientów. Ta platforma nie zapisuje notatek.'));
  const quiz = element('section', 'quiz');
  quiz.append(kicker('SPRAWDŹ ZROZUMIENIE'), element('h2', '', 'Krótko, zanim pójdziesz dalej'));
  const fieldset = element('fieldset', 'quiz-options');
  fieldset.append(element('legend', '', lesson.quiz.question));
  const quizInputs = [];
  lesson.quiz.options.forEach((option, optionIndex) => {
    const label = element('label', 'quiz-option');
    const input = element('input');
    input.type = 'radio';
    input.name = `quiz-${lesson.id}`;
    input.value = String(optionIndex);
    quizInputs.push(input);
    label.append(input, element('span', '', option));
    fieldset.append(label);
  });
  const feedback = element('p', 'quiz-feedback');
  feedback.setAttribute('role', 'status');
  feedback.setAttribute('aria-live', 'polite');
  const check = button('Sprawdź odpowiedź', 'button secondary', () => {
    const answerIndex = quizInputs.findIndex(input => input.checked);
    if (answerIndex < 0) {
      feedback.className = 'quiz-feedback';
      feedback.textContent = 'Najpierw wybierz jedną odpowiedź.';
      return;
    }
    const result = evaluateQuiz(lesson.quiz, answerIndex);
    feedback.className = `quiz-feedback ${result.correct ? 'is-correct' : 'is-incorrect'}`;
    feedback.textContent = `${result.correct ? 'Poprawna odpowiedź.' : 'Niepoprawna odpowiedź. Spróbuj ponownie.'} ${result.explanation}`;
  });
  quiz.append(fieldset, check, feedback);
  let completion = lessonCompletion(lesson);
  const navigation = element('nav', 'lesson-pagination');
  navigation.setAttribute('aria-label', 'Kolejność lekcji');
  navigation.append(index > 0 ? link('← Poprzednia lekcja', lessonHref(lessons[index - 1].id)) : link('← Program kursu', '#panel'));
  if (index < lessons.length - 1) navigation.append(link('Kolejna w programie →', lessonHref(lessons[index + 1].id)));
  article.append(exercise, quiz, completion, navigation);
  content.append(breadcrumb, article);
  courseFrame(content, lesson.id);
  refreshLessonProgress = () => {
    main.children[0].children[0].replaceWith(sidebar(lesson.id));
    const updated = lessonCompletion(lesson);
    completion.replaceWith(updated);
    completion = updated;
  };
}
function renderMaterials() {
  document.title = 'Materiały do pobrania — Ofertownik';
  const content = element('div', 'materials-content');
  const header = element('header', 'page-heading');
  header.append(kicker('DO WŁASNEGO WARSZTATU'), element('h1', '', 'Nie zaczynaj od pustej kartki.'), element('p', 'page-lead', 'Pięć prostych szablonów do uzupełnienia. Pobierz, otwórz w edytorze tekstu lub arkuszu i dopasuj do swojej firmy.'));
  content.append(header);
  const list = element('div', 'download-list');
  materials.forEach((material, index) => {
    const row = element('section', 'download-row');
    const copy = element('div', 'download-copy');
    copy.append(element('h2', '', material.title), element('p', 'muted', material.description));
    const download = link(`Pobierz ${material.format} ↓`, `/downloads/${material.file}`, 'button secondary');
    download.download = material.file;
    row.append(element('span', 'download-number', number(index + 1)), copy, download);
    list.append(row);
  });
  const note = element('section', 'material-note');
  note.append(element('h2', '', 'Zwykłe pliki. Pełna kontrola.'), element('p', '', 'MD to tekst, który otworzysz w Notatniku lub edytorze Markdown. CSV otworzysz w programie do arkuszy. To szablony do pracy, nie porada prawna ani gotowa wycena. Zawsze sprawdź kwoty i warunki przed wysłaniem oferty.'));
  content.append(list, note);
  courseFrame(content);
}
function renderNotFound() {
  document.title = 'Nie znaleziono strony — Ofertownik';
  const page = element('section', 'not-found');
  page.append(kicker('TO NIE TA KARTKA'), element('h1', '', 'Nie znaleziono tej strony.'), element('p', '', 'Adres nie prowadzi do dostępnej lekcji. Cały program znajdziesz w panelu kursu.'), link('Wróć do kursu →', '#panel', 'button primary'));
  main.replaceChildren(page);
}
function render(focus = false) {
  refreshLessonProgress = null;
  const hash = window.location.hash === '#main' ? '#start' : (window.location.hash || '#start');
  const section = hash === '#start' ? 'start' : hash === '#materialy' ? 'materialy' : 'panel';
  document.querySelectorAll('[data-nav]').forEach(item => {
    if (item.dataset.nav === section) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
  if (hash === '#start') renderStart();
  else if (hash === '#panel') renderPanel();
  else if (hash === '#materialy') renderMaterials();
  else if (hash.startsWith('#lekcja/')) {
    const lesson = lessons.find(item => lessonHref(item.id) === hash);
    if (lesson) renderLesson(lesson);
    else renderNotFound();
  } else renderNotFound();
  if (focus) main.focus({ preventScroll: false });
}
document.getElementById('skip-link').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
});
window.addEventListener('storage', event => {
  if ((event.key !== storageKey && event.key !== null) || event.storageArea !== localStorage || sessionOnly) return;
  // Read current storage rather than replaying a potentially delayed pre-reset event.
  completedIds = loadProgress(completedIds);
  refreshProgress();
});
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#main') main.focus();
  else {
    render(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
});
render();
