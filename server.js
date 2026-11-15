import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const publicRoot=new URL('./public/',import.meta.url);
const files=new Map([
 ['/', ['index.html','text/html; charset=utf-8']],
 ['/index.html',['index.html','text/html; charset=utf-8']],
 ['/styles.css',['styles.css','text/css; charset=utf-8']],
 ...['app','core','course'].map(name=>[`/${name}.js`,[`${name}.js`,'text/javascript; charset=utf-8']]),
 ...['brief.md','wizja-lokalna.md','cennik.csv','oferta.md','follow-up.md'].map(name=>[`/downloads/${name}`,[`downloads/${name}`,name.endsWith('.csv')?'text/csv; charset=utf-8':'text/markdown; charset=utf-8']])
]);
const headers={
 'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
 'X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Referrer-Policy':'no-referrer',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()','Cache-Control':'no-store'
};
export function createAppServer(){
 const server=http.createServer(async(req,res)=>{
  for(const [key,value] of Object.entries(headers))res.setHeader(key,value);
  const fail=(status,message)=>{res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8'});res.end(req.method==='HEAD'?undefined:message);};
  if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(req.headers.host??'')){fail(403,'Niedozwolony host.');return;}
  if(req.method!=='GET'&&req.method!=='HEAD'){res.setHeader('Allow','GET, HEAD');fail(405,'Niedozwolona metoda.');return;}
  let pathname;
  try{pathname=decodeURIComponent((req.url??'').split('?')[0]);}catch{fail(400,'Nieprawidłowy adres.');return;}
  const file=files.get(pathname);
  if(!file){fail(404,'Nie znaleziono.');return;}
  try{
   const body=await readFile(new URL(file[0],publicRoot));
   if(pathname.startsWith('/downloads/'))res.setHeader('Content-Disposition',`attachment; filename="${file[0].split('/').at(-1)}"`);
   res.writeHead(200,{'Content-Type':file[1],'Content-Length':body.length});res.end(req.method==='HEAD'?undefined:body);
  }catch{fail(500,'Nie można odczytać pliku aplikacji.');}
 });
 server.requestTimeout=10000;server.headersTimeout=10000;server.maxHeadersCount=40;
 return server;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const port=Number(process.env.PORT??4173);
 if(!Number.isInteger(port)||port<1024||port>65535){console.error('PORT musi być liczbą 1024–65535.');process.exitCode=1;}
 else{
  const server=createAppServer();
  server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Port ${port} jest zajęty. Ustaw inny PORT.`:'Nie można uruchomić serwera.');process.exitCode=1;});
  server.listen(port,'127.0.0.1',()=>console.log(`Ofertownik: http://127.0.0.1:${port} (tylko lokalnie)`));
 }
}
