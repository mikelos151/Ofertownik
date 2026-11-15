# Ofertownik — zaakceptowany zakres lokalny

Użytkownik zatwierdził lokalną, działającą wersję: strona oferty, panel kursanta, 15 lekcji tekstowych z ćwiczeniami i quizami, postępy na urządzeniu, materiały do pobrania. Bez kont, płatności, zbierania danych i deklaracji gotowości do publicznej sprzedaży. Nie dotykamy CRM ani danych użytkownika.

## Produkt
Platforma nauki dla właścicieli małych firm wykonawczych (instalacje/remonty/ogrody). Pierwszy kurs: Od zapytania do oferty i ponownego kontaktu. Szkice wspomagane AI, ceny z własnego cennika i zatwierdzenie przez człowieka. Żadnych obietnic przychodów.

## Interfejs
Główna powierzchnia Learn: czytelny spis modułów i przestrzeń lekcji. Strona oferty osobna, panel z przyciskiem kontynuacji i prawdziwymi postępami. Jasny papierowy interfejs, ciemny granat, ciepły pomarańcz, typografia Segoe UI (świadomy wybór czytelnego lokalnego kroju na Windows), mocne nagłówki i numeracja zamiast dekoracyjnych kafli. Responsive, przyciski 44px, klawiatura i focus. Bez zdjęć stockowych, atrap odtwarzacza wideo, fikcyjnych opinii.

## Architektura
Statyczne HTML/CSS + moduły JavaScript (vanilla), własny serwer Node na 127.0.0.1. Brak runtime zależności i usług zewnętrznych. LocalStorage przechowuje jedynie ID ukończonych lekcji i ćwiczenia na fikcyjnych danych, z jasnym ostrzeżeniem; zalecane nie zapisywać notatek zawierających dane klientów. Wersjonowany i walidowany zapis, odporność na uszkodzony/pełny magazyn. Reset z potwierdzeniem. Kurs i pliki jawne, nie są paywallem. Wszystkie lekcje dostępne, brak udawanego zabezpieczenia.

## Umowa modułów
- public/course.js: export const course = {id,title,description,modules:[{id,title,lessons:[{id,title,duration,sections:[{heading,paragraphs:[string]}],exercise:{prompt,placeholder},quiz:{question,options:[string],correctIndex,explanation}}]}]}. Dokładnie 5 modułów x 3 lekcje, unikalne IDs, kompletne teksty, żadnych HTML stringów.
- public/core.js: czyste funkcje flattenLessons(course), normaliseProgress(value, validIds), calculateProgress(course, completedIds), getNextLesson(course, completedIds). Logika quizów w funkcji evaluateQuiz(quiz,index).
- public/app.js: import core.js i course.js; hash routes #start, #panel, #lekcja/<id>, #materialy. Semantyczny DOM; treści dynamiczne przez textContent.
- public/styles.css: bez inline skryptów i zewnętrznych fontów.
- public/downloads/: 5 plików rzeczywistych szablonów .csv/.md, bez cudzych danych.
- server.js: statyczna allowlista, poprawny content-type, CSP, nosniff, frame denial, bez listowania i path traversal, loopback binding, GET/HEAD tylko. Użycie node:http.

## Plan wykonania — TDD w pionowych krokach
1. Test zachowania postępów RED, implementacja core GREEN. Następnie test quizu, test uszkodzonych danych i kolejnej lekcji.
2. Test schematu danych RED, 15 pełnych lekcji i materiały GREEN.
3. Test serwera RED, bezpieczny serwer i statyczne routy GREEN.
4. UI: failing browser smoke dla routingu, lekcji i postępów; implementacja, testy przeglądarkowe: quiz dobry/zły, ukończenie, odświeżenie, notatki jeśli są, materiały i reset. Desktop i mobile.
5. Niezależny przegląd zgodności oraz bezpieczeństwa/jakości; poprawki z testami.
6. Powtórz wszystkie testy, sprawdź ekran zrzutem, uruchom serwer dla użytkownika, otwórz panel preview. Raport z faktycznymi wynikami i ograniczeniami produkcyjnymi.

## Kryteria odbioru
15/15 kompletnych lekcji, 5 modułów, każdy quiz i ćwiczenie, 5 działających pobrań, rzeczywisty zapis postępów, bez błędów konsoli, brak przepełnienia mobile, dobre stany błędne, czytelne oznaczenie wersji lokalnej bez płatności, przejście testów Node i browser. Źródłowy projekt w C:/Users/sandr/Ofertownik, przenośny ZIP na końcu.
