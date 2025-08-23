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

  const handleViewStory = (art: Artwork) => {
    setStory(art);
  };

  const generateStoryContent = (artwork: Artwork) => {
    // Generate engaging story content based on artwork details
    const storyTemplates = {
      'Madhya Pradesh': {
        para1: `Deep in the heart of ${artwork.state}, where ancient traditions whisper through the wind, ${artwork.artistName} discovered their calling. Growing up surrounded by the rich cultural heritage of central India, they learned the sacred art forms passed down through generations of master craftspeople.`,
        para2: `This piece, "${artwork.title}", represents more than just art—it's a bridge between the past and present. Each stroke carries the weight of tradition, each color tells the story of festivals celebrated under starlit skies, and each pattern echoes the rhythm of folk songs sung by their ancestors.`
      },
      'Rajasthan': {
        para1: `In the golden deserts of ${artwork.state}, where majestic palaces rise like mirages from the sand, ${artwork.artistName} found inspiration in the royal heritage and vibrant culture. The desert winds carried stories of valor, love, and artistic excellence that have flourished for centuries.`,
        para2: `"${artwork.title}" captures the essence of Rajasthani splendor—the intricate patterns mirror the architectural marvels of Jaipur, the warm colors reflect the desert sunsets, and the detailed work speaks of the patience and skill that characterizes the artisans of this royal land.`
      },
      'Gujarat': {
        para1: `Along the western coast of ${artwork.state}, where the Arabian Sea meets the land of entrepreneurial spirit, ${artwork.artistName} grew up immersed in a culture of craftsmanship and commerce. The vibrant markets, colorful festivals, and intricate textile traditions shaped their artistic vision.`,
        para2: `This masterpiece, "${artwork.title}", embodies the essence of Gujarat's artistic heritage. Every detail reflects the state's renowned craftsmanship traditions—from the precise mirror work to the vibrant color combinations that have made Gujarati art celebrated worldwide.`
      },
      'West Bengal': {
        para1: `In the cultural capital of ${artwork.state}, where the Ganges flows with stories of poets and artists, ${artwork.artistName} was nurtured by the rich tradition of Bengali art and literature. The smell of clay from Kumortuli and the sound of dhak during Durga Puja became the soundtrack of their artistic awakening.`,
        para2: `"${artwork.title}" resonates with the soul of Bengal—it carries the essence of Tagore's poetry, the vibrant colors of Kalighat paintings, and the delicate beauty that has made Bengali art a treasure of Indian culture.`
      },
      'Tamil Nadu': {
        para1: `In the temple towns of ${artwork.state}, where ancient Dravidian architecture reaches towards the heavens, ${artwork.artistName} learned their craft amidst the chanting of Vedic hymns and the fragrance of jasmine. The bronze sculptures and intricate stone carvings became their first teachers.`,
        para2: `This creation, "${artwork.title}", embodies the spiritual and artistic legacy of Tamil Nadu. Each line speaks of the Chola bronzes, each curve reflects the gopuram architecture, and the overall composition pays homage to the land where art and devotion have danced together for millennia.`
      },
      'Kerala': {
        para1: `In the backwaters of ${artwork.state}, where coconut palms sway to the rhythm of monsoon rains, ${artwork.artistName} discovered the harmony between nature and art. The vibrant Kathakali performances and the intricate mural paintings of ancient temples ignited their passion for traditional arts.`,
        para2: `"${artwork.title}" captures the essence of God's Own Country—the lush green hues speak of the Western Ghats, the flowing patterns mirror the backwater channels, and the overall serenity reflects the peaceful coexistence of tradition and nature that defines Kerala.`
      },
      'Maharashtra': {
        para1: `In the dynamic state of ${artwork.state}, where ancient cave paintings of Ajanta meet the modern spirit of Mumbai, ${artwork.artistName} found their unique voice. Growing up with the stories of Shivaji Maharaj and the traditions of Warli art, they learned to blend heritage with contemporary expression.`,
        para2: `This artwork, "${artwork.title}", tells the story of Maharashtra's artistic evolution. It carries the geometric simplicity of Warli patterns, the bold colors of Holi celebrations, and the entrepreneurial spirit that has made this state a beacon of cultural and economic progress.`
      },
      'Karnataka': {
        para1: `In the silicon valley of India, ${artwork.state}, where ancient temples coexist with modern technology, ${artwork.artistName} discovered the beauty of tradition in a contemporary world. The intricate Hoysala architecture and the vibrant Mysore paintings became their source of inspiration.`,
        para2: `"${artwork.title}" represents the unique blend that Karnataka offers—where Hampi's ruins whisper stories of the Vijayanagara empire, and Bangalore's innovation speaks of the future. This piece bridges centuries of artistic heritage with modern sensibilities.`
      },
      'Odisha': {
        para1: `On the eastern coast of ${artwork.state}, where the Sun Temple of Konark stands as a testament to artistic brilliance, ${artwork.artistName} was inspired by the rhythmic waves of the Bay of Bengal and the intricate stone carvings of Jagannath Temple.`,
        para2: `This masterpiece, "${artwork.title}", embodies the spiritual and artistic richness of Odisha. The flowing patterns echo the classical Odissi dance movements, while the earthy tones reflect the terracotta traditions that have flourished in this land of temples.`
      },
      'Punjab': {
        para1: `In the land of five rivers, ${artwork.state}, where golden wheat fields dance in the breeze, ${artwork.artistName} grew up with the vibrant colors of Vaisakhi and the soul-stirring music of the Gurbani. The rich traditions of Phulkari embroidery and the spirit of the Sikh heritage shaped their artistic vision.`,
        para2: `"${artwork.title}" pulsates with the energy of Punjab—the bold colors speak of the land's prosperity, the intricate patterns mirror the Phulkari traditions, and the overall composition celebrates the fearless spirit and rich culture of the Punjabi people.`
      },
      'default': {
        para1: `In the culturally rich state of ${artwork.state}, ${artwork.artistName} discovered their passion for preserving and celebrating traditional Indian art forms. Surrounded by the diverse artistic heritage of their homeland, they dedicated themselves to mastering techniques passed down through generations.`,
        para2: `"${artwork.title}" is a testament to their journey as an artist and cultural preservationist. Each element in this piece tells a story—of family traditions, local festivals, community celebrations, and the enduring spirit of Indian craftsmanship that continues to inspire artists across the nation.`
      }
    };

    const template = storyTemplates[artwork.state as keyof typeof storyTemplates] || storyTemplates.default;
    return template;
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
                  onClick={() => handleViewStory(art)}
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
          <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 rounded-xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto section-indian">
            <button 
              onClick={() => setStory(null)} 
              className="float-right text-3xl text-orange-600 hover:text-orange-800 transition-colors duration-200 mb-4"
              style={{ fontWeight: 'bold' }}
            >
              ×
            </button>
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold header-indian mb-2 text-orange-800">{story.title}</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
            </div>

            {/* Content Layout */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Image Section */}
              <div className="space-y-4">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full rounded-xl shadow-lg border-4 border-orange-200" 
                />
                
                {/* Artist Info Card */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-orange-100">
                  <div className="text-lg font-semibold text-orange-700 mb-2">Artist Details</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Artist:</span>
                      <span className="font-medium text-stone-800">{story.artistName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Origin:</span>
                      <span className="font-medium text-stone-800">{story.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Price:</span>
                      <span className="font-bold text-orange-600 text-lg">₹{story.price}</span>
                    </div>
                    {story.views !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-stone-600">Views:</span>
                        <span className="font-medium text-blue-600">{story.views}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-orange-800 mb-4 header-indian">The Artist's Journey</h4>
                  <p className="text-stone-700 leading-relaxed text-base mb-4">
                    {generateStoryContent(story).para1}
                  </p>
                  <p className="text-stone-700 leading-relaxed text-base">
                    {generateStoryContent(story).para2}
                  </p>
                </div>

                {/* Original Description */}
                <div className="bg-white rounded-lg p-4 shadow-md border border-orange-100">
                  <h5 className="text-lg font-semibold text-orange-700 mb-2">Artist's Description</h5>
                  <p className="text-stone-600 text-sm italic leading-relaxed">
                    "{story.description}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => handleAddToCart(story)}
                    className="btn-indian flex-1 py-3 px-6 text-base font-semibold"
                  >
                    Add to Cart - ₹{story.price}
                  </button>
                  <button 
                    onClick={() => setMockup({art: story, product: productMockups[0]})}
                    className="bg-orange-100 text-orange-700 border-2 border-orange-300 rounded-lg py-3 px-6 text-base font-semibold hover:bg-orange-200 transition-colors duration-200"
                  >
                    Try Mockup
                  </button>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mt-8 text-center border-t border-orange-200 pt-6">
              <div className="text-sm text-stone-600 mb-2">Scan to share this artwork</div>
              <QRCodeCanvas 
                value={window.location.origin + '/story/' + story._id} 
                size={80} 
                fgColor="#e1ad01" 
                bgColor="#fff8f0" 
                level="H" 
                className="mx-auto border-2 border-orange-200 rounded"
              />
            </div>
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
