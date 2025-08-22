import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndiaMap from './components/IndiaMap';
import './components/IndiaMap.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <IndiaMap />
      <Footer />
    </div>
  );
}

export default App;