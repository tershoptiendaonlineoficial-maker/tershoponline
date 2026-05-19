// config.js - Configuración centralizada de la Landing Page
// Edita SOLO este archivo para personalizar productos, colores, IDs de tracking, etc.
// NO modifiques los otros archivos HTML/CSS/JS

const CONFIG = {
  // === MARCA Y GENERAL ===
  storeName: "Tershop Online VE",
  storeLogo: "TERSHOP",
  storeTagline: "Si buscas precio/calidad, ¡somos tu proveedor indicado!",
  currency: "USD",
  currencySymbol: "$",
  whatsappNumber: "584242674477",
  whatsappDirectLink: "https://wa.me/message/OONJORDXA2NYA1",
  siteUrl: "https://tershoponline.netlify.app/",

  // === REDES SOCIALES ===
  social: {
    instagram: "",
    facebook: "https://www.facebook.com/profile.php?id=61573316013361",
    tiktok: "https://www.tiktok.com/@tershoponline",
    whatsapp: "https://wa.me/message/OONJORDXA2NYA1",
    youtube: "",
    twitter: ""
  },

  // === IDs DE TRACKING (PON TUS IDs REALES AQUÍ) ===
  tracking: {
    metaPixelId: "TU_META_PIXEL_ID_AQUÍ",
    metaAccessToken: "TU_META_ACCESS_TOKEN_AQUÍ",
    googleAdsId: "AW-XXXXXXXXX",
    googleConversionLabel: "YYYYYYYYY",
    ga4MeasurementId: "G-XXXXXXXXXX"
  },

  // === MÉTODOS DE PAGO ===
  paymentMethods: [
    { name: "Visa", icon: "visa" },
    { name: "Mastercard", icon: "mastercard" },
    { name: "American Express", icon: "amex" },
    { name: "PayPal", icon: "paypal" },
    { name: "Zelle", icon: "zelle" },
    { name: "Transferencia", icon: "bank" },
    { name: "Mercado Pago", icon: "mercadopago" }
  ],

  // === PRODUCTOS (AGREGA/EDITA AQUÍ - Renderizados dinámicamente) ===
  products: [
    {
      id: "prod_001",
      name: "Producto Premium Alpha",
      shortDescription: "Diseño elegante con materiales de primera calidad",
      fullDescription: "Descripción completa del producto con todos los detalles técnicos, beneficios y especificaciones. Perfecto para uso diario con garantía extendida.",
      price: 49.99,
      originalPrice: 79.99,
      images: [
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Producto+1",
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Foto+2",
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Foto+3"
      ],
      features: [
        "Material premium de alta durabilidad",
        "Diseño ergonómico y moderno",
        "Garantía de 12 meses incluida",
        "Envío express disponible"
      ],
      category: "Premium",
      rating: 4.8,
      reviewCount: 124,
      inStock: true,
      badge: "MÁS VENDIDO"
    },
    {
      id: "prod_002",
      name: "Producto Elite Beta",
      shortDescription: "Tecnología avanzada para uso diario",
      fullDescription: "Descripción completa del segundo producto con características avanzadas y tecnología de punta.",
      price: 89.99,
      originalPrice: null,
      images: [
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Producto+2",
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Foto+2B"
      ],
      features: [
        "Tecnología de última generación",
        "Resistente al agua y golpes",
        "Batería de larga duración",
        "Compatible con todos los dispositivos"
      ],
      category: "Tech",
      rating: 4.9,
      reviewCount: 89,
      inStock: true,
      badge: "NUEVO"
    },
    {
      id: "prod_003",
      name: "Producto Classic Gamma",
      shortDescription: "El clásico que nunca falla, renovado",
      fullDescription: "Descripción completa del tercer producto con diseño atemporal y materiales sostenibles.",
      price: 34.99,
      originalPrice: 59.99,
      images: [
        "https://via.placeholder.com/600x600/F5F5F5/333?text=Producto+3"
      ],
      features: [
        "Diseño atemporal y versátil",
        "Materiales eco-friendly",
        "Ligero y portable",
        "Múltiples colores disponibles"
      ],
      category: "Classic",
      rating: 4.7,
      reviewCount: 256,
      inStock: true,
      badge: "-42% OFF"
    }
  ],

  // === TESTIMONIOS ===
  testimonials: [
    {
      name: "María García",
      location: "Madrid, España",
      photo: "https://via.placeholder.com/80x80/333/FFF?text=MG",
      text: "La calidad superó mis expectativas. El envío fue rapidísimo y el producto es exactamente como en las fotos. ¡100% recomendado!",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      location: "Ciudad de México",
      photo: "https://via.placeholder.com/80x80/333/FFF?text=CR",
      text: "Excelente relación calidad-precio. Ya es mi tercera compra y siempre quedo satisfecho. El soporte por WhatsApp es increíble.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      location: "Buenos Aires, Argentina",
      photo: "https://via.placeholder.com/80x80/333/FFF?text=AM",
      text: "Pedí con algo de desconfianza pero me sorprendieron gratamente. Producto premium, empaque impecable. Volveré a comprar seguro.",
      rating: 5
    }
  ],

  // === FAQ ===
  faq: [
    {
      question: "¿Cuánto tarda el envío?",
      answer: "Los envíos nacionales tardan entre 3-5 días hábiles. Envíos internacionales entre 7-15 días hábiles dependiendo del destino."
    },
    {
      question: "¿Aceptan devoluciones?",
      answer: "Sí, tienes 30 días desde la recepción para solicitar una devolución. El producto debe estar en su empaque original y sin uso."
    },
    {
      question: "¿Cómo puedo rastrear mi pedido?",
      answer: "Una vez despachado tu pedido, recibirás un correo con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real."
    },
    {
      question: "¿Los métodos de pago son seguros?",
      answer: "Absolutamente. Utilizamos encriptación SSL de 256 bits y procesadores de pago certificados PCI DSS para proteger toda tu información."
    },
    {
      question: "¿Ofrecen descuentos por compras múltiples?",
      answer: "¡Sí! Compra 2 productos y obtén 10% de descuento. Compra 3 o más y obtén 20% de descuento automáticamente."
    },
    {
      question: "¿Cómo me contacto con soporte?",
      answer: "Puedes escribirnos por WhatsApp haciendo clic en el botón verde en la esquina inferior derecha, o a nuestro correo soporte@tumarca.com."
    }
  ],

  // === ESTADÍSTICAS ===
  stats: {
    happyCustomers: 500,
    averageRating: 4.9,
    productsSold: 1000
  }
};

console.log('✅ Tershop Online VE — Configuración cargada correctamente.');

console.log('✅ Configuración cargada:', CONFIG.storeName);
