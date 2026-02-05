# PWA Icons for Bistro Pętla

## Required Icons

This folder should contain the following PWA icons:

### Android/Chrome Icons
- **icon-72.png** (72x72px)
- **icon-96.png** (96x96px)
- **icon-128.png** (128x128px)
- **icon-144.png** (144x144px)
- **icon-152.png** (152x152px)
- **icon-192.png** (192x192px) - Required for Android
- **icon-384.png** (384x384px)
- **icon-512.png** (512x512px) - Required for Android

### iOS Icons
- **apple-touch-icon.png** (180x180px)
- **apple-touch-icon-57x57.png**
- **apple-touch-icon-72x72.png**
- **apple-touch-icon-114x114.png**
- **apple-touch-icon-144x144.png**

### Favicon
- **favicon.ico** (32x32px, 16x16px)
- **favicon-16x16.png**
- **favicon-32x32.png**

### Maskable Icons (Android 13+)
- **icon-192-maskable.png** (192x192px with safe zone)
- **icon-512-maskable.png** (512x512px with safe zone)

---

## How to Generate Icons

### Option 1: Online Tools (Recommended)

1. **PWA Asset Generator**
   - URL: https://www.pwabuilder.com/imageGenerator
   - Upload logo (minimum 512x512px)
   - Download generated icons
   - Extract to this folder

2. **RealFaviconGenerator**
   - URL: https://realfavicongenerator.net/
   - Upload master image
   - Configure for all platforms
   - Download package

### Option 2: Manual Creation

#### Requirements for Logo:
- **Format:** PNG with transparency
- **Size:** 1024x1024px (minimum 512x512px)
- **Design:** Simple, recognizable icon
- **Colors:** Match brand (Bistro Pętla gold #d4af37)
- **Content:** Center logo with padding

#### Using ImageMagick (CLI):

```bash
# Install ImageMagick
brew install imagemagick  # macOS
sudo apt-get install imagemagick  # Linux

# Generate all sizes from master image
convert master-logo.png -resize 72x72 icon-72.png
convert master-logo.png -resize 96x96 icon-96.png
convert master-logo.png -resize 128x128 icon-128.png
convert master-logo.png -resize 144x144 icon-144.png
convert master-logo.png -resize 152x152 icon-152.png
convert master-logo.png -resize 192x192 icon-192.png
convert master-logo.png -resize 384x384 icon-384.png
convert master-logo.png -resize 512x512 icon-512.png
convert master-logo.png -resize 180x180 apple-touch-icon.png

# Generate favicon.ico (multiple sizes)
convert master-logo.png -resize 16x16 favicon-16.png
convert master-logo.png -resize 32x32 favicon-32.png
convert favicon-16.png favicon-32.png favicon.ico
```

### Option 3: Photoshop/GIMP

1. Open master logo (1024x1024px)
2. Export for each size:
   - File → Export As → PNG
   - Set width/height
   - Keep aspect ratio
   - Save with proper name

---

## Icon Design Guidelines

### General Rules:
- ✅ **Simple:** Easy to recognize at small sizes
- ✅ **Bold:** Clear shapes and colors
- ✅ **Consistent:** Match brand identity
- ✅ **Centered:** Logo in center with padding
- ✅ **Transparent background:** PNG with alpha channel

### Maskable Icons:
For Android 13+ adaptive icons:
- **Safe zone:** Keep important content in center 80%
- **Padding:** Minimum 10% padding on all sides
- **No text:** Avoid text in maskable icons

```
┌─────────────────────┐
│                     │  10% padding
│   ┌─────────────┐   │
│   │             │   │
│   │   LOGO      │   │  80% safe zone
│   │             │   │
│   └─────────────┘   │
│                     │  10% padding
└─────────────────────┘
```

---

## Logo Suggestions for Bistro Pętla

### Concept Ideas:

1. **Circular Logo**
   - Circle with fork & knife inside
   - Gold color (#d4af37)
   - Clean, minimal design

2. **Letter Mark**
   - Stylized "BP" or "P" letter
   - Serif font (Playfair Display)
   - Gold on white or white on gold

3. **Food Icon**
   - Plate with steam
   - Chef hat
   - Traditional Polish food element

4. **Current SVG Logo**
   - Convert existing SVG to PNG
   - Scale to required sizes
   - Maintain gold color

---

## Current Status

⚠️ **Icons are currently placeholders**

**To complete PWA setup:**
1. Create/upload master logo (1024x1024px)
2. Generate all required sizes
3. Upload icons to this folder
4. Verify in manifest.json
5. Test installation on devices

---

## Testing Icons

### Chrome DevTools:
1. Open site in Chrome
2. F12 → Application tab
3. Manifest section
4. Check "Icons" - should show all sizes
5. Click icons to preview

### Lighthouse:
1. Run Lighthouse audit
2. Check PWA category
3. "Installable" section should pass
4. Icons should be detected

### Real Devices:
- **Android:** Install PWA, check home screen icon
- **iOS:** Add to Home Screen, check icon
- **Desktop:** Install app, check app icon

---

## Useful Resources

- **PWA Icon Guidelines:** https://web.dev/add-manifest/#icons
- **Maskable Icons:** https://maskable.app/
- **Icon Generator:** https://www.pwabuilder.com/imageGenerator
- **Favicon Generator:** https://realfavicongenerator.net/
- **Android Adaptive Icons:** https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive

---

**Last updated:** 5 lutego 2026, 22:42 CET  
**Status:** ⚠️ Placeholders - Icons needed