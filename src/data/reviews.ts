import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-iphone-16-pro-max',
    userName: 'امیرحسین رضایی',
    rating: 5,
    date: '۱۴۰۳/۰۵/۲۲',
    title: 'بهترین آیفونی که تا حالا داشتم',
    comment: 'دکمه Camera Control واقعاً کاربردیه و سرعت عکاسی رو چند برابر کرده. باتری نسبت به نسل قبلی حداقل ۲ تا ۳ ساعت بیشتر اسکرین میده. حاشیه‌های نمایشگر هم به طرز شگفت‌انگیزی باریک‌تر شده.',
    pros: ['عمر باتری فوق‌العاده', 'دکمه کنترل دوربین بسیار کارآمد', 'وزن بسیار ایده‌آل به لطف تیتانیوم'],
    cons: ['سرعت شارژ هنوز ۲۵ وات است'],
    verifiedPurchase: true,
    likes: 34,
    recommended: true
  },
  {
    id: 'rev-2',
    productId: 'prod-iphone-16-pro-max',
    userName: 'سارا کاظمی',
    rating: 5,
    date: '۱۴۰۳/۰۵/۱۸',
    title: 'رنگ تیتانیوم کویری محشره',
    comment: 'رنگ Desert Titanium از نزدیک فوق‌العاده شیک و چشم‌نوازه. بسته‌بندی پازل کالا کاملاً پلمپ و با کد رجیستری معتبر بود و خیلی سریع به دستم رسید.',
    pros: ['کیفیت ساخت بی‌نظیر', 'دوربین ۵ برابری شفاف'],
    cons: ['قیمت بالا'],
    verifiedPurchase: true,
    likes: 19,
    recommended: true
  },
  {
    id: 'rev-3',
    productId: 'prod-samsung-s24-ultra',
    userName: 'محمدجواد نوری',
    rating: 5,
    date: '۱۴۰۳/۰۵/۲۰',
    title: 'هوش مصنوعی Galaxy AI کارها رو متحول کرده',
    comment: 'قابلیت ترجمه همزمان مکالمه و سرکل تو سرچ گوگل توی کارهای روزمره من انقلابی به پا کرده. پوشش صفحه نمایش ضد انعکاس گوریلا آرمور توی نور آفتاب معجزه می‌کنه!',
    pros: ['صفحه نمایش تخت بدون انعکاس نور', 'روشنایی خیره‌کننده', 'امکانات کاربردی هوش مصنوعی'],
    cons: ['کمی برای دست‌های کوچک بزرگ و سنگین است'],
    verifiedPurchase: true,
    likes: 48,
    recommended: true
  },
  {
    id: 'rev-4',
    productId: 'prod-samsung-s24-ultra',
    userName: 'نیما بهرامی',
    rating: 4,
    date: '۱۴۰۳/۰۵/۱۴',
    title: 'عالی برای عکاسی و نوت برداری',
    comment: 'دوربین ۲۰۰ مگاپیکسلی جزئیات بینظیری ثبت میکنه. قلم اس پن هم برای امضا کردن اسناد و جزوه برداری دانشگاه فوق العاده کارسازه.',
    pros: ['قلم S-Pen دقیق', 'کیفیت دوربین در شب'],
    cons: ['شارژر داخل جعبه نیست'],
    verifiedPurchase: true,
    likes: 21,
    recommended: true
  },
  {
    id: 'rev-5',
    productId: 'prod-sony-wh-1000xm5',
    userName: 'فرهاد اکبری',
    rating: 5,
    date: '۱۴۰۳/۰۵/۱۰',
    title: 'سکوت مطلق در شلوغی مترو و هواپیما',
    comment: 'وقتی نویزکنسلینگ رو روشن می‌کنید انگار وارد یک اتاق کاملاً ایزوله شدید. تفکیک صدای موسیقی در آهنگ‌های با فرمت FLAC شگفت‌انگیزه.',
    pros: ['بهترین سیستم حذف نویز دنیا', 'ارگونومی سبک و چرم بسیار نرم', 'شارژدهی طولانی'],
    cons: ['مثل نسل ۴ تاشو و فشرده نمی‌شود'],
    verifiedPurchase: true,
    likes: 42,
    recommended: true
  },
  {
    id: 'rev-6',
    productId: 'prod-macbook-pro-16-m3-max',
    userName: 'پویا درخشان',
    rating: 5,
    date: '۱۴۰۳/۰۴/۲۹',
    title: 'غول رندرینگ و برنامه‌نویسی',
    comment: 'کامپایل کردن پروژه‌های بزرگ Rust و کانتینرهای Docker در کمتر از چند ثانیه انجام میشه بدون اینکه حتی صدای فن لپ‌تاپ بلند بشه!',
    pros: ['قدرت پردازش دیوانه‌کننده', 'نمایشگر XDR بی‌رقیب', 'باتری ۲۰ ساعته واقعی'],
    cons: ['وزن ۲.۱ کیلوگرمی'],
    verifiedPurchase: true,
    likes: 31,
    recommended: true
  }
];
