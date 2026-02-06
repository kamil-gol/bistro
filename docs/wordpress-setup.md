# WordPress Headless CMS - Instrukcja Instalacji

## 🚀 Szybki Start

### 1. Uruchom stack

```bash
cd ~/bistro

# Ściągnij najnowsze zmiany
git pull origin main

# Stwórz plik .env (skopiuj z .env.example)
cp .env.example .env

# ZMIEŃ HASŁA W .env!
nano .env

# Uruchom kontenery
docker-compose up -d

# Sprawdź status
docker-compose ps
```

### 2. Dostęp do usług

- **Strona główna:** http://localhost:8080
- **WordPress CMS:** http://localhost:8081
- **phpMyAdmin:** http://localhost:8082

### 3. Instalacja WordPress

1. Otwórz http://localhost:8081
2. Wybierz język: **Polski**
3. Kliknij "Dalej"
4. Wypełnij formularz:
   - **Tytuł witryny:** Bistro Pętla CMS
   - **Nazwa użytkownika:** admin (lub inna)
   - **Hasło:** (silne hasło!)
   - **E-mail:** kamilgolebiowski@10g.pl
   - **Widoczność:** Odznacz "Zachęcaj wyszukiwarki..."
5. Kliknij "Zainstaluj WordPress"

### 4. Konfiguracja początkowa

#### A. Zmień permalinków
```
Ustawienia → Stałe odniośniki → Nazwa wpisu
Zapisz
```

#### B. Usuń niepotrzebne wtyczki
```
Wtyczki → Usuń:
- Hello Dolly
```

#### C. Usuń przykładowe treści
```
Wpisy → Usuń "Witaj świecie!"
Strony → Usuń "Przykładowa strona"
Komentarze → Usuń przykładowy komentarz
```

## 🔌 REST API - Test

### Sprawdź, czy API działa:

```bash
curl http://localhost:8081/wp-json/wp/v2/posts
```

Powinno zwrócić `[]` (pusta tablica) lub listę wpisów.

### Endpointy API:

```
GET  /wp-json/wp/v2/posts          - Lista artykułów
GET  /wp-json/wp/v2/posts/{id}     - Pojedynczy artykuł
GET  /wp-json/wp/v2/categories     - Kategorie
GET  /wp-json/wp/v2/media          - Media (obrazki)
POST /wp-json/wp/v2/posts          - Utwórz artykuł (wymaga auth)
```

## 🔐 Autentykacja

W następnym sprincie dodamy:
- JWT Authentication plugin
- Application Passwords
- Custom endpoints dla menu

## 🛠️ Zarządzanie

### Backup bazy danych

```bash
docker exec bistro-mysql mysqldump -u root -p'root_secure_password_2026' bistro_cms > backup.sql
```

### Restore bazy danych

```bash
docker exec -i bistro-mysql mysql -u root -p'root_secure_password_2026' bistro_cms < backup.sql
```

### Restart usług

```bash
# Restart wszystkich
docker-compose restart

# Restart tylko WordPress
docker-compose restart wordpress
```

### Logi

```bash
# Wszystkie logi
docker-compose logs -f

# Tylko WordPress
docker-compose logs -f wordpress

# Tylko MySQL
docker-compose logs -f mysql
```

## ✅ Checklist Sprint 1

- [ ] Docker Compose działa
- [ ] WordPress zainstalowany
- [ ] Język polski ustawiony
- [ ] REST API działa
- [ ] phpMyAdmin dostępny
- [ ] Hasła zmienione w .env
- [ ] Backup utworzony

## 👍 Następne kroki (Sprint 2)

1. Instalacja wtyczek:
   - JWT Authentication
   - ACF (Advanced Custom Fields) dla menu
   - Custom Post Types UI
2. Utworzenie Custom Post Type "News"
3. Utworzenie Custom Post Type "Menu Item"
4. Frontend integration

---

**Potrzebujesz pomocy?** Zobacz logi: `docker-compose logs -f`