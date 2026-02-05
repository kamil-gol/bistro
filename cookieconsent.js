/**
 * Cookie Consent Manager - GDPR Compliant
 * Version: 1.0
 * Description: Manages cookie consent for Bistro Pętla website
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'bistro_petla_cookie_consent';
        this.cookieExpiry = 365; // days
        this.categories = {
            necessary: true,  // Always true
            analytics: false,
            marketing: false
        };
        
        this.init();
    }

    init() {
        // Check if consent already given
        const consent = this.getCookie(this.cookieName);
        
        if (!consent) {
            // Show banner after short delay
            setTimeout(() => {
                this.showBanner();
            }, 1000);
        } else {
            // Load previously saved preferences
            this.categories = JSON.parse(consent);
            this.loadScripts();
        }

        // Setup event listeners
        this.setupEventListeners();
    }

    showBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.add('show');
        }
    }

    hideBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 400);
        }
    }

    showModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Set current preferences in modal
            document.getElementById('analyticsToggle').checked = this.categories.analytics;
            document.getElementById('marketingToggle').checked = this.categories.marketing;
        }
    }

    hideModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    acceptAll() {
        this.categories = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        this.saveConsent();
        this.loadScripts();
        this.hideBanner();
        this.hideModal();
        
        // Track acceptance (only if analytics enabled)
        if (window.gtag && this.categories.analytics) {
            gtag('event', 'cookie_consent', {
                'event_category': 'engagement',
                'event_label': 'accept_all'
            });
        }
    }

    declineAll() {
        this.categories = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.saveConsent();
        this.hideBanner();
        this.hideModal();
    }

    savePreferences() {
        this.categories = {
            necessary: true,
            analytics: document.getElementById('analyticsToggle').checked,
            marketing: document.getElementById('marketingToggle').checked
        };
        this.saveConsent();
        this.loadScripts();
        this.hideModal();
        this.hideBanner();
    }

    saveConsent() {
        const consentData = JSON.stringify(this.categories);
        this.setCookie(this.cookieName, consentData, this.cookieExpiry);
    }

    loadScripts() {
        // Load Google Analytics if consent given
        if (this.categories.analytics && !window.gaLoaded) {
            this.loadGoogleAnalytics();
        }

        // Load marketing scripts if consent given
        if (this.categories.marketing && !window.marketingLoaded) {
            this.loadMarketingScripts();
        }
    }

    loadGoogleAnalytics() {
        // Placeholder for Google Analytics
        // Replace 'G-XXXXXXXXXX' with actual GA4 measurement ID
        /*
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
            'anonymize_ip': true
        });
        */
        
        window.gaLoaded = true;
        console.log('✅ Google Analytics would be loaded here (add your GA4 ID)');
    }

    loadMarketingScripts() {
        // Placeholder for marketing scripts (Facebook Pixel, Google Ads, etc.)
        window.marketingLoaded = true;
        console.log('✅ Marketing scripts would be loaded here');
    }

    setupEventListeners() {
        // Accept all button
        const acceptBtn = document.getElementById('acceptCookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }

        // Decline button
        const declineBtn = document.getElementById('declineCookies');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => this.declineAll());
        }

        // Settings button
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showModal());
        }

        // Modal close button
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }

        // Save preferences button
        const saveBtn = document.getElementById('savePreferences');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.savePreferences());
        }

        // Cookie settings link in footer
        const footerLink = document.getElementById('cookieSettingsLink');
        if (footerLink) {
            footerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal();
            });
        }

        // Close modal on backdrop click
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }

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

    deleteCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/;';
    }
}

// Initialize Cookie Consent when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cookieConsent = new CookieConsent();
    });
} else {
    window.cookieConsent = new CookieConsent();
}

console.log('🍪 Cookie Consent Manager loaded');