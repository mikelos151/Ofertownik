export const course = {
  id: 'ofertownik',
  title: 'Od zapytania do oferty i ponownego kontaktu',
  description: 'Praktyczny kurs dla małej firmy wykonawczej: uporządkuj zapytania, ustal zakres, korzystaj z zatwierdzonego cennika i przygotuj sprawdzony przez człowieka szkic oferty. To nauka organizacji pracy, nie porady techniczne ani prawne. Kurs nie gwarantuje sprzedaży. Ćwicz wyłącznie na fikcyjnych danych, bez informacji o klientach.',
  modules: [
    {
      id: 'zapytanie',
      title: 'Zapytanie i brief',
      lessons: [
        {
          id: 'jedno-miejsce',
          title: 'Jedno miejsce na każde zapytanie',
          duration: '8 min',
          sections: [
            {
              heading: 'Zamień wiadomość w zadanie',
              paragraphs: [
                'Zapytanie może przyjść telefonicznie, przez formularz albo w wiadomości. Kanał nie powinien decydować o tym, czy ktoś otrzyma odpowiedź. Zacznij od jednej listy spraw, którą rzeczywiście przeglądasz. W małej firmie wystarczy prosty rejestr, jeśli każda sprawa ma identyfikator, status i właściciela. Nie buduj rozbudowanego systemu przed ustaleniem podstaw. Celem nie jest zbieranie wszystkiego, lecz możliwość odpowiedzi na pytanie: co powinno wydarzyć się dalej? Zapis wykonaj po rozmowie, zanim przejdziesz do kolejnego zadania.'
              ]
            },
            {
              heading: 'Oddziel fakty od domysłów',
              paragraphs: [
                'Zapisuj źródło kontaktu, ogólny rodzaj prac, obszar realizacji i oczekiwany termin. Jeśli rozmówca czegoś nie podał, wpisz „do ustalenia”, zamiast uzupełniać brak własnym przypuszczeniem. Prośba o kontakt nie oznacza zaakceptowanego zakresu ani zamówienia. Przy każdym zapytaniu dodaj następny krok i termin jego wykonania. Przykładowy status „nowe” powinien oznaczać brak pierwszej oceny, a nie nieokreśloną kolejkę. Jedna osoba odpowiada za ruch sprawy, nawet jeśli później konsultuje ją z zespołem. Unikaj równoległych notatek, których nikt nie uzgadnia.'
              ]
            },
            {
              heading: 'Ćwicz bez danych klientów',
              paragraphs: [
                'W tym panelu pracuj na wymyślonej sprawie oznaczonej „ĆWICZENIE”, bez nazwiska, telefonu, adresu i zdjęć klienta. Notatka kursowa nie jest firmowym CRM ani miejscem przechowywania dokumentacji. Lokalny zapis w przeglądarce nie zastępuje firmowych zasad dostępu i kopii roboczych. Na koniec dnia sprawdź sprawy bez właściciela oraz bez kolejnego kroku. To prostsze i bardziej użyteczne niż ocenianie procesu po liczbie odebranych wiadomości. Uporządkowany rejestr pomaga zauważyć zaniedbanie, ale sam nie zapewnia pozyskania zlecenia. Liczy się wykonana czynność, a nie kolor statusu.'
              ]
            }
          ],
          exercise: {
            prompt: 'Opisz fikcyjne zapytanie w sześciu polach: ID, źródło, ogólny zakres, brakujące informacje, właściciel i następny krok z terminem. Nie wpisuj danych klienta.',
            placeholder: 'ĆWICZENIE-01 | źródło: wiadomość | zakres: do opisania | braki: … | właściciel: rola | następny krok i termin: …'
          },
          quiz: {
            question: 'Co najlepiej zapobiega pozostawieniu zapytania bez obsługi?',
            options: ['Zapis całej rozmowy bez żadnych ustaleń.', 'Właściciel sprawy oraz konkretny następny krok z terminem.', 'Wysłanie ceny przed poznaniem zakresu.'],
            correctIndex: 1,
            explanation: 'Właściciel i termin następnego kroku wskazują odpowiedzialność. Sam zapis wiadomości nie uruchamia działania.'
          }
        },
        {
          id: 'pierwsza-odpowiedz',
          title: 'Pierwsza odpowiedź i wstępna kwalifikacja',
          duration: '9 min',
          sections: [
            {
              heading: 'Potwierdź odbiór, nie obiecuj realizacji',
              paragraphs: [
                'Pierwsza odpowiedź ma wyjaśnić, czy firma może sensownie przejść do zebrania informacji. Potwierdź otrzymanie zapytania i nazwij kolejny krok. Nie deklaruj ceny, dostępności ekipy ani terminu rozpoczęcia, jeśli nie zostały sprawdzone. Krótka wiadomość może zawierać podziękowanie, dwa pytania i informację, kiedy wrócisz z odpowiedzią. Podawaj tylko termin odpowiedzi, którego możesz dotrzymać. Gdy musisz go zmienić, uprzedź o tym i zaproponuj nowy. To organizacja komunikacji, nie obietnica wyniku handlowego.'
              ]
            },
            {
              heading: 'Sprawdź dopasowanie sprawy',
              paragraphs: [
                'Wstępna kwalifikacja dotyczy rodzaju usług, obszaru działania i ogólnej dostępności, a nie oceny człowieka. Zapytaj, co ma zostać zrobione, gdzie w przybliżeniu i w jakim horyzoncie czasowym. Jeśli firma nie wykonuje danego rodzaju prac, powiedz to wprost. Nie składaj przypadkowej oferty tylko po to, aby zamknąć zadanie w rejestrze. Informację o budżecie traktuj jako oczekiwanie rozmówcy, nie dowód kosztu realizacji. Brak budżetu nie pozwala dopisać dowolnej ceny ani pominąć ustalenia zakresu.'
              ]
            },
            {
              heading: 'Zakończ rozmowę decyzją procesową',
              paragraphs: [
                'Możliwe zakończenia to przejście do briefu, prośba o uzupełnienie lub uprzejma informacja o niedopasowaniu. Każde wymaga krótkiego uzasadnienia i aktualizacji rejestru. Gdy czegoś nie wiesz, zapisz pytanie dla właściwej osoby zamiast improwizować poradę techniczną. Kurs nie zastępuje oceny wykonawczej ani konsultacji prawnej. Nie wykorzystuj automatycznych szkiców do deklarowania możliwości firmy bez sprawdzenia. Przed wysłaniem przeczytaj wiadomość oczami odbiorcy: czy wie, co ma zrobić i kiedy może oczekiwać reakcji? Zachowaj spokojny ton, bez nacisku i bez obietnic, że szybka odpowiedź zapewni podpisanie zlecenia. W ćwiczeniu wybierz wyraźnie jedną z trzech ścieżek i uzasadnij wybór informacjami z fikcyjnego zapytania.'
              ]
            }
          ],
          exercise: {
            prompt: 'Napisz pierwszą odpowiedź na fikcyjne zapytanie: potwierdzenie, dwa pytania kwalifikujące i sprawdzony przez Ciebie termin kolejnej odpowiedzi. Bez ceny i obietnicy realizacji.',
            placeholder: 'Dziękuję za wiadomość. Żeby ustalić kolejny krok, proszę o… Odpowiem po sprawdzeniu…'
          },
          quiz: {
            question: 'Klient prosi od razu o datę rozpoczęcia, a grafik nie został sprawdzony. Co zrobić?',
            options: ['Podać najbliższy poniedziałek.', 'Zadeklarować termin sugerowany przez AI.', 'Zapowiedzieć sprawdzenie grafiku i określić termin odpowiedzi.'],
            correctIndex: 2,
            explanation: 'Możesz zobowiązać się do odpowiedzi, nie do niezweryfikowanego terminu realizacji.'
          }
        },
        {
          id: 'brief',
          title: 'Brief, który pokazuje braki',
          duration: '10 min',
          sections: [
            {
              heading: 'Zbierz materiał do decyzji',
              paragraphs: [
                'Brief to uporządkowane pytania, a nie gotowa oferta. Pobierz plik brief.md i potraktuj go jako formularz roboczy. Zapisz oczekiwany rezultat, ogólny zakres, obszar realizacji, preferowany czas oraz to, kto potwierdza ustalenia. Pytaj prostym językiem o potrzeby i granice prac. Nie wymagaj od rozmówcy specjalistycznej diagnozy. Jeśli podaje własne rozwiązanie techniczne, odnotuj je jako oczekiwanie do oceny przez kompetentną osobę, nie jako potwierdzoną instrukcję wykonania. Oddziel życzenie od przyjętej decyzji.'
              ]
            },
            {
              heading: 'Nadaj informacjom status',
              paragraphs: [
                'Każdą ważną informację oznacz jako potwierdzoną, wymagającą sprawdzenia albo brakującą. Dodaj źródło i datę ustalenia, aby było jasne, skąd pochodzi zapis. Zdanie „chyba taki sam zakres jak wcześniej” nie opisuje zakresu wystarczająco precyzyjnie. Wróć z pytaniem zamiast przepisywać niejasność do oferty. Nie zbieraj danych niezwiązanych z przygotowaniem sprawy. W notatce kursowej stosuj fikcyjne oznaczenia i ogólne lokalizacje. Rzeczywiste dokumenty pozostaw w narzędziach zatwierdzonych w firmie, zgodnie z jej zasadami dostępu.'
              ]
            },
            {
              heading: 'Ustal próg gotowości',
              paragraphs: [
                'Przed kolejnym etapem przejrzyj listę braków. Oznacz, które informacje zatrzymują przygotowanie ceny, a które można doprecyzować później bez udawania pewności. Jeśli potrzebna jest wizja lokalna, brief powinien określać jej cel i pytania do rozstrzygnięcia. Wyślij krótkie podsumowanie do potwierdzenia i zaznacz nierozstrzygnięte punkty. Brak odpowiedzi nie jest potwierdzeniem. Dobra wersja briefu ma numer lub datę, dzięki czemu zespół nie wycenia poprzedniej rozmowy. Gotowość oznacza dostateczne dane do następnego kroku, nie absolutną wiedzę o całym zleceniu. Zamknij etap decyzją: uzupełnienie, wizja albo przekazanie zakresu do sprawdzenia. Każda z tych decyzji powinna mieć właściciela i termin.'
              ]
            }
          ],
          exercise: {
            prompt: 'Na podstawie brief.md przygotuj fikcyjny brief z trzema informacjami potwierdzonymi, dwoma brakami oraz decyzją, co musi zostać ustalone przed wyceną.',
            placeholder: 'Wersja briefu: … | potwierdzone: … | do ustalenia: … | blokuje wycenę: … | kolejny krok: …'
          },
          quiz: {
            question: 'Jak zapisać informację, której klient nie potwierdził?',
            options: ['Jako założenie do sprawdzenia, z pytaniem i właścicielem wyjaśnienia.', 'Jako fakt, jeśli wydaje się prawdopodobna.', 'Pominąć ją bez odnotowania braku.'],
            correctIndex: 0,
            explanation: 'Jawne oznaczenie niepewności zapobiega przedstawieniu przypuszczenia jako uzgodnionego zakresu.'
          }
        }
      ]
    },
    {
      id: 'wizja',
      title: 'Wizja lokalna i zakres',
      lessons: [
        {
          id: 'przygotowanie-wizji',
          title: 'Przygotuj wizję z konkretnym celem',
          duration: '9 min',
          sections: [
            {
              heading: 'Spotkanie ma rozstrzygnąć pytania',
              paragraphs: [
                'Wizja lokalna nie powinna być przypadkową rozmową, po której nadal brakuje tych samych danych. Zacznij od briefu i wypisz kwestie, których nie da się rozstrzygnąć na jego podstawie. Określ oczekiwany rezultat spotkania: na przykład potwierdzony opis zakresu, lista niejasności albo ustalenie, jakie dane musi jeszcze dostarczyć klient. Nie traktuj samej obecności na miejscu jako automatycznej akceptacji wszystkich warunków. Sprawdzenie możliwości technicznych należy do odpowiednio kompetentnej osoby, nie do modelu językowego ani formularza kursowego.'
              ]
            },
            {
              heading: 'Uzgodnij organizację',
              paragraphs: [
                'Przed spotkaniem potwierdź termin, sposób kontaktu, osoby uczestniczące i ogólny plan rozmowy. Ustal, czy będzie obecna osoba mogąca potwierdzić oczekiwania dotyczące zakresu. Poproś tylko o materiały potrzebne do zaplanowanego celu. Jeżeli przewidujesz dokumentowanie zdjęciami, najpierw uzgodnij sposób wykonania i wykorzystania materiałów według zasad firmy. Nie przesyłaj ich do AI w ramach ćwiczenia. Kurs nie rozstrzyga zasad prawnych ani technicznych prowadzenia wizji. W przypadku wątpliwości przekaż pytanie osobie odpowiedzialnej za dany obszar.'
              ]
            },
            {
              heading: 'Weź listę, nie gotowe odpowiedzi',
              paragraphs: [
                'Szablon wizja-lokalna.md zawiera miejsca na obserwacje, wypowiedzi klienta oraz sprawy do sprawdzenia. Przygotuj pytania przed wyjazdem, ale pozostaw przestrzeń na nowe informacje. Nie wpisuj z góry wyniku, którego oczekujesz. Po spotkaniu każda niejasność powinna mieć właściciela i termin wyjaśnienia. Jeśli wizja nie pozwoliła przygotować wyceny, nazwij brakujące dane wprost. Umów następny krok zamiast obiecywać ofertę na podstawie niepełnego materiału. Dobrze zaplanowane spotkanie pozwala uporządkować pracę, lecz nie gwarantuje ani kompletności oceny, ani sprzedaży. W ćwiczeniu organizujesz rozmowę, nie projektujesz sposobu wykonania robót. Pamiętaj też o czasie potrzebnym na spisanie i sprawdzenie notatki po powrocie.'
              ]
            }
          ],
          exercise: {
            prompt: 'Korzystając z wizja-lokalna.md, przygotuj cel fikcyjnej wizji, cztery pytania wynikające z braków briefu oraz oczekiwany dokument po spotkaniu.',
            placeholder: 'Cel: … | pytania: 1. … 2. … 3. … 4. … | wynik spotkania: … | właściciel notatki: …'
          },
          quiz: {
            question: 'Co jest najlepszym punktem wyjścia do planu wizji lokalnej?',
            options: ['Gotowa cena skopiowana z innego zlecenia.', 'Lista niewyjaśnionych pytań z briefu.', 'Przypadkowa lista porad wygenerowanych przez AI.'],
            correctIndex: 1,
            explanation: 'Wizja powinna pomóc rozstrzygnąć konkretne braki, a nie potwierdzać z góry przyjętą cenę.'
          }
        },
        {
          id: 'notatka-z-wizji',
          title: 'Notatka: obserwacja, ustalenie, pytanie',
          duration: '10 min',
          sections: [
            {
              heading: 'Nie mieszaj trzech rodzajów informacji',
              paragraphs: [
                'Po spotkaniu rozdziel to, co zaobserwowano, od tego, co powiedział klient, oraz od tego, co nadal wymaga sprawdzenia. Dzięki temu czytelnik notatki nie potraktuje wypowiedzi rozmówcy jako wyniku oceny wykonawczej. Opisuj stan rzeczy neutralnie, bez dopisywania przyczyn i rozwiązań, których nikt nie potwierdził. Jeśli firma zbiera dane do wyceny, oznacz ich źródło i status sprawdzenia. Ten kurs dotyczy porządku informacji, nie sposobu wykonywania pomiarów ani diagnozowania obiektu.'
              ]
            },
            {
              heading: 'Przepisz ustalenia w języku zakresu',
              paragraphs: [
                'Zamiast ogólnego „wszystko jak rozmawialiśmy” wypisz elementy oczekiwanej usługi oraz granice uzgodnienia. Zaznacz, które pozycje są jedynie wariantem do rozważenia. Jeżeli pojawiła się zmiana względem briefu, nie nadpisuj jej bez śladu: wskaż nową wersję i opisz różnicę. Materiały pomocnicze powinny dawać się powiązać z konkretnym punktem notatki. W ćwiczeniu zastąp prawdziwe zdjęcia opisem „fikcyjny materiał A”. Nie przenoś do panelu danych osobowych ani dokumentacji klientów, nawet jeśli ułatwiłoby to wykonanie zadania.'
              ]
            },
            {
              heading: 'Zamknij pętlę potwierdzenia',
              paragraphs: [
                'Przygotuj krótkie podsumowanie do potwierdzenia i listę otwartych pytań. Każde pytanie powinno zawierać osobę odpowiedzialną oraz oczekiwany termin odpowiedzi. Jeśli odpowiedź zmienia zakres, wróć do aktualizacji notatki, zamiast dopisywać ustalenie wyłącznie w komunikatorze. Nie wysyłaj szkicu z pozornie ostatecznymi kwotami, gdy kluczowe dane wciąż są niepewne. Potwierdzenie podsumowania dotyczy opisanych ustaleń i nie zastępuje pozostałych formalności firmy. Na koniec odnotuj, co można przekazać do wyceny, a co ją blokuje. Taka notatka ma służyć następnej osobie w procesie, nie tylko pamięci autora. Sprawdź jej zrozumiałość, czytając ją bez zaglądania do historii rozmowy.'
              ]
            }
          ],
          exercise: {
            prompt: 'Napisz fikcyjną notatkę w trzech kolumnach myślowych: obserwacja, wypowiedź klienta, pytanie do sprawdzenia. Dodaj właściciela pytania i wpływ braku odpowiedzi na wycenę.',
            placeholder: 'Obserwacja: … | wypowiedź: … | do sprawdzenia: … | odpowiada: … | bez odpowiedzi nie wyceniam: …'
          },
          quiz: {
            question: 'Klient opisuje przypuszczalną przyczynę problemu. Jak ująć to w notatce?',
            options: ['Jako potwierdzoną diagnozę.', 'Usunąć informację bez śladu.', 'Jako wypowiedź klienta wymagającą właściwej oceny.'],
            correctIndex: 2,
            explanation: 'Źródło i status informacji muszą pozostać widoczne. Wypowiedź nie staje się diagnozą przez zapisanie jej w formularzu.'
          }
        },
        {
          id: 'granice-zakresu',
          title: 'Zakres podstawowy, warianty i wyłączenia',
          duration: '11 min',
          sections: [
            {
              heading: 'Nazwij to, co rzeczywiście oferujesz',
              paragraphs: [
                'Zakres podstawowy opisuje usługi, które mają znaleźć się w konkretnej wersji oferty. Każda pozycja powinna być zrozumiała dla odbiorcy oraz możliwa do powiązania z danymi do wyceny. Nie używaj słowa „kompleksowo” jako zamiennika listy prac. Jeśli określenie jest niejednoznaczne, dopisz wyjaśnienie albo pytanie. Nie projektuj rozwiązań technicznych w ramach tego ćwiczenia. Potrzebne oceny przekaż właściwej osobie, a do zakresu wprowadzaj wyłącznie sprawdzone ustalenia. Dobra lista ma ograniczać domysły po obu stronach.'
              ]
            },
            {
              heading: 'Oddziel opcję od podstawy',
              paragraphs: [
                'Wariant to alternatywa wymagająca świadomego wyboru, a nie ukryty fragment sumy. Oznacz go osobno i pokaż, czy zastępuje pozycję podstawową, czy stanowi dodatek. Wyłączenia opisuj spokojnie i konkretnie: czego dana wersja nie obejmuje. Nie przenoś do nich przypadkowych klauzul z internetu. Kurs nie dostarcza porad prawnych ani gotowych warunków umownych. Jeżeli treść wymaga takiej oceny, zaznacz potrzebę konsultacji. Informacje handlowe muszą pozostać zgodne z rzeczywistym zakresem i zasadami firmy, nie z wygodą szablonu.'
              ]
            },
            {
              heading: 'Wersjonuj zmianę, zanim zmienisz cenę',
              paragraphs: [
                'Gdy klient dodaje nowe oczekiwanie, zapisz zmianę względem zatwierdzonej wersji. Sprawdź, czy wymaga nowych danych, ponownej oceny lub aktualizacji kalkulacji. Nie dopisuj pozycji do wysłanej oferty bez przygotowania kolejnej wersji i opisania różnic. Do wyceny przekaż jedną aktualną listę podstawy, opcji oraz wyłączeń. Przy każdym nierozstrzygniętym elemencie pokaż status zamiast zerowej ceny, która może wyglądać na bezpłatną usługę. Na zakończenie zadaj sobie pytanie: czy inna osoba rozpozna, co dokładnie policzyć i czego nie doliczać? Jeśli nie, zakres wymaga doprecyzowania przed przejściem dalej. W rejestrze wskaż autora i datę wersji, aby można było powiązać ją z właściwą kalkulacją.'
              ]
            }
          ],
          exercise: {
            prompt: 'Dla fikcyjnej usługi wypisz trzy pozycje zakresu podstawowego, jeden wyraźnie oddzielony wariant i dwa wyłączenia. Nadaj wersję i wskaż brak blokujący wycenę.',
            placeholder: 'Zakres v1: … | opcja, dodatek czy zamiennik: … | nie obejmuje: … | przed wyceną trzeba ustalić: …'
          },
          quiz: {
            question: 'Jak przedstawić element, który nie ma jeszcze ustalonego zakresu ani ceny?',
            options: ['Oznaczyć jako nierozstrzygnięty i wskazać potrzebne ustalenie.', 'Wpisać zero i zaliczyć do całości.', 'Ukryć go pod słowem „kompleksowo”.'],
            correctIndex: 0,
            explanation: 'Zero może sugerować bezpłatne wykonanie. Jawny status braku nie udaje uzgodnionej pozycji.'
          }
        }
      ]
    },
    {
      id: 'wycena',
      title: 'Wycena z zatwierdzonego cennika',
      lessons: [
        {
          id: 'cennik-zrodlowy',
          title: 'Jedno zatwierdzone źródło cen',
          duration: '10 min',
          sections: [
            {
              heading: 'Szablon nie zawiera stawek rynkowych',
              paragraphs: [
                'Plik cennik.csv jest pustym szablonem organizacyjnym, a nie rekomendacją poziomu cen. Własne stawki przygotowuje i zatwierdza osoba odpowiedzialna w firmie. Nie kopiuj kwot z losowych ofert ani odpowiedzi AI. Potrzebujesz rozpoznawalnego kodu usługi, opisu, jednostki, ceny jednostkowej oraz jednoznacznej podstawy cenowej. Dodaj wersję, datę przeglądu i osobę zatwierdzającą. Bez tych informacji identyczne liczby mogą oznaczać różne rzeczy. Pusta cena oznacza brak gotowości do użycia pozycji, nie usługę za darmo.'
              ]
            },
            {
              heading: 'Dopasuj pozycję, nie tylko nazwę',
              paragraphs: [
                'Przed użyciem stawki porównaj opis pozycji z zakresem sprawy. Podobna nazwa nie dowodzi, że cena obejmuje te same czynności. Sprawdź jednostkę i opis tego, co zawiera pozycja. Jeśli dopasowanie budzi wątpliwości, zatrzymaj kalkulację i poproś o decyzję. Brakująca pozycja powinna trafić do zatwierdzenia, zamiast otrzymać kwotę wymyśloną dla wygody. Model językowy może pomóc uporządkować nazwy, lecz nie ustala poprawnej stawki, sposobu rozliczenia ani zasad podatkowych. Te kwestie wymagają właściwego źródła i odpowiedzialnej osoby.'
              ]
            },
            {
              heading: 'Zachowaj ślad wersji',
              paragraphs: [
                'Każda kalkulacja powinna wskazywać wersję cennika, z której korzysta. Gdy ceny się zmieniają, nie nadpisuj bez śladu podstawy wcześniej przygotowanej oferty. Zaznacz, czy sprawa wymaga przeliczenia i ponownego zatwierdzenia. W ćwiczeniu nie musisz wpisywać prawdziwych stawek firmy: możesz opisać brak i ścieżkę jego uzupełnienia albo użyć kwot wyraźnie oznaczonych jako fikcyjne. Nie pokazuj ich potem jako cen rynkowych. Celem jest zrozumienie kontroli źródła, a nie ustalenie uniwersalnego cennika dla wykonawców. Przed użyciem arkusza sprawdź także, jak program odczytał separator, liczby i puste pola. To import danych roboczych, nie automatyczne zatwierdzenie ich poprawności.'
              ]
            }
          ],
          exercise: {
            prompt: 'Otwórz cennik.csv i opisz, jakie pola muszą zostać uzupełnione oraz kto zatwierdza stawkę. Przy jednej fikcyjnej pozycji wskaż, co blokuje jej użycie. Nie wpisuj cen klientów.',
            placeholder: 'Kod ćwiczeniowy: … | jednostka: … | podstawa ceny: do zatwierdzenia | brak: … | decyzję podejmuje: …'
          },
          quiz: {
            question: 'W zatwierdzonym cenniku brakuje potrzebnej pozycji. Co zrobić?',
            options: ['Poprosić AI o typową stawkę i wysłać ofertę.', 'Oznaczyć brak i przekazać pozycję do wyceny oraz zatwierdzenia.', 'Użyć pierwszej pozycji o podobnej nazwie.'],
            correctIndex: 1,
            explanation: 'Brak zatwierdzonej ceny wymaga decyzji w firmie. Ani AI, ani podobieństwo nazw nie są źródłem zatwierdzenia.'
          }
        },
        {
          id: 'kalkulacja',
          title: 'Od zakresu do jawnej kalkulacji',
          duration: '12 min',
          sections: [
            {
              heading: 'Połącz zakres z pozycjami',
              paragraphs: [
                'Zacznij kalkulację od aktualnej wersji zakresu, nie od kwoty, którą chciałbyś pokazać w ofercie. Każdej pozycji przypisz kod z zatwierdzonego cennika, właściwą jednostkę i sprawdzoną ilość. Dane ilościowe muszą pochodzić z ustalonego źródła; kurs nie podaje metod pomiaru ani norm wykonawczych. Gdy źródło jest niepewne, oznacz pozycję jako niegotową. Osobno zapisz warianty i dodatki, aby nie włączyć ich przypadkiem do podstawy. Czytelna kalkulacja pokazuje drogę od ustalenia do wartości, nie tylko końcową sumę.'
              ]
            },
            {
              heading: 'Policz w narzędziu, sprawdź znaczenie',
              paragraphs: [
                'Wartość pozycji wynika z ilości oraz zatwierdzonej ceny jednostkowej, zgodnie z zasadami kalkulacji firmy. Obliczenia wykonuj w sprawdzonym arkuszu lub narzędziu, a nie traktuj odpowiedzi modelu językowego jako kalkulatora. Kontroluj format liczb, jednostki, zaokrąglenia i to, czy wszystkie kwoty mają tę samą podstawę cenową. Nie mieszaj różnych sposobów prezentacji ceny bez wyjaśnienia. Jeśli sposób rozliczenia wymaga decyzji księgowej lub prawnej, skieruj pytanie do właściwej osoby. Ten materiał nie określa stawek podatkowych ani warunków umownych.'
              ]
            },
            {
              heading: 'Nie ukrywaj luk w sumie',
              paragraphs: [
                'Po obliczeniu porównaj listę kalkulacji z listą zakresu. Szukaj brakujących pozycji, zdublowanych dodatków i opcji doliczonych mimo braku wyboru. Każda korekta powinna mieć opis i osobę zatwierdzającą; nie zmieniaj stawki ręcznie tylko po to, aby uzyskać oczekiwaną sumę. Jeśli nadal brakuje danych, kalkulacja pozostaje robocza. Cena końcowa nie staje się wiarygodna przez staranny układ dokumentu. Zapisz wersję pliku, datę i źródła użytych danych. Przed przekazaniem do oferty sprawdź również zgodność nazw i jednostek, aby odbiorca otrzymał ten sam zakres, który rzeczywiście policzono. W ćwiczeniu możesz pozostawić kwoty puste, jeśli celem jest wykrycie braków uniemożliwiających zatwierdzenie.'
              ]
            }
          ],
          exercise: {
            prompt: 'Rozpisz trzy fikcyjne pozycje kalkulacji: kod, źródło ilości, jednostka, wersja cennika i status. Dla jednej pozycji celowo zostaw brak i napisz, dlaczego nie wolno jeszcze wydać sumy końcowej.',
            placeholder: 'Pozycja: … | ilość ze źródła: … | jednostka: … | cennik: … | status: … | blokada zatwierdzenia: …'
          },
          quiz: {
            question: 'Dlaczego wariantów nie należy bezwarunkowo doliczać do podstawy?',
            options: ['Ponieważ wariant zawsze powinien być bezpłatny.', 'Ponieważ AI musi najpierw wybrać wariant.', 'Ponieważ wymagają odrębnego wyboru i jasnego oznaczenia.'],
            correctIndex: 2,
            explanation: 'Opcja i zakres podstawowy to różne części propozycji. Łączenie ich bez informacji zaciemnia rzeczywistą cenę wybranego zakresu.'
          }
        },
        {
          id: 'kontrola-ceny',
          title: 'Kontrola i zatwierdzenie wyceny',
          duration: '10 min',
          sections: [
            {
              heading: 'Zrób przerwę między liczeniem a zgodą',
              paragraphs: [
                'Osoba przygotowująca kalkulację zna własne skróty myślowe, dlatego może nie zauważyć braków oczywistych dla kolejnego czytelnika. W miarę możliwości oddziel przygotowanie od zatwierdzenia. W jednoosobowej firmie zastosuj osobny przegląd z listą kontrolną i wróć do źródeł, zamiast tylko ponownie przeczytać sumę. Zatwierdzenie musi dotyczyć konkretnej wersji, zakresu oraz cennika. Ogólne „wygląda dobrze” bez wskazania dokumentu nie wystarcza do ustalenia, co rzeczywiście zostało sprawdzone. Sama obecność podpisu w szablonie niczego nie weryfikuje.'
              ]
            },
            {
              heading: 'Sprawdź cztery warstwy',
              paragraphs: [
                'Pierwsza warstwa to kompletność zakresu: każda uzgodniona pozycja musi mieć odzwierciedlenie. Druga to zgodność źródeł: aktualny cennik, właściwa jednostka i sprawdzona ilość. Trzecia obejmuje arytmetykę oraz spójność podstawy cenowej, kontrolowane w odpowiednim narzędziu. Czwarta to czytelność dla odbiorcy: co obejmuje suma, a co jest oddzielnym wariantem. Jeżeli któraś warstwa budzi wątpliwości, zanotuj problem i wróć do autora danych. Nie rozwiązuj niejasności dopisywaniem założeń w ostatniej chwili. Kontrola powinna zostawić konkretny wynik, nie tylko wrażenie pewności.'
              ]
            },
            {
              heading: 'Odmów pozornego zatwierdzenia',
              paragraphs: [
                'Możliwe wyniki przeglądu to zatwierdzona wersja albo lista poprawek z osobami odpowiedzialnymi. Nie używaj statusu „zatwierdzona warunkowo”, jeśli odbiorca mógłby potraktować go jako zgodę na wysyłkę mimo nierozstrzygniętej ceny. Po poprawce ponownie sprawdź zmienione elementy i zależne sumy. Przekazując dane do szkicu oferty, oznacz je jako zamknięte źródło, którego AI nie może samodzielnie zmieniać. Jeżeli zakres zmieni się później, zgoda wymaga ponownej oceny. Proces nie gwarantuje braku wszystkich błędów, ale daje jasny punkt odpowiedzialności przed kontaktem z klientem. W ćwiczeniu wskaż dokładnie, co zostało sprawdzone, zamiast deklarować ogólną gotowość całego dokumentu.'
              ]
            }
          ],
          exercise: {
            prompt: 'Stwórz listę kontroli fikcyjnej wyceny z czterech warstw. Wskaż jeden błąd, decyzję o wstrzymaniu oraz warunek ponownego zatwierdzenia konkretnej wersji.',
            placeholder: 'Wersja: … | zakres: … | źródła: … | obliczenia: … | czytelność: … | wstrzymuję, ponieważ: …'
          },
          quiz: {
            question: 'Po zatwierdzeniu wyceny klient rozszerzył zakres. Czy poprzednia zgoda wystarcza?',
            options: ['Nie, zmiana wymaga oceny i zatwierdzenia aktualnej wersji.', 'Tak, jeśli tytuł dokumentu się nie zmienił.', 'Tak, jeśli AI uzna zmianę za niewielką.'],
            correctIndex: 0,
            explanation: 'Zgoda dotyczy konkretnej wersji. Nowy zakres może zmienić pozycje i sumy, więc wymaga ponownego sprawdzenia.'
          }
        }
      ]
    },
    {
      id: 'oferta-ai',
      title: 'Szkic AI i oferta sprawdzona przez człowieka',
      lessons: [
        {
          id: 'prompt-do-szkicu',
          title: 'Zleć AI porządkowanie, nie podejmowanie decyzji',
          duration: '11 min',
          sections: [
            {
              heading: 'Najpierw przygotuj bezpieczne wejście',
              paragraphs: [
                'Model językowy może pomóc ułożyć tekst, ale nie jest źródłem prawdy o zleceniu. Do ćwiczenia przygotuj wyłącznie fikcyjny brief, sprawdzony opis zakresu i oznaczoną jako ćwiczeniową kalkulację. Usuń nazwiska, telefony, adresy, fotografie i inne informacje pozwalające rozpoznać klienta. Nie zakładaj, że narzędzie automatycznie chroni dane zgodnie z wymaganiami firmy. W rzeczywistej pracy korzystanie z usług AI wymaga odrębnych zasad i zatwierdzonego sposobu przetwarzania informacji. Lokalny kurs nie wysyła żadnych zapytań do modelu za Ciebie.'
              ]
            },
            {
              heading: 'Nazwij granice zadania',
              paragraphs: [
                'Dobry prompt określa odbiorcę, cel, materiały źródłowe i oczekiwaną strukturę. Poleć przygotowanie szkicu według oferta.md, bez dopisywania faktów. Zastrzeż, że ceny, zakres i terminy mogą pochodzić wyłącznie z przekazanych, zatwierdzonych danych. Brakujące informacje mają trafić na osobną listę pytań, a nie zostać uzupełnione domysłem. Nie zlecaj AI wyboru technologii, określania warunków prawnych ani obiecywania rezultatu handlowego. Wymagaj neutralnego języka oraz rozdzielenia podstawy i wariantów. Taka instrukcja ułatwia przegląd, lecz nie gwarantuje poprawności odpowiedzi.'
              ]
            },
            {
              heading: 'Pozostaw decyzję po swojej stronie',
              paragraphs: [
                'Oznacz wynik jako szkic do weryfikacji. Nie podłączaj go do automatycznej wysyłki i nie zakładaj, że brak ostrzeżeń oznacza zgodność ze źródłami. Jeśli model proponuje „ulepszenie” zakresu lub ceny, potraktuj to jako nieuprawnioną zmianę, nie inicjatywę handlową. Zachowaj wejściową wersję materiałów, aby móc porównać każde ważne zdanie. Możesz poprosić model o wskazanie pytań i niejasności, ale sam sprawdź, czy są zasadne. Ćwiczenie polega na napisaniu polecenia, nie wymaga konta AI ani wprowadzania jakichkolwiek danych klienta do zewnętrznego narzędzia. Jeśli nie używasz modelu, ten sam szablon może posłużyć do ręcznego przygotowania tekstu.'
              ]
            }
          ],
          exercise: {
            prompt: 'Napisz prompt do szkicu oferty na fikcyjnych danych. Uwzględnij zakaz zmiany cen, zakresu i terminów, listę braków oraz obowiązkowy przegląd człowieka. Nie musisz wysyłać promptu do AI.',
            placeholder: 'Przygotuj wyłącznie szkic według oferta.md. Źródła: fikcyjny brief i zatwierdzona kalkulacja ćwiczeniowa. Nie dodawaj… Braki wypisz…'
          },
          quiz: {
            question: 'Jakie zadanie można bezpiecznie powierzyć AI w tym procesie?',
            options: ['Samodzielne ustalenie cen i wysłanie oferty.', 'Uporządkowanie szkicu na podstawie dostarczonych danych, do przeglądu człowieka.', 'Potwierdzenie dostępności ekipy bez sprawdzania grafiku.'],
            correctIndex: 1,
            explanation: 'AI pomaga w redakcji. Dane, decyzje i zatwierdzenie wysyłki pozostają po stronie człowieka.'
          }
        },
        {
          id: 'redakcja-oferty',
          title: 'Sprawdź szkic zdanie po zdaniu',
          duration: '12 min',
          sections: [
            {
              heading: 'Płynny język nie jest dowodem',
              paragraphs: [
                'Szkic może wyglądać przekonująco, a jednocześnie zawierać nieuzgodniony termin, dodatkową usługę albo błędną cenę. Zacznij od porównania treści ze źródłami, nie od poprawiania stylu. Przy każdym twierdzeniu o zakresie, kwocie i terminie ustal, skąd pochodzi. Jeśli nie ma potwierdzonego źródła, usuń zdanie albo oznacz brak do wyjaśnienia przed wysyłką. Nie pozwól, aby profesjonalne brzmienie zastąpiło sprawdzenie. W tym procesie odpowiedź AI pozostaje materiałem roboczym niezależnie od liczby wcześniejszych udanych prób.'
              ]
            },
            {
              heading: 'Porównaj tekst i liczby oddzielnie',
              paragraphs: [
                'Najpierw sprawdź, czy opis odpowiada aktualnemu zakresowi i nie sugeruje usług z listy wyłączeń. Następnie porównaj wszystkie kwoty, jednostki i sumy z zatwierdzoną kalkulacją. Nie polegaj na ponownym zapytaniu tego samego modelu, czy wynik jest poprawny. Wróć do dokumentów i narzędzia obliczeniowego. Zwróć uwagę na opcje, które mogły zostać opisane jak część podstawy. Usuń dopisane deklaracje dostępności, obietnice oszczędności i niepotwierdzone cechy firmy. Nie dodawaj fikcyjnych opinii, klientów ani statystyk, aby tekst wyglądał wiarygodniej.'
              ]
            },
            {
              heading: 'Dopiero potem uprość przekaz',
              paragraphs: [
                'Gdy treść zgadza się ze źródłami, skróć zdania i uporządkuj nagłówki. Odbiorca powinien łatwo rozpoznać przedmiot oferty, podstawę ceny, osobne warianty, istotne braki oraz kolejny krok. Szablon oferta.md to pomoc redakcyjna, nie zestaw gotowych postanowień prawnych. Kwestie wymagające oceny specjalisty przekaż do właściwej konsultacji. Na końcu sprawdź, czy usunięto oznaczenia robocze i czy dokument ma jednoznaczną wersję. Jeżeli nie udało się wyjaśnić ważnej informacji, zatrzymaj wysyłkę. Akceptacja człowieka ma oznaczać wykonanie kontroli, nie samo kliknięcie przycisku lub przeczytanie pierwszego akapitu. W ćwiczeniu zapisz wykrytą zmianę i źródło poprawki, aby sprawdzenie dało się odtworzyć.'
              ]
            }
          ],
          exercise: {
            prompt: 'Oceń fikcyjny szkic: „Obejmujemy również wszystkie dodatki i zaczynamy w poniedziałek”. Źródła nie potwierdzają dodatków ani terminu. Zapisz dwa błędy i bezpieczną wersję roboczą z pytaniami.',
            placeholder: 'Błąd zakresu: … | błąd terminu: … | poprawka do szkicu: … | do potwierdzenia przed wysyłką: …'
          },
          quiz: {
            question: 'Model dopisał dodatkową usługę, aby oferta brzmiała pełniej. Co zrobić?',
            options: ['Zostawić, skoro poprawia wrażenie.', 'Dodać cenę z pamięci i wysłać.', 'Usunąć nieuzgodniony element albo wrócić do oceny i zatwierdzenia zakresu.'],
            correctIndex: 2,
            explanation: 'Redakcja nie może rozszerzać zobowiązań. Nowy zakres wymaga osobnej decyzji, danych i odpowiedniej kontroli ceny.'
          }
        },
        {
          id: 'wysylka-oferty',
          title: 'Wysyłka konkretnej wersji i jasny następny krok',
          duration: '9 min',
          sections: [
            {
              heading: 'Sprawdź paczkę, nie tylko treść',
              paragraphs: [
                'Przed wysłaniem upewnij się, że załącznik lub dokument odpowiada wersji zatwierdzonej po kontroli. Podobne nazwy plików łatwo pomylić, dlatego stosuj spójne oznaczenie sprawy, daty i wersji. Zweryfikuj odbiorcę w firmowym narzędziu i sprawdź, czy nie dołączono cudzych materiałów albo roboczych notatek. W tym kursie nie wysyłasz prawdziwej oferty; ćwiczysz na fikcyjnym identyfikatorze. Sprawdzenie adresata i dokumentu jest odrębną czynnością, której nie zastąpi poprawny język wiadomości. Nie przekazuj szkicu do automatycznej wysyłki.'
              ]
            },
            {
              heading: 'Ułatw przeczytanie propozycji',
              paragraphs: [
                'Wiadomość przewodnia powinna krótko wskazywać, czego dotyczy dokument, jaką wersję przesyłasz i na jaki następny krok czekasz. Możesz zaprosić do pytań lub poprosić o wybór oznaczonego wariantu, jeśli rzeczywiście jest potrzebny. Nie wprowadzaj nowych ustaleń wyłącznie w treści wiadomości bez aktualizacji oferty. Nie stosuj sztucznego pośpiechu ani deklaracji ograniczonej dostępności, której nie sprawdzono. Terminy i warunki podawaj tylko na podstawie zatwierdzonych informacji. Szablon redakcyjny nie zastępuje zasad firmy ani konsultacji dotyczących formalnego znaczenia dokumentu.'
              ]
            },
            {
              heading: 'Zapisz fakt wysyłki i dalsze działanie',
              paragraphs: [
                'Po wysłaniu odnotuj datę, kanał, identyfikator wersji i osobę odpowiedzialną. Sam status „oferta wysłana” nie mówi, czy odbiorca ją przeczytał ani zaakceptował. Nie interpretuj technicznego potwierdzenia doręczenia jako decyzji o współpracy. Ustal plan ponownego kontaktu zgodnie z uzgodnieniami i realną potrzebą sprawy. Jeśli wiadomość wróciła z błędem, zapisz nieudaną próbę zamiast udawać skuteczne przekazanie. W rejestrze powinno być jasne, czy czekasz na pytania, wybór wariantu czy potwierdzenie konkretnego ustalenia. Kolejny krok ma pomóc kontynuować rozmowę, nie tworzyć presji na zakup. Zachowaj dokładnie tę wersję, którą przekazano, aby późniejsze pytania odnosiły się do wspólnego dokumentu.'
              ]
            }
          ],
          exercise: {
            prompt: 'Napisz wiadomość przewodnią do fikcyjnej oferty v2 oraz wpis do rejestru: kanał, data ćwiczeniowa, wersja, właściciel i plan kolejnego kontaktu. Nie podawaj prawdziwego adresata.',
            placeholder: 'Przesyłam ofertę ĆWICZENIE-01 v2 dotyczącą… Proszę o… Rejestr: kanał … | wersja … | następny krok …'
          },
          quiz: {
            question: 'Co oznacza status „oferta wysłana”?',
            options: ['Odnotowano przekazanie konkretnej wersji, ale nie akceptację klienta.', 'Klient zaakceptował zakres i cenę.', 'Sprawa nie wymaga już kolejnego kroku.'],
            correctIndex: 0,
            explanation: 'Wysyłka jest zdarzeniem w procesie. Nie dowodzi przeczytania, akceptacji ani uzyskania zlecenia.'
          }
        }
      ]
    },
    {
      id: 'crm-follow-up',
      title: 'CRM, follow-up i przegląd procesu',
      lessons: [
        {
          id: 'prosty-crm',
          title: 'CRM oparty na następnej czynności',
          duration: '10 min',
          sections: [
            {
              heading: 'Status opisuje stan, nie życzenie',
              paragraphs: [
                'CRM może być prostym rejestrem, jeśli wszyscy rozumieją znaczenie jego pól. Przyjmij kilka stanów związanych z rzeczywistym procesem: nowe, zbieranie danych, wycena, oferta wysłana, oczekiwanie na odpowiedź oraz zamknięte. Ustal, jakie zdarzenie pozwala przejść do kolejnego stanu. Nie oznaczaj sprawy jako gotowej do oferty, gdy brak zatwierdzonej kalkulacji. Nie oznaczaj jej jako wygranej tylko dlatego, że rozmówca odpowiedział uprzejmie. Każdy status musi dać się uzasadnić zapisem konkretnej czynności albo potwierdzonej decyzji.'
              ]
            },
            {
              heading: 'Następny krok jest ważniejszy od koloru',
              paragraphs: [
                'Przy aktywnej sprawie zapisz właściciela, kolejne działanie i termin. Działanie powinno być wykonalne: „zapytać o wybór wariantu” jest czytelniejsze niż „pilnować klienta”. Termin dotyczy pracy zespołu, nie obowiązku odpowiedzi odbiorcy, jeśli niczego takiego nie uzgodniono. Dołącz odwołanie do aktualnego briefu i wersji oferty, ale nie kopiuj bez potrzeby całej dokumentacji do każdego pola. Firma powinna ustalić dostęp i miejsce przechowywania rzeczywistych materiałów. Panel kursu nie jest systemem do obsługi klientów ani bezpiecznym archiwum ich danych.'
              ]
            },
            {
              heading: 'Przeglądaj wyjątki, nie tylko listę',
              paragraphs: [
                'Regularnie wyszukuj sprawy bez właściciela, bez terminu oraz z przeterminowanym zadaniem. W pierwszej kolejności ustal, co je blokuje i czy nadal są aktywne. Zamknięcie może oznaczać rezygnację, brak dopasowania albo zakończenie rozmowy, nie wyłącznie sprzedaż. Powód zapisuj rzeczowo i tylko wtedy, gdy go znasz. Nie dopisuj „za drogo”, jeśli klient po prostu nie odpowiedział. Historia powinna odróżniać obserwację od przypuszczenia, tak samo jak notatka z wizji. Dzięki temu przegląd procesu opiera się na faktach, a nie na atrakcyjnych etykietach. W ćwiczeniu sprawdź, czy ktoś nieznający historii potrafiłby wykonać następny krok bez dopytywania autora wpisu.'
              ]
            }
          ],
          exercise: {
            prompt: 'Zaprojektuj trzy fikcyjne wpisy CRM: zbieranie danych, oferta wysłana i zamknięte. Każdemu aktywnemu przypisz właściciela i następny krok z terminem; przy zamkniętym podaj znany powód lub „nieustalony”.',
            placeholder: 'ID: ĆWICZENIE-… | status: … | zdarzenie potwierdzające: … | właściciel: … | następny krok: … | termin: …'
          },
          quiz: {
            question: 'Klient nie odpowiedział. Jaki powód przegranej wolno wpisać?',
            options: ['„Konkurencja była tańsza”, bo to prawdopodobne.', '„Powód nieustalony”, jeśli nie ma potwierdzonej informacji.', '„Klient niezainteresowany jakością”, według domysłu.'],
            correctIndex: 1,
            explanation: 'Brak odpowiedzi nie ujawnia powodu. Rejestr powinien zachować niepewność zamiast dopisywać wygodne wyjaśnienie.'
          }
        },
        {
          id: 'follow-up',
          title: 'Follow-up, który pomaga podjąć kolejny krok',
          duration: '9 min',
          sections: [
            {
              heading: 'Kontakt ma mieć powód',
              paragraphs: [
                'Ponowny kontakt nie polega na wysyłaniu tej samej prośby coraz częściej. Sprawdź, co uzgodniono po przekazaniu oferty i czy odbiorca prosił o konkretny termin odpowiedzi. Jeśli nie, zaplanuj rozsądne przypomnienie związane ze sprawą, bez narzucania uniwersalnej sekwencji. Powodem może być pytanie o brakujące ustalenie, zaoferowanie wyjaśnienia wariantu albo sprawdzenie, czy dokument dotarł. Nie zakładaj, że cisza oznacza zgodę, odmowę lub pozwolenie na nieograniczoną liczbę wiadomości. Reaguj na wyraźną prośbę o zakończenie kontaktu.'
              ]
            },
            {
              heading: 'Napisz krótko i konkretnie',
              paragraphs: [
                'W pliku follow-up.md znajdziesz dwa szkielety wiadomości do samodzielnego uzupełnienia. Każdy powinien odnosić się do konkretnej sprawy i wersji oferty, zawierać jedno jasne pytanie oraz pozostawiać przestrzeń na odmowę lub odłożenie decyzji. Nie używaj fikcyjnego ograniczenia dostępności ani obietnicy rabatu, którego nikt nie zatwierdził. Jeśli klient zgłasza zmianę zakresu, wróć do briefu i wyceny zamiast negocjować na podstawie starej sumy. AI może pomóc skrócić tekst, ale nie powinno wybierać momentu ani samodzielnie wysyłać wiadomości.'
              ]
            },
            {
              heading: 'Zapisz wynik i uszanuj zakończenie',
              paragraphs: [
                'Po kontakcie odnotuj datę, kanał oraz rzeczywisty wynik: odpowiedź, brak odpowiedzi, prośbę o wyjaśnienie albo zakończenie rozmowy. Gdy druga strona nie chce kolejnych wiadomości, zakończ follow-up i nie uruchamiaj automatycznych przypomnień do wysyłki. Jeśli po rozsądnych próbach nie ma reakcji, podejmij świadomą decyzję o zamknięciu lub odłożeniu sprawy zgodnie z zasadami firmy. Nie zostawiaj jej na zawsze jako pilnego zadania. Ta lekcja nie określa prawnych zasad komunikacji; wątpliwości dotyczące kontaktu i danych wymagają właściwej konsultacji. Dobra wiadomość ułatwia odpowiedź, lecz nie gwarantuje sprzedaży ani nawet reakcji. W ćwiczeniu wybierz jeden cel kontaktu i sprawdź, czy pytanie rzeczywiście do niego prowadzi.'
              ]
            }
          ],
          exercise: {
            prompt: 'Na podstawie follow-up.md napisz jedno fikcyjne przypomnienie z jednym pytaniem i możliwością zakończenia rozmowy. Dodaj regułę, kiedy nie będziesz już ponawiać kontaktu.',
            placeholder: 'Wracam do oferty ĆWICZENIE-01 v2… Czy potrzebne jest…? Jeśli temat jest zamknięty… Nie ponawiam, gdy…'
          },
          quiz: {
            question: 'Odbiorca prosi, aby nie kontaktować się ponownie. Co zrobić?',
            options: ['Wysłać jeszcze ostatnią wiadomość z rabatem.', 'Zmienić kanał i próbować dalej.', 'Zakończyć follow-up oraz zaktualizować zadania w rejestrze.'],
            correctIndex: 2,
            explanation: 'Plan działań musi uwzględniać prośbę o zakończenie kontaktu. Automatyczne zadania nie mogą być powodem do jej ignorowania.'
          }
        },
        {
          id: 'przeglad-procesu',
          title: 'Przegląd procesu i wdrożenie małym krokiem',
          duration: '11 min',
          sections: [
            {
              heading: 'Sprawdź jakość pracy, nie obietnicę wyniku',
              paragraphs: [
                'Po przejściu kursu nie potrzebujesz od razu nowego systemu ani automatyzacji całej firmy. Zacznij od sprawdzenia, czy w przykładowej sprawie da się odtworzyć drogę od zapytania do wysłanej wersji oferty. Czy brief pokazuje braki? Czy notatka rozróżnia obserwacje i ustalenia? Czy cena ma zatwierdzone źródło? Czy szkic został sprawdzony przez człowieka? Te pytania oceniają proces, na który masz wpływ. Nie utożsamiaj starannie wypełnionej checklisty z gwarancją pozyskania zlecenia albo bezbłędnej realizacji.'
              ]
            },
            {
              heading: 'Mierz tylko to, co potrafisz wyjaśnić',
              paragraphs: [
                'Możesz obserwować liczbę spraw bez kolejnego kroku, czas oczekiwania na brakujące dane lub liczbę korekt przed wysyłką. Zanim porównasz okresy, ustal definicję każdego zdarzenia i sprawdź kompletność zapisów. Mała liczba przypadków nie uzasadnia mocnych wniosków o skuteczności handlowej. Nie dopisuj brakujących wyników ani historii klientów, żeby wykres był pełniejszy. Jeśli nie znasz przyczyny zamknięcia, zachowaj oznaczenie „nieustalona”. Obserwacje mają pomóc wybrać usprawnienie, nie tworzyć pozór naukowego dowodu lub reklamowej statystyki. Wyniki opisuj wraz z ograniczeniami danych.'
              ]
            },
            {
              heading: 'Wybierz jedną zmianę i właściciela',
              paragraphs: [
                'Na pierwszy tydzień wybierz jeden nawyk, na przykład wpisywanie następnego kroku po każdej rozmowie. Określ osobę odpowiedzialną, moment przeglądu i prosty warunek sprawdzenia wykonania. Dopiero gdy nawyk działa, rozważ kolejny element. Zachowaj pięć pobranych szablonów jako materiały do dostosowania, nie gotową dokumentację prawną lub techniczną. Ćwiczenia kursowe trzymaj bez danych klientów, a rzeczywistą pracę prowadź w zatwierdzonych narzędziach firmy. Na koniec wykonaj pełną fikcyjną sprawę: brief, plan wizji, źródła ceny, kontrolowany szkic i plan follow-up. Jeśli któryś etap jest niejasny, wróć do odpowiedniej lekcji, zamiast automatyzować brakującą decyzję. Ukończenie kursu jest zakończeniem nauki w panelu, nie certyfikatem kompetencji wykonawczych.'
              ]
            }
          ],
          exercise: {
            prompt: 'Zapisz plan wdrożenia jednego nawyku: co zmieniasz, kto odpowiada, kiedy sprawdzisz wynik i na jakim zapisie oprzesz ocenę. Następnie wskaż brak w swojej fikcyjnej sprawie końcowej.',
            placeholder: 'Nawyk: … | właściciel: … | termin przeglądu: … | dowód wykonania: … | ograniczenia oceny: … | brak w sprawie końcowej: …'
          },
          quiz: {
            question: 'Jaki jest rozsądny pierwszy krok po kursie?',
            options: ['Wdrożyć jeden konkretny nawyk z właścicielem i terminem sprawdzenia.', 'Zautomatyzować wysyłkę wszystkich szkiców bez kontroli.', 'Obiecać wzrost sprzedaży na podstawie samego ukończenia lekcji.'],
            correctIndex: 0,
            explanation: 'Mała, sprawdzalna zmiana pozwala ocenić jakość wykonania. Ukończenie kursu nie gwarantuje efektów sprzedażowych.'
          }
        }
      ]
    }
  ]
};
