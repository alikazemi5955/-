import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. iPhone 16 Pro Max
  {
    id: 'prod-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max 256GB Dual SIM',
    persianName: 'گوشی موبایل اپل مدل iPhone 16 Pro Max دو سیم‌کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت',
    brand: 'Apple',
    category: 'cat-mobile',
    subcategory: 'sub-iphone',
    price: 94800000,
    oldPrice: 99500000,
    discount: 5,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 148,
    stock: 15,
    description: 'جدیدترین پرچمدار اپل با بدنه تیتانیومی مقاوم، دکمه Camera Control جدید، تراشه فوق قدرتمند A18 Pro و صفحه نمایش خیره‌کننده 6.9 اینچی Super Retina XDR.',
    fullDescription: 'آیفون 16 پرو مکس اوج مهندسی و نوآوری اپل است. طراحی چشم‌نواز با حاشیه‌های فوق‌باریک و بدنه تیتانیوم گرید ۵ سبکی و استحکام کم‌نظیری به همراه دارد. دکمه کنترل دوربین به شما اجازه می‌دهد عکاسی حرفه‌ای را با یک لمس تجربه کنید. پردازنده A18 Pro با موتور عصبی ۱۶ هسته‌ای برای پردازش هوش مصنوعی Apple Intelligence بهینه‌سازی شده است.',
    keyFeatures: [
      'صفحه نمایش 6.9 اینچ Super Retina XDR OLED با ProMotion 120Hz',
      'تراشه Apple A18 Pro شش هسته‌ای با معماری ۳ نانومتری',
      'دوربین سه‌گانه 48 + 48 + 12 مگاپیکسل با زوم اپتیکال 5 برابری',
      'بدنه تیتانیومی فوق‌العاده مقاوم و سبک با دکمه اختصاصی Camera Control',
      'پشتیبانی کامل از شارژ سریع 25 وات و شارژ بی‌سیم مگ‌سیف'
    ],
    specifications: [
      {
        groupName: 'مشخصات عمومی',
        items: [
          { label: 'تاریخ معرفی', value: 'سپتامبر ۲۰۲۴' },
          { label: 'وضعیت رجیستری', value: 'دارای کد رجیستری و گارانتی شرکتی ۱۸ ماهه' },
          { label: 'تعداد سیم‌کارت', value: 'دو سیم‌کارت فیزیکی (Dual SIM)' },
          { label: 'سیستم عامل', value: 'iOS 18' }
        ]
      },
      {
        groupName: 'پردازنده و سخت‌افزار',
        items: [
          { label: 'تراشه', value: 'Apple A18 Pro (3 nm)' },
          { label: 'پردازنده گرافیکی', value: 'Apple GPU (6-core graphics)' },
          { label: 'حافظه رم (RAM)', value: '8 گیگابایت' },
          { label: 'حافظه داخلی', value: '256 گیگابایت NVMe' }
        ]
      },
      {
        groupName: 'صفحه نمایش',
        items: [
          { label: 'اندازه صفحه نمایش', value: '6.9 اینچ' },
          { label: 'نوع پنل', value: 'LTPO Super Retina XDR OLED' },
          { label: 'رزولوشن', value: '1320 × 2868 پیکسل' },
          { label: 'نرخ نوسازی', value: '120 هرتز تطبیقی (ProMotion)' },
          { label: 'روشنایی حداکثر', value: '2000 نیت' }
        ]
      },
      {
        groupName: 'دوربین',
        items: [
          { label: 'دوربین اصلی', value: '48 مگاپیکسل عریض (f/1.8) با سنسور شیفت' },
          { label: 'دوربین دوم', value: '48 مگاپیکسل فوق عریض (f/2.2)' },
          { label: 'دوربین تله‌فوتو', value: '12 مگاپیکسل پریسکوپ با زوم ۵ برابری' },
          { label: 'دوربین سلفی', value: '12 مگاپیکسل با فوکوس خودکار' },
          { label: 'کیفیت فیلم‌برداری', value: '4K با سرعت 120 فریم در ثانیه (Dolby Vision)' }
        ]
      },
      {
        groupName: 'باتری و شارژ',
        items: [
          { label: 'ظرفیت باتری', value: '4685 میلی‌آمپر ساعت' },
          { label: 'توان شارژ سیمی', value: '25 وات (50% در 30 دقیقه)' },
          { label: 'شارژ وایرلس', value: 'MagSafe تا 25 وات' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ‌بندی تیتانیوم',
        options: [
          { id: 'c-nat', name: 'تیتانیوم طبیعی', value: 'Natural Titanium', colorCode: '#9a948d', inStock: true },
          { id: 'c-des', name: 'تیتانیوم کویری (صحرایی)', value: 'Desert Titanium', colorCode: '#c5ab95', inStock: true },
          { id: 'c-blk', name: 'تیتانیوم مشکی', value: 'Black Titanium', colorCode: '#3c3b37', inStock: true },
          { id: 'c-wht', name: 'تیتانیوم سفید', value: 'White Titanium', colorCode: '#eae6df', inStock: true }
        ]
      },
      {
        type: 'storage',
        title: 'ظرفیت حافظه داخلی',
        options: [
          { id: 's-256', name: '256 گیگابایت', value: '256GB', priceDelta: 0, inStock: true },
          { id: 's-512', name: '512 گیگابایت', value: '512GB', priceDelta: 14000000, inStock: true },
          { id: 's-1tb', name: '1 ترابایت', value: '1TB', priceDelta: 29000000, inStock: true }
        ]
      },
      {
        type: 'warranty',
        title: 'گارانتی و بیمه',
        options: [
          { id: 'w-18m', name: '۱۸ ماه گارانتی شرکتی معتبر + کد رجیستری', value: '18M-Official', priceDelta: 0, inStock: true },
          { id: 'w-vip', name: '۱۸ ماه گارانتی VIP + ۱۲ ماه بیمه شکستگی و سرقت', value: 'VIP-Insurance', priceDelta: 2800000, inStock: true }
        ]
      }
    ],
    badges: ['special_deal', 'bestseller', 'official_warranty', 'express_shipping'],
    createdAt: '2026-08-10',
    tags: ['iphone', 'apple', 'flagship', '5g', 'titanium', 'iphone 16'],
    salesCount: 340,
    views: 18200
  },

  // 2. Samsung Galaxy S24 Ultra
  {
    id: 'prod-samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G 256GB Dual SIM',
    persianName: 'گوشی موبایل سامسونگ مدل Galaxy S24 Ultra 5G دو سیم‌کارت ظرفیت 256 گیگابایت و رم 12 گیگابایت',
    brand: 'Samsung',
    category: 'cat-mobile',
    subcategory: 'sub-samsung-mobile',
    price: 68900000,
    oldPrice: 74500000,
    discount: 8,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 230,
    stock: 22,
    description: 'قدرتمندترین پرچمدار سامسونگ مجهز به قلم هوشمند S-Pen، هوش مصنوعی انقلابی Galaxy AI، بدنه تیتانیومی و دوربین ۲۰۰ مگاپیکسلی خارق‌العاده.',
    fullDescription: 'گلکسی اس ۲۴ اولترا نهایت خلاقیت و بهره‌وری است. با قلم داخلی S-Pen یادداشت برداری و نقاشی کنید. قابلیت‌های هوش مصنوعی Galaxy AI از جمله ترجمه زنده مکالمه، Circle to Search با گوگل و ویرایش جادویی تصاویر، تجربه کار با گوشی را دگرگون ساخته‌اند.',
    keyFeatures: [
      'صفحه نمایش 6.8 اینچ Dynamic LTPO AMOLED 2X با محافظ Corning Gorilla Armor ضد انعکاس',
      'پردازنده پرچمدار Snapdragon 8 Gen 3 for Galaxy',
      'دوربین 200 مگاپیکسلی با زوم ۱۰۰ برابری فضایی و Nightography ارتقا یافته',
      'قلم لمسی یکپارچه S-Pen با تاخیر ۲.۸ میلی‌ثانیه',
      'باتری ۵۰۰۰ میلی‌آمپر ساعتی با شارژ سریع ۴۵ وات'
    ],
    specifications: [
      {
        groupName: 'مشخصات کلی',
        items: [
          { label: 'تاریخ معرفی', value: 'ژانویه ۲۰۲۴' },
          { label: 'وضعیت رجیستری', value: 'رجیستر شده با گارانتی ۱۸ ماهه شرکتی' },
          { label: 'سیستم عامل', value: 'Android 14 با پشتیبانی ۷ ساله آپدیت' }
        ]
      },
      {
        groupName: 'سخت‌افزار و پردازنده',
        items: [
          { label: 'چیپست', value: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4 nm)' },
          { label: 'رم', value: '12 گیگابایت LPDDR5X' },
          { label: 'حافظه داخلی', value: '256 گیگابایت UFS 4.0' }
        ]
      },
      {
        groupName: 'نمایشگر',
        items: [
          { label: 'ابعاد', value: '6.8 اینچ' },
          { label: 'رزولوشن', value: '1440 × 3120 پیکسل (Quad HD+)' },
          { label: 'روشنایی اوج', value: '2600 نیت' },
          { label: 'نرخ بازسازی', value: '1-120 هرتز متغیر' }
        ]
      },
      {
        groupName: 'دوربین',
        items: [
          { label: 'سنسور اصلی', value: '200 مگاپیکسل لرزشگیر اپتیکال (OIS)' },
          { label: 'تله‌فوتو پریسکوپ', value: '50 مگاپیکسل زوم ۵ برابر اپتیکال' },
          { label: 'تله‌فوتو دوم', value: '10 مگاپیکسل زوم ۳ برابر' },
          { label: 'اولتراواید', value: '12 مگاپیکسل زاویه ۱۲۰ درجه' }
        ]
      },
      {
        groupName: 'باتری',
        items: [
          { label: 'ظرفیت', value: '5000 میلی‌آمپر ساعت' },
          { label: 'شارژ سریع سیمی', value: '45 وات' },
          { label: 'شارژ وایرلس معکوس', value: '4.5 وات' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-s24-gray', name: 'خاکستری تیتانیوم', value: 'Titanium Gray', colorCode: '#707073', inStock: true },
          { id: 'c-s24-black', name: 'مشکی تیتانیوم', value: 'Titanium Black', colorCode: '#262626', inStock: true },
          { id: 'c-s24-violet', name: 'بنفش تیتانیوم', value: 'Titanium Violet', colorCode: '#5c546b', inStock: true },
          { id: 'c-s24-yellow', name: 'زرد تیتانیوم', value: 'Titanium Yellow', colorCode: '#e8dcbe', inStock: true }
        ]
      },
      {
        type: 'storage',
        title: 'حافظه داخلی و رم',
        options: [
          { id: 's-256-12', name: '256 گیگابایت / رم 12', value: '256GB-12GB', priceDelta: 0, inStock: true },
          { id: 's-512-12', name: '512 گیگابایت / رم 12', value: '512GB-12GB', priceDelta: 7500000, inStock: true }
        ]
      }
    ],
    badges: ['special_deal', 'bestseller', 'official_warranty', 'express_shipping'],
    createdAt: '2026-08-01',
    tags: ['samsung', 'galaxy', 's24 ultra', 'flagship', 'ai', 'spen'],
    salesCount: 410,
    views: 24500
  },

  // 3. Xiaomi 14 Ultra
  {
    id: 'prod-xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra 5G 512GB Dual SIM',
    persianName: 'گوشی موبایل شیائومی مدل 14 Ultra دو سیم‌کارت ظرفیت 512 گیگابایت و رم 16 گیگابایت',
    brand: 'Xiaomi',
    category: 'cat-mobile',
    subcategory: 'sub-xiaomi-mobile',
    price: 64500000,
    oldPrice: 69000000,
    discount: 7,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 89,
    stock: 10,
    description: 'شاهکار عکاسی موبایل با لنزهای اپتیکال لایکا (Leica)، سنسور ۱ اینچی Sony LYT-900، دیافراگم متغیر و پردازنده اسنپدراگون 8 نسل 3.',
    keyFeatures: [
      'سیستم دوربین ۴ گانه 50 مگاپیکسلی با اپتیک Leica Summilux',
      'سنسور فوق‌العاده ۱ اینچی با دیافراگم متغیر مکانیکی f/1.63 تا f/4.0',
      'نمایشگر 6.73 اینچ LTPO AMOLED با وضوح WQHD+ و 3000 نیت روشنایی',
      'شارژ فوق سریع ۹۰ وات سیمی و ۸۰ وات بی‌سیم'
    ],
    specifications: [
      {
        groupName: 'سخت‌افزار',
        items: [
          { label: 'تراشه', value: 'Qualcomm Snapdragon 8 Gen 3' },
          { label: 'حافظه رم', value: '16 گیگابایت' },
          { label: 'حافظه داخلی', value: '512 گیگابایت' }
        ]
      },
      {
        groupName: 'باتری',
        items: [
          { label: 'ظرفیت', value: '5000 میلی‌آمپر ساعت' },
          { label: 'شارژ سریع سیمی', value: '90 وات (۱۰۰٪ در ۳۳ دقیقه)' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه چرم گیاهی',
        options: [
          { id: 'c-mi-blk', name: 'مشکی چرم نانو', value: 'Black Leather', colorCode: '#1f1f1f', inStock: true },
          { id: 'c-mi-wht', name: 'سفید چرم نانو', value: 'White Leather', colorCode: '#f0f0f0', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-07-20',
    tags: ['xiaomi', 'leica', 'camera phone', 'flagship'],
    salesCount: 160,
    views: 9800
  },

  // 4. Samsung Galaxy A55 5G
  {
    id: 'prod-samsung-a55',
    name: 'Samsung Galaxy A55 5G 256GB Dual SIM',
    persianName: 'گوشی موبایل سامسونگ مدل Galaxy A55 5G دو سیم‌کارت ظرفیت 256 گیگابایت و رم 8 گیگابایت',
    brand: 'Samsung',
    category: 'cat-mobile',
    subcategory: 'sub-samsung-mobile',
    price: 21400000,
    oldPrice: 23500000,
    discount: 9,
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 340,
    stock: 45,
    description: 'محبوب‌ترین میان‌رده بازار با فریم آلومینیومی مستحکم، پنل Super AMOLED 120Hz، پردازنده اگزینوس 1480 با گرافیک AMD و پشتیبانی ۴ سال آپدیت.',
    keyFeatures: [
      'صفحه نمایش 6.6 اینچ Super AMOLED با نرخ رفرش 120 هرتز',
      'طراحی پریمیوم با فریم فلزی و پنل شیشه‌ای گوریلا گلس ویکتوس پلاس',
      'دوربین اصلی 50 مگاپیکسل با لرزشگیر اپتیکال OIS',
      'استاندارد مقاومت در برابر آب و گرد و غبار IP67'
    ],
    specifications: [
      {
        groupName: 'مشخصات فنی',
        items: [
          { label: 'تراشه', value: 'Samsung Exynos 1480 (4 nm)' },
          { label: 'رم و حافظه', value: '8 گیگابایت رم / 256 گیگابایت حافظه' },
          { label: 'باتری', value: '5000 میلی‌آمپر با شارژ 25 وات' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ‌بندی',
        options: [
          { id: 'c-a55-navy', name: 'سرمه‌ای تیره', value: 'Awesome Navy', colorCode: '#1e293b', inStock: true },
          { id: 'c-a55-ice', name: 'آبی یخی', value: 'Awesome Iceblue', colorCode: '#bae6fd', inStock: true },
          { id: 'c-a55-lilac', name: 'یاسی لایت', value: 'Awesome Lilac', colorCode: '#e9d5ff', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty', 'express_shipping'],
    createdAt: '2026-08-05',
    tags: ['samsung', 'galaxy a55', 'mid-range', 'value'],
    salesCount: 820,
    views: 31000
  },

  // 5. MacBook Pro 16 M3 Max
  {
    id: 'prod-macbook-pro-16-m3-max',
    name: 'Apple MacBook Pro 16 Inch M3 Max 36GB 1TB SSD',
    persianName: 'لپ تاپ 16.2 اینچی اپل مدل MacBook Pro 2023 با تراشه M3 Max رم 36 گیگابایت و 1 ترابایت SSD',
    brand: 'Apple',
    category: 'cat-laptop',
    subcategory: 'sub-macbook',
    price: 189000000,
    oldPrice: 198000000,
    discount: 5,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewCount: 42,
    stock: 6,
    description: 'هیولای پردازشی اپل برای برنامه‌نویسان، تدوین‌گران و طراحان 3D. تراشه M3 Max با ۱۴ هسته CPU و ۳۰ هسته GPU و صفحه نمایش فوق‌العاده Liquid Retina XDR.',
    keyFeatures: [
      'تراشه Apple M3 Max با ۱۴ هسته پردازشی و ۳۰ هسته گرافیکی',
      'حافظه یکپارچه ۳۶ گیگابایت و ۱ ترابایت SSD با سرعت خواندن ۷۰۰۰ مگابایت بر ثانیه',
      'صفحه نمایش 16.2 اینچی Liquid Retina XDR با کنتراست ۱:۱,۰۰۰,۰۰۰ و 120Hz ProMotion',
      'عمر باتری شگفت‌انگیز تا ۲۲ ساعت مداوم'
    ],
    specifications: [
      {
        groupName: 'پردازش و گرافیک',
        items: [
          { label: 'پردازنده مرکزی', value: 'Apple M3 Max (14-Core CPU)' },
          { label: 'پردازنده گرافیکی', value: '30-Core GPU با Ray Tracing سخت‌افزاری' },
          { label: 'حافظه رم', value: '36 گیگابایت Unified Memory' },
          { label: 'حافظه ذخیره‌سازی', value: '1 ترابایت NVMe SSD' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-mb-spaceblk', name: 'مشکی فضایی (Space Black)', value: 'Space Black', colorCode: '#2e2f33', inStock: true },
          { id: 'c-mb-silver', name: 'نقره‌ای (Silver)', value: 'Silver', colorCode: '#e3e4e6', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-07-15',
    tags: ['macbook', 'apple', 'm3 max', 'laptop', 'pro'],
    salesCount: 45,
    views: 7400
  },

  // 6. Asus ROG Strix SCAR 16
  {
    id: 'prod-asus-rog-scar-16',
    name: 'ASUS ROG Strix SCAR 16 i9 14900HX RTX 4080 32GB 1TB',
    persianName: 'لپ تاپ گیمینگ 16 اینچی ایسوس مدل ROG Strix SCAR 16 Core i9 14900HX رم 32GB حافظه 1TB SSD گرافیک RTX 4080',
    brand: 'Asus',
    category: 'cat-laptop',
    subcategory: 'sub-gaming-laptop',
    price: 168000000,
    oldPrice: 179000000,
    discount: 6,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 31,
    stock: 8,
    description: 'نهایت قدرت در بازی‌ها با پردازنده Intel Core i9-14900HX، کارت گرافیک Nvidia RTX 4080 12GB، نمایشگر Mini-LED با نرخ نوسازی 240 هرتز.',
    keyFeatures: [
      'پردازنده نسل ۱۴ اینتل Core i9-14900HX با ۲۴ هسته و ۳۲ رشته',
      'کارت گرافیک قدرتمند Nvidia GeForce RTX 4080 12GB با توان ۱۷۵ وات',
      'نمایشگر ROG Nebula HDR Mini-LED با رزولوشن QHD+ و نرخ نوسازی 240Hz',
      'سیستم خنک‌کننده فلز مایع با ۳ فن هوشمند'
    ],
    specifications: [
      {
        groupName: 'سخت‌افزار',
        items: [
          { label: 'پردازنده', value: 'Intel Core i9 14900HX (Up to 5.8 GHz)' },
          { label: 'کارت گرافیک', value: 'Nvidia GeForce RTX 4080 12GB GDDR6' },
          { label: 'حافظه رم', value: '32 گیگابایت DDR5 5600MHz (قابل ارتقا)' },
          { label: 'حافظه داخلی', value: '1 ترابایت PCIe 4.0 NVMe M.2' }
        ]
      }
    ],
    badges: ['special_deal', 'official_warranty'],
    createdAt: '2026-08-02',
    tags: ['asus', 'rog', 'gaming laptop', 'rtx 4080', 'i9'],
    salesCount: 65,
    views: 11200
  },

  // 7. iPad Pro 13 M4
  {
    id: 'prod-ipad-pro-13-m4',
    name: 'Apple iPad Pro 13 Inch M4 256GB Wi-Fi',
    persianName: 'تبلت 13 اینچی اپل مدل iPad Pro 2024 با تراشه M4 ظرفیت 256 گیگابایت Wi-Fi',
    brand: 'Apple',
    category: 'cat-tablet',
    subcategory: 'sub-ipad',
    price: 88500000,
    oldPrice: 94000000,
    discount: 6,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 58,
    stock: 12,
    description: 'باریک‌ترین محصول تاریخ اپل با ضخامت باورنکردنی ۵.۱ میلی‌متر، نمایشگر فوق‌پیشرفته Ultra Retina Tandem OLED و پردازنده انقلابی M4.',
    keyFeatures: [
      'نمایشگر جدید دو لایه Tandem OLED با روشنایی ۱۶۰۰ نیت و وضوح کریستالی',
      'تراشه پرچمدار Apple M4 با شتاب‌دهنده سخت‌افزاری هوش مصنوعی',
      'طراحی فوق‌العاده باریک و سبک فقط ۵۷۹ گرم',
      'پشتیبانی از قلم جدید Apple Pencil Pro با فیدبک لمسی'
    ],
    specifications: [
      {
        groupName: 'سخت‌افزار',
        items: [
          { label: 'تراشه', value: 'Apple M4 (9-Core CPU / 10-Core GPU)' },
          { label: 'حافظه داخلی', value: '256 گیگابایت' },
          { label: 'رم', value: '8 گیگابایت' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-ip-spaceblk', name: 'مشکی فضایی (Space Black)', value: 'Space Black', colorCode: '#262626', inStock: true },
          { id: 'c-ip-silver', name: 'نقره‌ای (Silver)', value: 'Silver', colorCode: '#e8e8e8', inStock: true }
        ]
      }
    ],
    badges: ['new_arrival', 'official_warranty', 'express_shipping'],
    createdAt: '2026-08-11',
    tags: ['ipad', 'ipad pro m4', 'apple tablet', 'oled'],
    salesCount: 92,
    views: 14500
  },

  // 8. Apple Watch Ultra 2
  {
    id: 'prod-apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 49mm Titanium GPS + Cellular',
    persianName: 'ساعت هوشمند اپل مدل Watch Ultra 2 بدنه تیتانیوم ۴۹ میلی‌متری با بند تریل لوپ',
    brand: 'Apple',
    category: 'cat-watch',
    subcategory: 'sub-apple-watch',
    price: 49800000,
    oldPrice: 53000000,
    discount: 6,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 96,
    stock: 14,
    description: 'مقاوم‌ترین ساعت هوشمند برای ورزشکاران حرفه‌ای و ماجراجویان. تراشه S9 SiP، نمایشگر با روشنایی ۳۰۰۰ نیت، GPS دو فرکانسه و مقاومت تا عمق ۱۰۰ متر.',
    keyFeatures: [
      'بدنه تیتانیوم گرید هوافضا با کریستال یاقوت کبود ضد خش',
      'روشنایی خیره‌کننده ۳۰۰۰ نیت خوانا در شدیدترین نور خورشید',
      'ژست حرکتی جدید Double Tap با انگشتان',
      'عمر باتری تا ۷۲ ساعت در حالت Low Power'
    ],
    specifications: [
      {
        groupName: 'مشخصات فنی',
        items: [
          { label: 'تراشه', value: 'Apple S9 SiP با پردازنده ۴ هسته‌ای موتور عصبی' },
          { label: 'اندازه قاب', value: '49 میلی‌متر تیتانیومی' },
          { label: 'سنسورها', value: 'اکسیژن خون، نوار قلب ECG، سنسور دمای آب و عمق‌سنج' }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-07-28',
    tags: ['apple watch', 'ultra 2', 'smartwatch', 'titanium'],
    salesCount: 185,
    views: 16200
  },

  // 9. Samsung Galaxy Watch 6 Classic
  {
    id: 'prod-samsung-watch-6-classic',
    name: 'Samsung Galaxy Watch 6 Classic 47mm LTE',
    persianName: 'ساعت هوشمند سامسونگ مدل Galaxy Watch 6 Classic سایز 47 میلی‌متر با حاشیه چرخان فیزیکی',
    brand: 'Samsung',
    category: 'cat-watch',
    subcategory: 'sub-galaxy-watch',
    price: 16900000,
    oldPrice: 19200000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 165,
    stock: 20,
    description: 'کلاسیک‌ترین ساعت هوشمند اندرویدی با بزل چرخان نمادین، پایش جامع خواب و سلامت قلب، بدنه استیل ضد زنگ و شیشه سافایر.',
    keyFeatures: [
      'حاشیه چرخان مکانیکی چرخاننده منوها با حس مکانیکی فوق‌العاده',
      'صفحه نمایش Super AMOLED با پوشش کریستال یاقوت کبود',
      'پایش حرفه‌ای ساختار بدن (BIA)، فشار خون و ECG',
      'پشتیبانی از سیستم عامل Wear OS با دسترسی به گوگل پلی'
    ],
    specifications: [
      {
        groupName: 'مشخصات کلی',
        items: [
          { label: 'اندازه قاب', value: '47 میلی‌متر استیل ضدزنگ' },
          { label: 'سیستم عامل', value: 'Wear OS Powered by Samsung' },
          { label: 'باتری', value: '425 میلی‌آمپر ساعت با شارژ بی‌سیم سریع' }
        ]
      }
    ],
    badges: ['special_deal', 'official_warranty'],
    createdAt: '2026-08-01',
    tags: ['samsung watch', 'galaxy watch 6', 'classic'],
    salesCount: 290,
    views: 15400
  },

  // 10. Sony WH-1000XM5
  {
    id: 'prod-sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    persianName: 'هدفون بی‌سیم سونی مدل WH-1000XM5 با قابلیت نویز کنسلینگ فعال و صدای High-Res Audio',
    brand: 'Sony',
    category: 'cat-audio',
    subcategory: 'sub-headphones',
    price: 19800000,
    oldPrice: 22500000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 310,
    stock: 18,
    description: 'پادشاه نویز کنسلینگ جهان با ۲ پردازنده مجزا و ۸ میکروفون هوشمند، درایورهای ۳۰ میلی‌متری کربنی، ۳۰ ساعت شارژدهی و کدک صوتی بدون افت کیفیت LDAC.',
    keyFeatures: [
      'بهترین سیستم حذف نویز جهان با دو پردازنده V1 و QN1',
      'کیفیت تماس شفاف کریستالی با ۴ میکروفون Beamforming و الگوریتم هوش مصنوعی',
      'طراحی ارگونومیک فوق‌العاده راحت با روکش چرم نرم Soft Fit Leather',
      'شارژ سریع: ۳ دقیقه شارژ برابر با ۳ ساعت پخش موسیقی'
    ],
    specifications: [
      {
        groupName: 'صدا و درایور',
        items: [
          { label: 'قطر درایور', value: '30 میلی‌متر فیبر کربن کامپوزیت' },
          { label: 'پاسخ فرکانسی', value: '4 هرتز تا 40,000 هرتز (High-Res)' },
          { label: 'کدک‌های بلوتوث', value: 'LDAC, AAC, SBC' },
          { label: 'عمر باتری', value: 'تا ۳۰ ساعت با ANC روشن / ۴۰ ساعت خاموش' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ هدفون',
        options: [
          { id: 'c-sony-blk', name: 'مشکی مات', value: 'Black', colorCode: '#1a1a1a', inStock: true },
          { id: 'c-sony-slv', name: 'پلاتینیوم نقره‌ای', value: 'Silver', colorCode: '#d4cfc7', inStock: true },
          { id: 'c-sony-blu', name: 'آبی سرمه‌ای نیمه‌شب', value: 'Midnight Blue', colorCode: '#1b2a47', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'special_deal', 'official_warranty', 'express_shipping'],
    createdAt: '2026-07-25',
    tags: ['sony', 'headphones', 'wh-1000xm5', 'anc', 'hi-res audio'],
    salesCount: 520,
    views: 28000
  },

  // 11. AirPods Pro 2 USB-C
  {
    id: 'prod-apple-airpods-pro-2',
    name: 'Apple AirPods Pro 2nd Gen with USB-C MagSafe Case',
    persianName: 'هندزفری بلوتوثی اپل مدل AirPods Pro (نسل دوم) با کیس شارژ USB-C و تراشه H2',
    brand: 'Apple',
    category: 'cat-audio',
    subcategory: 'sub-airpods',
    price: 13900000,
    oldPrice: 15400000,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 420,
    stock: 35,
    description: 'تراشه فوق‌العاده H2 با نویز کنسلینگ ۲ برابر قوی‌تر، حالت صوتی تطبیقی (Adaptive Audio)، صدای فراگیر سه بعدی Spatial Audio و پورت جدید USB-C.',
    keyFeatures: [
      'پردازنده پیشرفته صوتی Apple H2',
      'حذف نویز فعال تا ۲ برابر کارآمدتر از نسل اول',
      'کیس شارژ ضد آب IP54 با اسپیکر داخلی برای Find My و حلقه بند',
      'شارژدهی تا ۳۰ ساعت همراه با کیس شارژ MagSafe'
    ],
    specifications: [
      {
        groupName: 'صدا و قابلیت‌ها',
        items: [
          { label: 'تراشه', value: 'Apple H2 در گوشی‌ها و U1 در کیس' },
          { label: 'پورت کیس', value: 'USB-C با پشتیبانی از MagSafe و Apple Watch Charger' },
          { label: 'شارژدهی', value: '۶ ساعت مداوم با هر بار شارژ' }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty', 'express_shipping'],
    createdAt: '2026-08-07',
    tags: ['apple', 'airpods pro 2', 'earbuds', 'usb-c', 'tws'],
    salesCount: 940,
    views: 45000
  },

  // 12. Anker Prime 27,650mAh Power Bank (250W)
  {
    id: 'prod-anker-prime-27650',
    name: 'Anker Prime 27,650mAh Power Bank 250W Fast Charge',
    persianName: 'پاوربانک انکر مدل Anker Prime 27650mAh توان ۲۵۰ وات همراه با اپلیکیشن هوشمند',
    brand: 'Anker',
    category: 'cat-powerbank',
    subcategory: 'sub-fast-powerbank',
    price: 11200000,
    oldPrice: 12800000,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 94,
    stock: 16,
    description: 'قوی‌ترین پاوربانک جهان با توان خروجی مجموع ۲۵۰ وات، قابلیت شارژ همزمان ۲ لپ‌تاپ مک‌بوک پرو با نهایت سرعت، نمایشگر دیجیتالی هوشمند و کنترل با بلوتوث.',
    keyFeatures: [
      'توان خروجی فوق‌العاده ۲۵۰ وات (تک پورت تا ۱۴۰ وات با استاندارد PD 3.1)',
      'ظرفیت ۲۷۶۵۰ میلی‌آمپر ساعت مجاز برای حمل در پرواز هوایی',
      'نمایشگر رنگی دیجیتالی با نمایش دقیق توان ورودی/خروجی، سلامت باتری و زمان باقی‌مانده',
      'شارژ مجدد کامل پاوربانک در فقط ۳۷ دقیقه با شارژر ۱۷۰ وات'
    ],
    specifications: [
      {
        groupName: 'مشخصات باتری و پورت‌ها',
        items: [
          { label: 'ظرفیت اسمی', value: '27,650 میلی‌آمپر ساعت (99.54Wh)' },
          { label: 'تعداد پورت‌ها', value: '2 پورت USB-C و 1 پورت USB-A' },
          { label: 'حداکثر توان خروجی تک پورت', value: '140 وات (مناسب مک‌بوک پرو ۱۶)' }
        ]
      }
    ],
    badges: ['special_deal', 'official_warranty'],
    createdAt: '2026-08-03',
    tags: ['anker', 'powerbank', 'prime 250w', 'fast charge', 'laptop powerbank'],
    salesCount: 190,
    views: 12300
  },

  // 13. Anker 735 GaNPrime 65W Charger
  {
    id: 'prod-anker-735-gan-65w',
    name: 'Anker 735 Charger GaNPrime 65W 3-Port Wall Charger',
    persianName: 'شارژر دیواری انکر مدل GaNPrime 65W سه پورت فست شارژ فوق فشرده',
    brand: 'Anker',
    category: 'cat-chargers',
    subcategory: 'sub-wall-chargers',
    price: 3400000,
    oldPrice: 3900000,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 180,
    stock: 40,
    description: 'آداپتور فست شارژ ۶۵ وات سه پورت با فناوری نیترید گالیوم GaNPrime، قابلیت شارژ همزمان لپ‌تاپ، تبلت و گوشی با ۵۳ درصد ابعاد کوچک‌تر.',
    keyFeatures: [
      'فناوری GaNPrime برای کاهش حرارت و بازدهی انرژی فوق‌العاده',
      'توزیع هوشمند جریان PowerIQ 4.0 بین دستگاه‌های متصل',
      'دارای ۲ پورت تایپ‌سی و ۱ پورت یو‌اس‌بی معمولی'
    ],
    specifications: [
      {
        groupName: 'مشخصات شارژ',
        items: [
          { label: 'توان خروجی', value: '65 وات حداکثر' },
          { label: 'استانداردهای پشتیبانی شده', value: 'Power Delivery 3.0, PPS, Quick Charge 4.0' }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty', 'express_shipping'],
    createdAt: '2026-07-29',
    tags: ['anker', 'charger', 'gan', 'fast charging'],
    salesCount: 460,
    views: 19800
  },

  // 14. Logitech MX Master 3S
  {
    id: 'prod-logitech-mx-master-3s',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    persianName: 'ماوس بی‌سیم حرفه‌ای لاجیتک مدل MX Master 3S با کلیک بی‌صدا و سنسور 8000 DPI',
    brand: 'Logitech',
    category: 'cat-computer-accessories',
    subcategory: 'sub-mouse-keyboard',
    price: 6800000,
    oldPrice: 7500000,
    discount: 9,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 260,
    stock: 25,
    description: 'محبوب‌ترین ماوس حرفه‌ای دنیا برای برنامه‌نویسان و طراحان. اسکرول الکترومغناطیسی MagSpeed با سرعت ۱۰۰۰ خط بر ثانیه و کلیک‌های ۹۰٪ بی‌صداتر.',
    keyFeatures: [
      'سنسور اپتیکال Darkfield با دقت 8000 DPI قابل استفاده حتی روی شیشه شفاف',
      'اسکرول MagSpeed با چرخش فوق‌العاده نرم و بی‌صدا',
      'کلیدهای Quiet Clicks با فیدبک عالی و صدای بسیار کم',
      'پشتیبانی از فناوری Logitech Flow برای کنترل همزمان ۳ کامپیوتر'
    ],
    specifications: [
      {
        groupName: 'مشخصات فنی',
        items: [
          { label: 'دقت سنسور', value: '200 تا 8000 DPI (با گام‌های 50 تایی)' },
          { label: 'نوع اتصال', value: 'بلوتوث Low Energy + دانگل Logi Bolt' },
          { label: 'شارژدهی', value: 'تا ۷۰ روز با یک بار شارژ کامل تایپ‌سی' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-mx-graphite', name: 'خاکستری تیره (Graphite)', value: 'Graphite', colorCode: '#383838', inStock: true },
          { id: 'c-mx-pale', name: 'خاکستری روشن (Pale Gray)', value: 'Pale Gray', colorCode: '#e0dedb', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-08-04',
    tags: ['logitech', 'mx master 3s', 'mouse', 'productivity'],
    salesCount: 380,
    views: 22000
  },

  // 15. Samsung T7 Shield 2TB SSD
  {
    id: 'prod-samsung-t7-shield-2tb',
    name: 'Samsung T7 Shield 2TB Portable SSD USB 3.2 Gen 2',
    persianName: 'حافظه اس اس دی اکسترنال سامسونگ مدل T7 Shield ظرفیت 2 ترابایت مقاوم در برابر ضربه و آب',
    brand: 'Samsung',
    category: 'cat-computer-accessories',
    subcategory: 'sub-storage',
    price: 12900000,
    oldPrice: 14200000,
    discount: 9,
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 140,
    stock: 28,
    description: 'حافظه SSD اکسترنال ضدآب و ضدضربه با استاندارد IP65، سرعت خواندن تا ۱۰۵۰ مگابایت بر ثانیه، مناسب اتصال مستقیم به دوربین‌های ضبط ProRes و لپ‌تاپ.',
    keyFeatures: [
      'سرعت انتقال فوق سریع تا 1050 مگابایت بر ثانیه از طریق پورت USB 3.2 Gen 2',
      'روکش الاستومری مقاوم در برابر سقوط از ارتفاع ۳ متری',
      'مقاومت کامل در برابر نفوذ گرد و غبار و پاشش آب با استاندارد IP65'
    ],
    specifications: [
      {
        groupName: 'مشخصات فنی',
        items: [
          { label: 'ظرفیت', value: '2 ترابایت (2000 گیگابایت)' },
          { label: 'رابط اتصال', value: 'USB 3.2 Gen.2 (10Gbps)' },
          { label: 'رمزگذاری', value: 'رمزگذاری سخت‌افزاری 256-bit AES' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-t7-blk', name: 'مشکی', value: 'Black', colorCode: '#212121', inStock: true },
          { id: 'c-t7-blu', name: 'آبی کاربنی', value: 'Blue', colorCode: '#1d4ed8', inStock: true },
          { id: 'c-t7-bge', name: 'بژ شنی', value: 'Beige', colorCode: '#d6c7b2', inStock: true }
        ]
      }
    ],
    badges: ['official_warranty', 'express_shipping'],
    createdAt: '2026-07-18',
    tags: ['samsung', 't7 shield', 'ssd', 'portable ssd', '2tb'],
    salesCount: 220,
    views: 13900
  },

  // 16. Baseus Blade 100W Power Bank
  {
    id: 'prod-baseus-blade-100w',
    name: 'Baseus Blade 100W 20000mAh Ultra Slim Power Bank',
    persianName: 'پاوربانک باسئوس مدل Blade توان 100 وات ظرفیت 20000 میلی‌آمپر با طراحی فوق باریک',
    brand: 'Baseus',
    category: 'cat-powerbank',
    subcategory: 'sub-fast-powerbank',
    price: 4900000,
    oldPrice: 5600000,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1609592807908-0130f14d8252?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 95,
    stock: 19,
    description: 'پاوربانک باریک با ضخامت فقط ۱۸ میلی‌متر، خروجی قدرتمند ۱۰۰ وات، ایده‌آل برای قرار گرفتن داخل کیف در کنار لپ‌تاپ‌های مهندسی.',
    keyFeatures: [
      'توان ۱۰۰ وات مناسب انواع لپ‌تاپ، سرفیس و مک‌بوک',
      'طراحی کتابی باریک ۱۸ میلی‌متری با نمایشگر دقیق درصد و زمان شارژ',
      'دو پورت ورودی/خروجی Type-C و دو پورت خروجی USB-A'
    ],
    specifications: [
      {
        groupName: 'مشخصات',
        items: [
          { label: 'ظرفیت', value: '20,000 میلی‌آمپر ساعت' },
          { label: 'توان خروجی تایپ‌سی', value: '100 وات (20V/5A)' }
        ]
      }
    ],
    badges: ['special_deal', 'official_warranty'],
    createdAt: '2026-08-08',
    tags: ['baseus', 'powerbank', 'blade 100w', 'slim'],
    salesCount: 150,
    views: 8900
  },

  // 17. Spigen Ultra Hybrid Case for iPhone 16 Pro Max
  {
    id: 'prod-spigen-ultra-hybrid-case',
    name: 'Spigen Ultra Hybrid MagFit Case for iPhone 16 Pro Max',
    persianName: 'قاب محافظ اسپیگن مدل Ultra Hybrid MagFit مناسب برای گوشی آیفون 16 پرو مکس با آهنربای مگ‌سیف',
    brand: 'Spigen',
    category: 'cat-mobile-accessories',
    subcategory: 'sub-cases',
    price: 1850000,
    oldPrice: 2100000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 125,
    stock: 50,
    description: 'کاور شفاف اورجینال کره‌ای با فناوری Air Cushion در گوشه‌ها برای جذب ضربات سنگین، مقاومت در برابر زردشدگی و آهنربای پرقدرت MagSafe.',
    keyFeatures: [
      'پشت پلی‌کربنات شفاف ضدخش و لبه‌های TPU نرم برای محافظت ۳۶۰ درجه',
      'حلقه مگ‌سیف مغناطیسی داخلی با اتصال بسیار پایدار',
      'لبه‌های برجسته در اطراف دوربین و صفحه نمایش'
    ],
    specifications: [
      {
        groupName: 'مشخصات ساخت',
        items: [
          { label: 'کشور سازنده', value: 'کره جنوبی (اورجینال)' },
          { label: 'استاندارد نظامی', value: 'دارای گواهی ضد ضربه نظامی MIL-STD 810G-516.6' }
        ]
      }
    ],
    badges: ['bestseller', 'express_shipping'],
    createdAt: '2026-08-09',
    tags: ['spigen', 'case', 'iphone 16 pro max', 'magsafe'],
    salesCount: 310,
    views: 14200
  },

  // 18. Sony PlayStation 5 Slim
  {
    id: 'prod-ps5-slim',
    name: 'Sony PlayStation 5 Slim 1TB Digital / Disc Edition',
    persianName: 'کنسول بازی سونی مدل PlayStation 5 Slim ظرفیت 1 ترابایت نسخه دیسک‌خور (ریجن اروپا)',
    brand: 'Sony',
    category: 'cat-other-digital',
    subcategory: 'sub-consoles',
    price: 36800000,
    oldPrice: 39500000,
    discount: 7,
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 380,
    stock: 12,
    description: 'نسخه جدید کنسول پلی‌استیشن ۵ با ابعاد ۳۰٪ کوچک‌تر، ۱ ترابایت حافظه SSD پرسرعت، خروجی 4K 120Hz با Ray Tracing و دسته انقلابی DualSense.',
    keyFeatures: [
      'پردازنده سفارشی AMD Zen 2 و گرافیک RDNA 2 با توان ۱۰.۳ ترافلاپس',
      'دسته بی‌سیم دوئل‌سنس با تریگرهای تطبیق‌پذیر و بازخورد هپتیک فوق‌العاده',
      'صدای سه‌بعدی Tempest 3D AudioTech',
      'پشتیبانی کامل از بازی‌های نسل قبل PS4'
    ],
    specifications: [
      {
        groupName: 'سخت‌افزار کنسول',
        items: [
          { label: 'حافظه داخلی', value: '1 ترابایت سفارشی Ultra-High Speed SSD' },
          { label: 'درایو دیسک', value: 'بلوری Ultra HD 4K (قابل جدا شدن)' },
          { label: 'خروجی تصویر', value: 'HDMI 2.1 با پشتیبانی از 4K 120Hz و 8K' }
        ]
      }
    ],
    badges: ['bestseller', 'special_deal', 'official_warranty'],
    createdAt: '2026-07-22',
    tags: ['sony', 'ps5 slim', 'playstation', 'gaming console'],
    salesCount: 470,
    views: 39000
  },

  // 19. Xiaomi Pad 6
  {
    id: 'prod-xiaomi-pad-6',
    name: 'Xiaomi Pad 6 11 Inch 256GB 8GB RAM',
    persianName: 'تبلت 11 اینچی شیائومی مدل Pad 6 ظرفیت 256 گیگابایت و رم 8 گیگابایت',
    brand: 'Xiaomi',
    category: 'cat-tablet',
    subcategory: 'sub-xiaomi-tab',
    price: 19400000,
    oldPrice: 21500000,
    discount: 10,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 110,
    stock: 24,
    description: 'بهترین تبلت اقتصادی با نمایشگر باکیفیت 144Hz WQHD+، تراشه اسنپدراگون 870، بدنه تمام فلزی باریک و چهار اسپیکر استریو دالبی اتموس.',
    keyFeatures: [
      'صفحه نمایش ۱۱ اینچ با نرخ نوسازی فوق‌العاده ۱۴۴ هرتز و تفکیک رنگ ۱ میلیارد رنگ',
      'پردازنده قدرتمند و خنک Snapdragon 870 5G',
      'باتری حجیم ۸۸۴۰ میلی‌آمپر ساعتی با شارژ سریع ۳۳ وات'
    ],
    specifications: [
      {
        groupName: 'مشخصات',
        items: [
          { label: 'تراشه', value: 'Qualcomm Snapdragon 870 (7 nm)' },
          { label: 'نمایشگر', value: '11 اینچ IPS LCD رزولوشن 1800 × 2880 پیکسل' },
          { label: 'صدا', value: '4 اسپیکر استریو با Dolby Atmos' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ بدنه',
        options: [
          { id: 'c-pad-gray', name: 'خاکستری گرافیتی', value: 'Gravity Gray', colorCode: '#4a4d52', inStock: true },
          { id: 'c-pad-blue', name: 'آبی فیروزه‌ای', value: 'Mist Blue', colorCode: '#7ca5b8', inStock: true },
          { id: 'c-pad-gold', name: 'طلایی شامپاینی', value: 'Champagne', colorCode: '#dfd0b5', inStock: true }
        ]
      }
    ],
    badges: ['official_warranty', 'express_shipping'],
    createdAt: '2026-08-06',
    tags: ['xiaomi', 'pad 6', 'tablet', '144hz'],
    salesCount: 190,
    views: 11500
  },

  // 20. JBL Charge 5 Portable Speaker
  {
    id: 'prod-jbl-charge-5',
    name: 'JBL Charge 5 Portable Waterproof Bluetooth Speaker',
    persianName: 'اسپیکر بلوتوثی قابل حمل جی بی ال مدل Charge 5 با استاندارد ضدآب IP67 و قابلیت پاوربانک',
    brand: 'JBL',
    category: 'cat-audio',
    subcategory: 'sub-speakers',
    price: 8600000,
    oldPrice: 9800000,
    discount: 12,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 175,
    stock: 22,
    description: 'صدای کوبنده و تفکیک شده با توان ۴۰ وات، بیس عمیق دوگانه، استاندارد مقاومت کامل در برابر آب و گرد و خاک IP67 و ۲۰ ساعت پخش بدون وقفه.',
    keyFeatures: [
      'صدای اورجینال JBL Pro Sound با ووفر اختصاصی و توییتر مجزا',
      'قابلیت اتصال همزمان به بیش از ۱۰۰ اسپیکر دیگر با PartyBoost',
      'دارای خروجی USB برای شارژ کردن موبایل مانند یک پاوربانک'
    ],
    specifications: [
      {
        groupName: 'صدا و توان',
        items: [
          { label: 'توان خروجی', value: '40 وات RMS (30W Woofer + 10W Tweeter)' },
          { label: 'شارژدهی', value: 'تا ۲۰ ساعت پخش مداوم' },
          { label: 'مقاومت در برابر آب', value: 'IP67 (غوطه‌وری کامل در آب تا عمق ۱ متر)' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ‌بندی اسپیکر',
        options: [
          { id: 'c-jbl-blk', name: 'مشکی', value: 'Black', colorCode: '#1c1c1c', inStock: true },
          { id: 'c-jbl-blu', name: 'آبی اقیانوسی', value: 'Blue', colorCode: '#1e3a8a', inStock: true },
          { id: 'c-jbl-camo', name: 'چریکی (Squad Camo)', value: 'Camo', colorCode: '#4d5d53', inStock: true },
          { id: 'c-jbl-red', name: 'قرمز', value: 'Red', colorCode: '#b91c1c', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-07-27',
    tags: ['jbl', 'speaker', 'charge 5', 'bluetooth', 'waterproof'],
    salesCount: 280,
    views: 16800
  },

  // 21. Baseus 17-in-1 USB-C Hub
  {
    id: 'prod-baseus-17in1-hub',
    name: 'Baseus 17-in-1 Triple Display USB-C Hub Docking Station',
    persianName: 'داک استیشن و هاب ۱۷ پورت باسئوس مدل Triple Display با خروجی سه مانیتور 4K و شارژ 100W',
    brand: 'Baseus',
    category: 'cat-computer-accessories',
    subcategory: 'sub-hubs',
    price: 7400000,
    oldPrice: 8500000,
    discount: 13,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 65,
    stock: 15,
    description: 'کامل‌ترین هاب برای محیط‌های کاری حرفه‌ای با اتصال ۳ مانیتور همزمان، پورت LAN گیگابیت، شیار کارت SD/TF، خروجی صدای 3.5mm و توان شارژ ۱۰۰ وات.',
    keyFeatures: [
      'دارای ۱۷ پورت متنوع شامل ۳ پورت HDMI 4K، پنج پورت USB، پورت شبکه RJ45 گیگابیت',
      'پشتیبانی از انتقال تصویر به ۳ مانیتور مجزا با وضوح 4K 60Hz',
      'بدنه آلومینیومی مستحکم با استند عمودی برای اشغال کمترین فضای میز کار'
    ],
    specifications: [
      {
        groupName: 'پورت‌ها',
        items: [
          { label: 'پورت‌های ویدیو', value: '3x HDMI 4K@60Hz' },
          { label: 'پورت‌های داده', value: '3x USB 3.0, 2x USB 2.0, 2x Type-C' },
          { label: 'پورت شبکه', value: 'RJ45 Gigabit Ethernet 1000Mbps' }
        ]
      }
    ],
    badges: ['official_warranty', 'express_shipping'],
    createdAt: '2026-08-03',
    tags: ['baseus', 'hub', 'docking station', 'usb-c hub', 'accessories'],
    salesCount: 85,
    views: 5700
  },

  // 22. Samsung Galaxy Tab S9 Ultra
  {
    id: 'prod-samsung-tab-s9-ultra',
    name: 'Samsung Galaxy Tab S9 Ultra 5G 512GB with S-Pen',
    persianName: 'تبلت 14.6 اینچی سامسونگ مدل Galaxy Tab S9 Ultra 5G ظرفیت 512 گیگابایت با قلم S-Pen و گواهی ضدآب IP68',
    brand: 'Samsung',
    category: 'cat-tablet',
    subcategory: 'sub-samsung-tab',
    price: 84000000,
    oldPrice: 91000000,
    discount: 8,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 72,
    stock: 7,
    description: 'بزرگ‌ترین و قدرتمندترین تبلت اندرویدی با صفحه نمایش خیره‌کننده 14.6 اینچ Dynamic AMOLED 2X، قلم ضدآب داخل جعبه، تراشه اسنپدراگون 8 نسل 2 و پشتیبانی از سیم‌کارت 5G.',
    keyFeatures: [
      'صفحه نمایش غول‌پیکر ۱۴.۶ اینچ با رزولوشن 1848 × 2960 و حاشیه‌های مینیاتوری',
      'استاندارد مقاومت کامل در برابر آب و گرد و غبار IP68 برای تبلت و قلم S-Pen',
      'چهار بلندگوی AKG با صدای سه بعدی دالبی اتموس',
      'حالت Samsung DeX برای تبدیل فوری تبلت به یک کامپیوتر کاری حرفه‌ای'
    ],
    specifications: [
      {
        groupName: 'سخت‌افزار و نمایشگر',
        items: [
          { label: 'چیپست', value: 'Qualcomm Snapdragon 8 Gen 2 for Galaxy' },
          { label: 'حافظه رم و ذخیره‌سازی', value: '12 گیگابایت رم / 512 گیگابایت (پشتیبانی از کارت حافظه تا 1TB)' },
          { label: 'باتری', value: '11,200 میلی‌آمپر ساعت با شارژ سریع 45 وات' }
        ]
      }
    ],
    variants: [
      {
        type: 'color',
        title: 'رنگ‌بندی',
        options: [
          { id: 'c-tab9-graphite', name: 'گرافیتی تیره', value: 'Graphite', colorCode: '#373a40', inStock: true },
          { id: 'c-tab9-beige', name: 'بژ کرم', value: 'Beige', colorCode: '#e8e0d5', inStock: true }
        ]
      }
    ],
    badges: ['bestseller', 'official_warranty'],
    createdAt: '2026-07-30',
    tags: ['samsung', 'galaxy tab s9 ultra', 'amoled', 'spen', '5g'],
    salesCount: 110,
    views: 8900
  }
];
