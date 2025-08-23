import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

type Artwork = {
  id: string;
  title: string;
  image: string;
  price: string;
  artist: string;
  description: string;
  state: string;
};

interface CartItem extends Artwork {
  product?: typeof productMockups[0];
  quantity: number;
}

const demoArtworks: Artwork[] = [
  {
    id: 'warli-dance',
    title: 'Warli Dance',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Warli_Painting.jpg',
    price: '2000',
    artist: 'Savitri Devi',
    description: 'A beautiful Warli painting depicting tribal dance from Maharashtra.',
    state: 'Maharashtra',
  },
  {
    id: 'madhubani-sun',
    title: 'Madhubani Sun',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Madhubani_art.jpg',
    price: '2500',
    artist: 'Geeta Kumari',
    description: 'Traditional Madhubani art from Bihar, vibrant sun motif.',
    state: 'Bihar',
  },
  {
    id: 'blue-pottery',
    title: 'Blue Pottery',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Blue_Pottery.jpg',
    price: '1800',
    artist: 'Meera Sharma',
    description: 'Handcrafted blue pottery from Rajasthan.',
    state: 'Rajasthan',
  },
];

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
  const [story, setStory] = useState<Artwork | null>(null);
  const [cart, setCart] = useState<Artwork[]>([]);
  const [mockup, setMockup] = useState<{art: Artwork, product: typeof productMockups[0]}|null>(null);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold header-indian mb-6">Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {demoArtworks.map((art, i) => (
          <div key={i} className="bg-white rounded-xl shadow section-indian flex flex-col items-center">
            <img src={art.image} alt={art.title} className="w-40 h-40 object-cover rounded-lg mb-2 border-2 border-orange-200" />
            <div className="font-bold text-lg mb-1">{art.title}</div>
            <div className="text-orange-600 font-semibold mb-1">₹{art.price}</div>
            <div className="text-xs text-stone-500 mb-1">{art.state}</div>
            <div className="text-xs text-stone-700 mb-2">{art.artist}</div>
            <div className="my-2">
              <QRCodeCanvas value={window.location.origin + '/story/' + art.id} size={56} fgColor="#e1ad01" bgColor="#fff8f0" level="H" />
            </div>
            <div className="flex gap-2 mb-2">
              <button className="btn-indian px-3 py-1 text-xs" onClick={() => navigate('/story/' + art.id)}>View Story</button>
              <button className="btn-indian px-3 py-1 text-xs" onClick={() => setCart([...cart, art])}>Buy</button>
              <button className="btn-indian px-3 py-1 text-xs" onClick={() => setMockup({art, product: productMockups[0]})}>See on Product</button>
            </div>
          </div>
        ))}
      </div>
      {/* Story Modal */}
      {story && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setStory(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative border-4 border-orange-100 modal-indian" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-xl text-stone-400 hover:text-orange-600" onClick={() => setStory(null)}>&times;</button>
            <h3 className="text-xl font-bold header-indian mb-2">{story.title}</h3>
            <img src={story.image} alt={story.title} className="w-32 h-32 object-cover rounded mb-2 border-2 border-orange-200" />
            <div className="mb-2 text-orange-700 font-semibold">By {story.artist}</div>
            <div className="text-stone-700 mb-2">{story.description}</div>
            <div className="text-xs text-stone-500">State: {story.state}</div>
          </div>
        </div>
      )}
      {/* Product Mockup Modal */}
      {mockup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setMockup(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border-4 border-orange-100 modal-indian" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-xl text-stone-400 hover:text-orange-600" onClick={() => setMockup(null)}>&times;</button>
            <h3 className="text-xl font-bold header-indian mb-2">{mockup.product.name} Mockup</h3>
            <div className="relative flex justify-center items-center">
              <img src={mockup.product.image} alt={mockup.product.name} className="w-56 h-56 object-contain" />
              <img src={mockup.art.image} alt={mockup.art.title} className="absolute w-32 h-32 object-contain opacity-90 top-12 left-1/2 -translate-x-1/2" style={{borderRadius: '1rem', boxShadow: '0 2px 10px #e1ad01'}} />
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {productMockups.map((prod) => (
                <button key={prod.name} className="btn-indian px-3 py-1 text-xs" onClick={() => setMockup({art: mockup.art, product: prod})}>{prod.name}</button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Dummy Cart (for demo) */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border-2 border-orange-200 p-4 z-50">
          <div className="font-bold text-orange-600 mb-2">Cart ({cart.length})</div>
          <ul className="text-sm">
            {cart.map((item, i) => (
              <li key={i}>{item.title} - ₹{item.price}</li>
            ))}
          </ul>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => navigate('/checkout')}
              className="btn-indian px-4 py-1 text-sm"
            >
              Checkout
            </button>
            <button 
              onClick={() => setCart([])}
              className="px-4 py-1 text-sm border border-stone-300 rounded"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
