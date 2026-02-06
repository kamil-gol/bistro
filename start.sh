#!/bin/bash

# Bistro Pętla - WordPress CMS Startup Script
# Author: Kamil Gołębiowski
# Date: 2026-02-06

set -e

echo "🍽️  Bistro Pętla - WordPress CMS Setup"
echo "======================================="
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker nie działa. Uruchom Docker Desktop i spróbuj ponownie."
    exit 1
fi

echo "✅ Docker działa"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose nie jest zainstalowany."
    exit 1
fi

echo "✅ docker-compose dostępny"

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Tworzę plik .env z przykładowej konfiguracji..."
    cp .env.example .env
    echo ""
    echo "⚠️  WAŻNE: Zmień hasła w pliku .env przed uruchomieniem w produkcji!"
    echo "   Edytuj: nano .env"
    echo ""
    read -p "Czy chcesz kontynuować z domyślnymi hasłami? (t/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Tt]$ ]]; then
        echo "Edytuj .env i uruchom ponownie: ./start.sh"
        exit 0
    fi
fi

echo "✅ Plik .env istnieje"
echo ""

# Create required directories
echo "📁 Tworzę katalogi..."
mkdir -p wordpress mysql docs

# Stop existing containers
echo "🛑 Zatrzymuję istniejące kontenery..."
docker-compose down 2>/dev/null || true

# Pull latest images
echo "📥 Pobieram najnowsze obrazy Docker..."
docker-compose pull

# Build and start services
echo "🚀 Uruchamiam usługi..."
docker-compose up -d

echo ""
echo "⏳ Czekam na uruchomienie usług (30 sekund)..."
sleep 30

# Check service health
echo ""
echo "🏥 Sprawdzam stan usług..."
echo ""
docker-compose ps

echo ""
echo "✅ Setup zakończony!"
echo ""
echo "📍 Dostęp do usług:"
echo "   🌐 Strona główna:  http://localhost:8080"
echo "   ⚙️  WordPress CMS:  http://localhost:8081"
echo "   🗄️  phpMyAdmin:     http://localhost:8082"
echo ""
echo "📚 Następne kroki:"
echo "   1. Otwórz http://localhost:8081 w przeglądarce"
echo "   2. Postępuj zgodnie z instrukcjami instalacji WordPress"
echo "   3. Zaloguj się do panelu admin"
echo "   4. Przeczytaj docs/wordpress-setup.md"
echo ""
echo "🔍 Komendy przydatne:"
echo "   docker-compose logs -f        # Logi wszystkich usług"
echo "   docker-compose restart        # Restart usług"
echo "   docker-compose down           # Zatrzymaj wszystko"
echo ""
echo "🎉 Powodzenia!"
echo ""