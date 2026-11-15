# Ofertownik — lokalna platforma kursowa

Platforma po polsku dla właścicieli małych firm wykonawczych. Pierwszy kurs: od zapytania klienta do oferty i ponownego kontaktu. Zakres zatwierdzony: 5 modułów, 15 lekcji tekstowych z quizami i ćwiczeniami, 5 materiałów do pobrania. To nie platforma do publicznej sprzedaży.

## Uruchamianie
Wymagany Node.js 22 lub nowszy. Bez instalowania pakietów.

Windows: dwuklik `Uruchom-Ofertownik.cmd`, a następnie otwórz http://127.0.0.1:4173.

Terminal w katalogu projektu:
```
npm start
```
Serwer działa wyłącznie na 127.0.0.1. Aby zakończyć, Ctrl+C w oknie serwera. Nie zamykaj okna podczas nauki. Jeżeli port zajęty, skorzystaj z już działającej instancji lub ustaw inny PORT. Postępy są osobne dla każdego adresu, portu i profilu przeglądarki.

## Testy
```
npm test
```
Testy Node nie instalują zależności. Wyniki rzeczywistej weryfikacji są w docs/verification.md, gdy testy końcowe zostaną ukończone.

## Dane i bezpieczeństwo
- Brak rejestracji, kont, haseł, płatności, analityki, cookies śledzących i zewnętrznych usług.
- localStorage przeglądarki przechowuje tylko postęp lekcji. Usunięcie danych witryny lub reset usuwa postępy. Zapis nie synchronizuje się między urządzeniami.
- Współczesna przeglądarka z Web Locks synchronizuje postęp między kartami tego samego adresu. Bez tego API równoczesny zapis ma ograniczenia; najlepiej używać jednej karty. Przy odmowie dostępu do blokady lub pamięci aplikacja powinna przejść na jawnie oznaczony stan sesyjny, bez gwarancji trwałości.
- Ćwiczenia wykonuj na fikcyjnych danych. Nie wklejaj danych klientów do zewnętrznego AI bez ustalenia podstaw i warunków przetwarzania.
- Materiały są jawne. Zapis postępu po stronie klienta NIE jest zabezpieczeniem dostępu i może być edytowany przez użytkownika.
- AI wspomaga porządkowanie i redagowanie. Ceny liczy arkusz lub zatwierdzony kalkulator na podstawie firmowych stawek; ofertę zatwierdza człowiek.
- Instrukcje nie zastępują wiedzy instalacyjnej, projektowej, prawnej ani audytu bezpieczeństwa.

## Przed publiczną sprzedażą — poza zakresem tej wersji
Potrzebne: produkcyjna infrastruktura HTTPS, prawdziwe konta i autoryzacja serwerowa, dostawca płatności z hostowanym checkoutem, weryfikacja podpisów webhooków i idempotencja, bezpieczne sesje, odzyskiwanie dostępu, kopie i retencja, dane sprzedawcy oraz sprawdzone dokumenty prawne. Ten serwer lokalny nie realizuje tych funkcji i nie wolno traktować go jako gotowego sklepu.

## Pliki
- public/: interfejs, kurs, logika postępów i materiały.
- server.js: serwer lokalny z jawną listą dostępnych plików.
- tests/: testy jednostkowe i integracyjne.
- docs/plans/: zatwierdzony zakres.

Treści są autorskimi materiałami roboczymi do walidacji z wykonawcami. Nie użyto CRM ani bazy kontaktów użytkownika.
