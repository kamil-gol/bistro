/**
 * Google Analytics 4 Implementation
 * Bistro Pętla - Advanced Event Tracking
 * Version: 1.0
 */

class AnalyticsManager {
    constructor() {
        this.gaId = 'G-XXXXXXXXXX'; // REPLACE WITH YOUR GA4 MEASUREMENT ID
        this.initialized = false;
        this.cookieConsent = null;
        this.debugMode = false; // Set to true for testing
        
        this.init();
    }

    /**
     * Initialize Analytics
     */
    init() {
        // Wait for cookie consent
        if (typeof window.cookieConsent !== 'undefined') {
            this.cookieConsent = window.cookieConsent;
            
            // Check if analytics consent was given
            const consent = this.cookieConsent.getCookie('bistro_petla_cookie_consent');
            if (consent) {
                const preferences = JSON.parse(consent);
                if (preferences.analytics) {
                    this.loadGA4();
                }
            }
        } else {
            // Retry after cookie consent loads
            setTimeout(() => this.init(), 500);
        }
    }

    /**
     * Load Google Analytics 4
     */
    loadGA4() {
        if (this.initialized) return;

        // Load gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        document.head.appendChild(script);

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        
        gtag('js', new Date());
        gtag('config', this.gaId, {
            'anonymize_ip': true,
            'cookie_flags': 'SameSite=None;Secure',
            'send_page_view': true
        });

        this.initialized = true;
        this.setupEventTracking();
        
        if (this.debugMode) {
            console.log('✅ Google Analytics 4 loaded:', this.gaId);
        }
    }

    /**
     * Setup all event tracking
     */
    setupEventTracking() {
        this.trackNavigation();
        this.trackCTAButtons();
        this.trackMenuInteractions();
        this.trackOrderButtons();
        this.trackContactActions();
        this.trackSocialLinks();
        this.trackScrollDepth();
        this.trackTimeOnPage();
        this.trackNewsClicks();
    }

    /**
     * Track navigation clicks
     */
    trackNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('href').replace('#', '');
                this.trackEvent('navigation', {
                    'event_category': 'engagement',
                    'event_label': section,
                    'navigation_type': 'menu'
                });
            });
        });
    }

    /**
     * Track CTA buttons (Call to Action)
     */
    trackCTAButtons() {
        // Hero buttons
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const btnText = e.target.textContent.trim();
                this.trackEvent('cta_click', {
                    'event_category': 'engagement',
                    'event_label': btnText,
                    'button_location': 'hero'
                });
            });
        });

        // Primary nav button
        const navBtn = document.querySelector('.btn-primary-nav');
        if (navBtn) {
            navBtn.addEventListener('click', () => {
                this.trackEvent('cta_click', {
                    'event_category': 'engagement',
                    'event_label': 'Zamów Online',
                    'button_location': 'navigation'
                });
            });
        }
    }

    /**
     * Track menu interactions
     */
    trackMenuInteractions() {
        // Menu tab clicks
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.trackEvent('menu_category_view', {
                    'event_category': 'menu',
                    'event_label': category,
                    'interaction_type': 'tab_click'
                });
            });
        });

        // Track time spent viewing each menu category
        const observeMenuCategory = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const category = entry.target.getAttribute('data-category');
                    this.trackEvent('menu_category_viewed', {
                        'event_category': 'menu',
                        'event_label': category,
                        'interaction_type': 'scroll_view'
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.menu-category').forEach(cat => {
            observeMenuCategory.observe(cat);
        });
    }

    /**
     * Track order button clicks
     */
    trackOrderButtons() {
        // Uber Eats button
        const uberBtn = document.querySelector('.delivery-btn.uber');
        if (uberBtn) {
            uberBtn.addEventListener('click', () => {
                this.trackEvent('order_click', {
                    'event_category': 'conversion',
                    'event_label': 'Uber Eats',
                    'platform': 'uber_eats',
                    'value': 1
                });
            });
        }

        // Pyszne.pl button
        const pyszneBtn = document.querySelector('.delivery-btn.pyszne');
        if (pyszneBtn) {
            pyszneBtn.addEventListener('click', () => {
                this.trackEvent('order_click', {
                    'event_category': 'conversion',
                    'event_label': 'Pyszne.pl',
                    'platform': 'pyszne',
                    'value': 1
                });
            });
        }
    }

    /**
     * Track contact actions
     */
    trackContactActions() {
        // Phone number clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
            tel.addEventListener('click', (e) => {
                const number = e.target.getAttribute('href').replace('tel:', '');
                this.trackEvent('contact_phone', {
                    'event_category': 'contact',
                    'event_label': number,
                    'contact_method': 'phone'
                });
            });
        });

        // Email clicks
        document.querySelectorAll('a[href^="mailto:"]').forEach(email => {
            email.addEventListener('click', (e) => {
                const address = e.target.getAttribute('href').replace('mailto:', '');
                this.trackEvent('contact_email', {
                    'event_category': 'contact',
                    'event_label': address,
                    'contact_method': 'email'
                });
            });
        });

        // Map interaction
        const mapIframe = document.querySelector('.contact-map iframe');
        if (mapIframe) {
            mapIframe.addEventListener('click', () => {
                this.trackEvent('map_interaction', {
                    'event_category': 'contact',
                    'event_label': 'Google Maps',
                    'interaction_type': 'click'
                });
            });
        }
    }

    /**
     * Track social media links
     */
    trackSocialLinks() {
        document.querySelectorAll('a[href*="facebook.com"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('social_click', {
                    'event_category': 'engagement',
                    'event_label': 'Facebook',
                    'social_network': 'facebook'
                });
            });
        });

        document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
            link.addEventListener('click', () => {
                this.trackEvent('social_click', {
                    'event_category': 'engagement',
                    'event_label': 'Instagram',
                    'social_network': 'instagram'
                });
            });
        });
    }

    /**
     * Track scroll depth
     */
    trackScrollDepth() {
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();

        window.addEventListener('scroll', this.debounce(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;

            milestones.forEach(milestone => {
                if (scrolled >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    this.trackEvent('scroll_depth', {
                        'event_category': 'engagement',
                        'event_label': `${milestone}%`,
                        'percent_scrolled': milestone
                    });
                }
            });
        }, 500));
    }

    /**
     * Track time on page
     */
    trackTimeOnPage() {
        const startTime = Date.now();
        const intervals = [30, 60, 120, 300]; // seconds
        const tracked = new Set();

        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            intervals.forEach(interval => {
                if (timeSpent >= interval && !tracked.has(interval)) {
                    tracked.add(interval);
                    this.trackEvent('time_on_page', {
                        'event_category': 'engagement',
                        'event_label': `${interval}s`,
                        'time_seconds': interval
                    });
                }
            });
        }, 10000); // Check every 10 seconds
    }

    /**
     * Track news article clicks
     */
    trackNewsClicks() {
        document.querySelectorAll('.news-read-more').forEach(link => {
            link.addEventListener('click', (e) => {
                const card = e.target.closest('.news-card');
                const title = card ? card.querySelector('.news-title').textContent : 'Unknown';
                const category = card ? card.querySelector('.news-category').textContent : 'Unknown';
                
                this.trackEvent('news_article_click', {
                    'event_category': 'content',
                    'event_label': title,
                    'article_category': category
                });
            });
        });
    }

    /**
     * Track custom event
     * @param {string} eventName - Name of the event
     * @param {object} params - Event parameters
     */
    trackEvent(eventName, params = {}) {
        if (!this.initialized) {
            if (this.debugMode) {
                console.warn('⚠️ Analytics not initialized yet');
            }
            return;
        }

        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
            
            if (this.debugMode) {
                console.log('📊 Event tracked:', eventName, params);
            }
        }
    }

    /**
     * Track page view (for SPA navigation)
     * @param {string} pagePath - Page path
     * @param {string} pageTitle - Page title
     */
    trackPageView(pagePath, pageTitle) {
        if (!this.initialized) return;

        if (typeof gtag !== 'undefined') {
            gtag('config', this.gaId, {
                'page_path': pagePath,
                'page_title': pageTitle
            });
            
            if (this.debugMode) {
                console.log('📄 Page view tracked:', pagePath);
            }
        }
    }

    /**
     * Track conversion (goal completion)
     * @param {string} conversionName - Name of conversion
     * @param {number} value - Monetary value (optional)
     */
    trackConversion(conversionName, value = 0) {
        if (!this.initialized) return;

        this.trackEvent('conversion', {
            'event_category': 'conversion',
            'event_label': conversionName,
            'value': value,
            'currency': 'PLN'
        });
    }

    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize Analytics Manager
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.analyticsManager = new AnalyticsManager();
    });
} else {
    window.analyticsManager = new AnalyticsManager();
}

console.log('📊 Analytics Manager loaded');