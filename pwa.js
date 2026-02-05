/**
 * PWA Manager for Bistro Pętla
 * Handles:
 * - Service Worker registration
 * - Install prompt
 * - Update notifications
 * - Offline/Online detection
 */

class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.isInstalled = false;
        this.swRegistration = null;
        
        this.init();
    }

    init() {
        // Check if already installed
        this.checkIfInstalled();
        
        // Register Service Worker
        this.registerServiceWorker();
        
        // Setup install prompt
        this.setupInstallPrompt();
        
        // Setup update detection
        this.setupUpdateDetection();
        
        // Setup online/offline detection
        this.setupConnectivityDetection();
        
        console.log('🚀 PWA Manager initialized');
    }

    checkIfInstalled() {
        // Check if running in standalone mode (installed)
        if (window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('✅ App is installed');
            this.hideInstallButton();
        }
    }

    async registerServiceWorker() {
        if (!('serviceWorker' in navigator)) {
            console.log('❌ Service Worker not supported');
            return;
        }

        try {
            this.swRegistration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });
            
            console.log('✅ Service Worker registered:', this.swRegistration.scope);
            
            // Check for updates every 60 seconds
            setInterval(() => {
                this.swRegistration.update();
            }, 60000);
            
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    setupInstallPrompt() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('💡 Install prompt available');
            
            // Prevent the mini-infobar from appearing
            e.preventDefault();
            
            // Store the event for later use
            this.deferredPrompt = e;
            
            // Show custom install button
            this.showInstallButton();
        });

        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('🎉 App installed successfully');
            this.isInstalled = true;
            this.deferredPrompt = null;
            this.hideInstallButton();
            
            // Track installation in analytics
            if (window.bistroAnalytics) {
                window.bistroAnalytics.track('pwa_installed', {
                    event_category: 'pwa',
                    event_label: 'app_installed'
                });
            }
            
            // Show thank you message
            this.showInstallSuccessMessage();
        });
    }

    showInstallButton() {
        // Create install button if it doesn't exist
        let installBtn = document.getElementById('pwa-install-btn');
        
        if (!installBtn) {
            installBtn = document.createElement('button');
            installBtn.id = 'pwa-install-btn';
            installBtn.className = 'pwa-install-button';
            installBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" style="margin-right: 8px;">
                    <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
                Zainstaluj Aplikację
            `;
            
            // Add CSS if not already present
            if (!document.getElementById('pwa-styles')) {
                const style = document.createElement('style');
                style.id = 'pwa-styles';
                style.textContent = `
                    .pwa-install-button {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        border: none;
                        padding: 15px 25px;
                        border-radius: 50px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                        z-index: 9999;
                        display: flex;
                        align-items: center;
                        animation: slideInUp 0.5s ease-out, pulse 2s ease-in-out infinite;
                        transition: all 0.3s ease;
                    }
                    
                    .pwa-install-button:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
                    }
                    
                    .pwa-install-button:active {
                        transform: translateY(-1px);
                    }
                    
                    @keyframes slideInUp {
                        from {
                            transform: translateY(100px);
                            opacity: 0;
                        }
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes pulse {
                        0%, 100% {
                            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                        }
                        50% {
                            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.6);
                        }
                    }
                    
                    .pwa-toast {
                        position: fixed;
                        bottom: 90px;
                        right: 20px;
                        background: white;
                        color: #333;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        z-index: 10000;
                        animation: slideInUp 0.5s ease-out;
                        max-width: 300px;
                    }
                    
                    .pwa-toast.success {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }
                    
                    @media (max-width: 768px) {
                        .pwa-install-button {
                            bottom: 15px;
                            right: 15px;
                            font-size: 13px;
                            padding: 12px 20px;
                        }
                        
                        .pwa-toast {
                            bottom: 75px;
                            right: 15px;
                            left: 15px;
                            max-width: none;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Add click handler
            installBtn.addEventListener('click', () => this.promptInstall());
            
            // Add to page
            document.body.appendChild(installBtn);
        }
        
        installBtn.style.display = 'flex';
    }

    hideInstallButton() {
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    }

    async promptInstall() {
        if (!this.deferredPrompt) {
            console.log('❌ Install prompt not available');
            return;
        }

        // Show the install prompt
        this.deferredPrompt.prompt();
        
        // Track prompt shown
        if (window.bistroAnalytics) {
            window.bistroAnalytics.track('pwa_install_prompt_shown', {
                event_category: 'pwa',
                event_label: 'install_prompt'
            });
        }

        // Wait for user response
        const { outcome } = await this.deferredPrompt.userChoice;
        
        console.log('Install prompt outcome:', outcome);
        
        // Track user choice
        if (window.bistroAnalytics) {
            window.bistroAnalytics.track('pwa_install_choice', {
                event_category: 'pwa',
                event_label: outcome
            });
        }

        // Clear the deferred prompt
        this.deferredPrompt = null;
        
        // Hide button if accepted (will be fully hidden when appinstalled fires)
        if (outcome === 'accepted') {
            this.hideInstallButton();
        }
    }

    showInstallSuccessMessage() {
        const toast = document.createElement('div');
        toast.className = 'pwa-toast success';
        toast.innerHTML = `
            <strong>🎉 Dziękujemy!</strong><br>
            Aplikacja została zainstalowana. Możesz teraz korzystać z niej offline.
        `;
        
        document.body.appendChild(toast);
        
        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInUp 0.5s ease-out reverse';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    setupUpdateDetection() {
        if (!this.swRegistration) return;

        // Detect when new service worker is waiting
        this.swRegistration.addEventListener('updatefound', () => {
            const newWorker = this.swRegistration.installing;
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.log('🔄 New version available');
                    this.showUpdateNotification();
                }
            });
        });
    }

    showUpdateNotification() {
        const toast = document.createElement('div');
        toast.className = 'pwa-toast';
        toast.innerHTML = `
            <strong>🔄 Dostępna aktualizacja</strong><br>
            Nowa wersja aplikacji jest gotowa.<br>
            <button onclick="window.location.reload()" style="
                margin-top: 10px;
                padding: 8px 20px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
            ">Odśwież teraz</button>
        `;
        
        document.body.appendChild(toast);
    }

    setupConnectivityDetection() {
        // Online/Offline status
        window.addEventListener('online', () => {
            console.log('🟢 Back online');
            this.showConnectivityToast('online');
            
            if (window.bistroAnalytics) {
                window.bistroAnalytics.track('connectivity_online', {
                    event_category: 'pwa',
                    event_label: 'back_online'
                });
            }
        });

        window.addEventListener('offline', () => {
            console.log('🔴 Offline');
            this.showConnectivityToast('offline');
            
            if (window.bistroAnalytics) {
                window.bistroAnalytics.track('connectivity_offline', {
                    event_category: 'pwa',
                    event_label: 'went_offline'
                });
            }
        });
    }

    showConnectivityToast(status) {
        // Remove existing toast if present
        const existingToast = document.getElementById('connectivity-toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.id = 'connectivity-toast';
        toast.className = 'pwa-toast';
        
        if (status === 'online') {
            toast.className += ' success';
            toast.innerHTML = `
                <strong>🟢 Jesteś online</strong><br>
                Połączenie z internetem zostało przywrócone.
            `;
        } else {
            toast.style.background = '#ff6b6b';
            toast.style.color = 'white';
            toast.innerHTML = `
                <strong>🔴 Tryb offline</strong><br>
                Brak połączenia z internetem. Niektóre funkcje mogą być niedostępne.
            `;
        }
        
        document.body.appendChild(toast);
        
        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInUp 0.5s ease-out reverse';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    }

    // Public method: Force update service worker
    forceUpdate() {
        if (this.swRegistration && this.swRegistration.waiting) {
            this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
        }
    }
}

// Initialize PWA Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pwaManager = new PWAManager();
    });
} else {
    window.pwaManager = new PWAManager();
}

console.log('📱 PWA module loaded');