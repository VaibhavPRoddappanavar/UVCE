import React, { useState } from 'react';
import { indiaStatesData } from '../data/indiaStatesData';
import './IndiaMap.css';

const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  const closeModal = () => {
    setSelectedState(null);
  };

  // Handle state selection based on coordinates or state names
  const handleStateSelection = (stateName: string) => {
    setSelectedState(stateName);
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
        {/* Interactive India Map */}
        <div className="relative">
          <img 
            src="/src/data/india.svg" 
            alt="India Map"
            className="max-w-full h-auto"
            style={{ width: '800px', height: 'auto', filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.1))' }}
          />
          
          {/* Clickable overlays for major states */}
          <div className="absolute inset-0">
            {/* Rajasthan */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '5%', top: '25%', width: '20%', height: '25%' }}
              onClick={() => handleStateSelection('rajasthan')}
              title="Rajasthan"
            />
            
            {/* Maharashtra */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '18%', top: '55%', width: '15%', height: '15%' }}
              onClick={() => handleStateSelection('maharashtra')}
              title="Maharashtra"
            />
            
            {/* Gujarat */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '8%', top: '45%', width: '12%', height: '20%' }}
              onClick={() => handleStateSelection('gujarat')}
              title="Gujarat"
            />
            
            {/* Karnataka */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '20%', top: '70%', width: '12%', height: '15%' }}
              onClick={() => handleStateSelection('karnataka')}
              title="Karnataka"
            />
            
            {/* Tamil Nadu */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '25%', top: '80%', width: '12%', height: '12%' }}
              onClick={() => handleStateSelection('tamilNadu')}
              title="Tamil Nadu"
            />
            
            {/* Kerala */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '20%', top: '85%', width: '8%', height: '12%' }}
              onClick={() => handleStateSelection('kerala')}
              title="Kerala"
            />
            
            {/* Andhra Pradesh */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '28%', top: '65%', width: '12%', height: '18%' }}
              onClick={() => handleStateSelection('andhraPradesh')}
              title="Andhra Pradesh"
            />
            
            {/* Uttar Pradesh */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '25%', top: '30%', width: '18%', height: '15%' }}
              onClick={() => handleStateSelection('uttarPradesh')}
              title="Uttar Pradesh"
            />
            
            {/* Madhya Pradesh */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '22%', top: '45%', width: '15%', height: '12%' }}
              onClick={() => handleStateSelection('madhyaPradesh')}
              title="Madhya Pradesh"
            />
            
            {/* West Bengal */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '50%', top: '45%', width: '10%', height: '15%' }}
              onClick={() => handleStateSelection('westBengal')}
              title="West Bengal"
            />
            
            {/* Bihar */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '45%', top: '38%', width: '12%', height: '10%' }}
              onClick={() => handleStateSelection('bihar')}
              title="Bihar"
            />
            
            {/* Odisha */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '47%', top: '55%', width: '10%', height: '12%' }}
              onClick={() => handleStateSelection('odisha')}
              title="Odisha"
            />
            
            {/* Punjab */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '22%', top: '15%', width: '8%', height: '12%' }}
              onClick={() => handleStateSelection('punjab')}
              title="Punjab"
            />
            
            {/* Haryana */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '25%', top: '20%', width: '8%', height: '8%' }}
              onClick={() => handleStateSelection('haryana')}
              title="Haryana"
            />
            
            {/* Jammu and Kashmir */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '18%', top: '5%', width: '15%', height: '15%' }}
              onClick={() => handleStateSelection('jammuKashmir')}
              title="Jammu and Kashmir"
            />
            
            {/* Himachal Pradesh */}
            <div 
              className="absolute cursor-pointer hover:bg-orange-200 hover:opacity-30 transition-all duration-200"
              style={{ left: '27%', top: '10%', width: '8%', height: '10%' }}
              onClick={() => handleStateSelection('himachalPradesh')}
              title="Himachal Pradesh"
            />
          </div>
        </div>
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

      {/* Quick State Selector for Testing */}
      <div className="text-center mt-8">
        <h3 className="text-lg font-bold mb-4 text-orange-700">Quick State Selection</h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {Object.entries(indiaStatesData).map(([key, state]) => (
            <button
              key={key}
              onClick={() => handleStateSelection(key)}
              className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg transition-colors text-sm"
            >
              {state.name}
            </button>
          ))}
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
