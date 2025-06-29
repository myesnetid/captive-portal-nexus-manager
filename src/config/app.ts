
export const APP_CONFIG = {
  // Site Information
  siteName: process.env.VITE_SITE_NAME || "Myesnet.id",
  siteTitle: process.env.VITE_SITE_TITLE || "Internet Provider Terpercaya",
  pageTitle: process.env.VITE_PAGE_TITLE || "Myesnet.id - Captive Portal",
  
  // API Configuration
  apiUrl: process.env.VITE_API_URL || "http://localhost:3000/api",
  radiusServer: process.env.VITE_RADIUS_SERVER || "127.0.0.1",
  
  // Default Settings
  defaultSettings: {
    siteName: "Myesnet.id",
    siteTitle: "Internet Provider Terpercaya",
    pageTitle: "Myesnet.id - Captive Portal",
    description: "Internet Provider Terpercaya untuk kebutuhan internet Anda",
    welcomeMessage: "Selamat datang di layanan internet Myesnet.id",
    contactPhone: "+62 812-3456-7890",
    contactAddress: "Jl. Internet Sehat No. 123\nKota Digital",
    adminEmail: "admin@myesnet.id"
  },
  
  // Voucher Configuration
  voucherTypes: [
    { id: '1j', name: '1 Jam', duration: 60, price: 2000 },
    { id: '3j', name: '3 Jam', duration: 180, price: 5000 },
    { id: '6j', name: '6 Jam', duration: 360, price: 8000 },
    { id: '1h', name: '1 Hari', duration: 1440, price: 12000 },
    { id: '1m', name: '1 Minggu', duration: 10080, price: 25000 }
  ],
  
  // Member Packages
  memberPackages: [
    { id: 'basic', name: 'Basic', speed: '10 Mbps', price: 150000, devices: 2 },
    { id: 'standard', name: 'Standard', speed: '20 Mbps', price: 250000, devices: 4 },
    { id: 'premium', name: 'Premium', speed: '50 Mbps', price: 400000, devices: 6 }
  ]
};
