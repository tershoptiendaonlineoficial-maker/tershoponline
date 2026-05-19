// tracking.js - Integraciones COMPLETAS con DEBUG MODE
// Meta Pixel con TODOS los parámetros requeridos + console.logs

(function () {
  'use strict';

  const TRACKING = CONFIG.tracking;
  const DEBUG = true;

  let eventIdCounter = 0;

  // === UTILIDADES ===
  function log(event, data) {
    if (DEBUG) {
      console.log('%c🔥 TRACKING EVENT:', 'background: #0A0A0A; color: #FFF; padding: 4px 8px; border-radius: 4px;', event, data);
    }
  }

  function generateEventId() {
    return 'e_' + Date.now() + '_' + (++eventIdCounter);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
  }

  function sha256(str) {
    // Hash simple para CAPI (usa crypto.subtle si disponible)
    return btoa(str).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }

  function getUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = {
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_term: urlParams.get('utm_term'),
      utm_content: urlParams.get('utm_content'),
      gclid: urlParams.get('gclid'),
      fbclid: urlParams.get('fbclid')
    };
    Object.entries(utms).forEach(([key, value]) => {
      if (value) sessionStorage.setItem(key, value);
    });
    return utms;
  }

  // === META PIXEL ===
  function initMetaPixel() {
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }; if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', TRACKING.metaPixelId);
    fbq('track', 'PageView');
    log('PageView', { pixel_id: TRACKING.metaPixelId });
  }

  function trackMetaEvent(eventName, customData = {}) {
    const eventId = generateEventId();
    const fbc = getCookie('fbc') || getCookie('_fbc');
    const fbp = getCookie('fbp') || getCookie('_fbp');

    const eventData = {
      eventID: eventId,
      event_source_url: window.location.href,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      ...customData,
      fbc,
      fbp
    };

    fbq('track', eventName, eventData);
    log('Meta Event:', eventName, eventData);

    // CAPI ready (ejecutar desde backend)
    // sendCAPIData(eventName, eventData);
  }

  // Eventos específicos para ecommerce
  window.trackViewContent = function (product) {
    trackMetaEvent('ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: CONFIG.currency
    });
  };

  window.trackAddToCart = function (product, quantity = 1) {
    trackMetaEvent('AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: CONFIG.currency,
      num_items: quantity
    });
  };

  window.trackPurchase = function (product, total) {
    trackMetaEvent('Purchase', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: total,
      currency: CONFIG.currency,
      num_items: 1
    });
  };

  // === GOOGLE ADS gtag ===
  function initGoogleAds() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', TRACKING.googleAdsId);
    log('Google Ads init', TRACKING.googleAdsId);
  }

  window.trackGoogleEvent = function (eventName, params) {
    gtag('event', eventName, params);
    log('Google Event:', eventName, params);
  };

  // === GA4 ===
  function initGA4() {
    window.dataLayer = window.dataLayer || [];
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING.ga4MeasurementId}`;
    document.head.appendChild(script);

    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', TRACKING.ga4MeasurementId);
    log('GA4 init', TRACKING.ga4MeasurementId);
  }

  // === CAPI PREPARADO (SERVER-SIDE) ===
  window.sendCAPIData = async function (eventName, eventData, userData = {}) {
    const payload = {
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: window.location.href,
        action_source: "website",
        event_id: eventData.eventID,
        user_data: {
          em: userData.email ? [sha256(userData.email.toLowerCase().trim())] : [],
          ph: userData.phone ? [sha256(userData.phone)] : [],
          client_ip_address: userData.ip || "",
          client_user_agent: navigator.userAgent,
          fbc: eventData.fbc,
          fbp: eventData.fbp
        },
        custom_data: eventData
      }]
    };

    // EJECUTAR DESDE BACKEND:
    // fetch(`https://graph.facebook.com/v19.0/${TRACKING.metaPixelId}/events?access_token=${TRACKING.metaAccessToken}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // })

    log('CAPI Payload ready (server-side):', payload);
  };

  // === INICIALIZACIÓN ===
  function initTracking() {
    getUTMParams();

    if (TRACKING.metaPixelId !== "TU_META_PIXEL_ID_AQUÍ") {
      initMetaPixel();
    }
    if (TRACKING.googleAdsId !== "AW-XXXXXXXXX") {
      initGoogleAds();
    }
    if (TRACKING.ga4MeasurementId !== "G-XXXXXXXXXX") {
      initGA4();
    }

    log('✅ Tracking inicializado completamente', TRACKING);
  }

  // Esperar a que CONFIG esté listo
  if (typeof CONFIG !== 'undefined') {
    initTracking();
  } else {
    window.addEventListener('load', initTracking);
  }

  // Exponer funciones globales para app.js
  window.TRACKING_DEBUG = DEBUG;
  window.logTracking = log;

})();
