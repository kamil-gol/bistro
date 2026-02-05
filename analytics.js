/**
 * Google Analytics 4 - Event Tracking System
 * Version: 1.0
 * Description: Comprehensive analytics tracking for Bistro Pętla
 */

class BistroAnalytics {
    constructor() {
        this.gaId = 'G-XXXXXXXXXX'; // REPLACE WITH YOUR GA4 MEASUREMENT ID
        this.isGALoaded = false;
        this.hasConsent = false;
        this.eventQueue = [];
        
        this.init();
    }

    init() {
        // Check if user has given analytics consent
        this.checkConsent();
        
        // If consent given, load GA4
        if (this.hasConsent) {
            this.loadGA4();
        }
        
        // Setup all event listeners
        this.setupEventListeners();
        
        // Track page view
        this.trackPageView();
        
        console.log('📊 Bistro Analytics initialized');
    }

    checkConsent() {
        // Check if cookie consent manager has approved analytics
        const consent = this.getCookie('bistro_petla_cookie_consent');
        
        if (consent) {
            try {
                const consentData = JSON.parse(consent);
                this.hasConsent = consentData.analytics === true;
            } catch (e) {
                this.hasConsent = false;
            }
        }
    }

    loadGA4() {
        if (this.isGALoaded) return;
        
        // Create script element
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
            'cookie_flags': 'SameSite=None;Secure'
        });

        this.isGALoaded = true;
        
        // Process queued events
        this.processQueue();
        
        console.log('✅ Google Analytics 4 loaded');
    }

    trackEvent(eventName, eventParams = {}) {
        const event = {
            name: eventName,
            params: eventParams,
            timestamp: new Date().toISOString()
        };

        // If no consent or GA not loaded, queue the event
        if (!this.hasConsent || !this.isGALoaded) {
            this.eventQueue.push(event);
            console.log('📝 Event queued:', eventName);
            return;
        }

        // Send event to GA4
        if (window.gtag) {
            gtag('event', eventName, eventParams);
            console.log('📊 Event tracked:', eventName, eventParams);
        }
    }

    processQueue() {
        if (!this.hasConsent || !this.isGALoaded) return;
        
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            this.trackEvent(event.name, event.params);
        }
    }

    trackPageView() {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        };
        
        this.trackEvent('page_view', pageData);
    }

    setupEventListeners() {
        // Track CTA Buttons
        this.trackCTAButtons();
        
        // Track Navigation
        this.trackNavigation();
        
        // Track Delivery Platform Clicks
        this.trackDeliveryClicks();
        
        // Track Phone Clicks
        this.trackPhoneClicks();
        
        // Track Menu Interactions
        this.trackMenuTabs();
        
        // Track Scroll Depth
        this.trackScrollDepth();
        
        // Track Time on Page
        this.trackTimeOnPage();
        
        // Track Section Views
        this.trackSectionViews();
        
        // Track Social Media Clicks
        this.trackSocialClicks();
        
        // Track Cookie Settings
        this.trackCookieInteractions();
    }

    trackCTAButtons() {
        // Hero section buttons
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const buttonText = btn.textContent.trim();
                this.trackEvent('cta_click', {
                    button_text: buttonText,
                    button_location: 'hero',
                    event_category: 'engagement'
                });
            });
        });

        // Primary CTA in nav
        const navCTA = document.querySelector('.btn-primary-nav');
        if (navCTA) {
            navCTA.addEventListener('click', () => {
                this.trackEvent('cta_click', {
                    button_text: 'Zamów Online',
                    button_location: 'navigation',
                    event_category: 'engagement'
                });
            });
        }
    }

    trackNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const linkText = link.textContent.trim();
                const linkHref = link.getAttribute('href');
                
                this.trackEvent('navigation_click', {
                    link_text: linkText,
                    link_url: linkHref,
                    event_category: 'navigation'
                });
            });
        });
    }

    trackDeliveryClicks() {
        // Uber Eats
        const uberBtn = document.querySelector('a[href*="ubereats.com"]');
        if (uberBtn) {
            uberBtn.addEventListener('click', () => {
                this.trackEvent('delivery_platform_click', {
                    platform: 'uber_eats',
                    event_category: 'conversion',
                    event_label: 'order_intent'
                });
            });
        }

        // Pyszne.pl
        const pyszneBtn = document.querySelector('a[href*="pyszne.pl"]');
        if (pyszneBtn) {
            pyszneBtn.addEventListener('click', () => {
                this.trackEvent('delivery_platform_click', {
                    platform: 'pyszne_pl',
                    event_category: 'conversion',
                    event_label: 'order_intent'
                });
            });
        }
    }

    trackPhoneClicks() {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                const phoneNumber = link.getAttribute('href').replace('tel:', '');
                this.trackEvent('phone_click', {
                    phone_number: phoneNumber,
                    event_category: 'conversion',
                    event_label: 'contact_intent'
                });
            });
        });
    }

    trackMenuTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.trackEvent('menu_tab_change', {
                    menu_category: category,
                    event_category: 'engagement',
                    event_label: 'menu_exploration'
                });
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 90, 100];
        const tracked = new Set();

        const checkScroll = () => {
            const scrollPercentage = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            if (scrollPercentage > maxScroll) {
                maxScroll = scrollPercentage;

                milestones.forEach(milestone => {
                    if (scrollPercentage >= milestone && !tracked.has(milestone)) {
                        tracked.add(milestone);
                        this.trackEvent('scroll_depth', {
                            percentage: milestone,
                            event_category: 'engagement',
                            event_label: `scroll_${milestone}`
                        });
                    }
                });
            }
        };

        // Debounced scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(checkScroll, 100);
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        const milestones = [30, 60, 120, 300]; // seconds
        const tracked = new Set();

        const checkTime = () => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);
            
            milestones.forEach(milestone => {
                if (timeSpent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    this.trackEvent('time_on_page', {
                        duration_seconds: milestone,
                        event_category: 'engagement',
                        event_label: `time_${milestone}s`
                    });
                }
            });
        };

        // Check every 10 seconds
        setInterval(checkTime, 10000);

        // Track on page unload
        window.addEventListener('beforeunload', () => {
            const totalTime = Math.floor((Date.now() - startTime) / 1000);
            this.trackEvent('page_exit', {
                time_spent_seconds: totalTime,
                event_category: 'engagement'
            });
        });
    }

    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        const observed = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !observed.has(entry.target.id)) {
                    observed.add(entry.target.id);
                    
                    this.trackEvent('section_view', {
                        section_id: entry.target.id,
                        event_category: 'engagement',
                        event_label: 'section_visibility'
                    });
                }
            });
        }, {
            threshold: 0.5 // 50% of section must be visible
        });

        sections.forEach(section => observer.observe(section));
    }

    trackSocialClicks() {
        const socialLinks = document.querySelectorAll('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="twitter.com"]');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const url = link.getAttribute('href');
                let platform = 'unknown';
                
                if (url.includes('facebook')) platform = 'facebook';
                else if (url.includes('instagram')) platform = 'instagram';
                else if (url.includes('twitter')) platform = 'twitter';
                
                this.trackEvent('social_click', {
                    platform: platform,
                    event_category: 'engagement',
                    event_label: 'social_media'
                });
            });
        });
    }

    trackCookieInteractions() {
        // Track cookie banner interactions
        const acceptBtn = document.getElementById('acceptCookies');
        const declineBtn = document.getElementById('declineCookies');
        const settingsBtn = document.getElementById('cookieSettings');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.trackEvent('cookie_consent', {
                    action: 'accept_all',
                    event_category: 'privacy',
                    event_label: 'gdpr'
                });
            });
        }

        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                this.trackEvent('cookie_consent', {
                    action: 'decline',
                    event_category: 'privacy',
                    event_label: 'gdpr'
                });
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.trackEvent('cookie_consent', {
                    action: 'open_settings',
                    event_category: 'privacy',
                    event_label: 'gdpr'
                });
            });
        }
    }

    // Utility: Get cookie
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Public method: Track custom event
    track(eventName, eventParams) {
        this.trackEvent(eventName, eventParams);
    }

    // Public method: Enable analytics (after consent)
    enable() {
        this.hasConsent = true;
        this.loadGA4();
        console.log('✅ Analytics enabled by user consent');
    }

    // Public method: Disable analytics
    disable() {
        this.hasConsent = false;
        console.log('❌ Analytics disabled by user');
    }
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bistroAnalytics = new BistroAnalytics();
    });
} else {
    window.bistroAnalytics = new BistroAnalytics();
}

console.log('📊 Analytics module loaded');