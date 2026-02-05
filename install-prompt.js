/**
 * PWA Install Prompt Manager for Bistro Pętla
 * Version: 1.0.0
 * Handles custom install prompt and installation tracking
 */

class PWAInstallPrompt {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.platform = this.detectPlatform();
        
        this.init();
    }

    init() {
        // Check if already installed
        this.checkIfInstalled();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Create install UI if not installed
        if (!this.isInstalled) {
            this.createInstallUI();
        }
        
        console.log('📱 PWA Install Prompt initialized');
    }

    detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        if (/iphone|ipad|ipod/.test(userAgent)) {
            return 'ios';
        } else if (/android/.test(userAgent)) {
            return 'android';
        } else if (/win/.test(userAgent)) {
            return 'windows';
        } else if (/mac/.test(userAgent)) {
            return 'macos';
        } else {
            return 'other';
        }
    }

    checkIfInstalled() {
        // Check if running in standalone mode (installed)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('✅ PWA is installed');
            return;
        }
        
        // Check if running as PWA on iOS
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('✅ PWA is installed (iOS)');
            return;
        }
        
        console.log('📱 PWA not installed');
    }

    setupEventListeners() {
        // Listen for beforeinstallprompt event (Chrome/Edge)
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('📱 beforeinstallprompt event fired');
            
            // Prevent default mini-infobar
            e.preventDefault();
            
            // Store event for later use
            this.deferredPrompt = e;
            
            // Show custom install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('✅ PWA installed successfully');
            
            this.isInstalled = true;
            this.deferredPrompt = null;
            
            // Hide install UI
            this.hideInstallUI();
            
            // Track installation
            this.trackInstall('success');
            
            // Show thank you message
            this.showThankYouMessage();
        });

        // Listen for display mode changes
        window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
            if (e.matches) {
                this.isInstalled = true;
                console.log('✅ Switched to standalone mode');
            }
        });
    }

    createInstallUI() {
        // Create install banner
        const banner = document.createElement('div');
        banner.id = 'pwaInstallBanner';
        banner.className = 'pwa-install-banner';
        banner.style.display = 'none';
        
        banner.innerHTML = `
            <div class="pwa-banner-content">
                <div class="pwa-banner-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32">
                        <path fill="#d4af37" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z"/>
                    </svg>
                </div>
                <div class="pwa-banner-text">
                    <h3>Zainstaluj Bistro Pętla</h3>
                    <p>Szybki dostęp z ekranu głównego</p>
                </div>
                <div class="pwa-banner-actions">
                    <button class="pwa-install-btn" id="pwaInstallBtn">Instaluj</button>
                    <button class="pwa-close-btn" id="pwaCloseBtn">&times;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add styles
        this.injectStyles();
        
        // Setup button handlers
        document.getElementById('pwaInstallBtn')?.addEventListener('click', () => this.promptInstall());
        document.getElementById('pwaCloseBtn')?.addEventListener('click', () => this.dismissBanner());
        
        // Add install button to footer (always visible)
        this.addFooterInstallButton();
    }

    addFooterInstallButton() {
        const footer = document.querySelector('.footer-links ul');
        if (!footer) return;
        
        const li = document.createElement('li');
        li.innerHTML = '<a href="#" class="footer-install-link" id="footerInstallLink">📱 Zainstaluj aplikację</a>';
        footer.appendChild(li);
        
        document.getElementById('footerInstallLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showInstallModal();
        });
    }

    showInstallButton() {
        const banner = document.getElementById('pwaInstallBanner');
        if (!banner) return;
        
        // Show banner after 3 seconds delay
        setTimeout(() => {
            banner.style.display = 'block';
            banner.classList.add('pwa-banner-visible');
        }, 3000);
    }

    dismissBanner() {
        const banner = document.getElementById('pwaInstallBanner');
        if (!banner) return;
        
        banner.classList.remove('pwa-banner-visible');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
        
        // Set cookie to remember dismissal for 7 days
        this.setCookie('pwa_banner_dismissed', 'true', 7);
        
        // Track dismissal
        this.trackInstall('dismissed');
    }

    async promptInstall() {
        if (!this.deferredPrompt) {
            // Fallback: Show instructions modal
            this.showInstallModal();
            return;
        }
        
        // Show native install prompt
        this.deferredPrompt.prompt();
        
        // Wait for user response
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`📱 User response: ${outcome}`);
        
        if (outcome === 'accepted') {
            console.log('✅ User accepted install');
            this.trackInstall('accepted');
        } else {
            console.log('❌ User dismissed install');
            this.trackInstall('rejected');
        }
        
        // Clear deferred prompt
        this.deferredPrompt = null;
        
        // Hide banner
        this.dismissBanner();
    }

    showInstallModal() {
        // Create modal
        const modal = document.createElement('div');
        modal.id = 'pwaInstallModal';
        modal.className = 'pwa-modal';
        
        const instructions = this.getInstallInstructions();
        
        modal.innerHTML = `
            <div class="pwa-modal-content">
                <div class="pwa-modal-header">
                    <h2>📱 Zainstaluj Bistro Pętla</h2>
                    <button class="pwa-modal-close" id="pwaModalClose">&times;</button>
                </div>
                <div class="pwa-modal-body">
                    ${instructions}
                </div>
                <div class="pwa-modal-footer">
                    <button class="pwa-btn-secondary" id="pwaModalCloseBtn">Zamknij</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => {
            modal.classList.add('pwa-modal-visible');
        }, 10);
        
        // Setup close handlers
        const closeModal = () => {
            modal.classList.remove('pwa-modal-visible');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };
        
        document.getElementById('pwaModalClose')?.addEventListener('click', closeModal);
        document.getElementById('pwaModalCloseBtn')?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    getInstallInstructions() {
        if (this.platform === 'ios') {
            return `
                <div class="install-steps">
                    <h3>📱 Instrukcja dla iPhone/iPad:</h3>
                    <ol>
                        <li>Kliknij przycisk <strong>Udostępnij</strong> (kwadrat ze strzałką) w Safari</li>
                        <li>Przewiń w dół i wybierz <strong>"Dodaj do ekranu początkowego"</strong></li>
                        <li>Kliknij <strong>"Dodaj"</strong> w prawym górnym rogu</li>
                        <li>Gotowe! Ikona Bistro Pętla pojawi się na ekranie głównym</li>
                    </ol>
                    <p class="install-note">💡 Po zainstalowaniu aplikacja będzie działać jak natywna, z pełnym ekranem!</p>
                </div>
            `;
        } else if (this.platform === 'android') {
            return `
                <div class="install-steps">
                    <h3>📱 Instrukcja dla Android:</h3>
                    <ol>
                        <li>Kliknij przycisk <strong>Menu</strong> (trzy kropki) w prawym górnym rogu</li>
                        <li>Wybierz <strong>"Zainstaluj aplikację"</strong> lub <strong>"Dodaj do ekranu głównego"</strong></li>
                        <li>Potwierdź instalację klikając <strong>"Instaluj"</strong></li>
                        <li>Gotowe! Aplikacja Bistro Pętla jest zainstalowana</li>
                    </ol>
                    <p class="install-note">💡 Aplikacja będzie działać offline i będzie dostępna jak natywna aplikacja!</p>
                </div>
            `;
        } else {
            return `
                <div class="install-steps">
                    <h3>💻 Instrukcja dla Desktop:</h3>
                    <ol>
                        <li>Kliknij ikonę <strong>instalacji</strong> w pasku adresu (➕ lub komputer)</li>
                        <li>Lub kliknij <strong>Menu</strong> (trzy kropki) → "Zainstaluj Bistro Pętla..."</li>
                        <li>Potwierdź instalację klikając <strong>"Instaluj"</strong></li>
                        <li>Aplikacja otworzy się w osobnym oknie</li>
                    </ol>
                    <p class="install-note">💡 Zainstalowana aplikacja będzie szybsza i dostępna offline!</p>
                </div>
            `;
        }
    }

    showThankYouMessage() {
        // Create thank you notification
        const notification = document.createElement('div');
        notification.className = 'pwa-notification';
        notification.innerHTML = `
            <div class="pwa-notification-content">
                <span class="pwa-notification-icon">✅</span>
                <span class="pwa-notification-text">Dziękujemy za zainstalowanie Bistro Pętla!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('pwa-notification-visible');
        }, 100);
        
        // Hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('pwa-notification-visible');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    hideInstallUI() {
        // Hide banner
        const banner = document.getElementById('pwaInstallBanner');
        if (banner) {
            banner.style.display = 'none';
        }
        
        // Hide footer install link
        const footerLink = document.getElementById('footerInstallLink');
        if (footerLink) {
            footerLink.style.display = 'none';
        }
    }

    trackInstall(action) {
        // Track with Google Analytics if available
        if (window.bistroAnalytics) {
            window.bistroAnalytics.track('pwa_install', {
                action: action,
                platform: this.platform,
                event_category: 'pwa',
                event_label: 'install_prompt'
            });
        }
        
        console.log(`📊 Tracked PWA install: ${action}`);
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .pwa-install-banner {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                padding: 16px;
                z-index: 9999;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }

            .pwa-install-banner.pwa-banner-visible {
                opacity: 1;
                transform: translateY(0);
            }

            .pwa-banner-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            .pwa-banner-icon svg {
                width: 32px;
                height: 32px;
            }

            .pwa-banner-text {
                flex: 1;
            }

            .pwa-banner-text h3 {
                margin: 0 0 4px 0;
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
            }

            .pwa-banner-text p {
                margin: 0;
                font-size: 14px;
                color: #666;
            }

            .pwa-banner-actions {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .pwa-install-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
                color: white;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pwa-install-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }

            .pwa-close-btn {
                width: 32px;
                height: 32px;
                background: #f0f0f0;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                line-height: 1;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pwa-close-btn:hover {
                background: #e0e0e0;
            }

            .pwa-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
            }

            .pwa-modal.pwa-modal-visible {
                opacity: 1;
            }

            .pwa-modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                max-height: 80vh;
                overflow: auto;
            }

            .pwa-modal-header {
                padding: 20px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .pwa-modal-header h2 {
                margin: 0;
                font-size: 20px;
                color: #1a1a1a;
            }

            .pwa-modal-close {
                width: 32px;
                height: 32px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }

            .pwa-modal-body {
                padding: 20px;
            }

            .install-steps h3 {
                margin-top: 0;
                color: #1a1a1a;
            }

            .install-steps ol {
                margin: 16px 0;
                padding-left: 24px;
            }

            .install-steps li {
                margin: 12px 0;
                line-height: 1.6;
            }

            .install-note {
                margin-top: 16px;
                padding: 12px;
                background: #f0f7ff;
                border-left: 4px solid #2196f3;
                border-radius: 4px;
                font-size: 14px;
            }

            .pwa-modal-footer {
                padding: 16px 20px;
                border-top: 1px solid #e0e0e0;
                display: flex;
                justify-content: flex-end;
            }

            .pwa-btn-secondary {
                padding: 10px 24px;
                background: #f0f0f0;
                color: #1a1a1a;
                border: none;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pwa-btn-secondary:hover {
                background: #e0e0e0;
            }

            .pwa-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 16px;
                z-index: 10001;
                opacity: 0;
                transform: translateX(20px);
                transition: all 0.3s ease;
            }

            .pwa-notification.pwa-notification-visible {
                opacity: 1;
                transform: translateX(0);
            }

            .pwa-notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .pwa-notification-icon {
                font-size: 24px;
            }

            .pwa-notification-text {
                font-size: 14px;
                font-weight: 500;
                color: #1a1a1a;
            }

            @media (max-width: 768px) {
                .pwa-install-banner {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                }

                .pwa-banner-content {
                    flex-direction: column;
                    text-align: center;
                }

                .pwa-banner-actions {
                    width: 100%;
                    justify-content: center;
                }

                .pwa-modal-content {
                    margin: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Initialize PWA Install Prompt when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pwaInstallPrompt = new PWAInstallPrompt();
    });
} else {
    window.pwaInstallPrompt = new PWAInstallPrompt();
}

console.log('📱 PWA Install Prompt module loaded');