# Przegląd projektu i granice bezpieczeństwa

## Ustalenia z niezależnego projektu
Kurs bez kont i sprzedaży, postęp w przeglądarce, fikcyjne przykłady. Lokalny profil nie jest tożsamością ani sejfem. Wszystkie lekcje są jawne; quiz lokalny jest narzędziem samooceny, nie certyfikacją. Podstawowy proces: zapytanie → brief → własne stawki → oferta zatwierdzona przez człowieka → ponowny kontakt i rzeczywisty wynik.

Rekomendacja architekta React/TypeScript została uproszczona do natywnych modułów JS i node:http: zakres nie wymaga frameworka, a brak zależności zmniejsza powierzchnię ataku i umożliwia uruchomienie bez npm install. Produkcja pozostaje oddzielnym etapem.

## Testy odbioru lokalnego
- 15 pełnych lekcji i ćwiczeń, 15 quizów, 5 działających pobrań.
- Routing, zapis oraz odtworzenie postępu; reset z potwierdzeniem.
- Uszkodzony i niedostępny localStorage nie przerywa nauki.
- Brak żądań do usług zewnętrznych oraz zewnętrznych skryptów/fontów.
- Odpowiedź quizu nie wymaga przesyłania danych klienta.
- Brak HTML injection: treści tworzone jako tekst.
- Desktop i szerokość 375px, fokus, klawiatura i stany błędne.
- Serwer bind 127.0.0.1; allowlista plików; GET/HEAD; Host allowlista; CSP/nosniff.
- Zmiana parametrów adresu nie odsłania server.js, package.json ani katalogów.

## Bramka produkcyjna — blokuje sprzedaż, nie lokalne ćwiczenia
Przed kontami i płatnościami: operator, domena i HTTPS, zarządzana tożsamość, baza z kontrolą dostępu per użytkownik, prywatny magazyn treści, płatności hostowane, weryfikacja podpisów webhooków, idempotencja, zwroty i uprawnienia, sesje/cookies/CSRF/limity, monitoring, odtwarzanie kopii, retencja oraz dokumenty prawne. Cena i status zakupu z przeglądarki nigdy nie są źródłem prawdy. Nie deklarować zgodności RODO/PCI ani niemożności kopiowania treści.

Dokument jest projektem i listą kryteriów, nie dowodem ich wykonania. Faktyczne wyniki będą w verification.md.
