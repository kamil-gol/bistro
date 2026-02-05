# 📊 Google Analytics 4 Setup Guide - Bistro Pętla

## 🎯 Overview

Kompletny przewodnik po konfiguracji Google Analytics 4 dla strony Bistro Pętla.

---

## ✅ Co Już Jest Zrobione

### 1. Analytics System - DONE ✅
- ✅ **analytics.js** - Kompletny system trackingu
- ✅ **Event tracking** - 10+ typów eventów
- ✅ **Cookie Consent integration** - GDPR compliant
- ✅ **Queue system** - Events zapisywane przed zgodą
- ✅ **Auto-loading** - GA4 ładuje się po zgodzie

### 2. Tracked Events - DONE ✅

#### Conversion Events:
- ✅ `delivery_platform_click` - Uber Eats, Pyszne.pl
- ✅ `phone_click` - Kliknięcia w numer telefonu
- ✅ `cta_click` - Wszystkie CTA buttons

#### Engagement Events:
- ✅ `navigation_click` - Nawigacja po stronie
- ✅ `menu_tab_change` - Zmiana kategorii w menu
- ✅ `scroll_depth` - 25%, 50%, 75%, 90%, 100%
- ✅ `time_on_page` - 30s, 60s, 120s, 300s
- ✅ `section_view` - Viewport tracking sekcji
- ✅ `social_click` - Facebook, Instagram, Twitter

#### Privacy Events:
- ✅ `cookie_consent` - Accept/Decline/Settings

### 3. GDPR Compliance - DONE ✅
- ✅ Blocking GA4 przed zgodą użytkownika
- ✅ Event queue (czeka na zgodę)
- ✅ Anonymize IP enabled
- ✅ SameSite cookies
- ✅ Privacy Policy updated

---

## 🚀 Jak Aktywować Analytics

### Krok 1: Załóż Konto Google Analytics

1. **Przejdź do:** https://analytics.google.com/
2. **Zaloguj się** używając konta Google
3. **Kliknij:** "Start measuring" lub "Zacznij pomiar"

### Krok 2: Utwórz Property

1. **Account name:** "Bistro Pętla"
2. **Property name:** "Bistro Pętla Website"
3. **Reporting time zone:** Poland (GMT+1)
4. **Currency:** Polish Zloty (PLN)
5. **Wybierz:** "Web" platform

### Krok 3: Dodaj Data Stream

1. **Website URL:** https://twoja-domena.pl
2. **Stream name:** "Bistro Pętla Main Site"
3. **Enhanced measurement:** ✅ Enable (recommended)

### Krok 4: Skopiuj Measurement ID

Po utworzeniu stream, zobaczysz **Measurement ID** w formacie:

```
G-XXXXXXXXXX
```

**Przykład:** G-1234567890

### Krok 5: Dodaj ID do Kodu

**Otwórz plik:** `analytics.js`

**Znajdź linię 9:**
```javascript
this.gaId = 'G-XXXXXXXXXX'; // REPLACE WITH YOUR GA4 MEASUREMENT ID
```

**Zamień na swój ID:**
```javascript
this.gaId = 'G-1234567890'; // Twój prawdziwy ID
```

**Zapisz plik i wrzuć na serwer.**

### Krok 6: Zweryfikuj Instalację

1. **Otwórz stronę** w przeglądarce
2. **Otwórz Console** (F12 → Console tab)
3. **Zaakceptuj cookies** (wybierz "Akceptuj wszystkie")
4. **Sprawdź logi:**
   ```
   📊 Analytics module loaded
   📊 Bistro Analytics initialized
   ✅ Google Analytics 4 loaded
   📊 Event tracked: page_view
   ```

5. **W Google Analytics:**
   - Przejdź do: **Realtime** → **Overview**
   - Powinieneś zobaczyć **1 active user** (Ty!)

---

## 📊 Konfiguracja Dashboard

### Conversion Events (Goals)

W GA4, przejdź do **Configure** → **Events** i oznacz jako conversion:

1. ✅ `delivery_platform_click` - Główny conversion goal
2. ✅ `phone_click` - Contact intent
3. ✅ `cta_click` - Engagement goal

**Jak oznaczyć:**
1. Znajdź event w liście
2. Toggle switch "Mark as conversion"
3. Done!

### Custom Dashboard

**Utwórz dashboard z:**

#### Card 1: Conversions Today
- Metric: `delivery_platform_click` (count)
- Time range: Today

#### Card 2: Phone Calls
- Metric: `phone_click` (count)
- Time range: Last 7 days

#### Card 3: Most Popular Menu Category
- Event: `menu_tab_change`
- Dimension: `menu_category`
- Top 5 results

#### Card 4: Average Time on Page
- Metric: Average `time_on_page`
- Time range: Last 30 days

#### Card 5: Scroll Engagement
- Event: `scroll_depth`
- Filter: `percentage = 75`
- Show % of users

#### Card 6: Traffic Sources
- Dimension: `source / medium`
- Metric: Sessions
- Top 10

---

## 📈 Raporty do Monitorowania

### Codzienne (Daily)
- **Realtime users** - Ilu ludzi jest teraz na stronie
- **Delivery clicks** - Ile zamówień może przyjść
- **Phone clicks** - Ile osób dzwoni

### Tygodniowe (Weekly)
- **User acquisition** - Skąd przychodzą użytkownicy
- **Top pages** - Które strony są najpopularniejsze
- **Bounce rate** - Czy ludzie zostają na stronie
- **Average session duration** - Jak długo zostają

### Miesięczne (Monthly)
- **Trends** - Wzrost/spadek ruchu
- **Device breakdown** - Mobile vs Desktop
- **Peak hours** - Kiedy jest najwięcej ruchu
- **Menu preferences** - Które kategorie są najpopularniejsze

---

## 🎯 Conversion Funnel

### Typowy User Journey:

1. **Landing** → `page_view`
2. **Scrolling** → `scroll_depth` (50%+)
3. **Menu exploration** → `menu_tab_change`
4. **Time spent** → `time_on_page` (60s+)
5. **Decision:** 
   - 🎯 **Conversion:** `delivery_platform_click` or `phone_click`
   - ❌ **Bounce:** `page_exit`

### Jak zmierzyć funnel:

**W GA4:**
1. Przejdź do **Explore**
2. Wybierz **Funnel exploration**
3. Dodaj steps:
   - Step 1: page_view
   - Step 2: scroll_depth (50%)
   - Step 3: menu_tab_change
   - Step 4: delivery_platform_click (CONVERSION)

4. Analiza drop-off points

---

## 🔍 Advanced Features

### 1. User Properties

Dodaj custom properties w `analytics.js`:

```javascript
gtag('set', 'user_properties', {
    preferred_delivery: 'uber_eats', // or 'pyszne_pl'
    favorite_category: 'zupy',
    visit_frequency: 'returning'
});
```

### 2. Enhanced E-commerce (Optional)

Jeśli dodasz koszyk na stronie:

```javascript
gtag('event', 'add_to_cart', {
    currency: 'PLN',
    value: 15.00,
    items: [{
        item_id: 'zurek',
        item_name: 'Żurek z kiełbasą',
        price: 15.00,
        quantity: 1
    }]
});
```

### 3. Custom Dimensions

**Przydatne wymiary:**
- Day of week
- Time of day (lunch/dinner)
- Weather (integrate API)
- Promocja aktywna (tak/nie)

---

## 📱 Google Tag Manager (Advanced)

**Zamiast hardcoded GA4, możesz użyć GTM:**

### Zalety:
- ✅ Łatwiejsza edycja bez zmiany kodu
- ✅ A/B testing
- ✅ Multiple analytics tools
- ✅ Advanced triggers

### Setup:
1. Utwórz konto: https://tagmanager.google.com/
2. Dodaj container snippet do `<head>`
3. Konfiguruj tagi w GUI
4. No code changes needed!

---

## 🎓 Jak Czytać Dane - Dla Właściciela

### Dashboard dla Właściciela (Proste)

**Co sprawdzać codziennie:**

1. **Ile osób odwiedziło stronę dzisiaj?**
   - Realtime → Overview → Active users

2. **Ile osób kliknęło "Zamów"?**
   - Events → `delivery_platform_click` → Count today

3. **Ile osób zadzwoniło?**
   - Events → `phone_click` → Count today

4. **Która kategoria menu jest najpopularniejsza?**
   - Events → `menu_tab_change` → Group by `menu_category`

### Co oznaczają liczby:

**Bounce Rate:** % ludzi, którzy wyszli bez interakcji
- ✅ Good: < 50%
- ⚠️ Average: 50-70%
- ❌ Bad: > 70%

**Average Session Duration:** Jak długo ludzie zostają
- ✅ Good: > 2 min
- ⚠️ Average: 1-2 min
- ❌ Bad: < 1 min

**Conversion Rate:** % ludzi, którzy zamówili
- ✅ Excellent: > 5%
- ✅ Good: 3-5%
- ⚠️ Average: 1-3%
- ❌ Poor: < 1%

---

## 🔧 Troubleshooting

### Problem: GA4 nie ładuje się

**Sprawdź:**
1. Czy Measurement ID jest poprawny?
2. Czy zaakceptowałeś cookies (Analytics)?
3. Czy masz AdBlocker? (wyłącz na localhost)
4. Console errors? (F12 → Console)

**Debug mode:**
```javascript
// W analytics.js dodaj:
gtag('config', this.gaId, {
    'debug_mode': true
});
```

### Problem: Events nie są trackowane

**Sprawdź Console:**
```javascript
// Powinieneś widzieć:
📊 Event tracked: [event_name]
```

**Jeśli widzisz:**
```javascript
📝 Event queued: [event_name]
```
→ Brak zgody na analytics cookies!

### Problem: Dane nie pojawiają się w GA4

**GA4 ma opóźnienie:**
- Realtime: natychmiastowe
- Reports: 24-48h delay

**Użyj Realtime:**
GA4 → Realtime → Event count by Event name

---

## 📊 Event Reference

### Pełna lista eventów:

| Event Name | Category | Description | Parameters |
|------------|----------|-------------|------------|
| `page_view` | Default | Page load | page_title, page_location |
| `cta_click` | Engagement | CTA button clicks | button_text, button_location |
| `navigation_click` | Navigation | Nav menu clicks | link_text, link_url |
| `delivery_platform_click` | Conversion | Order platform clicks | platform |
| `phone_click` | Conversion | Phone number clicks | phone_number |
| `menu_tab_change` | Engagement | Menu category change | menu_category |
| `scroll_depth` | Engagement | Scroll milestones | percentage |
| `time_on_page` | Engagement | Time milestones | duration_seconds |
| `section_view` | Engagement | Section viewport | section_id |
| `social_click` | Engagement | Social media links | platform |
| `cookie_consent` | Privacy | Cookie banner actions | action |
| `page_exit` | Engagement | User leaving page | time_spent_seconds |

---

## 🎯 Success Metrics

### KPIs do śledzenia:

**Traffic Metrics:**
- Total users (miesięcznie)
- New vs Returning users
- Sessions per user

**Engagement Metrics:**
- Average session duration
- Pages per session
- Scroll depth (% reaching 75%)

**Conversion Metrics:**
- Delivery platform clicks
- Phone clicks
- Conversion rate

**Menu Metrics:**
- Most viewed category
- Category click-through rate
- Menu exploration rate

---

## 📞 Support

Jeśli potrzebujesz pomocy:

1. **Google Analytics Help:** https://support.google.com/analytics
2. **GA4 Documentation:** https://developers.google.com/analytics/devguides/collection/ga4
3. **Community Forum:** https://support.google.com/analytics/community

---

## ✅ Checklist Finalny

Przed oznaczeniem Sprint 2 jako complete:

- [ ] Konto GA4 utworzone
- [ ] Measurement ID dodany do `analytics.js`
- [ ] Pliki uploaded na serwer
- [ ] Cookies zaakceptowane (test)
- [ ] GA4 ładuje się (sprawdź Console)
- [ ] Realtime pokazuje active user
- [ ] Minimum 3 eventy przetestowane
- [ ] Conversion events oznaczone w GA4
- [ ] Dashboard skonfigurowany
- [ ] Właściciel wie jak czytać dane

---

**Guide version:** 1.0  
**Last updated:** 5 lutego 2026, 22:21 CET  
**Status:** ✅ Complete - Ready for activation!