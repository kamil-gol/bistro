/**
 * Cookie Consent Manager for Bistro Pętla
 * GDPR & RODO Compliant
 * Version 1.0.0
 */

class CookieConsent {
  constructor() {
    this.cookieName = 'bistro-cookie-consent';
    this.consentGiven = this.checkConsent();
    this.init();
  }

  init() {
    if (!this.consentGiven) {
      this.showBanner();
    } else {
      this.loadAnalytics();
    }
  }

  checkConsent() {
    const consent = this.getCookie(this.cookieName);
    return consent === 'accepted';
  }

  showBanner() {
    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h3>🍪 Ta strona używa plików cookie</h3>
          <p>Używamy plików cookie, aby zapewnić najlepszą jakość korzystania z naszej strony oraz analizować ruch. Kontynuując przeglądanie, wyrażasz zgodę na użycie plików cookie zgodnie z naszą <a href="#privacy" class="cookie-link">Polityką Prywatności</a>.</p>
        </div>
        <div class="cookie-consent-buttons">
          <button id="cookie-accept-all" class="cookie-btn cookie-btn-accept">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Akceptuj wszystkie
          </button>
          <button id="cookie-accept-necessary" class="cookie-btn cookie-btn-necessary">
            Tylko nniezbędne
          </button>
          <button id="cookie-settings" class="cookie-btn cookie-btn-settings">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m7.07-12.07l-4.24 4.24m-5.66 5.66l-4.24 4.24m14.14 0l-4.24-4.24m-5.66-5.66l-4.24-4.24"></path>
            </svg>
            Ustawienia
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Add event listeners
    document.getElementById('cookie-accept-all').addEventListener('click', () => {
      this.acceptAll();
    });

    document.getElementById('cookie-accept-necessary').addEventListener('click', () => {
      this.acceptNecessary();
    });

    document.getElementById('cookie-settings').addEventListener('click', () => {
      this.showSettings();
    });
  }

  showSettings() {
    const modal = document.createElement('div');
    modal.id = 'cookie-settings-modal';
    modal.innerHTML = `
      <div class="cookie-modal-overlay"></div>
      <div class="cookie-modal-content">
        <div class="cookie-modal-header">
          <h2>Ustawienia plików cookie</h2>
          <button class="cookie-modal-close" aria-label="Zamknij">×</button>
        </div>
        <div class="cookie-modal-body">
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" checked disabled>
                <span class="cookie-slider"></span>
              </label>
              <div>
                <h3>Niezbędne pliki cookie</h3>
                <p>Te pliki cookie są wymagane do prawidłowego działania strony i nie mogą być wyłączone.</p>
              </div>
            </div>
          </div>
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" id="analytics-toggle" checked>
                <span class="cookie-slider"></span>
              </label>
              <div>
                <h3>Analityczne pliki cookie</h3>
                <p>Pomagają nam zrozumieć, jak użytkownicy korzystają ze strony, dzięki czemu możemy ją ulepszać (Google Analytics).</p>
              </div>
            </div>
          </div>
          <div class="cookie-category">
            <div class="cookie-category-header">
              <label class="cookie-switch">
                <input type="checkbox" id="marketing-toggle">
                <span class="cookie-slider"></span>
              </label>
              <div>
                <h3>Marketingowe pliki cookie</h3>
                <p>Używane do śledzenia odwiedzających na stronach internetowych w celu wyświetlania reklam.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cookie-modal-footer">
          <button id="cookie-save-settings" class="cookie-btn cookie-btn-accept">Zapisz ustawienia</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.cookie-modal-close').addEventListener('click', () => {
      modal.remove();
    });

    modal.querySelector('.cookie-modal-overlay').addEventListener('click', () => {
      modal.remove();
    });

    // Save settings
    document.getElementById('cookie-save-settings').addEventListener('click', () => {
      const analytics = document.getElementById('analytics-toggle').checked;
      const marketing = document.getElementById('marketing-toggle').checked;
      
      this.saveConsent({
        necessary: true,
        analytics: analytics,
        marketing: marketing
      });

      if (analytics) {
        this.loadAnalytics();
      }

      modal.remove();
      document.getElementById('cookie-consent-banner').remove();
    });
  }

  acceptAll() {
    this.saveConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
    this.loadAnalytics();
    document.getElementById('cookie-consent-banner').remove();
  }

  acceptNecessary() {
    this.saveConsent({
      necessary: true,
      analytics: false,
      marketing: false
    });
    document.getElementById('cookie-consent-banner').remove();
  }

  saveConsent(preferences) {
    this.setCookie(this.cookieName, 'accepted', 365);
    this.setCookie('bistro-cookie-preferences', JSON.stringify(preferences), 365);
    this.consentGiven = true;
  }

  loadAnalytics() {
    // Load Google Analytics if consent given
    if (window.loadGoogleAnalytics) {
      window.loadGoogleAnalytics();
    }
  }

  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  }

  getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

// Initialize Cookie Consent when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CookieConsent();
  });
} else {
  new CookieConsent();
}