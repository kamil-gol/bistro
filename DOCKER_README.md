# 🐳 Docker Deployment Guide - Bistro Pętla

## Overview

Strona Bistro Pętla jest skonteneryzowana przy użyciu Docker z serwerem Nginx, co zapewnia:
- ✅ Łatwe wdrożenie w dowolnym środowisku
- ✅ Izolację aplikacji
- ✅ Wysoka wydajność z Nginx
- ✅ Production-ready configuration
- ✅ Health checks
- ✅ Security headers
- ✅ Gzip compression

## 📋 Wymagania

- Docker Engine 20.10+
- Docker Compose 2.0+ (opcjonalne, ale zalecane)
- 100MB wolnego miejsca na dysku

## 🚀 Szybki Start

### Metoda 1: Docker Compose (Zalecana)

```bash
# Sklonuj repozytorium
git clone https://github.com/kamil-gol/bistro.git
cd bistro

# Uruchom kontener
docker-compose up -d

# Sprawdź status
docker-compose ps

# Sprawdź logi
docker-compose logs -f
```

Strona będzie dostępna pod adresem: **http://localhost:8080**

### Metoda 2: Docker (bez Compose)

```bash
# Zbuduj obraz
docker build -t bistro-petla:latest .

# Uruchom kontener
docker run -d \
  --name bistro-petla-web \
  -p 8080:80 \
  --restart unless-stopped \
  bistro-petla:latest

# Sprawdź status
docker ps

# Sprawdź logi
docker logs -f bistro-petla-web
```

Strona będzie dostępna pod adresem: **http://localhost:8080**

## 🛠️ Komendy zarządzania

### Docker Compose

```bash
# Uruchom w tle
docker-compose up -d

# Zatrzymaj
docker-compose stop

# Uruchom ponownie
docker-compose restart

# Zatrzymaj i usuń kontenery
docker-compose down

# Zatrzymaj i usuń kontenery + volumeny
docker-compose down -v

# Zobacz logi
docker-compose logs -f

# Sprawdź status health check
docker-compose ps

# Przebuduj obraz
docker-compose build --no-cache

# Przebuduj i uruchom
docker-compose up -d --build
```

### Docker (standardowy)

```bash
# Zatrzymaj kontener
docker stop bistro-petla-web

# Uruchom kontener
docker start bistro-petla-web

# Uruchom ponownie
docker restart bistro-petla-web

# Usuń kontener
docker rm -f bistro-petla-web

# Zobacz logi
docker logs -f bistro-petla-web

# Sprawdź health check
docker inspect --format='{{.State.Health.Status}}' bistro-petla-web

# Wejdź do kontenera (debugging)
docker exec -it bistro-petla-web sh
```

## 🔧 Konfiguracja

### Zmiana portu

Edytuj plik `docker-compose.yml`:

```yaml
ports:
  - "3000:80"  # Zmień 8080 na dowolny port
```

Lub przy użyciu Docker:

```bash
docker run -d -p 3000:80 bistro-petla:latest
```

### Włączenie live reload (development)

Odkomentuj sekcję volumes w `docker-compose.yml`:

```yaml
volumes:
  - ./index.html:/usr/share/nginx/html/index.html:ro
  - ./styles.css:/usr/share/nginx/html/styles.css:ro
  - ./script.js:/usr/share/nginx/html/script.js:ro
```

Teraz zmiany w plikach będą od razu widoczne bez rebuildu.

### Zmiana strefy czasowej

Edytuj w `docker-compose.yml`:

```yaml
environment:
  - TZ=Europe/Warsaw  # Zmień na swoją strefę
```

## 📊 Monitoring i Diagnostyka

### Health Check

```bash
# Docker Compose
docker-compose ps

# Docker
docker inspect --format='{{json .State.Health}}' bistro-petla-web | jq
```

### Sprawdzanie logów

```bash
# Wszystkie logi
docker-compose logs

# Ostatnie 100 linii
docker-compose logs --tail=100

# Follow (na żywo)
docker-compose logs -f

# Tylko błędy
docker-compose logs | grep error
```

### Statystyki zasobów

```bash
# Użycie CPU/RAM
docker stats bistro-petla-web

# Rozmiar obrazu
docker images bistro-petla
```

## 🌐 Deployment Production

### VPS/Cloud Server

1. **Zainstaluj Docker na serwerze:**

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Zainstaluj Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

2. **Sklonuj repozytorium:**

```bash
git clone https://github.com/kamil-gol/bistro.git
cd bistro
```

3. **Uruchom z automatycznym restartem:**

```bash
docker-compose up -d
```

4. **Skonfiguruj reverse proxy (Nginx/Caddy) dla SSL:**

Przykład konfiguracji Nginx:

```nginx
server {
    listen 80;
    server_name bistropetla.pl www.bistropetla.pl;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bistropetla.pl www.bistropetla.pl;

    ssl_certificate /etc/letsencrypt/live/bistropetla.pl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bistropetla.pl/privkey.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Docker Hub (opcjonalne)

```bash
# Zaloguj się do Docker Hub
docker login

# Zbuduj i tag
docker build -t twoja-nazwa/bistro-petla:latest .

# Push do Docker Hub
docker push twoja-nazwa/bistro-petla:latest

# Na serwerze produkcyjnym
docker pull twoja-nazwa/bistro-petla:latest
docker run -d -p 8080:80 --restart unless-stopped twoja-nazwa/bistro-petla:latest
```

## 🔒 Security Best Practices

1. **Używaj reverse proxy z SSL** (Let's Encrypt)
2. **Regularnie aktualizuj obrazy bazowe:**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```
3. **Monitoruj logi:**
   ```bash
   docker-compose logs -f | grep -i error
   ```
4. **Backup konfiguracji**
5. **Użyj firewalla (UFW):**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

## 📈 Performance Optimization

Obraz Docker jest już zoptymalizowany:
- ✅ Alpine Linux (5MB base)
- ✅ Multi-stage build
- ✅ Gzip compression włączona
- ✅ Cache headers skonfigurowane
- ✅ Security headers dodane
- ✅ Health checks

## 🐛 Troubleshooting

### Problem: Kontener się nie uruchamia

```bash
# Sprawdź logi
docker-compose logs

# Sprawdź czy port jest wolny
sudo netstat -tulpn | grep :8080

# Zmień port w docker-compose.yml
```

### Problem: Strona nie ładuje się

```bash
# Sprawdź czy kontener działa
docker-compose ps

# Sprawdź health check
docker inspect bistro-petla-web | grep -A 10 Health

# Sprawdź logi Nginx
docker-compose logs bistro-web
```

### Problem: Zmiany nie są widoczne

```bash
# Przebuduj obraz
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wyczyść cache przeglądarki (Ctrl+Shift+R)
```

## 📝 Struktura projektu

```
bistro/
├── Dockerfile              # Definicja obrazu Docker
├── docker-compose.yml      # Orchestration configuration
├── nginx.conf             # Konfiguracja Nginx
├── .dockerignore          # Pliki ignorowane przez Docker
├── index.html             # Strona główna
├── styles.css             # Style CSS
├── script.js              # JavaScript
├── README.md              # Dokumentacja główna
└── DOCKER_README.md       # Ten plik
```

## 💡 Tips & Tricks

1. **Szybkie sprawdzenie czy strona działa:**
   ```bash
   curl http://localhost:8080
   ```

2. **Automatyczne uruchamianie po restarcie serwera:**
   ```bash
   # Już skonfigurowane przez 'restart: unless-stopped'
   ```

3. **Backup volumenu z logami:**
   ```bash
   docker run --rm -v bistro_nginx-logs:/logs -v $(pwd):/backup alpine tar czf /backup/logs-backup.tar.gz /logs
   ```

4. **Monitoring CPU/RAM przez 24h:**
   ```bash
   docker stats --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" bistro-petla-web
   ```

## 📞 Support

Jeśli masz problemy z Docker deployment:
1. Sprawdź logi: `docker-compose logs`
2. Sprawdź dokumentację Docker: https://docs.docker.com/
3. Sprawdź dokumentację Nginx: https://nginx.org/en/docs/

---

**Ostatnia aktualizacja:** Luty 2026  
**Wersja:** 1.0  
**Autor:** Bistro Pętla Development Team

🍽️ **Smacznego kodowania!** 🐳