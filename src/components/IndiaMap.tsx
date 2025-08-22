import React, { useState } from 'react';
import './IndiaMap.css';

// Minimal SVG for India map with a few states for demo (expandable)
// Each state has an id matching the state key in stateData
const INDIA_SVG = `
<svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" class="india-svg">
  <g id="states">
    <path id="MH" d="M120,300 L180,320 L170,400 L110,390 Z" />
    <path id="UP" d="M220,200 L300,210 L290,270 L210,260 Z" />
    <path id="WB" d="M410,250 L470,270 L460,320 L400,310 Z" />
    <path id="RJ" d="M80,180 L160,190 L150,260 L70,250 Z" />
    <path id="TN" d="M180,500 L260,520 L250,590 L170,570 Z" />
    <!-- Add more states as needed -->
  </g>
</svg>
`;

const stateData: Record<string, {
  name: string;
  artforms: string[];
  artworks: { image: string; artist: string }[];
}> = {
  MH: {
    name: 'Maharashtra',
    artforms: ['Warli', 'Paithani', 'Chitrakathi'],
    artworks: [
      { image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Warli_Painting.jpg', artist: 'Savitri Devi' },
      { image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Paithani_Saree.jpg', artist: 'Ramesh Pawar' },
    ],
  },
  UP: {
    name: 'Uttar Pradesh',
    artforms: ['Madhubani', 'Chikankari', 'Sanjhi'],
    artworks: [
      { image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Madhubani_art.jpg', artist: 'Geeta Kumari' },
      { image: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Chikankari.jpg', artist: 'Anwar Ali' },
    ],
  },
  WB: {
    name: 'West Bengal',
    artforms: ['Pattachitra', 'Kantha', 'Dokra'],
    artworks: [
      { image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Pattachitra.jpg', artist: 'Madhusudan Das' },
      { image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Kantha_embroidery.jpg', artist: 'Shila Bhowmick' },
    ],
  },
  RJ: {
    name: 'Rajasthan',
    artforms: ['Phad', 'Blue Pottery', 'Pichwai'],
    artworks: [
      { image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Phad_painting.jpg', artist: 'Nandlal Joshi' },
      { image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Blue_Pottery.jpg', artist: 'Meera Sharma' },
    ],
  },
  TN: {
    name: 'Tamil Nadu',
    artforms: ['Tanjore', 'Kalamkari', 'Kanchipuram Silk'],
    artworks: [
      { image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Tanjore_painting.jpg', artist: 'Lakshmi Iyer' },
      { image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Kanchipuram_Silk_Saree.jpg', artist: 'Sundari Devi' },
    ],
  },
};

const IndiaMap: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Highlight state on hover
  React.useEffect(() => {
    const svg = document.querySelector('.india-svg');
    if (!svg) return;
    const states = svg.querySelectorAll('path');
    states.forEach((el) => {
      el.addEventListener('mouseenter', () => setHovered(el.id));
      el.addEventListener('mouseleave', () => setHovered(null));
      el.addEventListener('click', () => setSelected(el.id));
    });
    return () => {
      states.forEach((el) => {
        el.removeEventListener('mouseenter', () => setHovered(el.id));
        el.removeEventListener('mouseleave', () => setHovered(null));
        el.removeEventListener('click', () => setSelected(el.id));
      });
    };
  }, []);

  // Inline SVG with dynamic class for highlight
  const svgWithHighlight = INDIA_SVG.replace(/<path id="(\w+)"/g, (match, id) => {
    let className = 'state-path';
    if (hovered === id) className += ' state-hover';
    if (selected === id) className += ' state-selected';
    return `<path id="${id}" class="${className}"`;
  });

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="w-full max-w-xl mx-auto"
        dangerouslySetInnerHTML={{ __html: svgWithHighlight }}
      />
      <div className="motif-divider my-6" />
      <p className="text-lg text-stone-700 italic mb-2">Click a state to explore its folk art</p>
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border-4 border-orange-100 modal-indian" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-xl text-stone-400 hover:text-orange-600" onClick={() => setSelected(null)}>&times;</button>
            <h2 className="text-2xl font-bold header-indian mb-2">{stateData[selected].name}</h2>
            <div className="mb-4">
              <span className="font-semibold text-orange-500">Folk Artforms:</span>
              <ul className="list-disc ml-6 text-stone-700">
                {stateData[selected].artforms.map((art) => (
                  <li key={art}>{art}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stateData[selected].artworks.map((art, i) => (
                <div key={i} className="bg-orange-50 rounded-xl shadow p-2 flex flex-col items-center">
                  <img src={art.image} alt={art.artist} className="w-24 h-24 object-cover rounded-lg mb-2 border-2 border-orange-200" />
                  <span className="text-sm font-medium text-stone-700">{art.artist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
