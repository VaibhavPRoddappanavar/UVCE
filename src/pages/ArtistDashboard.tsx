import React, { useState, useEffect } from 'react';

interface Artwork {
  _id?: string;
  title: string;
  description: string;
  image: string;
  state: string;
  price: string;
  artistName: string;
  createdAt?: string;
  views?: number;
  likes?: number;
}

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir',
  'Ladakh'
];

const ArtistDashboard: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [form, setForm] = useState({
    title: '', description: '', image: '', state: '', price: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load artworks on component mount
  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('https://uvce-backend.onrender.com/api/artworks/my/artworks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setArtworks(data.data);
      }
    } catch (error) {
      console.error('Failed to load artworks:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setForm({ ...form, image: ev.target?.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!form.title || !form.description || !form.image || !form.state || !form.price) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to upload artwork');
        setLoading(false);
        return;
      }

      const response = await fetch('https://uvce-backend.onrender.com/api/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Artwork uploaded successfully!');
        setForm({ title: '', description: '', image: '', state: '', price: '' });
        loadArtworks(); // Reload artworks
      } else {
        setError(data.message || 'Failed to upload artwork');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold header-indian mb-6">Artist Dashboard</h2>
      
      {/* Upload Form */}
      <form className="bg-white rounded-xl shadow-lg p-6 mb-8 section-indian" onSubmit={handleSubmit}>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="Artwork Title" 
            className="p-2 rounded border border-stone-300" 
            required 
          />
          <input 
            name="price" 
            value={form.price} 
            onChange={handleChange} 
            placeholder="Price (₹)" 
            type="number"
            className="p-2 rounded border border-stone-300" 
            required 
          />
          <select 
            name="state" 
            value={form.state} 
            onChange={handleChange} 
            className="p-2 rounded border border-stone-300" 
            required
          >
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImage} 
            className="p-2 rounded border border-stone-300" 
            required={!form.image}
          />
        </div>
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Artwork Description" 
          className="p-2 rounded border border-stone-300 mt-4 w-full" 
          rows={3} 
          required 
        />
        <button 
          type="submit" 
          className="btn-indian mt-4 px-8 py-2"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Artwork'}
        </button>
      </form>

      {/* Artworks Display */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Uploaded Artworks ({artworks.length})</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div key={art._id} className="bg-white rounded-xl shadow section-indian flex flex-col items-center">
              <img src={art.image} alt={art.title} className="w-40 h-40 object-cover rounded-lg mb-2 border-2 border-orange-200" />
              <div className="font-bold text-lg mb-1">{art.title}</div>
              <div className="text-orange-600 font-semibold mb-1">₹{art.price}</div>
              <div className="text-xs text-stone-500 mb-1">{art.state}</div>
              <div className="text-xs text-stone-700 mb-2">{art.artistName}</div>
              <div className="text-xs text-stone-400 mb-2">{art.description.slice(0, 40)}...</div>
              {art.views !== undefined && (
                <div className="text-xs text-blue-600">Views: {art.views}</div>
              )}
            </div>
          ))}
          {artworks.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No artworks uploaded yet. Upload your first artwork!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
