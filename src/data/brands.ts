import { Brand } from '../types';

export const BRANDS: Brand[] = [
  {
    id: 'brand-apple',
    name: 'Apple',
    persianName: 'اپل',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=200&q=80',
    description: 'نوآوری در گوشی‌های هوشمند آیفون، مک‌بوک، آیپد و اپل واچ',
    categories: ['cat-mobile', 'cat-laptop', 'cat-tablet', 'cat-watch', 'cat-audio'],
    productCount: 42
  },
  {
    id: 'brand-samsung',
    name: 'Samsung',
    persianName: 'سامسونگ',
    logo: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=200&q=80',
    description: 'پرچمدار دنیای اندروید، گلکسی سری S و Z، تبلت و هدفون',
    categories: ['cat-mobile', 'cat-tablet', 'cat-watch', 'cat-audio', 'cat-computer-accessories'],
    productCount: 56
  },
  {
    id: 'brand-xiaomi',
    name: 'Xiaomi',
    persianName: 'شیائومی',
    logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80',
    description: 'تکنولوژی پیشرفته با بالاترین ارزش خرید و تنوع بالا',
    categories: ['cat-mobile', 'cat-tablet', 'cat-watch', 'cat-audio', 'cat-powerbank'],
    productCount: 48
  },
  {
    id: 'brand-asus',
    name: 'Asus',
    persianName: 'ایسوس',
    logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80',
    description: 'برترین لپ‌تاپ‌های گیمینگ ROG و زن‌بوک‌های مهندسی',
    categories: ['cat-laptop', 'cat-computer-accessories'],
    productCount: 28
  },
  {
    id: 'brand-sony',
    name: 'Sony',
    persianName: 'سونی',
    logo: 'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=200&q=80',
    description: 'سردمدار کیفیت صدا، هدفون‌های WH-1000XM و کنسول PS5',
    categories: ['cat-audio', 'cat-other-digital'],
    productCount: 22
  },
  {
    id: 'brand-anker',
    name: 'Anker',
    persianName: 'انکر',
    logo: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80',
    description: 'تخصصی‌ترین برند پاوربانک، شارژر و تجهیزات صوتی Soundcore',
    categories: ['cat-audio', 'cat-powerbank', 'cat-chargers'],
    productCount: 35
  },
  {
    id: 'brand-logitech',
    name: 'Logitech',
    persianName: 'لاجیتک',
    logo: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=200&q=80',
    description: 'ماوس و کیبوردهای حرفه‌ای سری MX Master و گیمینگ',
    categories: ['cat-computer-accessories'],
    productCount: 26
  },
  {
    id: 'brand-baseus',
    name: 'Baseus',
    persianName: 'باسئوس',
    logo: 'https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=200&q=80',
    description: 'تجهیزات جانبی باکیفیت و مدرن برای انواع گجت‌ها',
    categories: ['cat-chargers', 'cat-powerbank', 'cat-mobile-accessories', 'cat-computer-accessories'],
    productCount: 39
  }
];
