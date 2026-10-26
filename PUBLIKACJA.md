# Publikacja MójBudżet na Vercel i instalacja na iPhonie

Projekt jest przygotowany do publikacji, ale nie został opublikowany. Wygląd, funkcje aplikacji i mechanizm zapisu danych pozostają bez zmian.

## 1. Zachowaj dotychczasowe dane

Jeżeli korzystasz już z aplikacji lokalnie, kliknij w niej **Kopia danych** i zachowaj pobrany plik JSON poza folderem projektu. To kopia bezpieczeństwa do zachowania — obecna wersja nie ma funkcji jej importowania.

Dane budżetu pozostają w pamięci przeglądarki na urządzeniu, na którym zostały wprowadzone. Nie są częścią kodu ani publikacji. Dane z `localhost:5173`, `localhost:4173` i domeny Vercel są osobne. Publikacja nie usuwa poprzedniego zapisu, ale nowy adres na iPhonie rozpocznie z pustym budżetem. Nie usuwaj danych starej witryny. Jeśli chcesz przenieść już wprowadzone dane bez ręcznego przepisywania, najpierw potrzebne będzie osobne dodanie importu kopii.

Docelowo korzystaj ze stałego adresu produkcyjnego Vercel, np. `https://twoja-nazwa.vercel.app`. Adresy podglądowe poszczególnych publikacji mogą mieć inną domenę, a więc osobną pamięć danych. Safari i aplikacja z ekranu początkowego także mogą mieć osobne dane — po instalacji prowadź budżet w aplikacji z ikony. Przeglądarka/system może usunąć pamięć witryny, dlatego zachowuj kopie okresowo.

## 2. Załóż konta i zainstaluj GitHub Desktop

1. Utwórz konto lub zaloguj się na [GitHub](https://github.com).
2. Pobierz i zainstaluj [GitHub Desktop](https://desktop.github.com/download/).
3. Uruchom GitHub Desktop i wybierz **Sign in to GitHub.com**. Dokończ logowanie w przeglądarce, a potem wróć do programu.
4. Jeśli program pyta o dane autora zmian, wpisz swoje imię lub nazwę użytkownika oraz adres e-mail konta GitHub.

Nie musisz osobno instalować Git ani wpisywać poleceń Git.

## 3. Dodaj istniejący folder projektu do GitHub Desktop

1. W GitHub Desktop wybierz **File → Add local repository…**.
2. Wybierz folder `C:\Users\kamil\Desktop\MojBudzet` i kliknij **Add repository**.
3. Jeśli program informuje, że folder nie jest repozytorium Git, kliknij link **create a repository** w tym komunikacie.
4. W formularzu sprawdź: **Name: MojBudzet**, **Local path: C:\Users\kamil\Desktop**. Wynikowa ścieżka musi być dokładnie `C:\Users\kamil\Desktop\MojBudzet`, bez dodatkowego folderu `MojBudzet` w środku.
5. Nie zaznaczaj inicjowania README. **Git ignore** i **License** pozostaw jako **None** — projekt ma już własny plik `.gitignore`. Kliknij **Create repository**.
6. Sprawdź listę plików w zakładce **Changes**. Kod, `public`, `package.json`, `package-lock.json`, `vite.config.ts`, `vercel.json` i `index.html` powinny zostać uwzględnione. Folderów `node_modules`, `.tools`, `dist` i plików kopii budżetu nie powinno być na liście — wyklucza je `.gitignore`.
7. Jeśli są niezapisane zmiany, wpisz w polu **Summary**: `Przygotowanie aplikacji do Vercel` i kliknij **Commit to main** (nazwa gałęzi może być inna). Jeżeli utworzenie repozytorium zapisało już wszystkie pliki i widzisz **No local changes**, przejdź dalej.
8. Kliknij **Publish repository**. Pozostaw zaznaczone **Keep this code private**, aby repozytorium było prywatne. Kliknij ponownie **Publish repository**.

Repozytorium przechowuje kod. Nie wysyłaj do niego pobranych kopii swojego budżetu. Prywatne repozytorium nie oznacza prywatnej strony — opublikowany adres aplikacji może być publicznie dostępny. Nie udostępnia on danych budżetu przechowywanych lokalnie na Twoim urządzeniu.

## 4. Utwórz projekt na Vercel

1. Otwórz [Vercel](https://vercel.com) i zaloguj się przez GitHub (**Continue with GitHub**).
2. W panelu wybierz **Add New… → Project**.
3. W części **Import Git Repository** znajdź repozytorium **MojBudzet** i kliknij **Import**.
4. Jeżeli go nie widać, wybierz konfigurację uprawnień GitHub (**Adjust GitHub App Permissions** lub **Configure GitHub App**) i udostępnij Vercel to repozytorium. Następnie wróć do importu.
5. Sprawdź poniższe ustawienia. Konfiguracja projektu powinna ustawić je automatycznie:

| Pole | Wartość |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | katalog główny repozytorium, `./` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | brak — nic nie dodawaj |

6. W ustawieniach **Node.js Version** wybierz **22.x**, jeśli pole jest dostępne. Jeśli nie widzisz go przy imporcie, znajdziesz je w **Project → Settings → Build and Deployment → Node.js Version**; po ewentualnej zmianie wykonaj **Redeploy**. Nie wybieraj Node 18 ani 20 dla tego projektu.
7. Dopiero gdy chcesz opublikować aplikację, kliknij **Deploy**. Zaczekaj na status **Ready**. Jeżeli publikacja się nie powiedzie, otwórz **Build Logs**; nie zmieniaj losowo ustawień.
8. Otwórz produkcyjny adres z sekcji **Domains**, np. `https://moj-budzet-twoja-nazwa.vercel.app`. Zachowaj ten adres. Nie używaj na co dzień adresów kolejnych podglądów/commitów.

Vercel buduje aplikację ze źródeł. Nie wysyłaj ręcznie folderu `dist`, lokalnego Node.js ani `node_modules`.

## 5. Sprawdź opublikowaną aplikację

1. Otwórz stały adres produkcyjny online. Sprawdź, czy zaczyna się od **https://**.
2. Upewnij się, że widzisz aplikację, a nie formularz logowania do Vercel. Jeżeli widzisz ochronę wdrożenia, sprawdź **Settings → Deployment Protection** dla środowiska produkcyjnego. PWA musi móc pobrać swoje pliki bez logowania do Vercel.
3. Odśwież stronę. Powinna nadal otwierać aplikację, bez błędu 404.
4. Otwórz pod tym samym adresem `/manifest.webmanifest`, np. `https://twoja-nazwa.vercel.app/manifest.webmanifest`. Powinien pojawić się dokument z nazwą „Mój Budżet”, a nie strona aplikacji.
5. Sprawdź `/icon-192.png`, `/icon-512.png` i `/apple-touch-icon.png`. Każdy adres powinien wyświetlić ikonę portfela.
6. Pod `/sw.js` powinien pojawić się kod JavaScript, a nie strona HTML. Nie edytuj tego pliku — powstaje automatycznie podczas budowania.
7. Wróć na główny adres i pozostaw aplikację otwartą online przez kilkanaście sekund, by pobrała pliki do pracy offline.

## 6. Zainstaluj na iPhonie i sprawdź offline

1. Na iPhonie otwórz **Safari** w zwykłym trybie, nie prywatnym.
2. Wpisz stały produkcyjny adres HTTPS aplikacji.
3. Wybierz **Udostępnij → Dodaj do ekranu początkowego**. W niektórych wersjach iOS trzeba przewinąć listę opcji.
4. Jeśli widzisz opcję **Otwórz jako aplikację / Open as Web App**, pozostaw ją włączoną. Naciśnij **Dodaj**.
5. Uruchom **Mój Budżet z nowej ikony**. Jeszcze online odczekaj kilkanaście sekund, zamknij aplikację i otwórz ją ponownie.
6. Włącz tryb samolotowy i wyłącz Wi-Fi. Zamknij i uruchom aplikację z ikony. Powinna otworzyć się bez sieci.
7. Jeśli chcesz sprawdzić zapis, w nowej instalacji dodaj mały testowy budżet, kategorię i wydatek; po ponownym uruchomieniu powinny pozostać. Nie zmieniaj swoich rzeczywistych danych na potrzeby testu.
8. Przywróć połączenie. Pierwsze uruchomienie bez wcześniejszego pobrania plików online nie zadziała. Instalacja i zachowanie pamięci zależą też od iOS — lokalny test komputerowy nie zastępuje tego sprawdzenia na iPhonie.

## 7. Późniejsze aktualizacje

Po zmianach kodu w GitHub Desktop: wpisz opis → **Commit to main** → **Push origin**. Vercel automatycznie zbuduje nową wersję z gałęzi produkcyjnej. Sprawdź status **Ready**, a na iPhonie uruchom aplikację online. Service worker automatycznie pobierze nową wersję; przy przełączaniu wersji może przeładować otwartą aplikację, więc nie aktualizuj jej w trakcie wypełniania niezapisanego formularza.

Zachowuj ten sam produkcyjny adres. Aktualizacja plików aplikacji pod tym samym adresem nie resetuje localStorage. Nie czyść danych witryny i nie usuwaj aplikacji jako sposobu aktualizacji — może to usunąć lokalny budżet. Przed większymi zmianami pobierz kopię danych.

## Co zostało przygotowane

- [vercel.json](./vercel.json): preset Vite, deterministyczna instalacja `npm ci`, kompilacja, katalog wynikowy i reguła SPA dla odświeżania adresów. Istniejące pliki statyczne są obsługiwane przez Vercel, zanim zadziała reguła SPA.
- Nagłówki ponownego sprawdzania aktualności dla HTML, manifestu, rejestracji i service workera. Nie blokują działania precache offline zarządzanego przez Workbox.
- [.gitignore](./.gitignore): pomija środowisko lokalne, wynik budowy, zależności, ustawienia Vercel, pliki środowiskowe i kopie budżetu o nazwach generowanych przez aplikację.
- Istniejące [vite.config.ts](./vite.config.ts), ikony, ekran aplikacji i model danych nie wymagają zmian. Service worker jest generowany przy `npm run build`; nie jest osobnym źródłowym plikiem do ręcznej edycji.

Nagłówki i routing konkretnego wdrożenia Vercel trzeba potwierdzić po publikacji. Lokalny podgląd Vite nie stosuje reguł z `vercel.json`.

## Wynik sprawdzenia lokalnego — 26 października 2026

- Wszystkie 4 testy jednostkowe przeszły poprawnie.
- Kompilacja TypeScript i budowa produkcyjna Vite zakończyły się pomyślnie.
- Wygenerowano service worker, manifest i precache 11 wpisów (około 271 KiB).
- Manifest ma polską nazwę, `start_url: /`, `scope: /` i `display: standalone`.
- Sprawdzono wymiary PNG: 192×192, 512×512 i Apple Touch 180×180; wszystkie ikony podglądu produkcyjnego zwracają HTTP 200 i typ `image/png`.
- Przeglądarka potwierdziła aktywny service worker, odświeżenie bez sieci i nawigację offline do adresu aplikacji.
- Kontrolny zapis zachował się bez zmian po odświeżeniu offline. Test przeprowadzono w odrębnym kontekście przeglądarki, bez dotykania danych użytkownika.
- Brak błędów JavaScript w sprawdzonym uruchomieniu produkcyjnym.
- Nie wykonano publikacji ani sprawdzenia na fizycznym iPhonie. Testy lokalne nie potwierdzają jeszcze nagłówków i routingu na serwerze Vercel.

Dokumentacja: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Konfiguracja Vercel](https://vercel.com/docs/project-configuration/vercel-json), [Połączenie z GitHub](https://vercel.com/docs/git/vercel-for-github), [GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop).
