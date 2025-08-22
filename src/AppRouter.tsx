import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndiaMap from './components/IndiaMap';
import Footer from './components/Footer';
import ArtistDashboard from './pages/ArtistDashboard';
import Marketplace from './pages/Marketplace';

const Home = () => (
  <>
    <Hero />
    <IndiaMap />
  </>
);

const AppRouter: React.FC = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
