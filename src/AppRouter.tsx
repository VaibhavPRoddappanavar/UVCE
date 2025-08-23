import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndiaMapGrid from './components/IndiaMapGrid';
import './components/IndiaMap.css';
import Footer from './components/Footer';
import ArtistDashboard from './pages/ArtistDashboard';
import BrandDashboard from './pages/BrandDashboard';
import Marketplace from './pages/Marketplace';
import CheckoutPage from './pages/CheckoutPage';
import StoryPage from './pages/StoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const Home = () => (
  <>
    <Hero />
    <IndiaMapGrid />
  </>
);

const AppRouter: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Auth routes without navbar/footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Main app routes with navbar/footer */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/artist" element={<ArtistDashboard />} />
                <Route path="/brand" element={<BrandDashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/story/:id" element={<StoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
