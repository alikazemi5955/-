import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-mobile',
    slug: 'mobile',
    name: 'گوشی موبایل',
    persianName: 'گوشی موبایل',
    description: 'انواع گوشی‌های هوشمند پرچمدار، میان‌رده و اقتصادی با گارانتی معتبر',
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    color: 'from-blue-600 to-indigo-700',
    isPhase1: true,
    totalProductsCount: 142,
    featuredBrands: ['Apple', 'Samsung', 'Xiaomi', 'Honor', 'Google'],
    subcategories: [
      { id: 'sub-iphone', slug: 'iphone', name: 'گوشی آیفون (Apple)', productCount: 38, popularBrands: ['Apple'] },
      { id: 'sub-samsung-mobile', slug: 'samsung-phones', name: 'گوشی سامسونگ (Samsung)', productCount: 45, popularBrands: ['Samsung'] },
      { id: 'sub-xiaomi-mobile', slug: 'xiaomi-phones', name: 'گوشی شیائومی و پوکو', productCount: 36, popularBrands: ['Xiaomi', 'Poco'] },
      { id: 'sub-other-phones', slug: 'other-smartphones', name: 'سایر برندهای موبایل', productCount: 23, popularBrands: ['Honor', 'Google', 'Nothing'] }
    ]
  },
  {
    id: 'cat-tablet',
    slug: 'tablet',
    name: 'تبلت',
    persianName: 'تبلت',
    description: 'تبلت‌های آیپد، سامسونگ و شیائومی مناسب طراحی، کاربری روزمره و گیمینگ',
    icon: 'Tablet',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-600 to-teal-700',
    isPhase1: true,
    totalProductsCount: 54,
    featuredBrands: ['Apple', 'Samsung', 'Xiaomi'],
    subcategories: [
      { id: 'sub-ipad', slug: 'ipad', name: 'آیپد اپل (iPad)', productCount: 24, popularBrands: ['Apple'] },
      { id: 'sub-samsung-tab', slug: 'samsung-tablet', name: 'تبلت سامسونگ (Galaxy Tab)', productCount: 18, popularBrands: ['Samsung'] },
      { id: 'sub-xiaomi-tab', slug: 'xiaomi-tablet', name: 'تبلت شیائومی و ردمی', productCount: 12, popularBrands: ['Xiaomi'] }
    ]
  },
  {
    id: 'cat-laptop',
    slug: 'laptop',
    name: 'لپ‌تاپ و الترابوک',
    persianName: 'لپ‌تاپ و اولترابوک',
    description: 'لپ‌تاپ‌های مهندسی، گیمینگ، مالتی‌مدیا و مک‌بوک‌های قدرتمند اپل',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    color: 'from-violet-600 to-purple-700',
    isPhase1: true,
    totalProductsCount: 88,
    featuredBrands: ['Apple', 'Asus', 'Lenovo', 'HP', 'Acer'],
    subcategories: [
      { id: 'sub-macbook', slug: 'macbook', name: 'مک بوک اپل (MacBook)', productCount: 20, popularBrands: ['Apple'] },
      { id: 'sub-asus-laptop', slug: 'asus-laptop', name: 'لپ‌تاپ ایسوس (Asus)', productCount: 32, popularBrands: ['Asus'] },
      { id: 'sub-lenovo-laptop', slug: 'lenovo-laptop', name: 'لپ‌تاپ لنوو (Lenovo)', productCount: 24, popularBrands: ['Lenovo'] },
      { id: 'sub-gaming-laptop', slug: 'gaming-laptops', name: 'لپ‌تاپ‌های مخصوص گیمینگ', productCount: 12, popularBrands: ['Asus', 'Lenovo', 'MSI'] }
    ]
  },
  {
    id: 'cat-watch',
    slug: 'smartwatch',
    name: 'ساعت و مچ‌بند هوشمند',
    persianName: 'ساعت و مچ‌بند هوشمند',
    description: 'ساعت‌های اپل واچ، گلکسی واچ و مچ‌بندهای سلامتی با قابلیت مکالمه',
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500 to-orange-600',
    isPhase1: true,
    totalProductsCount: 65,
    featuredBrands: ['Apple', 'Samsung', 'Amazfit', 'Xiaomi'],
    subcategories: [
      { id: 'sub-apple-watch', slug: 'apple-watch', name: 'اپل واچ (Apple Watch)', productCount: 18, popularBrands: ['Apple'] },
      { id: 'sub-galaxy-watch', slug: 'galaxy-watch', name: 'گلکسی واچ سامسونگ', productCount: 16, popularBrands: ['Samsung'] },
      { id: 'sub-amazfit-watch', slug: 'amazfit-xiaomi', name: 'ساعت امیزفیت و شیائومی', productCount: 31, popularBrands: ['Amazfit', 'Xiaomi'] }
    ]
  },
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'هدفون و هندزفری',
    persianName: 'هدفون، هندزفری و اسپیکر',
    description: 'ایرپاد، هدفون‌های بی‌سیم با نویزکنسلینگ و اسپیکرهای بلوتوثی باکیفیت',
    icon: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    color: 'from-rose-500 to-pink-600',
    isPhase1: true,
    totalProductsCount: 110,
    featuredBrands: ['Apple', 'Samsung', 'Sony', 'Anker', 'JBL'],
    subcategories: [
      { id: 'sub-airpods', slug: 'airpods-buds', name: 'هندزفری بی‌سیم TWS', productCount: 48, popularBrands: ['Apple', 'Samsung', 'Anker'] },
      { id: 'sub-headphones', slug: 'over-ear-headphones', name: 'هدفون روگوشی و هدست', productCount: 34, popularBrands: ['Sony', 'Anker', 'JBL'] },
      { id: 'sub-speakers', slug: 'bluetooth-speakers', name: 'اسپیکر بلوتوثی پرتابل', productCount: 28, popularBrands: ['JBL', 'Anker', 'Sony'] }
    ]
  },
  {
    id: 'cat-powerbank',
    slug: 'powerbank',
    name: 'پاوربانک و شارژر همراه',
    persianName: 'پاوربانک و شارژر همراه',
    description: 'پاوربانک‌های ظرفیت بالا، فست‌شارژ، وایرلس و مگ‌سیف',
    icon: 'BatteryCharging',
    image: 'https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=600&q=80',
    color: 'from-cyan-600 to-blue-700',
    isPhase1: true,
    totalProductsCount: 42,
    featuredBrands: ['Anker', 'Baseus', 'Xiaomi', 'Samsung'],
    subcategories: [
      { id: 'sub-fast-powerbank', slug: 'fast-charge-powerbank', name: 'پاوربانک فست شارژ (PD)', productCount: 22, popularBrands: ['Anker', 'Baseus'] },
      { id: 'sub-wireless-powerbank', slug: 'wireless-powerbank', name: 'پاوربانک بی‌سیم و مگ‌سیف', productCount: 12, popularBrands: ['Anker', 'Baseus'] },
      { id: 'sub-high-capacity', slug: 'high-capacity-powerbank', name: 'پاوربانک‌های ۲۰۰۰۰ به بالا', productCount: 8, popularBrands: ['Xiaomi', 'Anker'] }
    ]
  },
  {
    id: 'cat-chargers',
    slug: 'chargers',
    name: 'شارژر و کابل',
    persianName: 'شارژر، آداپتور و کابل',
    description: 'آداپتورهای فست‌شارژ اورجینال، کابل‌های تایپ‌سی و لایتنینگ مقاوم',
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
    color: 'from-yellow-500 to-amber-600',
    isPhase1: true,
    totalProductsCount: 95,
    featuredBrands: ['Apple', 'Samsung', 'Anker', 'Baseus'],
    subcategories: [
      { id: 'sub-wall-chargers', slug: 'wall-chargers', name: 'آداپتور و کله شارژر اصلی', productCount: 35, popularBrands: ['Apple', 'Samsung', 'Anker'] },
      { id: 'sub-cables', slug: 'charging-cables', name: 'کابل شارژ Type-C و Lightning', productCount: 42, popularBrands: ['Anker', 'Baseus'] },
      { id: 'sub-wireless-chargers', slug: 'wireless-chargers', name: 'استند و شارژر بی‌سیم', productCount: 18, popularBrands: ['Anker', 'Baseus'] }
    ]
  },
  {
    id: 'cat-mobile-accessories',
    slug: 'mobile-accessories',
    name: 'لوازم جانبی موبایل',
    persianName: 'لوازم جانبی موبایل',
    description: 'قاب و کاور، گلس محافظ صفحه، هولدر و پایه نگهدارنده گوشی',
    icon: 'Shield',
    image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-500 to-green-600',
    isPhase1: true,
    totalProductsCount: 180,
    featuredBrands: ['Spigen', 'Baseus', 'Nillkin', 'Green Lion'],
    subcategories: [
      { id: 'sub-cases', slug: 'phone-cases', name: 'قاب، کاور و محافظ لنز', productCount: 85, popularBrands: ['Spigen', 'Nillkin'] },
      { id: 'sub-screen-protectors', slug: 'screen-protectors', name: 'گلس و محافظ صفحه نمایش', productCount: 55, popularBrands: ['Green Lion', 'Nillkin'] },
      { id: 'sub-holders', slug: 'phone-holders', name: 'هولدر خودرو و رومیزی', productCount: 40, popularBrands: ['Baseus', 'Joyroom'] }
    ]
  },
  {
    id: 'cat-computer-accessories',
    slug: 'computer-accessories',
    name: 'لوازم جانبی کامپیوتر',
    persianName: 'لوازم جانبی کامپیوتر',
    description: 'ماوس و کیبورد، هاب USB-C، حافظه SSD اکسترنال و فلش مموری',
    icon: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    color: 'from-slate-700 to-zinc-800',
    isPhase1: true,
    totalProductsCount: 75,
    featuredBrands: ['Logitech', 'Samsung', 'Sandisk', 'Razer'],
    subcategories: [
      { id: 'sub-mouse-keyboard', slug: 'mouse-keyboard', name: 'ماوس و کیبورد', productCount: 32, popularBrands: ['Logitech', 'Razer'] },
      { id: 'sub-storage', slug: 'external-storage', name: 'هارد و حافظه SSD اکسترنال', productCount: 25, popularBrands: ['Samsung', 'Sandisk', 'Western Digital'] },
      { id: 'sub-hubs', slug: 'usb-hubs', name: 'هاب و تبدیل Type-C', productCount: 18, popularBrands: ['Baseus', 'Anker'] }
    ]
  },
  {
    id: 'cat-other-digital',
    slug: 'other-digital',
    name: 'سایر کالاهای دیجیتال',
    persianName: 'کنسول، گیمینگ و گجت‌های هوشمند',
    description: 'کنسول‌های پلی‌استیشن، اکس‌باکس، رینگ لایت و گجت‌های جذاب',
    icon: 'Gamepad2',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    color: 'from-fuchsia-600 to-purple-800',
    isPhase1: true,
    totalProductsCount: 38,
    featuredBrands: ['Sony', 'Microsoft', 'Nintendo'],
    subcategories: [
      { id: 'sub-consoles', slug: 'gaming-consoles', name: 'کنسول بازی و دسته گیمینگ', productCount: 18, popularBrands: ['Sony', 'Microsoft'] },
      { id: 'sub-smart-gadgets', slug: 'smart-gadgets', name: 'گجت‌های هوشمند و نورپردازی', productCount: 20, popularBrands: ['Xiaomi', 'Govee'] }
    ]
  }
];
