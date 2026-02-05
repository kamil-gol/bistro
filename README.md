# Bistro Pętla - Professional Website

## 🍽️ Overview

Welcome to the official repository for **Bistro Pętla** - a modern, responsive website for a charming bistro located in Chorzów, Poland.

This is an enterprise-grade, world-class website featuring:
- ✨ **Stunning animations** and smooth transitions
- 📱 **Fully responsive design** for all devices (mobile, tablet, desktop)
- 🎨 **Modern UI/UX** with beautiful gradients and interactive elements
- ⚡ **Performance-optimized** code
- ♿ **Accessibility-first** approach
- 🎯 **SEO-friendly** structure

## 🏢 About Bistro Pętla

**Address:** ul. Odrodzenia 36, 41-506 Chorzów, Poland  
**Phone:** +48 660 530 211  
**Services:** Traditional Polish cuisine, beverages, artisan ice cream, custom cakes

## 🚀 Features

### Navigation
- Fixed navigation bar with smooth scroll
- Mobile-responsive hamburger menu
- Active link highlighting based on scroll position

### Sections
1. **Hero Section** - Eye-catching animated gradient background with call-to-action buttons
2. **About Section** - Three feature cards showcasing the bistro's values
3. **Menu Section** - Tabbed menu interface with categories:
   - Zupy (Soups)
   - Dania Główne (Main Dishes)
   - Przystawki (Appetizers)
   - Desery (Desserts)
   - Napoje & Lody (Beverages & Ice Cream)
4. **Gallery Section** - Interactive image gallery with hover effects
5. **Order Section** - Direct links to Uber Eats and Pyszne.pl delivery platforms
6. **Contact Section** - Complete contact information with embedded Google Maps
7. **Footer** - Comprehensive footer with quick links and contact details

### Technical Highlights

#### HTML5
- Semantic markup
- Proper meta tags for SEO
- Accessible ARIA labels
- Optimized structure

#### CSS3
- CSS Custom Properties (variables)
- Flexbox and Grid layouts
- Advanced animations and transitions
- Smooth gradient effects
- Mobile-first responsive design
- Optimized for different screen sizes

#### JavaScript (Vanilla)
- Smooth scroll navigation
- Intersection Observer API for scroll animations
- Mobile menu toggle functionality
- Tab-based menu system
- Parallax effects
- Performance-optimized with debouncing
- Keyboard navigation support
- Focus management for accessibility

## 📱 Responsive Design

The website is fully responsive and optimized for:
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
- White: `#ffffff`

### Typography
- Headings: **Playfair Display** (Serif)
- Body: **Inter** (Sans-serif)

### Animations
- Smooth fade-in effects
- Hover transformations
- Gradient animations
- Parallax scrolling
- Tab transitions

## 🛠️ Installation & Usage

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/kamil-gol/bistro.git
cd bistro
```

2. Open `index.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply open the file
open index.html
```

3. The website will be available at `http://localhost:8000`

### Deployment

This website can be deployed to:
- **GitHub Pages** (recommended for this repo)
- **Netlify**
- **Vercel**
- Any static hosting service

#### GitHub Pages Deployment

1. Go to repository Settings
2. Navigate to "Pages" section
3. Select "main" branch as source
4. Click "Save"
5. Your site will be live at `https://kamil-gol.github.io/bistro/`

## 📂 File Structure

```
bistro/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Documentation (this file)
```

## 🔧 Customization

### Changing Colors
Edit CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #d4af37;  /* Change primary color */
    --secondary-color: #2c3e50; /* Change secondary color */
    /* ... */
}
```

### Adding Menu Items
Add new menu items in the appropriate category in `index.html`:

```html
<div class="menu-item">
    <div class="menu-item-header">
        <h3>Dish Name</h3>
        <span class="price">XX,XX zł</span>
    </div>
    <p class="menu-description">Description here</p>
</div>
```

### Modifying Content
All content can be easily modified by editing the HTML file. Look for:
- Contact information in the `#contact` section
- Menu items in the `#menu` section
- About text in the `#about` section

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## ⚡ Performance

- Optimized CSS with minimal redundancy
- Vanilla JavaScript (no heavy frameworks)
- Lazy loading for images (can be added)
- Debounced scroll events
- Efficient animations

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)
- Responsive text sizing

## 📈 SEO Optimization

- Proper meta tags
- Semantic HTML structure
- Alt text for images (when added)
- Fast loading times
- Mobile-friendly design

## 🤝 Contributing

This is a client project, but suggestions are welcome! Please:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

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
- The Bistro Pętla team for their trust and collaboration

---

**Built with ❤️ and ☕ for Bistro Pętla**

*Last updated: February 2026*