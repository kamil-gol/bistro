/**
 * Service Worker for Bistro Pętla PWA
 * Version: 1.0.0
 * 
 * Cache Strategy:
 * - Static assets (CSS, JS, fonts): Cache First
 * - Images: Cache First with expiration
 * - HTML pages: Network First with cache fallback
 * - API calls: Network Only
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `bistro-petla-${CACHE_VERSION}`;
const OFFLINE_PAGE = '/offline.html';

// Files to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/news.html',
  '/privacy.html',
  '/offline.html',
  '/styles.css',
  '/cookieconsent.css',
  '/script.js',
  '/cookieconsent.js',
  '/analytics.js',
  '/pwa.js',
  '/manifest.json'
];

// Cache priority groups
const CACHE_STRATEGIES = {
  staticAssets: [
    /\.css$/,
    /\.js$/,
    /\.woff2?$/,
    /\.ttf$/,
    /\.eot$/
  ],
  images: [
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.webp$/,
    /\.svg$/,
    /\.gif$/
  ],
  documents: [
    /\.html$/,
    /\/$/  // Root path
  ]
};

/**
 * Install Event - Precache critical resources
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching static resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Installation complete');
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

/**
 * Activate Event - Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker version:', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('bistro-petla-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete, claiming clients');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event - Intercept network requests
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip external domains (Google Analytics, fonts, etc.)
  if (url.origin !== location.origin) {
    // But cache Google Fonts
    if (url.origin === 'https://fonts.googleapis.com' || 
        url.origin === 'https://fonts.gstatic.com') {
      event.respondWith(cacheFirstStrategy(request));
    }
    return;
  }

  // Determine strategy based on request type
  if (matchesPattern(url.pathname, CACHE_STRATEGIES.staticAssets)) {
    // Static assets: Cache First
    event.respondWith(cacheFirstStrategy(request));
  } 
  else if (matchesPattern(url.pathname, CACHE_STRATEGIES.images)) {
    // Images: Cache First with fallback
    event.respondWith(cacheFirstStrategy(request));
  } 
  else if (matchesPattern(url.pathname, CACHE_STRATEGIES.documents)) {
    // HTML pages: Network First with cache fallback
    event.respondWith(networkFirstStrategy(request));
  } 
  else {
    // Default: Network First
    event.respondWith(networkFirstStrategy(request));
  }
});

/**
 * Cache First Strategy
 * Good for: Static assets, images
 */
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW] Serving from cache:', request.url);
    return cached;
  }

  try {
    console.log('[SW] Fetching and caching:', request.url);
    const response = await fetch(request);
    
    // Only cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', request.url, error);
    
    // Return offline page for HTML requests
    if (request.destination === 'document') {
      return cache.match(OFFLINE_PAGE);
    }
    
    // Return generic error for other types
    return new Response('Network error', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Network First Strategy
 * Good for: HTML pages, dynamic content
 */
async function networkFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    console.log('[SW] Fetching from network:', request.url);
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, serving from cache:', request.url);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Return offline page for HTML requests
    if (request.destination === 'document') {
      return cache.match(OFFLINE_PAGE);
    }
    
    // Return error for other types
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Check if URL matches any pattern
 */
function matchesPattern(url, patterns) {
  return patterns.some(pattern => pattern.test(url));
}

/**
 * Message Event - Communication with main thread
 */
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.urls;
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urls))
      .then(() => {
        event.ports[0].postMessage({ success: true });
      })
      .catch((error) => {
        console.error('[SW] Cache URLs failed:', error);
        event.ports[0].postMessage({ success: false, error: error.message });
      });
  }
});

/**
 * Sync Event - Background sync (future enhancement)
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Sync event:', event.tag);
  
  if (event.tag === 'sync-orders') {
    // Future: Sync offline orders when back online
    event.waitUntil(syncOfflineOrders());
  }
});

async function syncOfflineOrders() {
  // Placeholder for future offline order sync functionality
  console.log('[SW] Syncing offline orders...');
}

/**
 * Push Event - Push notifications (future enhancement)
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push event received');
  
  const options = {
    body: event.data ? event.data.text() : 'Nowa wiadomość z Bistro Pętla',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    tag: 'bistro-notification',
    actions: [
      { action: 'open', title: 'Otwórz' },
      { action: 'close', title: 'Zamknij' }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Bistro Pętla', options)
  );
});

/**
 * Notification Click Event
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('[SW] Service Worker script loaded');