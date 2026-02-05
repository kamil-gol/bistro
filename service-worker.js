/**
 * Service Worker for Bistro Pętla PWA
 * Version: 1.0.0
 * Provides offline support and caching strategies
 */

const CACHE_VERSION = 'bistro-petla-v1.0.0';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Files to cache immediately on install
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
  '/install-prompt.js',
  '/manifest.json'
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Static assets: Cache first, fallback to network
  cacheFirst: ['css', 'js', 'font'],
  
  // HTML pages: Network first, fallback to cache
  networkFirst: ['html', 'document'],
  
  // Images: Cache first with expiration
  cacheFirstWithExpiry: ['image'],
  
  // API calls: Network only (no cache)
  networkOnly: ['api']
};

// Maximum cache sizes
const MAX_CACHE_SIZE = {
  static: 50,
  runtime: 30,
  images: 100
};

// Cache expiration time (30 days)
const CACHE_EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000;

/**
 * Service Worker Installation
 * Precache essential files
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Precaching static assets');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Precache complete');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Precache failed:', error);
      })
  );
});

/**
 * Service Worker Activation
 * Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old cache versions
            if (cacheName.startsWith('bistro-petla-') && cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE && cacheName !== IMAGE_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Cache cleanup complete');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

/**
 * Fetch Event Handler
 * Implements caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Determine cache strategy based on request type
  const strategy = getCacheStrategy(request);
  
  event.respondWith(
    strategy(request)
      .catch((error) => {
        console.error('[SW] Fetch failed:', error);
        
        // If HTML request fails, show offline page
        if (request.destination === 'document') {
          return caches.match('/offline.html');
        }
        
        // For other resources, return error
        return new Response('Network error', {
          status: 408,
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});

/**
 * Determine cache strategy based on request
 */
function getCacheStrategy(request) {
  const url = new URL(request.url);
  const extension = url.pathname.split('.').pop();
  
  // HTML/Document: Network First
  if (request.destination === 'document' || request.headers.get('accept').includes('text/html')) {
    return networkFirst;
  }
  
  // Images: Cache First with Expiry
  if (request.destination === 'image') {
    return cacheFirstWithExpiry;
  }
  
  // CSS/JS: Cache First
  if (extension === 'css' || extension === 'js') {
    return cacheFirst;
  }
  
  // Default: Network First
  return networkFirst;
}

/**
 * Cache First Strategy
 * Check cache first, fallback to network
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    console.log('[SW] Cache hit:', request.url);
    return cached;
  }
  
  console.log('[SW] Cache miss, fetching:', request.url);
  const response = await fetch(request);
  
  // Cache successful responses
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

/**
 * Network First Strategy
 * Try network first, fallback to cache
 */
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    
    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network failed, checking cache:', request.url);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}

/**
 * Cache First with Expiry Strategy
 * For images with cache expiration
 */
async function cacheFirstWithExpiry(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    // Check if cache is still valid
    const cachedDate = cached.headers.get('sw-cache-date');
    
    if (cachedDate) {
      const age = Date.now() - parseInt(cachedDate);
      
      if (age < CACHE_EXPIRY_TIME) {
        console.log('[SW] Image cache hit:', request.url);
        return cached;
      } else {
        console.log('[SW] Image cache expired:', request.url);
      }
    }
  }
  
  console.log('[SW] Fetching image:', request.url);
  const response = await fetch(request);
  
  // Cache successful responses with timestamp
  if (response.ok) {
    const clonedResponse = response.clone();
    const headers = new Headers(clonedResponse.headers);
    headers.set('sw-cache-date', Date.now().toString());
    
    const cachedResponse = new Response(await clonedResponse.blob(), {
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
      headers: headers
    });
    
    cache.put(request, cachedResponse);
    
    // Limit cache size
    limitCacheSize(IMAGE_CACHE, MAX_CACHE_SIZE.images);
  }
  
  return response;
}

/**
 * Limit cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    const keysToDelete = keys.length - maxSize;
    console.log(`[SW] Limiting ${cacheName} size, deleting ${keysToDelete} entries`);
    
    for (let i = 0; i < keysToDelete; i++) {
      await cache.delete(keys[i]);
    }
  }
}

/**
 * Message Handler
 * Handle messages from clients
 */
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: CACHE_VERSION
    });
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName.startsWith('bistro-petla-')) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      event.ports[0].postMessage({
        type: 'CACHE_CLEARED',
        success: true
      });
    });
  }
});

/**
 * Sync Event (Background Sync API)
 * For future implementation of offline actions queue
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-orders') {
    event.waitUntil(syncOrders());
  }
});

/**
 * Push Event (Push Notifications)
 * For future implementation
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received:', event.data?.text());
  
  const options = {
    body: event.data ? event.data.text() : 'Nowa wiadomość z Bistro Pętla',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [200, 100, 200],
    tag: 'bistro-notification',
    requireInteraction: false
  };
  
  event.waitUntil(
    self.registration.showNotification('Bistro Pętla', options)
  );
});

/**
 * Notification Click Handler
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

/**
 * Sync Orders (placeholder for future)
 */
async function syncOrders() {
  console.log('[SW] Syncing offline orders...');
  // Future implementation: sync queued orders
}

console.log('[SW] Service Worker script loaded', CACHE_VERSION);