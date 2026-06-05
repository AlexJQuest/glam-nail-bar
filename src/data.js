import galleryImg1 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.21 PM.jpeg';
import galleryImg2 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.21 PM (1).jpeg';
import galleryImg3 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.22 PM (1).jpeg';
import galleryImg4 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.22 PM (2).jpeg';
import galleryImg5 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.22 PM (3).jpeg';
import galleryImg6 from './Gallery/WhatsApp Image 2026-06-05 at 1.12.22 PM (4).jpeg';

export const ADMIN_PASSWORD = 'glamOwnerSecret2026';
export const bookingStorageKey = 'glamNailsBookings';
export const incomeStorageKey = 'glamNailsIncomes';
export const expenseStorageKey = 'glamNailsExpenses';

export const services = [
  {
    title: 'Manicure & Pedicure',
    description: 'Classic, spa, and deluxe treatments that refresh and restore hands and feet.',
  },
  {
    title: 'Gel & Acrylic Nails',
    description: 'Long-lasting polish, sculpted extensions, and refill maintenance for flawless nails.',
  },
  {
    title: 'Custom Nail Art',
    description: 'Hand-painted designs, crystals, ombré, marble, and unique looks for every event.',
  },
  {
    title: 'Bridal & Special Events',
    description: 'Personalized bridal sets, bridesmaid packages, and photo-ready nails for special days.',
  },
];

export const servicePrices = {
  'Classic Manicure': 55,
  'Gel Polish': 65,
  'Acrylic Extensions': 85,
  'Bridal Set': 120,
  'Spa Pedicure': 75,
};

export const galleryItems = [
  {
    category: 'manicure',
    image: galleryImg1,
    caption: 'Soft blush mani with subtle metallic accents.',
  },
  {
    category: 'gel',
    image: galleryImg2,
    caption: 'Bold gel details with a glossy finish.',
  },
  {
    category: 'bridal',
    image: galleryImg3,
    caption: 'Bridal set with pearlescent shine and detail.',
  },
  {
    category: 'manicure',
    image: galleryImg4,
    caption: 'Custom manicure with elegant texture and shine.',
  },
  {
    category: 'gel',
    image: galleryImg5,
    caption: 'Modern gel nails with precise line work.',
  },
  {
    category: 'bridal',
    image: galleryImg6,
    caption: 'Luxury bridal nails with subtle sparkle accents.',
  },
];

export const testimonials = [
  {
    quote: "The best nail experience I've ever had. My nails lasted weeks and looked stunning for my wedding.",
    author: 'Maya L.',
  },
  {
    quote: 'Super friendly, clean studio, and the design turned out exactly how I imagined. Highly recommend!',
    author: 'Ana G.',
  },
  {
    quote: 'Amazing attention to detail. Every visit feels luxurious and relaxing.',
    author: 'Zoe T.',
  },
];

export const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  notes: '',
  designLink: '',
  moodboardImageName: '',
};
