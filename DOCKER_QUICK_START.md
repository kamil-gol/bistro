# ⚡ Docker Quick Start - Bistro Pętla

## 🚀 TL;DR - Copy & Paste Commands

### First Time Setup:
```bash
cd bistro && docker-compose up -d && echo "✅ Dostępne na: http://localhost:8080"
```

---

## 📦 Pełny Clean Deployment (Recommended)

**Wyczyść stare + Deploy nowe:**
```bash
docker-compose down -v && \
docker rmi bistro-bistro-web 2>/dev/null; \
docker system prune -f && \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose up -d && \
echo "✅ Deployed! Open http://localhost:8080"
```

---

## 🧹 Czyszczenie Opcje

### Option 1: Soft Clean (Szybkie)
```bash
docker-compose down && docker rmi bistro-bistro-web
```

### Option 2: Medium Clean (Recommended)
```bash
docker-compose down -v && docker rmi bistro-bistro-web && docker builder prune -f
```

### Option 3: Full Clean (Deep)
```bash
docker-compose down -v && \
docker container prune -f && \
docker image prune -a -f && \
docker volume prune -f && \
docker network prune -f
```

### Option 4: Nuclear (Wszystko)
```bash
docker stop $(docker ps -aq) 2>/dev/null; \
docker rm $(docker ps -aq) 2>/dev/null; \
docker system prune -a --volumes -f
```

---

## 🔄 Update & Restart

### Quick Restart (bez rebuildu):
```bash
git pull && docker-compose restart
```

### Full Restart (z rebuildem):
```bash
docker-compose down && \
git pull origin main && \
docker-compose build && \
docker-compose up -d
```

### Hard Restart (no cache):
```bash
docker-compose down -v && \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose up -d
```

---

## 🔍 Debug & Monitor

### Logs:
```bash
# Live logs
docker-compose logs -f

# Last 50 lines
docker-compose logs --tail=50

# With timestamps
docker-compose logs -t --tail=100
```

### Status:
```bash
# Container status
docker-compose ps

# Health check
docker inspect --format='{{.State.Health.Status}}' bistro-petla-web

# Resource usage
docker stats bistro-petla-web --no-stream
```

### Quick Test:
```bash
# HTTP test
curl -I http://localhost:8080

# Full test
curl -s http://localhost:8080 | grep -i "bistro"

# Nginx config test
docker exec bistro-petla-web nginx -t
```

---

## 🎯 Common Workflows

### 1. First Time:
```bash
git clone https://github.com/kamil-gol/bistro.git
cd bistro
docker-compose up -d
```

### 2. Update Code:
```bash
git pull && docker-compose restart
```

### 3. New Build:
```bash
docker-compose down && docker-compose build && docker-compose up -d
```

### 4. Fresh Start:
```bash
docker-compose down -v && \
docker-compose build --no-cache && \
docker-compose up -d
```

### 5. Troubleshoot:
```bash
docker-compose logs --tail=100 && \
docker-compose ps && \
curl -I http://localhost:8080
```

---

## 🐛 Troubleshooting One-Liners

### Port 8080 busy?
```bash
# Find process
lsof -i :8080

# Kill it
kill -9 $(lsof -t -i:8080)

# Or change port (edit docker-compose.yml to 8081:80)
```

### Container won't start?
```bash
docker-compose down && \
docker-compose up --force-recreate
```

### Changes not visible?
```bash
docker-compose down && \
docker-compose build --no-cache && \
docker-compose up -d
```

### Out of space?
```bash
docker system prune -a --volumes -f && \
docker system df
```

---

## 📊 Useful Aliases (Optional)

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# Bistro aliases
alias bistro-start='cd ~/bistro && docker-compose up -d'
alias bistro-stop='cd ~/bistro && docker-compose down'
alias bistro-restart='cd ~/bistro && docker-compose restart'
alias bistro-logs='cd ~/bistro && docker-compose logs -f'
alias bistro-status='cd ~/bistro && docker-compose ps'
alias bistro-deploy='cd ~/bistro && git pull && docker-compose down && docker-compose build --no-cache && docker-compose up -d'
alias bistro-clean='cd ~/bistro && docker-compose down -v && docker rmi bistro-bistro-web 2>/dev/null'
```

Potem:
```bash
source ~/.bashrc  # lub ~/.zshrc
bistro-deploy     # Używaj!
```

---

## ⚙️ Environment Variables (Optional)

Stwórz `.env` file:

```env
# Port configuration
HOST_PORT=8080

# Timezone
TZ=Europe/Warsaw

# Container name
CONTAINER_NAME=bistro-petla-web

# Version
VERSION=2.0.0
```

Użyj w `docker-compose.yml`:
```yaml
ports:
  - "${HOST_PORT:-8080}:80"
environment:
  - TZ=${TZ:-Europe/Warsaw}
container_name: ${CONTAINER_NAME:-bistro-petla-web}
```

---

## 📝 Cheat Sheet

| Command | Action |
|---------|--------|
| `docker-compose up -d` | Start |
| `docker-compose down` | Stop |
| `docker-compose restart` | Restart |
| `docker-compose logs -f` | Logs |
| `docker-compose ps` | Status |
| `docker-compose build` | Build |
| `docker-compose build --no-cache` | Fresh build |
| `docker-compose up -d --force-recreate` | Force recreate |
| `docker exec -it bistro-petla-web sh` | Shell |
| `docker stats bistro-petla-web` | Resources |

---

## 🔗 Quick Links

- 🌐 **Website:** http://localhost:8080
- 📚 **Full Guide:** [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)
- 📦 **Repo:** https://github.com/kamil-gol/bistro
- 🐛 **Issues:** https://github.com/kamil-gol/bistro/issues

---

## ✅ Verification Checklist

Po deployment sprawdź:

```bash
# 1. Container running?
docker-compose ps | grep "Up"

# 2. Health check OK?
docker inspect --format='{{.State.Health.Status}}' bistro-petla-web | grep "healthy"

# 3. HTTP 200?
curl -I http://localhost:8080 | grep "200 OK"

# 4. No errors in logs?
docker-compose logs --tail=20 | grep -i error

# All green? ✅ You're good!
```

---

**Version:** 1.0  
**Updated:** 5 lutego 2026, 23:10 CET  
**Status:** Ready to use! 🚀

---

## 🎯 The Ultimate One-Liner

**Pełny deployment od A do Z:**

```bash
cd bistro && \
docker-compose down -v && \
docker rmi bistro-bistro-web 2>/dev/null; \
docker system prune -f && \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose up -d && \
sleep 3 && \
docker-compose ps && \
curl -I http://localhost:8080 && \
echo "
✅✅✅ DEPLOYMENT COMPLETE! ✅✅✅
Open: http://localhost:8080
Logs: docker-compose logs -f
"
```

**Copy. Paste. Done.** 🎉