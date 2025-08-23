import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

type Artwork = {
  _id: string;
  title: string;
  image: string;
  price: number;
  artistName: string;
  description: string;
  state: string;
  views?: number;
  likes?: number;
  createdAt?: string;
};

interface CartItem extends Artwork {
  product?: typeof productMockups[0];
  quantity: number;
}

const productMockups = [
  {
    name: 'Tote Bag',
    image: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/bag-2028215_1280.png',
    basePrice: 300
  },
  {
    name: 'Mug',
    image: 'https://cdn.pixabay.com/photo/2014/12/21/23/40/mug-579720_1280.png',
    basePrice: 250
  },
  {
    name: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
    basePrice: 500
  },
  {
    name: 'Phone Case',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=300',
    basePrice: 400
  },
  {
    name: 'Poster',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
    basePrice: 200
  },
];

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [story, setStory] = useState<Artwork | null>(null);
  const [cart, setCart] = useState<Artwork[]>([]);
  const [mockup, setMockup] = useState<{art: Artwork, product: typeof productMockups[0]}|null>(null);
  const [selectedState, setSelectedState] = useState('');

  const states = [
    'All States', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir',
    'Ladakh'
  ];

  useEffect(() => {
    loadArtworks();
  }, [selectedState]);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = 'https://uvce-backend.onrender.com/api/artworks';
      const params = new URLSearchParams();
      
      if (selectedState && selectedState !== 'All States') {
        params.append('state', selectedState);
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setArtworks(data.data.artworks || []);
      } else {
        setError('Failed to load artworks');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Failed to load artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (art: Artwork) => {
    setCart([...cart, art]);
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold header-indian mb-6">Marketplace</h2>
          <div className="text-lg">Loading artworks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold header-indian mb-6">Marketplace</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadArtworks}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold header-indian mb-6">Marketplace</h2>
      
      {/* Filter by State */}
      <div className="mb-6">
        <select 
          value={selectedState} 
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-2 rounded border border-stone-300"
        >
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <span className="ml-4 text-gray-600">
          Showing {artworks.length} artwork{artworks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Artworks Grid */}
      {artworks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {selectedState && selectedState !== 'All States' 
              ? `No artworks found from ${selectedState}`
              : 'No artworks available at the moment'
            }
          </div>
          <div className="text-gray-400 mt-2">
            Check back later or try a different state filter
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div key={art._id} className="bg-white rounded-xl shadow section-indian flex flex-col items-center">
              <img 
                src={art.image} 
                alt={art.title} 
                className="w-40 h-40 object-cover rounded-lg mb-2 border-2 border-orange-200" 
              />
              <div className="font-bold text-lg mb-1">{art.title}</div>
              <div className="text-orange-600 font-semibold mb-1">₹{art.price}</div>
              <div className="text-xs text-stone-500 mb-1">{art.state}</div>
              <div className="text-xs text-stone-700 mb-2">{art.artistName}</div>
              {art.views !== undefined && (
                <div className="text-xs text-blue-600 mb-2">Views: {art.views}</div>
              )}
              <div className="my-2">
                <QRCodeCanvas 
                  value={window.location.origin + '/story/' + art._id} 
                  size={56} 
                  fgColor="#e1ad01" 
                  bgColor="#fff8f0" 
                  level="H" 
                />
              </div>
              <div className="flex gap-2 mb-2">
                <button 
                  className="btn-indian px-3 py-1 text-xs" 
                  onClick={() => navigate('/story/' + art._id)}
                >
                  View Story
                </button>
                <button 
                  className="btn-indian px-3 py-1 text-xs" 
                  onClick={() => handleAddToCart(art)}
                >
                  Buy
                </button>
                <button 
                  className="btn-indian px-3 py-1 text-xs" 
                  onClick={() => setMockup({art, product: productMockups[0]})}
                >
                  Try Mockup
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Story Modal */}
      {story && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setStory(null)} 
              className="float-right text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold header-indian mb-4">{story.title}</h3>
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full max-w-md mx-auto rounded-lg mb-4" 
            />
            <div className="mb-2 text-orange-700 font-semibold">By {story.artistName}</div>
            <div className="mb-2 text-stone-600">From {story.state}</div>
            <div className="mb-4 text-2xl font-bold text-orange-600">₹{story.price}</div>
            <p className="text-stone-700 leading-relaxed">{story.description}</p>
          </div>
        </div>
      )}

      {/* Mockup Modal */}
      {mockup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setMockup(null)} 
              className="float-right text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold header-indian mb-4">Product Mockups</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {productMockups.map((product, i) => (
                <div key={i} className="text-center">
                  <div className="relative bg-gray-100 rounded-lg p-4 mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-32 object-contain" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      <img 
                        src={mockup.art.image} 
                        alt="artwork overlay" 
                        className="w-16 h-16 object-cover rounded" 
                      />
                    </div>
                  </div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-orange-600">₹{mockup.art.price + product.basePrice}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-orange-600 text-white p-4 rounded-xl shadow-lg">
          <div className="font-bold">Cart: {cart.length} items</div>
          <div>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</div>
          <button 
            className="bg-white text-orange-600 px-4 py-2 rounded mt-2 font-semibold"
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
