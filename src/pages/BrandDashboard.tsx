import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface PurchasedArt {
  id: string;
  title: string;
  image: string;
  artist: string;
  price: string;
  licenseType: 'digital' | 'physical' | 'both';
  purchaseDate: string;
  products?: string[];
}

interface BrandProfile {
  name: string;
  email: string;
  industry: string;
  website: string;
}

const availableArtworks = [
  {
    id: 'warli-dance',
    title: 'Warli Dance',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Warli_Painting.jpg',
    artist: 'Savitri Devi',
    price: '2000',
    digitalPrice: '1500',
    physicalPrice: '2500',
    description: 'A beautiful Warli painting depicting tribal dance from Maharashtra.',
  },
  {
    id: 'madhubani-sun',
    title: 'Madhubani Sun',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Madhubani_art.jpg',
    artist: 'Geeta Kumari',
    price: '2500',
    digitalPrice: '2000',
    physicalPrice: '3000',
    description: 'Traditional Madhubani art from Bihar, vibrant sun motif.',
  },
];

const productTypes = [
  'T-Shirts', 'Mugs', 'Tote Bags', 'Phone Cases', 'Posters', 'Notebooks', 'Cushions', 'Stickers'
];

const BrandDashboard: React.FC = () => {
  const [purchasedArt, setPurchasedArt] = useState<PurchasedArt[]>([]);
  const [profile, setProfile] = useState<BrandProfile>({
    name: '', email: '', industry: '', website: ''
  });
  const [showProfile, setShowProfile] = useState(false);
  const [selectedArt, setSelectedArt] = useState<typeof availableArtworks[0] | null>(null);
  const [licenseModal, setLicenseModal] = useState(false);

  const handlePurchase = (art: typeof availableArtworks[0], licenseType: 'digital' | 'physical' | 'both') => {
    const newPurchase: PurchasedArt = {
      id: art.id,
      title: art.title,
      image: art.image,
      artist: art.artist,
      price: licenseType === 'digital' ? art.digitalPrice : licenseType === 'physical' ? art.physicalPrice : 
             (parseInt(art.digitalPrice) + parseInt(art.physicalPrice)).toString(),
      licenseType,
      purchaseDate: new Date().toLocaleDateString(),
      products: []
    };
    setPurchasedArt([...purchasedArt, newPurchase]);
    setLicenseModal(false);
    setSelectedArt(null);
  };

  const addProductToArt = (artId: string, product: string) => {
    setPurchasedArt(prev => prev.map(art => 
      art.id === artId 
        ? { ...art, products: [...(art.products || []), product] }
        : art
    ));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold header-indian">Brand Dashboard</h2>
        <button 
          onClick={() => setShowProfile(!showProfile)}
          className="btn-indian px-4 py-2"
        >
          {profile.name || 'Setup Profile'}
        </button>
      </div>

      {/* Profile Setup Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full section-indian">
            <h3 className="text-xl font-bold header-indian mb-4">Brand Profile</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Brand Name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-3 border border-stone-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full p-3 border border-stone-300 rounded"
              />
              <input
                type="text"
                placeholder="Industry"
                value={profile.industry}
                onChange={(e) => setProfile({...profile, industry: e.target.value})}
                className="w-full p-3 border border-stone-300 rounded"
              />
              <input
                type="url"
                placeholder="Website"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
                className="w-full p-3 border border-stone-300 rounded"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowProfile(false)} className="btn-indian px-6 py-2">Save</button>
              <button onClick={() => setShowProfile(false)} className="px-6 py-2 border border-stone-300 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* License Purchase Modal */}
      {licenseModal && selectedArt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full section-indian">
            <h3 className="text-xl font-bold header-indian mb-4">Choose License Type</h3>
            <img src={selectedArt.image} alt={selectedArt.title} className="w-32 h-32 object-cover rounded mx-auto mb-4 border-2 border-orange-200" />
            <h4 className="font-semibold text-center mb-4">{selectedArt.title} by {selectedArt.artist}</h4>
            <div className="space-y-3">
              <div className="border border-orange-200 rounded p-4 hover:bg-orange-50 cursor-pointer" 
                   onClick={() => handlePurchase(selectedArt, 'digital')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Digital License Only</div>
                    <div className="text-sm text-stone-600">Use on digital products, websites, apps</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">₹{selectedArt.digitalPrice}</div>
                </div>
              </div>
              <div className="border border-orange-200 rounded p-4 hover:bg-orange-50 cursor-pointer"
                   onClick={() => handlePurchase(selectedArt, 'physical')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Physical License Only</div>
                    <div className="text-sm text-stone-600">Use on physical products, prints</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">₹{selectedArt.physicalPrice}</div>
                </div>
              </div>
              <div className="border border-orange-200 rounded p-4 hover:bg-orange-50 cursor-pointer"
                   onClick={() => handlePurchase(selectedArt, 'both')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Full License (Digital + Physical)</div>
                    <div className="text-sm text-stone-600">Complete commercial rights</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">
                    ₹{parseInt(selectedArt.digitalPrice) + parseInt(selectedArt.physicalPrice)}
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setLicenseModal(false)} 
              className="w-full mt-4 p-2 border border-stone-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Available Artworks */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Available Artworks</h3>
          <div className="space-y-4">
            {availableArtworks.map(art => (
              <div key={art.id} className="bg-white rounded-xl shadow section-indian p-4">
                <div className="flex gap-4">
                  <img src={art.image} alt={art.title} className="w-24 h-24 object-cover rounded border-2 border-orange-200" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{art.title}</h4>
                    <p className="text-stone-600 text-sm mb-1">by {art.artist}</p>
                    <p className="text-xs text-stone-500 mb-2">{art.description}</p>
                    <div className="flex gap-2 text-sm">
                      <span className="text-orange-600">Digital: ₹{art.digitalPrice}</span>
                      <span className="text-orange-600">Physical: ₹{art.physicalPrice}</span>
                    </div>
                    <button 
                      onClick={() => {setSelectedArt(art); setLicenseModal(true);}}
                      className="btn-indian px-4 py-1 mt-2 text-sm"
                    >
                      Purchase License
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchased Art & Management */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Licensed Artworks</h3>
          {purchasedArt.length === 0 ? (
            <div className="text-center text-stone-500 py-8">No purchased artworks yet</div>
          ) : (
            <div className="space-y-4">
              {purchasedArt.map(art => (
                <div key={`${art.id}-${art.purchaseDate}`} className="bg-white rounded-xl shadow section-indian p-4">
                  <div className="flex gap-4">
                    <img src={art.image} alt={art.title} className="w-20 h-20 object-cover rounded border-2 border-orange-200" />
                    <div className="flex-1">
                      <h4 className="font-bold">{art.title}</h4>
                      <p className="text-stone-600 text-sm">by {art.artist}</p>
                      <div className="flex gap-2 text-xs mt-1">
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">{art.licenseType}</span>
                        <span className="text-stone-500">₹{art.price}</span>
                      </div>
                      <p className="text-xs text-stone-400">Purchased: {art.purchaseDate}</p>
                      
                      {/* Product Usage */}
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-1">Used on products:</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {art.products?.map((product, idx) => (
                            <span key={idx} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">{product}</span>
                          ))}
                        </div>
                        <select 
                          onChange={(e) => e.target.value && addProductToArt(art.id, e.target.value)}
                          className="text-xs p-1 border border-stone-300 rounded"
                          defaultValue=""
                        >
                          <option value="">Add to product...</option>
                          {productTypes.map(product => (
                            <option key={product} value={product}>{product}</option>
                          ))}
                        </select>
                      </div>

                      {/* Download QR for packaging */}
                      <div className="mt-3 flex items-center gap-2">
                        <QRCodeCanvas 
                          value={`${window.location.origin}/story/${art.id}`} 
                          size={40} 
                          fgColor="#e1ad01" 
                          bgColor="#fff8f0" 
                        />
                        <span className="text-xs text-stone-600">QR for product packaging</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;
