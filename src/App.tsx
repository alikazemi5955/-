import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductListingPage } from './components/products/ProductListingPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { CategoryExplorerPage } from './components/categories/CategoryExplorerPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { ComparisonModal } from './components/compare/ComparisonModal';
import { QuickViewModal } from './components/quickview/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainLayout: React.FC = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductListingPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'categories':
        return <CategoryExplorerPage />;
      case 'profile':
        return <ProfilePage />;
      case 'wishlist':
        return <WishlistPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Top Main Navigation Header */}
      <Header />
      
      {/* Mega Menu Category Navbar */}
      <Navbar />

      {/* Dynamic View Area */}
      <main className="flex-1 w-full animate-fadeIn">
        {renderCurrentPage()}
      </main>

      {/* Comprehensive E-Commerce Footer */}
      <Footer />

      {/* Global Modals & Overlays */}
      <CartDrawer />
      <AuthModal />
      <ComparisonModal />
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
