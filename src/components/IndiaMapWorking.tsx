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
        {/* Use the SVG content directly from the data folder */}
        <div 
          dangerouslySetInnerHTML={{
            __html: `
              <svg
                width="800"
                height="800"
                viewBox="0 0 612 696"
                className="india-map-svg max-w-full h-auto cursor-pointer"
                style="filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.1))"
              >
                <!-- Andaman and Nicobar Islands -->
                <path
                  id="IN-AN"
                  fill="${getStateColor('IN-AN')}"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  class="state-path cursor-pointer hover:opacity-80 transition-all duration-200"
                  onclick="handleStateClick('IN-AN')"
                  onmouseenter="handleStateMouseEnter('IN-AN', event)"
                  onmouseleave="handleStateMouseLeave()"
                  d="m 537.188,685.44148 -0.041,0.4695 0.768,0.30627 0.104,2.47542 1.258,1.84675 -0.71,-0.0232 0.661,0.93295 -0.574,0.18739 -0.437,0.94503 0.103,1.88201 -0.409,0.42617 -0.663,-0.49065 -0.502,1.30269 -0.461,-0.2156 0.224,-1.08911 -0.606,-0.31434 -0.121,-1.2503 -0.813,-0.73346 0.069,-0.77879 -1.076,-1.12336 -0.646,0.17933 -0.121,-1.96159 0.365,-0.27304 -0.4,-0.27001 0.64,-1.36616 0.994,0.0584 0.564,-0.57427 0.878,0.27505 0.092,-0.68006 0.86,-0.14307 z"
                />
                
                <!-- Add more state paths from the original SVG here -->
                
              </svg>
            `
          }}
        />

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
