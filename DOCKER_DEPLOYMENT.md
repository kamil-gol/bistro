# 🐳 Docker Deployment Guide - Bistro Pętla

## 📋 Spis Treści

1. [Wymagania](#wymagania)
2. [Szybki Start](#szybki-start)
3. [Czyszczenie Starych Kontenerów](#czyszczenie-starych-kontenerów)
4. [Build i Deployment](#build-i-deployment)
5. [Zarządzanie Kontenerem](#zarządzanie-kontenerem)
6. [Troubleshooting](#troubleshooting)
7. [Komendy Przydatne](#komendy-przydatne)

---

## ⚙️ Wymagania

### System:
- Docker Engine 20.10+
- Docker Compose 2.0+
- Git

### Porty:
- **8080** - HTTP (strona dostępna na http://localhost:8080)

### Sprawdź instalację:
```bash
docker --version
docker-compose --version
```

---

## 🚀 Szybki Start

### 1. Sklonuj repo (jeśli jeszcze nie masz):
```bash
git clone https://github.com/kamil-gol/bistro.git
cd bistro
```

### 2. Pull najnowsze zmiany:
```bash
git pull origin main
```

### 3. Uruchom kontener:
```bash
docker-compose up -d
```

### 4. Sprawdź status:
```bash
docker-compose ps
```

### 5. Otwórz w przeglądarce:
```
http://localhost:8080
```

✅ **Gotowe!** Strona działa.

---

## 🧹 Czyszczenie Starych Kontenerów

### ⚠️ UWAGA: Wykonaj PRZED uruchomieniem nowej wersji!

### Opcja 1: Szybkie Czyszczenie (Recommended)

**Zatrzymaj i usuń stary kontener:**
```bash
# Stop i remove kontenera
docker-compose down

# Remove volumes (jeśli chcesz wyczyścić logi)
docker-compose down -v
```

**Usuń stary image:**
```bash
# Lista images
docker images | grep bistro

# Remove old image
docker rmi bistro-bistro-web
# lub
docker rmi $(docker images | grep bistro | awk '{print $3}')
```

**Wyczyść cache Docker:**
```bash
docker builder prune -f
```

### Opcja 2: Pełne Czyszczenie (Deep Clean)

**⚠️ UWAGA: To usunie WSZYSTKIE zatrzymane kontenery i niewykorzystane images!**

```bash
# Stop wszystkich kontenerów bistro
docker-compose down -v

# Usuń wszystkie zatrzymane kontenery
docker container prune -f

# Usuń wszystkie niewykorzystane images
docker image prune -a -f

# Usuń niewykorzystane volumes
docker volume prune -f

# Usuń niewykorzystane networks
docker network prune -f
```

### Opcja 3: Nuclear Option (Wszystko na raz)

**⚠️ EXTREME CAUTION: To wyczyści CAŁY Docker!**

```bash
# Zatrzymaj wszystkie kontenery
docker stop $(docker ps -aq)

# Usuń wszystkie kontenery
docker rm $(docker ps -aq)

# Usuń wszystkie images
docker rmi $(docker images -q)

# Wyczyść wszystko
docker system prune -a --volumes -f
```

### Weryfikacja Czyszczenia:

```bash
# Sprawdź kontenery (powinno być puste lub bez bistro)
docker ps -a

# Sprawdź images (powinno być puste lub bez bistro)
docker images

# Sprawdź volumes
docker volume ls

# Sprawdź disk usage
docker system df
```

---

## 🏗️ Build i Deployment

### Build Nowej Wersji:

#### Krok 1: Wyczyść stare (wybierz opcję):
```bash
# Opcja A: Soft clean (recommended)
docker-compose down
docker rmi bistro-bistro-web

# Opcja B: Full clean
docker-compose down -v
docker system prune -a -f
```

#### Krok 2: Pull najnowszy kod:
```bash
git pull origin main
```

#### Krok 3: Build nowy image:
```bash
# Build with cache
docker-compose build

# Build without cache (świeży build)
docker-compose build --no-cache
```

#### Krok 4: Uruchom:
```bash
docker-compose up -d
```

#### Krok 5: Sprawdź logi:
```bash
docker-compose logs -f
```

#### Krok 6: Weryfikuj:
```bash
# Status
docker-compose ps

# Health check
docker inspect --format='{{.State.Health.Status}}' bistro-petla-web

# Test HTTP
curl -I http://localhost:8080
```

### One-Liner Deployment:

**Pełny restart z czyszczeniem:**
```bash
docker-compose down && \
docker rmi bistro-bistro-web 2>/dev/null; \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose up -d && \
docker-compose logs -f
```

---

## 🎛️ Zarządzanie Kontenerem

### Start/Stop/Restart:

```bash
# Start (w tle)
docker-compose up -d

# Start (z logami)
docker-compose up

# Stop
docker-compose stop

# Restart
docker-compose restart

# Stop i usuń
docker-compose down

# Stop, usuń i wyczyść volumes
docker-compose down -v
```

### Logi:

```bash
# Zobacz wszystkie logi
docker-compose logs

# Follow logi (live)
docker-compose logs -f

# Ostatnie 100 linii
docker-compose logs --tail=100

# Logi z timestamp
docker-compose logs -t

# Tylko błędy nginx
docker exec bistro-petla-web cat /var/log/nginx/error.log
```

### Status i Info:

```bash
# Status kontenerów
docker-compose ps

# Szczegółowe info
docker inspect bistro-petla-web

# Użycie zasobów
docker stats bistro-petla-web

# Health check status
docker inspect --format='{{json .State.Health}}' bistro-petla-web | jq
```

### Shell Access:

```bash
# Wejdź do kontenera
docker exec -it bistro-petla-web sh

# Sprawdź pliki
docker exec bistro-petla-web ls -la /usr/share/nginx/html

# Test nginx config
docker exec bistro-petla-web nginx -t

# Reload nginx
docker exec bistro-petla-web nginx -s reload
```

---

## 🐛 Troubleshooting

### Problem: Port 8080 zajęty

**Sprawdź co używa portu:**
```bash
# Linux/Mac
lsof -i :8080
netstat -tuln | grep 8080

# Windows
netstat -ano | findstr :8080
```

**Rozwiązanie:**
```bash
# Opcja 1: Zabij proces
kill -9 <PID>

# Opcja 2: Zmień port w docker-compose.yml
ports:
  - "8081:80"  # Zmień 8080 na 8081
```

### Problem: Kontener nie startuje

**Sprawdź logi:**
```bash
docker-compose logs
docker logs bistro-petla-web
```

**Sprawdź health:**
```bash
docker inspect --format='{{json .State.Health}}' bistro-petla-web
```

**Force recreate:**
```bash
docker-compose up -d --force-recreate
```

### Problem: Zmiany w kodzie nie widoczne

**Rebuild bez cache:**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

**Hard refresh w przeglądarce:**
```
Ctrl + Shift + R  (Linux/Windows)
Cmd + Shift + R   (Mac)
```

### Problem: "No space left on device"

**Wyczyść Docker:**
```bash
# Sprawdź użycie
docker system df

# Wyczyść wszystko niewykorzystane
docker system prune -a --volumes -f

# Usuń stare images (starsze niż 7 dni)
docker image prune -a --filter "until=168h" -f
```

### Problem: PWA/Service Worker nie działa

**Clear cache:**
```bash
# W przeglądarce: DevTools → Application → Storage → Clear storage

# Restart kontenera
docker-compose restart

# Hard refresh
Ctrl + Shift + R
```

### Problem: SSL/HTTPS required dla PWA

**Dla testów lokalnych:**
- Użyj `localhost` - działa bez HTTPS
- Lub setup nginx reverse proxy z certyfikatem

**Dla production:**
- Użyj Cloudflare / nginx proxy z Let's Encrypt
- PWA wymaga HTTPS (localhost jest wyjątkiem)

---

## 🛠️ Komendy Przydatne

### Monitoring:

```bash
# Live logs wszystkich serwisów
docker-compose logs -f --tail=100

# Resource usage
docker stats

# Network connections
docker network inspect bistro-network

# Volume info
docker volume inspect bistro_nginx-logs
```

### Backup:

```bash
# Export image
docker save bistro-bistro-web:latest | gzip > bistro-web-backup.tar.gz

# Import image
docker load < bistro-web-backup.tar.gz

# Export volume (logs)
docker run --rm -v bistro_nginx-logs:/data -v $(pwd):/backup \
  alpine tar czf /backup/nginx-logs-backup.tar.gz /data
```

### Performance:

```bash
# Check image size
docker images | grep bistro

# Inspect layers
docker history bistro-bistro-web

# Resource limits (add to docker-compose.yml)
services:
  bistro-web:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

### Security:

```bash
# Scan for vulnerabilities
docker scan bistro-bistro-web

# Check running processes
docker top bistro-petla-web

# Inspect security options
docker inspect --format='{{.HostConfig.SecurityOpt}}' bistro-petla-web
```

---

## 📊 Typowy Workflow

### Development (Zmiany w kodzie):

```bash
# 1. Edytuj pliki lokalnie
vim index.html

# 2. Stop, rebuild, start
docker-compose down
docker-compose build
docker-compose up -d

# 3. Test
curl http://localhost:8080

# 4. Check logs
docker-compose logs -f
```

### Production Deployment:

```bash
# 1. Backup (optional)
docker save bistro-bistro-web:latest | gzip > backup-$(date +%Y%m%d).tar.gz

# 2. Pull latest code
git pull origin main

# 3. Clean old version
docker-compose down
docker rmi bistro-bistro-web

# 4. Build fresh
docker-compose build --no-cache

# 5. Deploy
docker-compose up -d

# 6. Verify
docker-compose ps
curl -I http://localhost:8080
docker-compose logs --tail=50

# 7. Health check
docker inspect --format='{{.State.Health.Status}}' bistro-petla-web
```

### Rollback (jeśli coś pójdzie nie tak):

```bash
# 1. Stop nową wersję
docker-compose down

# 2. Przywróć kod
git reset --hard HEAD~1
# lub
git checkout <previous-commit-sha>

# 3. Rebuild
docker-compose build
docker-compose up -d
```

---

## 🎯 Quick Reference

### Podstawowe:
```bash
docker-compose up -d              # Start
docker-compose down               # Stop i usuń
docker-compose restart            # Restart
docker-compose logs -f            # Logi live
docker-compose ps                 # Status
```

### Czyszczenie:
```bash
docker-compose down -v            # Stop + remove volumes
docker system prune -a -f         # Wyczyść wszystko
docker rmi bistro-bistro-web      # Usuń image
```

### Deploy:
```bash
git pull && \
docker-compose down && \
docker-compose build --no-cache && \
docker-compose up -d
```

### Debug:
```bash
docker exec -it bistro-petla-web sh   # Shell
docker-compose logs --tail=100        # Logi
docker stats bistro-petla-web         # Resources
```

---

## 🔗 Linki

- **Strona:** http://localhost:8080
- **Repo:** https://github.com/kamil-gol/bistro
- **Docker Hub:** https://hub.docker.com/_/nginx
- **Nginx Docs:** https://nginx.org/en/docs/

---

## 📞 Support

**Problemy?**
1. Sprawdź [Troubleshooting](#troubleshooting)
2. Check logs: `docker-compose logs`
3. Verify config: `docker exec bistro-petla-web nginx -t`
4. GitHub Issues: https://github.com/kamil-gol/bistro/issues

---

**Version:** 1.0  
**Last Updated:** 5 lutego 2026, 23:05 CET  
**Status:** Production Ready 🚀

---

## ⚡ TL;DR - Copy/Paste Commands

**Pełny deployment od zera:**
```bash
# Cleanup
docker-compose down -v
docker rmi bistro-bistro-web 2>/dev/null
docker system prune -f

# Deploy
git pull origin main
docker-compose build --no-cache
docker-compose up -d

# Verify
docker-compose ps
curl -I http://localhost:8080
docker-compose logs --tail=20

# Open browser
echo "Open: http://localhost:8080"
```

**Quick restart (zmiany w kodzie):**
```bash
git pull && docker-compose restart && docker-compose logs -f
```

**Hard reset (wszystko od nowa):**
```bash
docker-compose down -v && \
docker rmi $(docker images -q bistro*) 2>/dev/null && \
docker-compose build --no-cache && \
docker-compose up -d
```

✅ **Ready to go!** 🚀