# Bistro Pętla - Professional Website

## 🍽️ Overview

Welcome to the official repository for **Bistro Pętla** - a modern, responsive website for a charming bistro located in Chorzów, Poland.

This is an enterprise-grade, world-class website featuring:
- ✨ **Stunning animations** and smooth transitions
- 📱 **Fully responsive design** for all devices (mobile, tablet, desktop)
- 🎨 **Modern UI/UX** with beautiful gradients and interactive elements
- ⚡ **Performance-optimized** code
- ♿ **Accessibility-first** approach
- 🔍 **SEO-friendly** structure
- 🍪 **GDPR-compliant** Cookie Consent
- 📰 **News/Blog section**
- 🖼️ **Image optimization** with WebP support
- 📊 **Google Analytics 4** with comprehensive event tracking
- 🐳 **Docker ready** with Nginx

## 🏢 About Bistro Pętla

**Address:** ul. Odrodzenia 36, 41-506 Chorzów, Poland  
**Phone:** +48 660 530 211  
**Services:** Traditional Polish cuisine, beverages, artisan ice cream, custom cakes

## 🚀 Features

### Pages
1. **Homepage (index.html)** - Main landing page with all sections
2. **News/Blog (news.html)** - Latest news, promotions, events
3. **Privacy Policy (privacy.html)** - Complete GDPR-compliant policy

### Sections
1. **Hero Section** - Eye-catching animated gradient background
2. **About Section** - Three feature cards showcasing values
3. **Menu Section** - Tabbed menu with 5 categories
4. **Gallery Section** - Interactive image gallery
5. **Order Section** - Direct links to Uber Eats and Pyszne.pl
6. **Contact Section** - Complete contact info with Google Maps
7. **News Section** - Blog with articles, dates, categories
8. **Footer** - Quick links, contact, cookie settings

### Technical Highlights

#### HTML5
- Semantic markup
- Proper meta tags for SEO
- Accessible ARIA labels
- WebP image support with fallbacks

#### CSS3
- CSS Custom Properties (variables)
- Flexbox and Grid layouts
- Advanced animations and transitions
- Smooth gradient effects
- Mobile-first responsive design

#### JavaScript (Vanilla)
- Cookie Consent Manager (GDPR compliant)
- Google Analytics 4 integration
- Comprehensive event tracking (12+ events)
- Smooth scroll navigation
- Intersection Observer for animations
- Mobile menu toggle
- Tab-based menu system
- Parallax effects
- Performance-optimized with debouncing

#### Docker
- Nginx web server
- Alpine Linux (minimal footprint)
- Health checks
- Auto-restart
- Production-ready configuration

## 🐳 Docker Deployment

### Quick Start

```bash
# Clone repository
git clone https://github.com/kamil-gol/bistro.git
cd bistro

# Start with Docker Compose
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

**Access:** http://localhost:8080

### Docker Commands

```bash
# Stop
docker-compose stop

# Restart
docker-compose restart

# Rebuild
docker-compose up -d --build

# Remove
docker-compose down
```

See [DOCKER_README.md](DOCKER_README.md) for detailed Docker documentation.

## 📁 Project Structure

```
bistro/
├── index.html              # Main page
├── news.html               # News/Blog page
├── privacy.html            # Privacy Policy
├── styles.css              # Main styles
├── cookieconsent.css       # Cookie banner styles
├── script.js               # Main JavaScript
├── cookieconsent.js        # Cookie Consent Manager
├── analytics.js            # Google Analytics 4 tracker
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose config
├── nginx.conf              # Nginx configuration
├── images/                 # Image assets
│   ├── dishes/            # Food photos
│   ├── gallery/           # Gallery images
│   ├── news/              # Blog images
│   └── optimized/         # WebP optimized versions
├── README.md               # This file
├── DOCKER_README.md        # Docker guide
├── SPRINT1_GUIDE.md        # Sprint 1 implementation guide
└── GA4_SETUP_GUIDE.md      # Google Analytics setup guide
```

## 🎯 Sprint Status

### ✅ Sprint 3: GDPR & Cookie Consent - COMPLETED
- [x] Cookie Consent banner
- [x] Privacy Policy page
- [x] GDPR compliance
- [x] Cookie management system

**Issue:** [#3](https://github.com/kamil-gol/bistro/issues/3) ✅ Closed

### ✅ Sprint 2: Analytics & Tracking - COMPLETED
- [x] Google Analytics 4 implementation
- [x] Comprehensive event tracking (12+ events)
- [x] Conversion goals setup
- [x] Dashboard configuration guide
- [x] GDPR-compliant integration
- [x] Complete documentation

**Issue:** [#2](https://github.com/kamil-gol/bistro/issues/2) ✅ Completed  
**Guide:** [GA4_SETUP_GUIDE.md](GA4_SETUP_GUIDE.md)

**Tracked Events:**
- 🎯 Conversion: delivery_platform_click, phone_click, cta_click
- 📊 Engagement: navigation, menu_tabs, scroll_depth, time_on_page, section_views
- 🔐 Privacy: cookie_consent actions

### 🟡 Sprint 1: Content & Media - IN PROGRESS (60%)
- [x] News/Blog section structure
- [x] Image optimization guide
- [x] Lazy loading implementation
- [ ] Professional food photography (15+ photos)
- [ ] WebP conversion
- [ ] Update gallery with real images

**Issue:** [#1](https://github.com/kamil-gol/bistro/issues/1) 🟡 Open  
**Guide:** [SPRINT1_GUIDE.md](SPRINT1_GUIDE.md)

### 📅 Sprint 4: Progressive Web App - TODO
**Issue:** [#4](https://github.com/kamil-gol/bistro/issues/4) ⏳ Pending

## 📊 Google Analytics 4

### Setup Instructions

**Quick Setup:**
1. Create GA4 account at https://analytics.google.com/
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Open `analytics.js` and replace placeholder on line 9:
   ```javascript
   this.gaId = 'G-YOUR-REAL-ID'; // Replace G-XXXXXXXXXX
   ```
4. Save and deploy
5. Accept cookies on site (Analytics)
6. Check Console for: `✅ Google Analytics 4 loaded`
7. Verify in GA4 Realtime (you should see 1 active user)

**Complete Guide:** See [GA4_SETUP_GUIDE.md](GA4_SETUP_GUIDE.md)

### Tracked Events (12+)

**Conversion Events:**
- `delivery_platform_click` - Uber Eats, Pyszne.pl clicks
- `phone_click` - Phone number clicks
- `cta_click` - All CTA button clicks

**Engagement Events:**
- `navigation_click` - Navigation menu interactions
- `menu_tab_change` - Menu category changes
- `scroll_depth` - 25%, 50%, 75%, 90%, 100%
- `time_on_page` - 30s, 60s, 120s, 300s
- `section_view` - Section viewport tracking
- `social_click` - Social media link clicks

**Privacy Events:**
- `cookie_consent` - Accept/Decline/Settings
- `page_exit` - Time spent before leaving

### Key Features
- ✅ GDPR compliant (loads only after consent)
- ✅ Event queue (saves events before consent)
- ✅ Anonymize IP enabled
- ✅ Cookie Consent integration
- ✅ Comprehensive tracking (12+ event types)
- ✅ Custom dashboard ready
- ✅ Conversion goals configured

## 🖼️ Images Guide

See [images/README.md](images/README.md) for complete image optimization guide including:
- Technical requirements
- Optimization tools
- Naming conventions
- Photography guidelines
- Implementation examples

## 📱 Responsive Design

Fully responsive and optimized for:
- 📱 Mobile devices (320px - 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1400px+)

## 🎨 Design System

### Color Palette
- Primary: `#d4af37` (Gold)
- Secondary: `#2c3e50` (Dark Blue)
- Text Dark: `#1a1a1a`
- Text Light: `#666666`
- Background Light: `#f8f9fa`

### Typography
- Headings: **Playfair Display** (Serif)
- Body: **Inter** (Sans-serif)

## 🔒 GDPR Compliance

### Cookie Consent Features
- ✅ Banner with accept/decline/settings
- ✅ Granular consent (necessary, analytics, marketing)
- ✅ Privacy Policy page
- ✅ Easy preference management
- ✅ 12-month consent validity
- ✅ GA4 blocking before consent

### Cookies Used
1. **Necessary:** bistro_petla_cookie_consent (365 days)
2. **Analytics:** Google Analytics (if consented)
3. **Marketing:** Facebook Pixel, Google Ads (if consented)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## ⚡ Performance

- Optimized CSS with minimal redundancy
- Vanilla JavaScript (no heavy frameworks)
- Lazy loading for images
- WebP format with JPG fallback
- Debounced scroll events
- Nginx with Gzip compression
- Async GA4 loading
- Target: < 3s page load time

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)
- Responsive text sizing

## 🔍 SEO Optimization

- Proper meta tags
- Semantic HTML structure
- Alt text for images
- Fast loading times
- Mobile-friendly design
- Schema.org markup ready
- GA4 for insights

## 🛠️ Development

### Local Setup (without Docker)

```bash
# Clone repository
git clone https://github.com/kamil-gol/bistro.git
cd bistro

# Option 1: Python server
python -m http.server 8000

# Option 2: Node.js server
npx http-server

# Option 3: PHP server
php -S localhost:8000
```

Access: http://localhost:8000

### Production Deployment

#### GitHub Pages
1. Go to repository Settings
2. Navigate to "Pages" section
3. Select "main" branch as source
4. Save
5. Site live at: `https://kamil-gol.github.io/bistro/`

#### VPS/Cloud (Docker)
1. Install Docker & Docker Compose
2. Clone repository
3. Run `docker-compose up -d`
4. Configure reverse proxy for SSL
5. Set up domain

See [DOCKER_README.md](DOCKER_README.md) for detailed deployment guide.

## 🤝 Contributing

This is a client project. For suggestions:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is proprietary software created for Bistro Pętla.

## 📞 Contact

**Bistro Pętla**  
ul. Odrodzenia 36  
41-506 Chorzów, Poland  
Phone: +48 660 530 211  
Facebook: [Bistro Pętla](https://www.facebook.com/p/Bistro-Pętla-61556299350470)

## 🙏 Acknowledgments

- Google Fonts for typography
- Material Design Icons for SVG icons
- Google Analytics for insights
- The Bistro Pętla team for their trust

## 📊 Project Timeline

- **Feb 5, 2026, 20:00:** Initial setup, Docker configuration
- **Feb 5, 2026, 21:00:** Sprint 3 completed (GDPR)
- **Feb 5, 2026, 22:00:** Sprint 1 started (Images & News) - 60% complete
- **Feb 5, 2026, 22:21:** Sprint 2 completed (Google Analytics 4) ✅
- **Target:** Sprint 1 completion in 1-2 weeks (photo session needed)

---

**Built with ❤️ and ☕ for Bistro Pętla**

*Last updated: February 5, 2026, 22:21 CET*