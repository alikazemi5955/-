import React from 'react';
import { HeroBanner } from '../home/HeroBanner';
import { CategoriesGrid } from '../home/CategoriesGrid';
import { SpecialDealsSection } from '../home/SpecialDealsSection';
import { BestsellersShowcase } from '../home/BestsellersShowcase';
import { NewArrivalsSection } from '../home/NewArrivalsSection';
import { PromoBanners } from '../home/PromoBanners';
import { BrandsCarousel } from '../home/BrandsCarousel';
import { BenefitsBar } from '../home/BenefitsBar';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6 pb-8" id="home-page-wrapper">
      {/* 1. Hero Main Carousel */}
      <HeroBanner />

      {/* 2. Fast-Scan Categories Grid */}
      <CategoriesGrid />

      {/* 3. Special Deals / شگفت‌انگیزها with Countdown */}
      <SpecialDealsSection />

      {/* 4. Best Selling Digital Products */}
      <BestsellersShowcase />

      {/* 5. New Arrivals */}
      <NewArrivalsSection />

      {/* 6. Curated Category Promotion Banners */}
      <PromoBanners />

      {/* 7. Popular Brands Showcase */}
      <BrandsCarousel />

      {/* 8. Trust & Value Proposition Bar */}
      <BenefitsBar />
    </div>
  );
};
