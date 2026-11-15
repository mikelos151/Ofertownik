import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const courseUrl = new URL('../public/course.js', import.meta.url);
const words = (text) => text.trim().split(/\s+/u).filter(Boolean).length;
const isText = (value, label) => {
  assert.equal(typeof value, 'string', `${label}: tekst`);
  assert.ok(value.trim().length > 0, `${label}: niepusty tekst`);
  assert.doesNotMatch(value, /<\/?[a-z][^>]*>/iu, `${label}: bez HTML`);
};

test('kurs dostarcza pięć modułów i piętnaście kompletnych lekcji do samodzielnej nauki', async () => {
  let exists = true;
  try { await access(courseUrl); } catch { exists = false; }
  assert.ok(exists, 'brakuje public/course.js z pełną treścią kursu');
  const { course } = await import(courseUrl.href);
  isText(course.id, 'course.id');
  isText(course.title, 'course.title');
  isText(course.description, 'course.description');
  assert.equal(course.modules.length, 5);
  const ids = new Set([course.id]);
  let lessonCount = 0;
  for (const module of course.modules) {
    isText(module.id, 'module.id');
    isText(module.title, 'module.title');
    assert.ok(!ids.has(module.id), `powtórzone ID: ${module.id}`);
    ids.add(module.id);
    assert.equal(module.lessons.length, 3, module.title);
    for (const lesson of module.lessons) {
      lessonCount += 1;
      isText(lesson.id, 'lesson.id');
      assert.ok(!ids.has(lesson.id), `powtórzone ID: ${lesson.id}`);
      ids.add(lesson.id);
      isText(lesson.title, 'lesson.title');
      assert.match(lesson.duration, /^[1-9]\d* min$/u);
      assert.ok(Array.isArray(lesson.sections) && lesson.sections.length >= 2, lesson.id);
      for (const section of lesson.sections) {
        isText(section.heading, 'section.heading');
        assert.ok(Array.isArray(section.paragraphs) && section.paragraphs.length > 0);
        section.paragraphs.forEach((paragraph) => isText(paragraph, 'paragraph'));
      }
      const count = words(lesson.sections.flatMap((section) => section.paragraphs).join(' '));
      assert.ok(count >= 200 && count <= 350, `${lesson.id}: ${count} słów, wymagane 200–350`);
      isText(lesson.exercise.prompt, 'exercise.prompt');
      isText(lesson.exercise.placeholder, 'exercise.placeholder');
      isText(lesson.quiz.question, 'quiz.question');
      assert.ok(Array.isArray(lesson.quiz.options) && lesson.quiz.options.length >= 3);
      lesson.quiz.options.forEach((option) => isText(option, 'quiz.option'));
      assert.equal(new Set(lesson.quiz.options).size, lesson.quiz.options.length);
      assert.ok(Number.isInteger(lesson.quiz.correctIndex));
      assert.ok(lesson.quiz.correctIndex >= 0 && lesson.quiz.correctIndex < lesson.quiz.options.length);
      isText(lesson.quiz.explanation, 'quiz.explanation');
    }
  }
  assert.equal(lessonCount, 15);
});

test('pakiet pobrań zawiera pięć użytecznych szablonów zgodnych z lekcjami, bez gotowych stawek', async () => {
  const directory = new URL('../public/downloads/', import.meta.url);
  let filenames = [];
  try { filenames = await readdir(directory); } catch { /* Brak pakietu to niespełnione wymaganie. */ }
  assert.deepEqual(filenames.sort(), ['brief.md', 'cennik.csv', 'follow-up.md', 'oferta.md', 'wizja-lokalna.md']);
  const requiredHeadings = {
    'brief.md': ['Potwierdzone informacje', 'Braki i pytania', 'Następny krok'],
    'wizja-lokalna.md': ['Cel spotkania', 'Obserwacje', 'Do sprawdzenia'],
    'oferta.md': ['Zakres podstawowy', 'Warianty', 'Kontrola przed wysyłką'],
    'follow-up.md': ['Pierwsze przypomnienie', 'Wyjaśnienie', 'Zakończenie kontaktu']
  };
  for (const [filename, headings] of Object.entries(requiredHeadings)) {
    const content = await readFile(new URL(filename, directory), 'utf8');
    assert.ok(content.length > 500, `${filename}: rzeczywisty formularz, nie pusty plik`);
    assert.match(content, /^# /u, filename);
    assert.match(content, /fikcyjn/iu, `${filename}: ostrzeżenie o danych ćwiczeniowych`);
    assert.match(content, /\[.*\]/u, `${filename}: pola do samodzielnego uzupełnienia`);
    for (const heading of headings) assert.ok(content.includes(heading), `${filename}: ${heading}`);
  }
  const csv = await readFile(new URL('cennik.csv', directory), 'utf8');
  const rows = csv.trim().split(/\r?\n/u).map((line) => line.split(';'));
  assert.deepEqual(rows[0], ['kod', 'opis', 'jednostka', 'cena_jednostkowa', 'podstawa_ceny', 'wersja', 'data_przegladu', 'zatwierdzil', 'status']);
  assert.ok(rows.length >= 4, 'cennik: kilka wierszy roboczych');
  for (const row of rows.slice(1)) {
    assert.equal(row.length, rows[0].length, 'cennik: spójna liczba kolumn');
    assert.equal(row[3], '', 'cennik: brak sugerowanych stawek');
    assert.equal(row[7], '', 'cennik: brak fikcyjnego zatwierdzenia');
    assert.equal(row[8], 'DO_UZUPELNIENIA');
    row.forEach((cell) => assert.doesNotMatch(cell, /^[=+@-]/u, 'bez formuł arkusza'));
  }
  const { course } = await import(courseUrl.href);
  const references = [...new Set([...JSON.stringify(course).matchAll(/\b[\w-]+\.(?:md|csv)\b/gu)].map((match) => match[0]))].sort();
  assert.deepEqual(references, filenames.sort(), 'wszystkie pobrania są nazwane w lekcjach');
});
