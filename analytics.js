/**
 * Google Analytics 4 (GA4) Implementation
 * Bistro Pętla
 * Version 1.0.0
 */

// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Add your real Measurement ID

window.loadGoogleAnalytics = function() {
  // Check if already loaded
  if (window.dataLayer) {
    console.log('[Analytics] Google Analytics already loaded');
    return;
  }

  // Create gtag script
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(gtagScript);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Configure GA4
  gtag('config', GA4_MEASUREMENT_ID, {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure',
    'page_title': document.title,
    'page_location': window.location.href,
    'page_path': window.location.pathname
  });

  // Track custom events
  window.gtag = gtag;

  // Track outbound links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.startsWith(window.location.origin)) {
      gtag('event', 'click', {
        'event_category': 'outbound',
        'event_label': link.href,
        'transport_type': 'beacon'
      });
    }
  });

  console.log('[Analytics] Google Analytics 4 loaded successfully');
};

// Custom event tracking functions
window.trackEvent = function(eventName, eventParams = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
    console.log(`[Analytics] Event tracked: ${eventName}`, eventParams);
  }
};

// Track menu tab changes
window.trackMenuView = function(category) {
  trackEvent('view_menu_category', {
    'event_category': 'engagement',
    'event_label': category,
    'value': 1
  });
};

// Track order button clicks
window.trackOrderClick = function(platform) {
  trackEvent('order_click', {
    'event_category': 'conversion',
    'event_label': platform,
    'value': 1
  });
};

// Track phone clicks
window.trackPhoneClick = function() {
  trackEvent('phone_click', {
    'event_category': 'engagement',
    'event_label': 'contact',
    'value': 1
  });
};

// Track scroll depth
let scrollTracked = false;
window.addEventListener('scroll', () => {
  if (!scrollTracked && window.gtag) {
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    
    if (scrollPercentage > 75) {
      trackEvent('scroll_depth', {
        'event_category': 'engagement',
        'event_label': '75%',
        'value': 75
      });
      scrollTracked = true;
    }
  }
});

// Track time on page
let timeOnPage = 0;
setInterval(() => {
  timeOnPage += 30;
  if (timeOnPage === 30 && window.gtag) {
    trackEvent('time_on_page', {
      'event_category': 'engagement',
      'event_label': '30_seconds',
      'value': 30
    });
  } else if (timeOnPage === 120 && window.gtag) {
    trackEvent('time_on_page', {
      'event_category': 'engagement',
      'event_label': '2_minutes',
      'value': 120
    });
  }
}, 30000); // Every 30 seconds

console.log('[Analytics] Analytics script loaded');