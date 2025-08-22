import React from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

// Demo artist bios by name
const artistBios: Record<string, { bio: string; region: string }> = {
  'Savitri Devi': { bio: 'A renowned Warli artist from Maharashtra, blending tradition with modern forms.', region: 'Maharashtra' },
  'Geeta Kumari': { bio: 'Madhubani painter from Bihar, known for vibrant mythological themes.', region: 'Bihar' },
  'Meera Sharma': { bio: 'Blue pottery artisan from Rajasthan, working to revive the lost art.', region: 'Rajasthan' },
  // Add more as needed
};

const demoArtworks = [
  {
    id: 'warli-dance',
    title: 'Warli Dance',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Warli_Painting.jpg',
    price: '2000',
    artist: 'Savitri Devi',
    description: 'A beautiful Warli painting depicting tribal dance from Maharashtra.',
    state: 'Maharashtra',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // sample audio
  },
  {
    id: 'madhubani-sun',
    title: 'Madhubani Sun',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Madhubani_art.jpg',
    price: '2500',
    artist: 'Geeta Kumari',
    description: 'Traditional Madhubani art from Bihar, vibrant sun motif.',
    state: 'Bihar',
    audio: '',
  },
  {
    id: 'blue-pottery',
    title: 'Blue Pottery',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Blue_Pottery.jpg',
    price: '1800',
    artist: 'Meera Sharma',
    description: 'Handcrafted blue pottery from Rajasthan.',
    state: 'Rajasthan',
    audio: '',
  },
];

const StoryPage: React.FC = () => {
  const { id } = useParams();
  const art = demoArtworks.find(a => a.id === id);
  if (!art) return <div className="text-center py-20">Artwork not found.</div>;
  const bio = artistBios[art.artist];
  const url = window.location.origin + '/story/' + art.id;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-6">
      <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-2xl section-indian p-8 relative">
        <div className="absolute -top-10 right-6">
          <QRCodeCanvas value={url} size={80} fgColor="#e1ad01" bgColor="#fff8f0" level="H" />
        </div>
        <img src={art.image} alt={art.title} className="w-64 h-64 object-cover rounded-2xl mx-auto mb-4 border-4 border-orange-200 shadow-lg pattern-accent" />
        <h1 className="text-3xl font-bold header-indian mb-2 text-center">{art.title}</h1>
        <div className="text-lg text-stone-700 text-center mb-1">By <span className="font-semibold text-orange-700">{art.artist}</span></div>
        {bio && (
          <div className="text-center text-stone-500 mb-2">
            <span className="italic">{bio.bio}</span>
            <div className="text-xs mt-1">Region: <span className="text-orange-600 font-semibold">{bio.region}</span></div>
          </div>
        )}
        <div className="motif-divider my-4" />
        <div className="text-stone-800 mb-4 text-center">{art.description}</div>
        {art.audio && (
          <audio controls className="w-full my-2">
            <source src={art.audio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};

export default StoryPage;
