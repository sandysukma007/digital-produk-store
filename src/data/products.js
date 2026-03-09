// Centralized demo products data
// Used when Firebase doesn't have products or for development

export const demoProducts = [
  {
    id: '1',
    name: 'Premium UI Kit - Modern Dashboard',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'UI Kit',
    description: 'A comprehensive UI kit for building modern dashboard applications. Includes 100+ components, dark mode support, and fully responsive design. Perfect for SaaS platforms, analytics dashboards, and admin panels.',
    features: [
      '100+ ready-to-use components',
      'Dark & Light mode support',
      'Fully responsive design',
      'Figma files included',
      'React & Vue versions',
      'Free updates'
    ]
  },
  {
    id: '2',
    name: 'E-commerce Template Pro',
    price: 499000,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Template',
    description: 'Complete e-commerce solution with product catalog, shopping cart, checkout flow, and admin dashboard. Built with React and TailwindCSS for modern, fast web applications.',
    features: [
      'Product catalog with categories',
      'Shopping cart functionality',
      'Secure checkout process',
      'Admin dashboard included',
      'Payment gateway integration',
      'SEO optimized'
    ]
  },
  {
    id: '3',
    name: 'Mobile App UI Bundle',
    price: 399000,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    category: 'Mobile',
    description: 'Beautiful mobile app designs for iOS and Android. Includes 50+ screens, components, and fully editable Figma files.',
    features: [
      '50+ app screens',
      'iOS & Android designs',
      'Figma source files',
      'Component library',
      'Design system included',
      'Free support'
    ]
  },
  {
    id: '4',
    name: 'SaaS Landing Page Template',
    price: 199000,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    category: 'Template',
    description: 'High-converting SaaS landing page template with hero sections, pricing tables, features, testimonials, and more.',
    features: [
      '10+ landing page sections',
      'Pricing table included',
      'Testimonial sliders',
      'Contact forms',
      'Animation effects',
      'Responsive layout'
    ]
  },
  {
    id: '5',
    name: 'Icon Pack - 500+ Icons',
    price: 99000,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    category: 'Icons',
    description: 'Professional icon pack with 500+ carefully crafted icons. Available in SVG, PNG, and font formats.',
    features: [
      '500+ unique icons',
      'SVG, PNG & Font formats',
      'Multiple sizes',
      'Consistent style',
      'Easy to customize',
      'Commercial license'
    ]
  },
  {
    id: '6',
    name: 'Email Templates Bundle',
    price: 149000,
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
    category: 'Email',
    description: 'Professional email templates for newsletters, promotional emails, and transactional messages.',
    features: [
      '20+ email templates',
      'All email clients supported',
      'Drag & drop builder',
      'Mobile responsive',
      'AMP support',
      'Free updates'
    ]
  },
  {
    id: '7',
    name: 'Portfolio Website Template',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
    category: 'Template',
    description: 'Stunning portfolio template for designers, developers, and creatives. Features project showcase, blog, and contact form.',
    features: [
      'Project showcase grid',
      'Blog functionality',
      'Contact form',
      'Social media links',
      'SEO optimized',
      'Fast loading'
    ]
  },
  {
    id: '8',
    name: 'Admin Dashboard Pro',
    price: 599000,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop',
    category: 'Dashboard',
    description: 'Enterprise-grade admin dashboard with analytics, user management, reports, and more.',
    features: [
      'Advanced analytics',
      'User management',
      'Report generation',
      'Data visualization',
      'API integration',
      'Priority support'
    ]
  }
];

// Get unique categories from products
export const getCategories = () => {
  const categories = demoProducts.map(product => product.category);
  return ['All', ...new Set(categories)];
};

// Get product by ID
export const getProductById = (id) => {
  return demoProducts.find(product => product.id === id) || null;
};

// Format price to Indonesian Rupiah
export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

