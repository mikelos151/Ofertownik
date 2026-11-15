# Weryfikacja Ofertownika

## Faktyczne wykonanie
- `npm test` po poprawkach recenzji: 30 testów, 30 PASS, 0 FAIL.
- `node --check public/app.js` i `node --check server.js`: PASS.
- Kurs: dokładnie 5 modułów i 15 lekcji, wszystkie z tekstem, ćwiczeniem i quizem. Kontrola schematu i długości treści w tests/course.test.js.
- Testy serwera: GET/HEAD, content-type JavaScript, CSP, nosniff, frame denial, odmowa POST i obcego Host, odmowa traversal i dostępu do plików projektu.

## Realna przeglądarka Chromium
- Otwarto stronę lokalnie przez http://127.0.0.1:4173.
- Przejście przez 15/15 lekcji: właściwy tytuł, sekcje treści, ćwiczenie i opcje quizu; bez poziomego przepełnienia w przebiegu desktopowym.
- Quiz pierwszej lekcji: brak odpowiedzi, odpowiedź błędna oraz poprawna — właściwe komunikaty i wyjaśnienie.
- Ukończenie lekcji zapisuje wyłącznie wersję i jej ID. Odświeżenie odtwarza stan. Kontynuacja wskazuje następną nieukończoną lekcję.
- Ukończono 15/15 lekcji przez interfejs: panel pokazał 100%, zapis zawierał 15 ID, panel wskazał ukończenie kursu. Testowy postęp usunięto z klucza aplikacji.
- Reset: anulowanie pozostawia postęp; potwierdzenie pokazuje 0%.
- Wszystkie 5 plików pobrano przez HTTP: status 200 i Content-Disposition attachment. Każdy zawiera rzeczywistą treść.
- Uszkodzony JSON: czytelne ostrzeżenie, panel nadal działa.
- Niedostępny localStorage: zasymulowano w przeglądarce wyjątki getItem i setItem; aplikacja działa w pamięci sesji i jasno ostrzega. Rejestr błędów aplikacji w tym przebiegu pusty.
- Resource Timing po odświeżeniu: wyłącznie cztery lokalne zasoby styles.css, app.js, course.js, core.js; brak zewnętrznych usług.
- Szerokość mobilna 375px: start, panel, lekcja i materiały — scrollWidth=375, brak poziomego przepełnienia; spis jest zwijany.
- Obejrzano zrzuty ekranu strony startowej na telefonie, lekcji na desktopie i materiałów na telefonie. Czytelna kompozycja, bez atrap wideo i fikcyjnych statystyk. Audyt wizualny: bez gradientów, equal-weight kafli, szkła i hero w panelu. Segoe UI wybrany świadomie dla lokalnego Windows.

## Naprawa wykryta podczas QA
Po przewinięciu materiałów do dołu i przejściu do panelu zachowywał się scrollY=1043, a h1 znajdował się ponad ekranem. Przyczyna: focus na już aktywnym main nie zmieniał położenia. Dodano failing test i reset przewijania tylko przy zmianie trasy, bez skoku przy oznaczaniu lekcji. Regresja testowana automatycznie i w Chromium: scrollY=0, nagłówek widoczny.

## Dowody i ograniczenia
`browser-checks.json`, `ofertownik-qa-lessons.json`, `ofertownik-qa-mobile.json` zawierają wyniki przebiegów. Testy UI node używają lekkiego DOM harness, dlatego uzupełniono je rzeczywistą przeglądarką. Jeden asynchroniczny przebieg browser CLI przekroczył limit odpowiedzi mimo wykonania 15 przejść; wynik odczytano ponownie i zapisano. Dodatkowy zapis screenshotu przekroczył timeout — nie uznano go za udany eksport; ocenę wizualną oparto na wcześniejszych zwróconych zrzutach.

## Synchronizacja między kartami — po recenzji
Niezależny reviewer znalazł nadpisywanie postępów między kartami. Inny agent naprawił je odczytem aktualnego zapisu pod wspólnym Web Lock oraz synchronizacją przez storage event. Testy odtwarzają stary zapis, reset i równoczesne aktualizacje. Gdy Web Locks nie są dostępne, fallback odczytuje bieżący zapis przed aktualizacją, lecz nie gwarantuje atomowości równoczesnych operacji. Niedostępny zapis zachowuje stan wyłącznie w sesji.

Parent przetestował dwie rzeczywiste karty Chromium, z dostępnym navigator.locks. Ukończenie dwóch różnych lekcji zachowało dwa ID i 13% postępu w obu kartach. Reset w pierwszej karcie pokazał 0% w drugiej, nie usuwając zaznaczonej odpowiedzi quizu. Kolejne ukończenie w drugiej karcie nie przywróciło ID sprzed resetu. Rejestr error/unhandledrejection pusty. Dowód: multi-tab-check.json.

## Odmowa Web Locks
Naprawiono obsługę odrzuconego Promise i synchronicznego wyjątku request(). Przed rozpoczęciem callbacka aplikacja przechodzi w jawny tryb sesyjny bez zapisu do współdzielonego magazynu; po rozpoczęciu callbacka zgłasza błąd bez ponownego wykonywania operacji. Automatyczne testy obejmują obie sytuacje, reset i storage niedostępny. Parent zasymulował throw i reject w rzeczywistym Chromium: ukończenie działało sesyjnie, reset pokazał 0%, brak trwałego zapisu, zero error/unhandledrejection. Dowód: lock-failure-check.json.

Nie wykonano publicznego wdrożenia, testów prawdziwych płatności, kont ani audytu prawnego. Funkcje te nie istnieją w tej zatwierdzonej wersji lokalnej. Niezależne recenzje są raportowane oddzielnie po otrzymaniu wyników.
