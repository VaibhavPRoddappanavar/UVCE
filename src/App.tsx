import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IndiaMapGrid from './components/IndiaMapGrid';
import './components/IndiaMap.css';
import './styles/indian-theme.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <IndiaMapGrid />
      <Footer />
    </div>
  );
}

export default App;