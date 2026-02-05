/**
 * PWA Registration and Management
 * Version: 1.0.0
 * Handles Service Worker registration and updates
 */

class PWAManager {
    constructor() {
        this.sw = null;
        this.updateAvailable = false;
        
        this.init();
    }

    async init() {
        // Check if service workers are supported
        if (!('serviceWorker' in navigator)) {
            console.log('❌ Service Workers not supported');
            return;
        }

        console.log('🔧 Initializing PWA...');

        // Register service worker
        await this.registerServiceWorker();

        // Setup update handlers
        this.setupUpdateHandlers();

        // Check for updates periodically
        this.checkForUpdates();

        console.log('✅ PWA initialized');
    }

    async registerServiceWorker() {
        try {
            // Register service worker
            const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/'
            });

            console.log('✅ Service Worker registered:', registration.scope);
            this.sw = registration;

            // Check for updates on page load
            registration.update();

            // Listen for service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                console.log('🆕 New Service Worker found');

                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New service worker available
                        console.log('✨ New version available');
                        this.updateAvailable = true;
                        this.showUpdateNotification();
                    }
                });
            });

        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    setupUpdateHandlers() {
        // Listen for controller change (new SW activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 New Service Worker activated');
            
            // Reload page to get new content
            if (this.updateAvailable) {
                window.location.reload();
            }
        });

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
            console.log('📨 Message from SW:', event.data);

            if (event.data.type === 'VERSION') {
                console.log('📌 SW Version:', event.data.version);
            }
        });
    }

    showUpdateNotification() {
        // Create update notification banner
        const banner = document.createElement('div');
        banner.id = 'pwaUpdateBanner';
        banner.className = 'pwa-update-banner';
        banner.innerHTML = `
            <div class="pwa-update-content">
                <div class="pwa-update-text">
                    <strong>✨ Nowa wersja dostępna!</strong>
                    <p>Kliknij "Aktualizuj" aby otrzymać najnowsze funkcje.</p>
                </div>
                <div class="pwa-update-actions">
                    <button class="pwa-update-btn" id="pwaUpdateBtn">Aktualizuj</button>
                    <button class="pwa-update-dismiss" id="pwaUpdateDismiss">&times;</button>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .pwa-update-banner {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 16px 20px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                max-width: 500px;
                width: 90%;
                animation: slideDown 0.5s ease;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }

            .pwa-update-content {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            .pwa-update-text {
                flex: 1;
            }

            .pwa-update-text strong {
                display: block;
                margin-bottom: 4px;
                font-size: 16px;
            }

            .pwa-update-text p {
                margin: 0;
                font-size: 14px;
                opacity: 0.9;
            }

            .pwa-update-actions {
                display: flex;
                gap: 8px;
                align-items: center;
            }

            .pwa-update-btn {
                padding: 8px 20px;
                background: white;
                color: #667eea;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pwa-update-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
            }

            .pwa-update-dismiss {
                width: 32px;
                height: 32px;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                line-height: 1;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .pwa-update-dismiss:hover {
                background: rgba(255, 255, 255, 0.3);
            }

            @media (max-width: 768px) {
                .pwa-update-banner {
                    top: 10px;
                    width: 95%;
                }

                .pwa-update-content {
                    flex-direction: column;
                    text-align: center;
                }

                .pwa-update-actions {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(banner);

        // Setup button handlers
        document.getElementById('pwaUpdateBtn')?.addEventListener('click', () => {
            this.skipWaiting();
        });

        document.getElementById('pwaUpdateDismiss')?.addEventListener('click', () => {
            banner.remove();
        });
    }

    skipWaiting() {
        // Tell service worker to skip waiting and activate
        if (this.sw && this.sw.waiting) {
            this.sw.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
    }

    checkForUpdates() {
        // Check for updates every hour
        setInterval(() => {
            if (this.sw) {
                console.log('🔍 Checking for updates...');
                this.sw.update();
            }
        }, 60 * 60 * 1000); // 1 hour
    }

    async getVersion() {
        if (!this.sw || !this.sw.active) return null;

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            
            messageChannel.port1.onmessage = (event) => {
                if (event.data.type === 'VERSION') {
                    resolve(event.data.version);
                }
            };

            this.sw.active.postMessage(
                { type: 'GET_VERSION' },
                [messageChannel.port2]
            );
        });
    }

    async clearCache() {
        if (!this.sw || !this.sw.active) return;

        return new Promise((resolve) => {
            const messageChannel = new MessageChannel();
            
            messageChannel.port1.onmessage = (event) => {
                if (event.data.type === 'CACHE_CLEARED') {
                    resolve(event.data.success);
                    console.log('🗑️ Cache cleared');
                }
            };

            this.sw.active.postMessage(
                { type: 'CLEAR_CACHE' },
                [messageChannel.port2]
            );
        });
    }
}

// Offline indicator
function setupOfflineIndicator() {
    // Create offline indicator
    const indicator = document.createElement('div');
    indicator.id = 'offlineIndicator';
    indicator.className = 'offline-indicator';
    indicator.innerHTML = `
        <div class="offline-indicator-content">
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="white" d="M1,8.82L3.41,11.23C2.5,13.05 2,15.08 2,17.22H4.22C4.22,15.36 4.65,13.6 5.44,12.04L7.85,14.45C7.31,15.42 7,16.53 7,17.72H9.22C9.22,16.78 9.4,15.89 9.72,15.07L12.13,17.48C12.05,17.81 12,18.15 12,18.5A2.5,2.5 0 0,0 14.5,21A2.5,2.5 0 0,0 17,18.5C17,18.29 17,18.09 16.96,17.9L20.74,21.68L22.15,20.27L2.41,0.54L1,1.95M14.5,19A1.5,1.5 0 0,1 13,17.5A1.5,1.5 0 0,1 14.5,16A1.5,1.5 0 0,1 16,17.5A1.5,1.5 0 0,1 14.5,19M17.74,14.86L19.67,16.79C20.45,15.21 20.89,13.46 20.89,11.61H18.67C18.67,12.96 18.42,14.24 17.97,15.42M23.11,7.39H20.89C20.89,9.5 20.26,11.46 19.2,13.13L20.95,14.88C22.43,12.74 23.33,10.15 23.33,7.39M14.5,3C10.92,3 7.75,4.83 5.82,7.58L7.63,9.39C9.21,7.15 11.7,5.67 14.5,5.67C17.64,5.67 20.37,7.5 21.82,10.17H24.04C22.47,6.37 18.78,3.5 14.5,3.5Z"/>
            </svg>
            <span>Tryb offline</span>
        </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .offline-indicator {
            position: fixed;
            top: 60px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: #ff5252;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 9998;
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 500;
        }

        .offline-indicator.visible {
            transform: translateX(-50%) translateY(0);
        }

        .offline-indicator-content {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .offline-indicator svg {
            flex-shrink: 0;
        }

        @media (max-width: 768px) {
            .offline-indicator {
                top: 10px;
                left: 10px;
                right: 10px;
                transform: translateX(0) translateY(-100px);
            }

            .offline-indicator.visible {
                transform: translateX(0) translateY(0);
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(indicator);

    // Show/hide based on connection
    function updateOnlineStatus() {
        if (navigator.onLine) {
            indicator.classList.remove('visible');
        } else {
            indicator.classList.add('visible');
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial check
    updateOnlineStatus();
}

// Initialize PWA Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pwaManager = new PWAManager();
        setupOfflineIndicator();
    });
} else {
    window.pwaManager = new PWAManager();
    setupOfflineIndicator();
}

console.log('📱 PWA module loaded');