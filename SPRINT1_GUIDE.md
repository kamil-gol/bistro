# 🏃 Sprint 1 Implementation Guide

## ✅ Status: IN PROGRESS

---

## 🎯 Co Zostało Zrobione

### ✅ 1. Sekcja Aktualności/Blog
- ✅ **Nowa strona:** `news.html`
- ✅ **Design:** Piękny, nowoczesny layout z cards
- ✅ **Featured post:** Duży, wyróżniony artykuł
- ✅ **Regular posts:** Grid z 5 artykułami
- ✅ **Metadata:** Data, kategoria, read more links
- ✅ **Responsive:** Pełna responsywność
- ✅ **Animations:** Hover effects, smooth transitions

### ✅ 2. Przykładowe Posty
1. **Nowe Desery w Menu** - Sezon Wiosenny 2026
2. **Walentynkowa Promocja** - Kolacja dla Dwojga
3. **Nowa Karta Kaw Speciality**
4. **Nowe Godziny Otwarcia**
5. **Lody Domowe** - Nowe Smaki

### ✅ 3. Struktura Zdjęć
- ✅ **Folder:** `images/` z README.md
- ✅ **Dokumentacja:** Kompletny guide do zdjęć
- ✅ **Konwencja nazw:** Standardy dla wszystkich obrazów
- ✅ **Wytyczne fotograficzne:** Jak robić zdjęcia potraw
- ✅ **Optymalizacja:** Tools i best practices
- ✅ **Lazy loading:** Ready to implement

### ✅ 4. Technical Implementation
- ✅ **WebP support:** Picture element templates
- ✅ **Responsive images:** Multiple sizes
- ✅ **SEO:** Alt text guidelines
- ✅ **Performance:** Lazy loading ready

---

## ⏳ Co Pozostało Do Zrobienia

### 📸 1. Sesja Fotograficzna Potraw (PRIORITY HIGH)

#### Potrzebne zdjęcia (minimum 15):

**Zupy (4):**
- [ ] Rosół z makaronem
- [ ] Żurek z kiełbasą i jajkiem
- [ ] Pomidorowa z makaronem
- [ ] Pomidorowa z ryżem

**Dania Główne (4):**
- [ ] Schabowy z ziemniakami
- [ ] Pierogi ruskie
- [ ] Gulasz wołowy
- [ ] Filet z kurczaka

**Przystawki (2-3):**
- [ ] Śledź w oleju
- [ ] Tatar wołowy
- [ ] Sałatka grecka

**Desery (3):**
- [ ] Sernik nowojorski
- [ ] Szarlotka z lodami
- [ ] Tiramisu

**Napoje & Lody (2-3):**
- [ ] Lody rzemieślnicze (różne smaki)
- [ ] Kawa espresso
- [ ] Lemoniada domowa

**Dodatkowe:**
- [ ] Wnętrze restauracji (2-3 zdjęcia)
- [ ] Team/kuchnia (optional)
- [ ] Close-ups składników

#### Wytyczne do sesji:
1. **Format:** JPG, minimum 1200x800px
2. **Oświetlenie:** Naturalne światło (przy oknie)
3. **Kąt:** 45° (pokazuje objętość potrawy)
4. **Styling:** Dodaj garnish, props (sztucce, zioła)
5. **Tło:** Drewniane/marmurowe/czyste
6. **Kolory:** Ciepłe tony, naturalne

### 🛠️ 2. Optymalizacja Zdjęć

#### Kroki dla każdego zdjęcia:

**A. Podstawowa edycja:**
```
1. Kadrowanie (3:2 ratio: 1200x800px)
2. Ekspozycja +0.5
3. Kontrast +15
4. Vibrance +20
5. Ostrość (subtle)
6. Temperatura (ciepły ton)
```

**B. Export wersji:**
```bash
# Original (1200x800px) - JPG quality 85%
# Optimized (800x533px) - JPG quality 85%
# Thumbnail (400x267px) - JPG quality 85%
```

**C. Konwersja do WebP:**
```bash
# Użyj online: https://squoosh.app/
# Lub CLI:
cwebp -q 80 original.jpg -o original.webp
```

**D. Nazewnictwo:**
```
soups_zurek_original.jpg
soups_zurek_original.webp
soups_zurek_optimized.webp
soups_zurek_thumbnail.webp
```

### 📝 3. Implementacja w HTML

#### Aktualizacja index.html - Menu Section

Dodaj zdjęcia do menu items:

```html
<!-- Przykład: Żurek -->
<div class="menu-item featured">
    <div class="menu-badge">Bestseller</div>
    
    <!-- DODAJ TO: -->
    <div class="menu-item-image">
        <picture>
            <source srcset="images/optimized/soups_zurek_optimized.webp" type="image/webp">
            <img 
                src="images/dishes/soups/zurek.jpg" 
                alt="Żurek z białą kiełbasą, jajkiem i chrzanem" 
                loading="lazy"
                width="800" 
                height="533"
            >
        </picture>
    </div>
    
    <div class="menu-item-header">
        <h3>Żurek z Kiełbasą i Jajkiem</h3>
        <span class="price">15,00 zł</span>
    </div>
    <p class="menu-description">Kwaśny żurek z białą kiełbasą, jajkiem i chrzanem</p>
    <div class="menu-rating">★★★★★</div>
</div>
```

#### CSS dla menu images:

```css
.menu-item-image {
    width: 100%;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.menu-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.menu-item:hover .menu-item-image img {
    transform: scale(1.1);
}
```

#### Aktualizacja Gallery Section

Zamień gradienty na prawdziwe zdjęcia:

```html
<div class="gallery-item">
    <picture>
        <source srcset="images/gallery/interior_01.webp" type="image/webp">
        <img 
            src="images/gallery/interior_01.jpg" 
            alt="Wnętrze Bistro Pętla" 
            loading="lazy"
        >
    </picture>
    <div class="gallery-overlay">
        <h3>Nasze wnętrze</h3>
        <p>Przytulna atmosfera</p>
    </div>
</div>
```

#### Aktualizacja news.html

Zamień placeholdery na prawdziwe zdjęcia:

```html
<div class="news-image">
    <span class="news-badge">Nowość</span>
    <picture>
        <source srcset="images/news/desserts_spring_featured.webp" type="image/webp">
        <img 
            src="images/news/desserts_spring_featured.jpg" 
            alt="Nowe desery wiosenne" 
            loading="lazy"
        >
    </picture>
</div>
```

### 🎨 4. Dodatkowe Ulepszenia (Optional)

- [ ] **Image lightbox:** Powiększanie zdjęć po kliknięciu
- [ ] **Image slider:** Dla galerii
- [ ] **Loading skeleton:** Podczas ładowania zdjęć
- [ ] **Progressive images:** Blur-up effect
- [ ] **Social sharing:** Share images on social media

---

## 📊 Timeline

### Tydzień 1 (Days 1-3)
- [ ] Sesja fotograficzna potraw (1 dzień)
- [ ] Edycja i selekcja najlepszych (1 dzień)
- [ ] Optymalizacja wszystkich zdjęć (1 dzień)

### Tydzień 2 (Days 4-7)
- [ ] Generacja WebP wersji (0.5 dnia)
- [ ] Upload do repozytorium (0.5 dnia)
- [ ] Implementacja w HTML (1 dzień)
- [ ] Testing i fine-tuning (1 dzień)

---

## 🛠️ Narzędzia Potrzebne

### Fotografia
- [ ] Aparat/smartphone z dobrym aparatem
- [ ] Narzędzia do oświetlenia (lampa/dyfuzor optional)
- [ ] Props (talerze, sztucce, serwetki)
- [ ] Tła (deski, marmur, materiały)

### Edycja
- [ ] **Lightroom** (desktop) - profesjonalne
- [ ] **Snapseed** (mobile) - bezpłatne
- [ ] **VSCO** (mobile) - ładne filtry
- [ ] **Photoshop** (desktop) - zaawansowane

### Optymalizacja
- [ ] **TinyPNG** - https://tinypng.com/
- [ ] **Squoosh** - https://squoosh.app/
- [ ] **ImageOptim** (Mac) - desktop app
- [ ] **cwebp** - CLI tool

---

## 📝 Checklist Końcowy

Przed zamknięciem Sprint 1:

### Images
- [ ] Minimum 15 profesjonalnych zdjęć potraw
- [ ] Wszystkie zdjęcia < 200KB
- [ ] Każde zdjęcie ma wersję WebP
- [ ] Prawidłowe nazewnictwo plików
- [ ] Wszystkie w odpowiednich folderach

### Implementation
- [ ] Zdjęcia dodane do menu items
- [ ] Gallery zaktualizowana
- [ ] News images zamienione
- [ ] Lazy loading działa
- [ ] Alt text dla wszystkich obrazków

### Testing
- [ ] Wszystkie obrazki się ładują
- [ ] WebP działa na nowoczesnych przeglądarkach
- [ ] JPG fallback działa na starszych
- [ ] Responsive na mobile/tablet/desktop
- [ ] Lazy loading funkcjonuje
- [ ] Performance < 3s load time

### Documentation
- [ ] README.md zaktualizowany
- [ ] Image guide complete
- [ ] Issue #1 zamknięty

---

## 🚀 Następne Kroki Po Sprint 1

1. **Zamknięcie Issue #1** na GitHubie
2. **Deploy na produkcję** (rebuild Docker)
3. **Monitoring performance** (Google PageSpeed)
4. **Zbieranie feedback** od klientów
5. **Przejście do Sprint 2** (Google Analytics)

---

## 📞 Kontakt & Pomoc

Jeśli potrzebujesz:
- Pomocy z sesją fotograficzną
- Edycją zdjęć
- Implementacją kodu
- Optymalizacją performance

Skontaktuj się!

---

**Status:** 🟡 IN PROGRESS (60% complete)  
**Next milestone:** Photo session  
**ETA:** 1-2 tygodnie

**Last updated:** 5 lutego 2026, 22:00 CET