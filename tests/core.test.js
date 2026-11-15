import test from 'node:test';
import assert from 'node:assert/strict';
// Bez danych klientów: tylko identyfikatory lekcji.
test('spis zachowuje kolejność i moduł, kontynuacja wybiera nieukończoną lekcję',async()=>{
 const {flattenLessons,getNextLesson,calculateProgress}=await import(coreUrl.href);
 assert.deepEqual(flattenLessons(fixture).map(x=>[x.id,x.moduleId,x.moduleTitle]),[['l1','m1','Start'],['l2','m1','Start']]);
 assert.equal(getNextLesson(fixture,['l1']).id,'l2');
 assert.equal(getNextLesson(fixture,['l1','l2']),null);
 assert.deepEqual(calculateProgress({modules:[]},[]),{completed:0,total:0,percent:0});
});

test('quiz sprawdza indeks, odrzuca brak/tekst i nie zalicza niepoprawnej odpowiedzi',async()=>{
 const {evaluateQuiz}=await import(coreUrl.href);
 const quiz={options:['A','B'],correctIndex:1,explanation:'Sprawdź cennik.'};
 assert.deepEqual(evaluateQuiz(quiz,1),{correct:true,explanation:'Sprawdź cennik.'});
 for(const index of [0,null,undefined,'1',-1,2]) assert.equal(evaluateQuiz(quiz,index).correct,false);
});
const coreUrl=new URL('../public/core.js',import.meta.url);
const fixture={modules:[{id:'m1',title:'Start',lessons:[{id:'l1',title:'Brief'},{id:'l2',title:'Oferta'}]}]};
test('postęp i kolejna lekcja liczone z prawdziwych unikalnych ID',async()=>{
 const {calculateProgress}=await import(coreUrl.href);
 assert.deepEqual(calculateProgress(fixture,['l1','l1','unknown']),{completed:1,total:2,percent:50});
});
test('walidacja zapisu odrzuca uszkodzone wartości i usuwa obce ID',async()=>{
 const {normaliseProgress}=await import(coreUrl.href);
 for(const value of [null,undefined,'["l1"]',{},42]) assert.deepEqual(normaliseProgress(value,['l1','l2']),[]);
 assert.deepEqual(normaliseProgress(['l2','l2','other',7],['l1','l2']),['l2']);
});
