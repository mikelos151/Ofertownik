@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Zainstaluj Node.js 22 lub nowszy, aby uruchomic Ofertownik.
  pause
  exit /b 1
)
echo Otworz w przegladarce: http://127.0.0.1:4173
echo To wersja lokalna. Aby zakonczyc: Ctrl+C.
node server.js
pause
