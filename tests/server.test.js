import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import {syncBuiltinESMExports} from 'node:module';
const serverUrl=new URL('../server.js',import.meta.url);
async function withServer(fn){
 const {createAppServer}=await import(serverUrl.href);
 const server=createAppServer();
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 try{return await fn(server.address().port);} finally{server.closeAllConnections(); await new Promise(resolve=>server.close(resolve));}
}
function request(port,path,method='GET',host='127.0.0.1'){
 return new Promise((resolve,reject)=>{
  const req=http.request({host:'127.0.0.1',port,path,method,headers:{host:`${host}:${port}`}},res=>{
   const chunks=[];res.on('data',chunk=>chunks.push(chunk));res.on('end',()=>resolve({status:res.statusCode,headers:res.headers,body:Buffer.concat(chunks).toString()}));
  }); req.on('error',reject);req.end();
 });
}
test('serwer odrzuca zapis, obcy Host i traversal oraz chroni odpowiedzi nagłówkami',()=>withServer(async port=>{
 const res=await request(port,'/core.js');
 assert.match(res.headers['content-security-policy'],/default-src 'self'/);
 assert.equal(res.headers['x-content-type-options'],'nosniff');
 assert.equal(res.headers['x-frame-options'],'DENY');
 assert.equal((await request(port,'/core.js','POST')).status,405);
 assert.equal((await request(port,'/core.js','GET','evil.example')).status,403);
 for(const path of ['/../package.json','/%2e%2e/package.json','/%2e%2e%5cpackage.json','/.git/config','/server.js','/downloads/','/%ZZ']){
   const bad=await request(port,path); assert.ok([400,404].includes(bad.status),`${path}: ${bad.status}`);assert.doesNotMatch(bad.body,/"name": "ofertownik"/);
 }
 const head=await request(port,'/core.js','HEAD');assert.equal(head.status,200);assert.equal(head.body,'');
}));
test('błąd odczytu nie ujawnia szczegółów, zachowuje CSP i pustą odpowiedź HEAD',async()=>{
 const original=fs.readFile;
 fs.readFile=async()=>{throw Object.assign(new Error('PRIVATE internal path and error'),{code:'EACCES'});};
 syncBuiltinESMExports();
 try{
  await withServer(async port=>{
   for(const method of ['GET','HEAD']){
    const res=await request(port,'/',method);
    assert.equal(res.status,500);
    assert.match(res.headers['content-security-policy'],/default-src 'self'/);
    assert.doesNotMatch(res.body,/PRIVATE|EACCES|internal path/);
    if(method==='HEAD')assert.equal(res.body,'');
   }
  });
 }finally{fs.readFile=original;syncBuiltinESMExports();}
});
test('serwer podaje prawdziwy moduł JS i poprawny content-type',()=>withServer(async port=>{
 const res=await request(port,'/core.js');
 assert.equal(res.status,200);
 assert.match(res.headers['content-type'],/javascript/);
 assert.match(res.body,/calculateProgress/);
}));
