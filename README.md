# FatigueTester_WebApp
Django Web Application used for testing the mental fatigue of a user, which spends most of their day staring at screen.
To achieve it, application will use standarized, fatigue-assesing tests.

# Requirements
 - Modele (min 3) i formularze
    - System logowania dla użyszkodników -> loginy i hasła -> jeden do wielu LUB wiele do wielu jeśli lekarz medycyny/specjalista do nadzoru
    - Ankieta do badania subiektywnych odczuć użyszkodnika dotyczących jego stanu -> jeden do wielu
    - Wyniki testu -> jeden do wielu
        - Wynik końcowy
        - Wyniki poszczególnych podtestów
 - CSS -> Bootstrap
 - JS -> Coś się na pewno znajdzie, czy to do testów i ich obsługi, czy to do analizy wyników etc.
 - Widok z dynamiczną grafką = wykresiki
 - Eksport do .csv => wyniki testów/wykresików
 - Ewentualnie import tych danych z .csv-ki
 - Wszystkie bazy poza użytkownikami mogą mieć wyszukiwanie/filtrowanie oraz stronicowanie
 - Deploy this somewhere
