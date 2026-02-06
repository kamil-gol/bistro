# 🍽️ Bistro Pętla - Website + WordPress Headless CMS

> Nowoczesna strona internetowa restauracji z systemem zarządzania treścią

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/docker-ready-brightgreen.svg)](docker-compose.yml)
[![WordPress](https://img.shields.io/badge/WordPress-6.4-blue.svg)](https://wordpress.org/)

## 📊 Architektura

```
┌────────────────────────────────────┐
│         UŻytkownik / Klient            │
└─────────────┬───────────────────────┘
               │
      ┌────────┼────────┐
      │         │        │
┌─────┴─────┐  │  ┌─────┴──────┐
│   Strona   │  │  │  WordPress  │
│   Główna  │  │  │  Admin CMS  │
│ :8080     │  │  │  :8081      │
│           │  │  │            │
│ HTML/CSS/ │  │  │ REST API   │
│ JavaScript│──┼──┤ /wp-json   │
└───────────┘  │  └─────┬──────┘
               │        │
               │  ┌─────┴──────┐
               │  │   MySQL    │
               │  │  Database  │
               │  └───────────┘
               │
         ┌─────┴──────┐
         │ phpMyAdmin │
         │   :8082    │
         └────────────┘
```

## ✨ Funkcje

### 🚀 Aktualnie (Sprint 1 - DONE)
- ✅ Strona główna z menu, galerią, kontaktem
- ✅ Responsive design
- ✅ Integracja z Uber Eats i Pyszne.pl
- ✅ WordPress CMS w Docker
- ✅ REST API endpoint
- ✅ phpMyAdmin do zarządzania bazą

### 🚧 W planach (Sprinty 2-6)
- 🔶 System zarządzania aktualnościami
- 🔶 Dynamiczne menu (edycja przez CMS)
- 🔶 Upload zdjęć
- 🔶 Autentykacja JWT
- 🔶 Custom Post Types
- 🔶 Frontend integration z API

## 🚀 Szybki Start

### Wymagania
- Docker Desktop
- docker-compose
- Git
- 2GB wolnej pamięci RAM

### Instalacja (5 minut)

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/kamil-gol/bistro.git
cd bistro

# 2. Uruchom automatyczny skrypt
chmod +x start.sh
./start.sh

# 3. Otwórz w przeglądarce
# Strona: http://localhost:8080
# WordPress: http://localhost:8081
# phpMyAdmin: http://localhost:8082
```

### Pierwsze uruchomienie WordPress

1. Otwórz **http://localhost:8081**
2. Wybierz język: **Polski**
3. Wypełnij formularz instalacji:
   - Tytuł: `Bistro Pętla CMS`
   - Użytkownik: `admin`
   - Hasło: (silne hasło!)
   - E-mail: `kamilgolebiowski@10g.pl`
4. Zaloguj się do panelu admin

## 📚 Dokumentacja

- **[WordPress Setup Guide](docs/wordpress-setup.md)** - Szczegółowa instrukcja
- **[Sprint Planning](docs/sprints.md)** - Plan rozwoju (6 sprintów)
- **[API Documentation](docs/api.md)** - Endpointy REST API (Sprint 2+)

## 🏃‍♂️ Sprint 1 - Deliverables (✅ DONE)

**Status:** Zakończony 2026-02-06

### Co zostało zrobione:

1. **Docker Stack**
   - `docker-compose.yml` z 4 usługami
   - WordPress 6.4 + PHP 8.2
   - MySQL 8.0
   - phpMyAdmin
   - Konfiguracja network i volumes

2. **Konfiguracja**
   - PHP upload limits (64MB)
   - MySQL optimization
   - Environment variables template
   - .gitignore

3. **Automatyzacja**
   - `start.sh` - startup script
   - Health checks
   - Auto-restart policies

4. **Dokumentacja**
   - README.md
   - wordpress-setup.md
   - Komentarze w konfigach

### Testy akceptacyjne:

```bash
# Test 1: Wszystkie kontenery działają
docker-compose ps
# Expected: 4 kontenery (Up)

# Test 2: WordPress dostępny
curl -I http://localhost:8081
# Expected: HTTP/2 200

# Test 3: REST API działa
curl http://localhost:8081/wp-json/wp/v2
# Expected: JSON response

# Test 4: MySQL connection
docker exec bistro-mysql mysql -u bistro_user -pbistro_secure_password_2026 -e "SELECT 1"
# Expected: 1
```

## 🗺️ Roadmap

### Sprint 2 (Tydzień 3-4): Custom Post Types
- [ ] Custom Post Type: News (Aktualności)
- [ ] Custom Post Type: Menu Item
- [ ] ACF (Advanced Custom Fields)
- [ ] JWT Authentication
- [ ] Media upload optimization

### Sprint 3 (Tydzień 5-6): Frontend - News
- [ ] JavaScript API client
- [ ] news.html dynamic rendering
- [ ] Single article page
- [ ] Pagination
- [ ] SEO optimization

### Sprint 4 (Tydzień 7-8): Frontend - Menu
- [ ] Custom endpoint /wp-json/bistro/v1/menu
- [ ] Menu cache (Redis)
- [ ] Dynamic menu rendering
- [ ] Fallback to static

### Sprint 5 (Tydzień 9-10): Admin UX
- [ ] Custom admin theme
- [ ] Drag & drop menu ordering
- [ ] Bulk operations
- [ ] Image optimization (WebP)

### Sprint 6 (Tydzień 11-12): Polish & Deploy
- [ ] Production configuration
- [ ] SSL/HTTPS
- [ ] Backup automation
- [ ] Monitoring
- [ ] User training

## 🔧 Zarządzanie

### Podstawowe komendy

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# Logi
docker-compose logs -f

# Status
docker-compose ps

# Rebuild (po zmianach)
docker-compose up -d --build
```

### Backup

```bash
# Backup bazy danych
./scripts/backup.sh

# Lub ręcznie:
docker exec bistro-mysql mysqldump -u root -proot_secure_password_2026 bistro_cms > backup_$(date +%Y%m%d).sql
```

### Restore

```bash
docker exec -i bistro-mysql mysql -u root -proot_secure_password_2026 bistro_cms < backup_20260206.sql
```

## 🐛 Troubleshooting

### Problem: WordPress nie startuje

```bash
# Sprawdź logi
docker-compose logs wordpress

# Restart MySQL i WordPress
docker-compose restart mysql wordpress

# Sprawdhttp://localhost:8081/wp-admin/install.php
```

### Problem: Port już używany

```bash
# Zmień porty w docker-compose.yml:
# 8080 → 8090 (strona)
# 8081 → 8091 (WordPress)
# 8082 → 8092 (phpMyAdmin)

docker-compose down
docker-compose up -d
```

### Problem: Błąd połączenia z bazą

```bash
# Sprawdź MySQL
docker-compose logs mysql

# Reset bazy (UWAGA: usuń wszystkie dane!)
docker-compose down -v
docker-compose up -d
```

## 💬 Wsparcie

- **Email:** kamilgolebiowski@10g.pl
- **Issues:** [GitHub Issues](https://github.com/kamil-gol/bistro/issues)
- **Dokumentacja:** [docs/](docs/)

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

**Made with ❤️ for Bistro Pętla**

ul. Odrodzenia 36, 41-500 Chorzów  
📞 +48 660 530 211