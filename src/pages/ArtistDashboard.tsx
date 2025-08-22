import React, { useState } from 'react';

interface Artwork {
  title: string;
  description: string;
  image: string;
  state: string;
  price: string;
  artist: string;
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
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (ev) => setForm({ ...form, image: ev.target?.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image || !form.state || !form.price) return;
    setArtworks([...artworks, { ...form, artist: 'You' }]);
    setForm({ title: '', description: '', image: '', state: '', price: '' });
    setImageFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold header-indian mb-6">Artist Dashboard</h2>
      <form className="bg-white rounded-xl shadow-lg p-6 mb-8 section-indian" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Artwork Title" className="p-2 rounded border border-stone-300" required />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price (₹)" className="p-2 rounded border border-stone-300" required />
          <select name="state" value={form.state} onChange={handleChange} className="p-2 rounded border border-stone-300" required>
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={handleImage} className="p-2 rounded border border-stone-300" required />
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Artwork Description" className="p-2 rounded border border-stone-300 mt-4 w-full" rows={3} required />
        <button type="submit" className="btn-indian mt-4 px-8 py-2">Upload Artwork</button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">Your Uploaded Artworks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art, i) => (
            <div key={i} className="bg-white rounded-xl shadow section-indian flex flex-col items-center">
              <img src={art.image} alt={art.title} className="w-40 h-40 object-cover rounded-lg mb-2 border-2 border-orange-200" />
              <div className="font-bold text-lg mb-1">{art.title}</div>
              <div className="text-orange-600 font-semibold mb-1">₹{art.price}</div>
              <div className="text-xs text-stone-500 mb-1">{art.state}</div>
              <div className="text-xs text-stone-700 mb-2">{art.artist}</div>
              <div className="text-xs text-stone-400">{art.description.slice(0, 40)}...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
