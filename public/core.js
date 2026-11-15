export function evaluateQuiz(quiz, index) {
  return {correct:Number.isInteger(index) && index>=0 && index<quiz.options.length && index===quiz.correctIndex,explanation:quiz.explanation};
}

export function flattenLessons(course) {
  return course.modules.flatMap(module => module.lessons.map(lesson => ({...lesson,moduleId:module.id,moduleTitle:module.title})));
}

export function getNextLesson(course, completedIds) {
  const lessons=flattenLessons(course);
  const completed=new Set(normaliseProgress(completedIds,lessons.map(lesson=>lesson.id)));
  return lessons.find(lesson=>!completed.has(lesson.id)) ?? null;
}

export function normaliseProgress(value, validIds) {
  if (!Array.isArray(value)) return [];
  const allowed = new Set(validIds);
  return [...new Set(value.filter(id => typeof id === 'string' && allowed.has(id)))];
}

export function calculateProgress(course, completedIds) {
  const ids = new Set(course.modules.flatMap(module => module.lessons.map(lesson => lesson.id)));
  const completed = new Set((Array.isArray(completedIds) ? completedIds : []).filter(id => ids.has(id))).size;
  return {completed, total: ids.size, percent: ids.size ? Math.round(completed / ids.size * 100) : 0};
}
