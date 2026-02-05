# 🖼️ Image Assets Guide - Bistro Pętla

## Struktura Folderów

```
images/
├── dishes/              # Zdjęcia potraw
│   ├── soups/           # Zupy
│   ├── mains/           # Dania główne
│   ├── appetizers/      # Przystawki
│   ├── desserts/        # Desery
│   └── drinks/          # Napoje & lody
├── interior/           # Wnętrze restauracji
├── gallery/            # Galeria ogólna
├── news/               # Zdjęcia do aktualności
├── optimized/          # Zoptymalizowane wersje (WebP)
└── thumbnails/         # Miniaturki
```

## 📸 Wymagania Techniczne

### Formatów
- **Podstawowy:** JPG/JPEG (kompatybilność)
- **Nowoczesny:** WebP (70-80% mniejszy rozmiar)
- **Fallback:** PNG (dla przezroczystości)

### Rozmiary

#### Zdjęcia Potraw (Menu Items)
- **Original:** 1200x800px (3:2 ratio)
- **Optimized:** 800x533px
- **Thumbnail:** 400x267px
- **Mobile:** 600x400px

#### Galeria
- **Desktop:** 1600x1200px
- **Tablet:** 1024x768px
- **Mobile:** 800x600px

#### Hero/Banner
- **Full HD:** 1920x1080px
- **4K Ready:** 3840x2160px (optional)

#### News/Blog
- **Featured:** 1200x600px (2:1 ratio)
- **Card:** 800x600px (4:3 ratio)
- **Thumbnail:** 400x300px

### Jakość
- **JPG Quality:** 85% (optimal balance)
- **WebP Quality:** 80% (70-80% smaller than JPG)
- **Max file size:** 200KB per image
- **Compression:** TinyPNG, ImageOptim, Squoosh

## 🛠️ Optymalizacja

### Narzędzia Online
1. **TinyPNG** - https://tinypng.com/
2. **Squoosh** - https://squoosh.app/
3. **ImageOptim** - https://imageoptim.com/
4. **WebP Converter** - https://cloudconvert.com/jpg-to-webp

### Narzędzia CLI

```bash
# Konwersja do WebP
cwebp -q 80 input.jpg -o output.webp

# Batch conversion
for i in *.jpg; do cwebp -q 80 "$i" -o "${i%.jpg}.webp"; done

# ImageMagick resize
convert input.jpg -resize 800x533 -quality 85 output.jpg

# Optymalizacja JPG
jpegoptim --max=85 --strip-all *.jpg
```

### Automatyzacja (Node.js)

```javascript
// package.json
{
  "scripts": {
    "optimize": "node scripts/optimize-images.js"
  },
  "devDependencies": {
    "sharp": "^0.33.0",
    "imagemin": "^8.0.1",
    "imagemin-webp": "^8.0.0"
  }
}

// scripts/optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'original', width: 1200 },
  { name: 'optimized', width: 800 },
  { name: 'thumbnail', width: 400 }
];

const inputDir = './images/dishes';
const outputDir = './images/optimized';

fs.readdirSync(inputDir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    sizes.forEach(size => {
      sharp(path.join(inputDir, file))
        .resize(size.width)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `${size.name}_${file.replace(/\.[^.]+$/, '.webp')}`));
    });
  }
});
```

## 📝 Konwencja Nazewnictwa

### Format
```
[category]_[item-name]_[size].[ext]
```

### Przykłady
```
soups_zurek_original.jpg
soups_zurek_optimized.webp
soups_zurek_thumbnail.webp

mains_schabowy_original.jpg
mains_schabowy_optimized.webp

desserts_sernik_original.jpg
desserts_sernik_thumbnail.webp

gallery_interior_01.jpg
gallery_interior_01.webp

news_walentynki_featured.jpg
news_walentynki_featured.webp
```

## 📚 Implementacja HTML

### Responsive Images z WebP

```html
<!-- Method 1: Picture element -->
<picture>
  <source 
    srcset="images/optimized/soups_zurek_optimized.webp" 
    type="image/webp"
  >
  <source 
    srcset="images/dishes/soups/zurek.jpg" 
    type="image/jpeg"
  >
  <img 
    src="images/dishes/soups/zurek.jpg" 
    alt="Żurek z kiełbasą i jajkiem" 
    loading="lazy"
    width="800" 
    height="533"
  >
</picture>

<!-- Method 2: Multiple sizes -->
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="images/dishes/soups/zurek_large.webp" 
    type="image/webp"
  >
  <source 
    media="(min-width: 768px)" 
    srcset="images/dishes/soups/zurek_medium.webp" 
    type="image/webp"
  >
  <source 
    srcset="images/dishes/soups/zurek_small.webp" 
    type="image/webp"
  >
  <img 
    src="images/dishes/soups/zurek.jpg" 
    alt="Żurek" 
    loading="lazy"
  >
</picture>
```

### Lazy Loading

```html
<!-- Native lazy loading -->
<img 
  src="images/dishes/schabowy.jpg" 
  alt="Schabowy z ziemniakami" 
  loading="lazy"
>

<!-- Intersection Observer -->
<img 
  data-src="images/dishes/schabowy.jpg" 
  alt="Schabowy" 
  class="lazy"
>

<script>
// Lazy loading implementation
const lazyImages = document.querySelectorAll('img.lazy');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

## 🎨 Wytyczne Fotograficzne

### Sesja Zdjęciowa - Potrawy

#### Oświetlenie
- **Naturalne światło:** Najlepsze wyniki (przy oknie)
- **Złota godzina:** 1-2h przed zachodem słońca
- **Unikaj:** Bezpośredniego światła (twarde cienie)
- **Dyfuzor:** Jeśli używasz lamp

#### Kąt Kamery
- **45°:** Universal, pokazuje objętość
- **90° (overhead):** Flat lay, idealny dla Instagram
- **0° (eye level):** Burgery, kanapki

#### Styling
- **Garnish:** Świeże zioła, przyprawy
- **Props:** Sztucce, serwetki, kłosy
- **Tło:** Drewno, marmur, czyste tła
- **Kolory:** Komplementarne do potrawy

#### Composition
- **Rule of thirds:** Nie centruj wszystkiego
- **Negative space:** Zostaw "oddechy"
- **Layers:** Pokazuj głębię (foreground, subject, background)

### Post-Processing

#### Basic Adjustments
- **Ekspozycja:** +0.3 do +0.7
- **Kontrast:** +10 do +20
- **Vibrance:** +15 do +25
- **Ostrość:** Subtlenie (40-50)
- **Temperatura:** Ciepły ton (+5 do +10)

#### Color Grading
- **Highlights:** Subtle yellow/warm
- **Shadows:** Slight blue/cool (contrast)
- **Saturation:** Don't overdo (-5 reds if too vibrant)

## 📋 Checklist - Przed Dodaniem

### Każde zdjęcie musi:
- [ ] Być ostro skadrowane
- [ ] Mieć prawidłowy biały balans
- [ ] Być zoptymalizowane (< 200KB)
- [ ] Mieć wersję WebP
- [ ] Mieć opisowy alt text
- [ ] Być odpowiednio nazwane
- [ ] Być w prawidłowym folderze
- [ ] Mieć responsive variants

## 🔍 SEO dla Obrazów

### Alt Text Best Practices

```html
<!-- BAD -->
<img src="img1.jpg" alt="zdjęcie">

<!-- GOOD -->
<img 
  src="zurek.jpg" 
  alt="Żurek z białą kiełbasą, jajkiem i chrzanem w Bistro Pętla Chorzów"
>

<!-- BETTER -->
<img 
  src="schabowy.jpg" 
  alt="Polski kotlet schabowy panierowany z ziemniakami i kapustą - specjalność Bistro Pętla"
  title="Schabowy tradycyjny | 25 zł"
>
```

### Schema.org Markup

```html
<div itemscope itemtype="https://schema.org/Recipe">
  <img 
    itemprop="image" 
    src="schabowy.jpg" 
    alt="Schabowy z ziemniakami"
  >
  <h3 itemprop="name">Schabowy z Ziemniakami</h3>
  <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <meta itemprop="price" content="25.00">
    <meta itemprop="priceCurrency" content="PLN">
  </span>
</div>
```

## 🚦 Status Implementacji

### ✅ Ukonczone
- [x] Struktura folderów
- [x] Dokumentacja
- [x] HTML templates z lazy loading
- [x] CSS placeholders

### ⏳ Do zrobienia
- [ ] Sesja fotograficzna potraw (15+ zdjęć)
- [ ] Optymalizacja wszystkich zdjęć
- [ ] Generacja WebP versions
- [ ] Tworzenie thumbnailów
- [ ] Dodanie zdjęć do menu items
- [ ] Aktualizacja galerii
- [ ] Zdjęcia do news/blog

## 📞 Kontakt

Jeśli potrzebujesz pomocy z:
- Sesją zdjęciową
- Optymalizacją obrazów
- Implementacją kodu

Skontaktuj się z team Bistro Pętla!

---

**Last updated:** 5 lutego 2026  
**Version:** 1.0