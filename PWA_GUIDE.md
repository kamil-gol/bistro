# 📱 Progressive Web App (PWA) Guide - Bistro Pętla

## 🎯 Overview

Bistro Pętla jest teraz **Progressive Web App**! Użytkownicy mogą zainstalować stronę jak aplikację mobilną i korzystać z niej offline.

---

## ✅ Co Już Jest Zrobione

### 1. Manifest.json - DONE ✅
- ✅ **Plik:** `manifest.json` - Complete PWA manifest
- ✅ **Metadane:** Name, short_name, description
- ✅ **Theme:** Gold (#d4af37) theme color
- ✅ **Display:** Standalone mode (fullscreen app)
- ✅ **Icons:** 8 sizes (72px to 512px)
- ✅ **Shortcuts:** Quick actions (Menu, Order, Contact)
- ✅ **Categories:** food, restaurant, lifestyle

### 2. Service Worker - DONE ✅
**Plik:** `service-worker.js` (400+ lines)

**Features:**
- ✅ Cache strategies (Cache First, Network First)
- ✅ Precaching critical resources
- ✅ Offline fallback page
- ✅ Auto-update detection
- ✅ Version control (`v1.0.0`)
- ✅ Smart caching:
  - Static assets (CSS, JS): Cache First
  - Images: Cache First with expiration
  - HTML: Network First with fallback
  - Google Fonts: Cache First
- ✅ Background sync (ready for future)
- ✅ Push notifications (ready for future)

### 3. Offline Page - DONE ✅
**Plik:** `offline.html`

**Features:**
- ✅ Beautiful gradient design
- ✅ Retry button
- ✅ Contact info (phone, address)
- ✅ Auto-retry connection (5s intervals)
- ✅ Online event detection
- ✅ Fully responsive
- ✅ Animations

### 4. PWA Manager - DONE ✅
**Plik:** `pwa.js` (400+ lines)

**Class:** `PWAManager`

**Features:**
- ✅ Service Worker registration
- ✅ Install prompt handling
- ✅ Custom install button
- ✅ Update notifications
- ✅ Online/Offline detection
- ✅ Installation success message
- ✅ Analytics integration
- ✅ Auto-update checks (60s interval)

### 5. PWA Meta Tags - DONE ✅

**Added to HTML:**
- ✅ `<meta name="theme-color">` - Gold theme
- ✅ `<link rel="manifest">` - PWA manifest
- ✅ `<meta name="mobile-web-app-capable">` - Android
- ✅ `<meta name="apple-mobile-web-app-capable">` - iOS
- ✅ `<link rel="apple-touch-icon">` - iOS icon
- ✅ `<meta name="msapplication-TileColor">` - Windows
- ✅ Favicon links

### 6. Icon Structure - DONE ✅
**Folder:** `/icons/`

**Required sizes documented:**
- 72x72, 96x96, 128x128, 144x144, 152x152
- 192x192 (required)
- 384x384
- 512x512 (required)
- 180x180 (Apple touch icon)
- 16x16, 32x32 (favicon)

**Documentation:** `/icons/README.md` (500+ lines)
- Icon generation guides
- Design guidelines
- Tools & scripts
- Testing instructions

---

## 🚀 Jak to Działa?

### Install Flow:

1. **Użytkownik odwiedza stronę** 
   → Service Worker rejestruje się w tle
   → Krityczne pliki są cachowane

2. **PWA Manager wykrywa możliwość instalacji**
   → Pojawia się floating button "Zainstaluj Aplikację"

3. **Użytkownik klika "Zainstaluj"**
   → System prompt (Android) lub Add to Home Screen (iOS)

4. **Instalacja kończy się sukcesem**
   → Ikona na ekranie głównym
   → Aplikacja otwiera się w trybie standalone
   → Splash screen z logo

### Offline Mode:

1. **Połączenie z internetem znika**
   → PWA Manager pokazuje toast "Tryb offline"

2. **Użytkownik próbuje otworzyć stronę**
   → Service Worker serwuje z cache
   → Jeśli brak w cache: `offline.html`

3. **Połączenie wraca**
   → Toast "Jesteś online"
   → Auto-refresh (jeśli na offline.html)

### Update Flow:

1. **Nowa wersja Service Workera**
   → Auto-detect (co 60s)

2. **PWA Manager wykrywa update**
   → Pokazuje toast "Dostępna aktualizacja"
   → Button "Odśwież teraz"

3. **Użytkownik klika refresh**
   → Stara wersja SW jest usuwana
   → Nowa wersja aktywuje się
   → Page reload

---

## 📊 Analytics Events (GA4)

PWA Manager trackuje:

- `pwa_install_prompt_shown` - Install prompt displayed
- `pwa_install_choice` - User accepted/dismissed
- `pwa_installed` - App successfully installed
- `connectivity_online` - Back online
- `connectivity_offline` - Went offline

---

## 🎨 User Interface

### Install Button

**Design:**
- Fixed position (bottom right)
- Purple gradient background
- Download icon + text
- Pulse animation
- Smooth slide-in animation
- Responsive (smaller on mobile)

**Behavior:**
- Shows when install is available
- Hides after installation
- Hides on standalone mode

### Toasts

**Types:**
1. **Success** (green gradient) - Installation success
2. **Info** (white) - Update available
3. **Online** (green) - Connection restored
4. **Offline** (red) - Connection lost

**Features:**
- Slide-in animation
- Auto-dismiss (5 seconds)
- Responsive positioning

---

## ⏳ Co Pozostało Do Zrobienia

### 1. Generate PWA Icons (PRIORITY: HIGH)

**Current Status:** Icon structure ready, but actual PNG files needed

**Options to Generate:**

#### Option A: Online Tool (Easiest - 5 min)
1. Go to: https://www.pwabuilder.com/imageGenerator
2. Upload Bistro Pętla logo (SVG from navbar)
3. Select all platforms
4. Download ZIP
5. Extract to `/icons/` folder
6. Done!

#### Option B: Photoshop/GIMP (30 min)
1. Create 512x512px canvas
2. Design logo centered with padding
3. Export as PNG
4. Resize for each size (see icons/README.md)
5. Upload to repo

#### Option C: ImageMagick CLI (10 min)
See icons/README.md for commands

**Required files:**
```
icons/
├── icon-72.png
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png   ← Required!
├── icon-384.png
├── icon-512.png   ← Required!
├── apple-touch-icon.png (180x180)
├── icon-16.png
├── icon-32.png
└── favicon.ico
```

### 2. Testing

#### Lighthouse PWA Audit:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"
5. **Target score:** >90

**Expected checks:**
- ✅ Installable
- ✅ PWA optimized
- ✅ Works offline
- ✅ Fast load times
- ✅ Configured for a custom splash screen

#### Install Test (Android):
1. Open site in Chrome
2. Look for install icon in address bar
3. Tap "Install"
4. Check icon on home screen
5. Open app (should be standalone)
6. Test offline mode (airplane mode)

#### Install Test (iOS):
1. Open site in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Name: "Bistro Pętla"
5. Check icon on home screen
6. Open (limited offline support on iOS)

#### Desktop Install (Chrome/Edge):
1. Look for install icon in address bar
2. Click "Install Bistro Pętla"
3. App opens in separate window
4. Check in OS applications list

---

## 📊 Success Metrics

### PWA Adoption:
- % of users who see install prompt
- % of users who install
- % of sessions from installed app
- Retention rate (installed vs web)

### Performance:
- Lighthouse PWA score (target: >90)
- Time to interactive (target: <3s)
- Offline availability (target: 100%)

### Engagement:
- Sessions per installed user
- Average session duration (installed)
- Return rate (installed users)

**Track in GA4:** All PWA events are already tracked!

---

## 🛠️ Troubleshooting

### Problem: Install button doesn't show

**Check:**
1. HTTPS? (PWA requires HTTPS, except localhost)
2. manifest.json loads? (Network tab)
3. No console errors?
4. Already installed? (Check chrome://apps)

**Solution:**
- Serve over HTTPS (production)
- Or use `localhost` (development)

### Problem: Service Worker not registering

**Check Console:**
```javascript
❌ Service Worker registration failed
```

**Common causes:**
- Path incorrect (must be `/service-worker.js`)
- HTTPS required (except localhost)
- Browser doesn't support SW

**Debug:**
```javascript
// In pwa.js, add:
console.log('SW supported?', 'serviceWorker' in navigator);
```

### Problem: Offline mode doesn't work

**Check:**
1. SW registered? (chrome://serviceworker-internals/)
2. Files cached? (Application tab > Cache Storage)
3. offline.html in cache?

**Force re-cache:**
```javascript
// In Console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
// Then reload page
```

### Problem: Icons not showing

**Check:**
1. Icons exist in `/icons/` folder?
2. Correct paths in `manifest.json`?
3. PNG format, not SVG?
4. Correct sizes?

**Test:**
- Open: `https://your-domain.com/icons/icon-192.png`
- Should display icon

### Problem: Can't update app after changes

**Service Worker is aggressive with caching!**

**Solution A: Hard refresh**
- Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Firefox: Ctrl+F5

**Solution B: Update SW version**
```javascript
// In service-worker.js, change:
const CACHE_VERSION = 'v1.0.1'; // Increment version
```

**Solution C: Bypass cache (dev only)**
- DevTools > Application > Service Workers
- Check "Update on reload"
- Check "Bypass for network"

---

## 🚀 Advanced Features (Future)

### Currently NOT Implemented (but code ready):

#### 1. Push Notifications
**Status:** Code ready in service-worker.js

**To activate:**
1. Request permission:
```javascript
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Subscribe to push service
  }
});
```

2. Setup push service (Firebase Cloud Messaging)
3. Send notifications from backend

**Use cases:**
- Daily menu updates
- Special offers
- Order status (if adding e-commerce)

#### 2. Background Sync
**Status:** Code ready in service-worker.js

**To activate:**
1. Register sync:
```javascript
navigator.serviceWorker.ready.then(registration => {
  registration.sync.register('sync-orders');
});
```

2. Implement `syncOfflineOrders()` in SW

**Use cases:**
- Submit orders while offline
- Sync when connection returns

#### 3. Web Share API
**Status:** Not implemented

**To add:**
```javascript
if (navigator.share) {
  navigator.share({
    title: 'Bistro Pętla',
    text: 'Sprawdź najlepsze bistro w Chorzowie!',
    url: 'https://bistro-petla.pl'
  });
}
```

**Use case:** Share button on menu items

#### 4. Shortcuts Actions
**Status:** Declared in manifest.json, needs handlers

**Current shortcuts:**
- Menu
- Order
- Contact

**To add more:** Edit manifest.json

---

## 📚 Resources

### Official Documentation:
- **Google PWA:** https://web.dev/progressive-web-apps/
- **MDN PWA Guide:** https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- **Service Worker API:** https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

### Tools:
- **Lighthouse:** Built into Chrome DevTools
- **PWA Builder:** https://www.pwabuilder.com/
- **Workbox:** https://developers.google.com/web/tools/workbox (advanced SW library)

### Testing:
- **Chrome DevTools:** Application tab > Service Workers
- **Lighthouse:** DevTools > Lighthouse tab
- **PWA Testing:** https://www.pwabuilder.com/ (score your PWA)

---

## ✅ Checklist Finalny

Przed zamknięciem Sprint 4:

- [x] manifest.json created
- [x] service-worker.js implemented
- [x] offline.html created
- [x] pwa.js manager implemented
- [x] Meta tags added to HTML
- [x] pwa.js integrated
- [x] Icon structure documented
- [ ] **Icons generated** (PNG files) ⏳
- [ ] Lighthouse PWA audit (>90 score) ⏳
- [ ] Install test on Android ⏳
- [ ] Install test on iOS ⏳
- [ ] Offline mode tested ⏳
- [ ] Update mechanism tested ⏳

---

## 🎯 Benefits of PWA

### For Users:
- ✅ **Install without app store** - One tap from browser
- ✅ **Works offline** - View menu without internet
- ✅ **Fast loading** - Cached resources
- ✅ **Native-like** - Fullscreen, no browser UI
- ✅ **Home screen icon** - Easy access
- ✅ **Push notifications** (future) - Stay updated

### For Business:
- ✅ **No app store fees** - 0% commission
- ✅ **Easier updates** - Instant, no approval needed
- ✅ **Better SEO** - Google ranks PWAs higher
- ✅ **Increased engagement** - Installed users return more
- ✅ **Offline access** - Users can browse menu anytime
- ✅ **Analytics** - Full GA4 tracking

### Statistics:
- **Twitter PWA:** 65% increase in pages per session
- **Pinterest PWA:** 60% increase in engagement
- **Starbucks PWA:** 2x daily active users

---

## 📝 Version History

### v1.0.0 (Current)
- ✅ Initial PWA implementation
- ✅ Service Worker with cache strategies
- ✅ Offline support
- ✅ Install prompt
- ✅ Update detection
- ✅ Online/Offline toasts
- ✅ Analytics integration

### Future Versions:
- v1.1.0: Push notifications
- v1.2.0: Background sync
- v1.3.0: Web Share API
- v2.0.0: Full offline ordering

---

**Guide version:** 1.0  
**Last updated:** 5 lutego 2026, 22:35 CET  
**Status:** 🟡 90% Complete - Icons needed!