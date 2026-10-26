# Mój Budżet

Polska aplikacja PWA: React 19, TypeScript, Vite, Tailwind CSS 4. Bez kont, backendu i płatnych usług.

Instrukcja publikacji przez GitHub i Vercel oraz instalacji na iPhonie: [PUBLIKACJA.md](./PUBLIKACJA.md). Projekt jest przygotowany lokalnie; nie został opublikowany.

## Uruchomienie w Windows

W VS Code wybierz **Terminal → Nowy terminal**. Jeśli masz Node.js 22.12 lub nowszy:

```powershell
npm install
npm run dev
```

Otwórz adres wyświetlony w terminalu (zwykle http://localhost:5173). Zatrzymanie: Ctrl+C.

W przygotowanym projekcie zależności i lokalny Node.js są już zainstalowane. Najprostsze uruchomienie w terminalu VS Code:

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/start.ps1
```

Możesz również wybrać **Terminal → Uruchom zadanie → Uruchom Mój Budżet**. Zadanie **Sprawdź aplikację** uruchamia testy i kompilację; **Podgląd PWA** serwuje zbudowaną aplikację.

Jeśli korzystasz z lokalnego Node.js pobranego do tego projektu:

```powershell
$env:Path = "$PWD\.tools\node-v22.16.0-win-x64;" + $env:Path
npm.cmd install
npm.cmd run dev
```

## Sprawdzenie i wersja produkcyjna

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Podgląd produkcyjny: http://localhost:4173. PWA i tryb offline działają po zbudowaniu, nie w trybie deweloperskim. Po pierwszym pełnym załadowaniu i aktywacji service workera aplikacja może działać offline. Do hostingu wystarczy zawartość folderu `dist`, serwowana przez HTTPS. Przy publikacji w podfolderze należy dostosować `base`, `start_url` i ścieżki ikon.

## Instalacja na iPhonie

1. Udostępnij wersję produkcyjną na hostingu z HTTPS.
2. Otwórz jej adres w Safari.
3. Wybierz **Udostępnij → Dodaj do ekranu początkowego → Dodaj**.

Adres localhost na komputerze nie jest dostępny pod tym samym adresem na telefonie. Podgląd po lokalnym adresie IP może służyć do sprawdzenia wyglądu w tej samej sieci Wi-Fi, ale HTTP przez IP nie zapewnia działania PWA offline. iPhone wymaga HTTPS.

## Korzystanie

1. Ustaw budżet dla wybranego miesiąca.
2. Dodaj kategorie i limity. Ich suma nie może przekraczać budżetu.
3. Dodawaj wydatki przyciskiem + lub z karty kategorii.
4. Edytuj i usuwaj wpisy w historii. Możesz też zmieniać ich kategorię i datę w ramach miesiąca.
5. Strzałki przy miesiącu pozwalają prowadzić niezależne miesięczne plany.

Wydatek może przekroczyć limit; aplikacja pokaże ujemne saldo. Kategorię zawierającą wydatki można usunąć dopiero po przeniesieniu lub usunięciu wpisów. Nowy miesiąc zaczyna się od pustego planu. Motyw jasny/ciemny wybierzesz ikoną w prawym górnym rogu.

Dane są zapisywane w localStorage danej przeglądarki i adresu. Nie synchronizują się między urządzeniami ani przeglądarkami. Usunięcie danych witryny lub tryb prywatny mogą spowodować ich utratę. Przycisk „Kopia danych” pobiera JSON do zachowania; podstawowa wersja nie ma jeszcze importu kopii. Przy błędzie odczytu aplikacja nie nadpisuje istniejącego zapisu.

## Struktura

- `src/budget.ts` — model, obliczenia w groszach, walidacja zapisu.
- `src/App.tsx` — widoki, formularze i zapis lokalny.
- `src/style.css` — responsywny interfejs i motywy, Tailwind CSS.
- `src/budget.test.ts` — testy obliczeń i danych.
- `vite.config.ts` — konfiguracja Vite i generowania service workera PWA.

Model zapisu posiada wersję, dzięki czemu można później wprowadzić migracje danych. Kolejne rozszerzenia mogą obejmować import kopii, cykliczne wydatki, raporty i przenoszenie planu na następny miesiąc.
