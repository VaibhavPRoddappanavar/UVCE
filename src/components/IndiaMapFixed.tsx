import React, { useState } from 'react';
import { indiaStatesData } from '../data/indiaStatesData';
import './IndiaMap.css';

const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false
  });

  // State code mapping for the SVG paths (IN-XX format to our state keys)
  const stateCodeMapping: { [key: string]: string } = {
    'IN-AP': 'andhraPradesh',
    'IN-AR': 'arunachalPradesh',
    'IN-AS': 'assam',
    'IN-BR': 'bihar',
    'IN-CT': 'chhattisgarh',
    'IN-GA': 'goa',
    'IN-GJ': 'gujarat',
    'IN-HR': 'haryana',
    'IN-HP': 'himachalPradesh',
    'IN-JH': 'jharkhand',
    'IN-KA': 'karnataka',
    'IN-KL': 'kerala',
    'IN-MP': 'madhyaPradesh',
    'IN-MH': 'maharashtra',
    'IN-MN': 'manipur',
    'IN-ML': 'meghalaya',
    'IN-MZ': 'mizoram',
    'IN-NL': 'nagaland',
    'IN-OR': 'odisha',
    'IN-PB': 'punjab',
    'IN-RJ': 'rajasthan',
    'IN-SK': 'sikkim',
    'IN-TN': 'tamilNadu',
    'IN-TG': 'telangana',
    'IN-TR': 'tripura',
    'IN-UP': 'uttarPradesh',
    'IN-UT': 'uttarakhand',
    'IN-WB': 'westBengal',
    'IN-AN': 'andamanNicobar',
    'IN-CH': 'chandigarh',
    'IN-DN': 'dadraNagarHaveli',
    'IN-DL': 'delhi',
    'IN-JK': 'jammuKashmir',
    'IN-LA': 'ladakh',
    'IN-LD': 'lakshadweep',
    'IN-PY': 'puducherry'
  };

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  const handleStateClick = (stateCode: string) => {
    const stateKey = stateCodeMapping[stateCode];
    if (stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      setSelectedState(stateKey);
    }
  };

  const handleStateMouseEnter = (stateCode: string, event: React.MouseEvent) => {
    const stateKey = stateCodeMapping[stateCode];
    if (stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      setHoveredState(stateKey);
      const containerRect = (event.currentTarget.closest('.india-map-container') as Element)?.getBoundingClientRect();
      if (containerRect) {
        setTooltip({
          x: event.clientX - containerRect.left,
          y: event.clientY - containerRect.top,
          visible: true
        });
      }
    }
  };

  const handleStateMouseLeave = () => {
    setHoveredState(null);
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const getStateColor = (stateCode: string) => {
    const stateKey = stateCodeMapping[stateCode];
    if (hoveredState === stateKey && indiaStatesData[stateKey as keyof typeof indiaStatesData]) {
      return indiaStatesData[stateKey as keyof typeof indiaStatesData].color;
    }
    return '#f97316'; // Default orange color
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  return (
    <div className="w-full py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Title Section */}
      <div className="map-title mx-auto max-w-4xl mb-8">
        <h2>🇮🇳 Explore India's Rich Heritage 🎨</h2>
        <p>Click on any state to discover its unique art forms and cultural traditions</p>
        <div className="decorative-border mt-4"></div>
      </div>

      {/* Map Container */}
      <div className="india-map-container relative flex justify-center">
        <svg
          width="600"
          height="600"
          viewBox="0 0 566 707"
          className="india-map-svg max-w-full h-auto cursor-pointer"
          style={{ filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Andaman and Nicobar Islands */}
          <path
            id="IN-AN"
            fill={getStateColor('IN-AN')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-AN')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-AN', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 239.69,615.56347 -0.836,-0.0544 -0.215,0.78686 0.801,0.21258 0.25,-0.94504 z m 1.325,-2.24369 -0.296,1.04477 0.54,0.49569 0.459,-0.62162 -0.703,-0.91884 z"
          />
          
          {/* Andhra Pradesh */}
          <path
            id="IN-AP"
            fill={getStateColor('IN-AP')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-AP')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-AP', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 316.48,584.94247 0.793,0.007 -0.091,-1.13848 -1.719,-0.64076 -0.486,-1.16064 0.877,0.18135 -0.285,-0.93193 1.078,0.42113 0.377,-0.403 1.112,0.21762"
          />
          
          {/* Maharashtra */}
          <path
            id="IN-MH"
            fill={getStateColor('IN-MH')}
            stroke="#fff"
            strokeWidth="1"
            className="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
            onClick={() => handleStateClick('IN-MH')}
            onMouseEnter={(e) => handleStateMouseEnter('IN-MH', e)}
            onMouseLeave={handleStateMouseLeave}
            d="m 158.254,420.87947 2.748,1.35909 0.425,1.10623 2.081,-0.59845 1.378,1.50923 0.758,0.0272 0.304,1.23821"
          />
          
          {/* Add more states as needed - using simplified paths for now */}
        </svg>

        {/* Tooltip */}
        {tooltip.visible && hoveredState && (
          <div
            className="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px'
            }}
          >
            {indiaStatesData[hoveredState as keyof typeof indiaStatesData]?.name}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center mt-8 max-w-2xl mx-auto">
        <p className="text-lg text-stone-600 mb-4">
          🎭 Discover the artistic heritage of each Indian state
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-stone-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-orange-200 rounded"></div>
            <span>Hover to preview</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span>Click to explore</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>🎨</span>
            <span>Rich art forms</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>📚</span>
            <span>Cultural stories</span>
          </div>
        </div>
      </div>

      {/* Modal for State Details */}
      {selectedState && selectedStateData && (
        <div className="state-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-header">
              <h2>{selectedStateData.name}</h2>
              <div className="capital">Capital: {selectedStateData.capital}</div>
              <button 
                className="close-button"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className="decorative-border"></div>

            {/* Body */}
            <div className="modal-body">
              {/* State Story */}
              <div className="state-story">
                <h3 className="text-xl font-bold mb-3 text-orange-700">📖 Cultural Heritage</h3>
                <p>{selectedStateData.story}</p>
              </div>

              {/* Art Forms */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center text-orange-700">
                  🎨 Traditional Art Forms
                </h3>
                <div className="artforms-grid">
                  {selectedStateData.artforms.map((artform, index) => (
                    <div key={index} className="artform-card">
                      <img 
                        src={artform.image} 
                        alt={artform.name}
                        className="artform-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop';
                        }}
                      />
                      <div className="artform-content">
                        <h4 className="artform-name">{artform.name}</h4>
                        <p className="artform-description">{artform.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-orange-800">
                  🛍️ Support Local Artists
                </h4>
                <p className="text-stone-700 mb-4">
                  Discover and purchase authentic {selectedStateData.name} art pieces in our marketplace. 
                  Every purchase directly supports local artisans and helps preserve these traditional crafts.
                </p>
                <div className="flex gap-3">
                  <button 
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => {
                      closeModal();
                      // Navigate to marketplace with state filter
                      window.location.href = `/marketplace?state=${selectedState}`;
                    }}
                  >
                    Browse {selectedStateData.name} Art
                  </button>
                  <button 
                    className="px-6 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                    onClick={closeModal}
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMap;
