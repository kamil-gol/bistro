# PWA Icons Guide

## Required Icons

For full PWA support, you need icons in the following sizes:

### Android/Chrome:
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px (required)
- 384x384px
- 512x512px (required)

### iOS/Safari:
- 180x180px (apple-touch-icon)

### Windows/Microsoft:
- 144x144px

### Favicon:
- 16x16px
- 32x32px
- favicon.ico (multi-size)

## Icon Design Guidelines

### Design Requirements:
1. **Square format** (1:1 ratio)
2. **PNG format** (with transparency)
3. **Centered logo** with padding
4. **Simple, recognizable design**
5. **Works at small sizes** (16x16)

### Safe Zone:
- Keep important content within **80% of icon size**
- Leave 10% padding on all sides
- For maskable icons: 40% safe zone in center

### Color:
- Use brand colors: `#d4af37` (gold) on white or transparent
- High contrast for visibility
- Consider dark mode appearance

## Generating Icons

### Option 1: Online Tools (Easiest)

**PWA Asset Generator:**
https://www.pwabuilder.com/imageGenerator

1. Upload a 512x512px source image
2. Select "iOS, Android, and Windows"
3. Download the package
4. Extract to `/icons/` folder

**Favicon Generator:**
https://realfavicongenerator.net/

1. Upload your logo
2. Customize for each platform
3. Download and extract

### Option 2: Using Photoshop/GIMP

1. Create 512x512px canvas
2. Design centered logo with padding
3. Export as PNG
4. Resize for each required size:
   - Use "Bicubic Sharper" for downscaling
   - Maintain transparency
   - Optimize for web (Save for Web)

### Option 3: Command Line (ImageMagick)

```bash
# Install ImageMagick first
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# Generate all sizes from source
convert icon-source.png -resize 72x72 icon-72.png
convert icon-source.png -resize 96x96 icon-96.png
convert icon-source.png -resize 128x128 icon-128.png
convert icon-source.png -resize 144x144 icon-144.png
convert icon-source.png -resize 152x152 icon-152.png
convert icon-source.png -resize 192x192 icon-192.png
convert icon-source.png -resize 384x384 icon-384.png
convert icon-source.png -resize 512x512 icon-512.png
convert icon-source.png -resize 180x180 apple-touch-icon.png

# Generate favicon.ico (multi-size)
convert icon-source.png -resize 16x16 -resize 32x32 -resize 48x48 favicon.ico
```

### Option 4: Node.js Script

```bash
npm install sharp
```

```javascript
// generate-icons.js
const sharp = require('sharp');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const source = 'icon-source.png';

sizes.forEach(size => {
  sharp(source)
    .resize(size, size)
    .toFile(`icon-${size}.png`)
    .then(() => console.log(`✅ Generated icon-${size}.png`))
    .catch(err => console.error(err));
});

// Apple touch icon
sharp(source)
  .resize(180, 180)
  .toFile('apple-touch-icon.png')
  .then(() => console.log('✅ Generated apple-touch-icon.png'));
```

Run: `node generate-icons.js`

## Maskable Icons (Android 13+)

Maskable icons adapt to different shapes (circle, square, rounded square).

### Requirements:
- **Safe zone:** Important content in center 40%
- **Full bleed:** Design extends to edges
- **No transparency:** Use solid background

### Test Your Maskable Icon:
https://maskable.app/

1. Upload your icon
2. Preview in different shapes
3. Adjust if needed

## Quick Setup

For Bistro Pętla logo:

1. **Create source:** 512x512px PNG
   - Gold circular logo (from navbar SVG)
   - White or transparent background
   - Centered with padding

2. **Generate all sizes** using one of the methods above

3. **Place in `/icons/` folder:**
   ```
   icons/
   ├── icon-72.png
   ├── icon-96.png
   ├── icon-128.png
   ├── icon-144.png
   ├── icon-152.png
   ├── icon-192.png
   ├── icon-384.png
   ├── icon-512.png
   ├── apple-touch-icon.png
   └── favicon.ico
   ```

4. **Update HTML:** Icons are already referenced in manifest.json

## Apple Touch Icon

For iOS home screen:

```html
<!-- Add to <head> in index.html -->
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
```

Size: **180x180px**

## Favicon

For browser tabs:

```html
<!-- Add to <head> in index.html -->
<link rel="icon" type="image/x-icon" href="/icons/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png">
```

## Testing

After adding icons:

1. **Lighthouse PWA Audit:**
   - Open DevTools (F12)
   - Go to "Lighthouse" tab
   - Select "Progressive Web App"
   - Click "Generate report"
   - Check "Installability" section

2. **Install test:**
   - Chrome: Look for install button in address bar
   - Mobile: "Add to Home Screen" option in menu

3. **Visual check:**
   - Install app
   - Check icon on home screen
   - Open app and check splash screen

## Resources

- **PWA Builder:** https://www.pwabuilder.com/
- **Favicon Generator:** https://realfavicongenerator.net/
- **Maskable.app:** https://maskable.app/
- **Google PWA Icons:** https://web.dev/add-manifest/
- **Apple Guidelines:** https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/

---

**Current Status:** Icons needed - generate from logo
**Priority:** High (required for PWA installability)
**Estimated time:** 30 minutes with online tool