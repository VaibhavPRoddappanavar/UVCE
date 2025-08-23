import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface Artwork {
  _id: string;
  title: string;
  image: string;
  artistName: string;
  price: number;
  description: string;
  state: string;
  artist: string;
  isActive: boolean;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

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

const productTypes = [
  'T-Shirts', 'Mugs', 'Tote Bags', 'Phone Cases', 'Posters', 'Notebooks', 'Cushions', 'Stickers'
];

const BrandDashboard: React.FC = () => {
  // Removed availableArtworks API call for quick fix
  const [purchasedArt, setPurchasedArt] = useState<PurchasedArt[]>([]);
  const [profile, setProfile] = useState<BrandProfile>({
    name: '', email: '', industry: '', website: ''
  });
  const [showProfile, setShowProfile] = useState(false);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [licenseModal, setLicenseModal] = useState(false);

  const handlePurchase = (art: Artwork, licenseType: 'digital' | 'physical' | 'both') => {
    const digitalPrice = Math.round(art.price * 0.7); // 30% discount for digital
    const physicalPrice = art.price;
    
    const newPurchase: PurchasedArt = {
      id: art._id,
      title: art.title,
      image: art.image,
      artist: art.artistName,
      price: licenseType === 'digital' ? digitalPrice.toString() : 
             licenseType === 'physical' ? physicalPrice.toString() : 
             (digitalPrice + physicalPrice).toString(),
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
            <h4 className="font-semibold text-center mb-4">{selectedArt.title} by {selectedArt.artistName}</h4>
            <div className="space-y-3">
              <div className="border border-orange-200 rounded p-4 hover:bg-orange-50 cursor-pointer" 
                   onClick={() => handlePurchase(selectedArt, 'digital')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Digital License Only</div>
                    <div className="text-sm text-stone-600">Use on digital products, websites, apps</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">₹{Math.round(selectedArt.price * 0.7)}</div>
                </div>
              </div>
              <div className="border border-orange-200 rounded p-4 hover:bg-orange-50 cursor-pointer"
                   onClick={() => handlePurchase(selectedArt, 'physical')}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Physical License Only</div>
                    <div className="text-sm text-stone-600">Use on physical products, prints</div>
                  </div>
                  <div className="text-lg font-bold text-orange-600">₹{selectedArt.price}</div>
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
                    ₹{Math.round(selectedArt.price * 0.7) + selectedArt.price}
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
            <div className="text-center py-8 text-stone-500">No artworks available at the moment</div>
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
