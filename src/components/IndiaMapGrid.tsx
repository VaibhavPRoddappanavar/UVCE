import React, { useState } from 'react';
import { indiaStatesData } from '../data/indiaStatesData';
import './IndiaMap.css';

const IndiaMapGrid: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  const closeModal = () => {
    setSelectedState(null);
  };

  // Handle state selection
  const handleStateSelection = (stateName: string) => {
    setSelectedState(stateName);
  };

  // All states arranged in a clean grid
  const statesGrid = [
    ['jammu-kashmir', 'ladakh', 'himachal-pradesh', 'punjab', 'haryana', 'delhi'],
    ['uttarakhand', 'uttar-pradesh', 'bihar', 'west-bengal', 'sikkim', 'arunachal-pradesh'],
    ['rajasthan', 'madhya-pradesh', 'jharkhand', 'odisha', 'assam', 'nagaland'],
    ['gujarat', 'chhattisgarh', 'telangana', 'andhra-pradesh', 'manipur', 'mizoram'],
    ['maharashtra', 'karnataka', 'tamil-nadu', 'kerala', 'meghalaya', 'tripura'],
    ['goa', '', '', '', '', '']
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold header-indian mb-4">🇮🇳 Explore India's Rich Heritage 🎨</h2>
        <p className="text-lg text-stone-700">Click on any state to discover its unique art forms and cultural traditions</p>
      </div>

      {/* States Grid Layout */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-6 gap-4 max-w-4xl mx-auto">
          {statesGrid.map((row, rowIndex) => 
            row.map((stateKey, colIndex) => {
              if (!stateKey) {
                return <div key={`${rowIndex}-${colIndex}`} className="aspect-square"></div>;
              }
              
              const stateData = indiaStatesData[stateKey as keyof typeof indiaStatesData];
              if (!stateData) {
                return <div key={`${rowIndex}-${colIndex}`} className="aspect-square"></div>;
              }

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className="aspect-square bg-gradient-to-br from-amber-200 to-orange-300 hover:from-amber-300 hover:to-orange-400 border border-amber-400 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 flex flex-col items-center justify-center p-2 text-stone-800 font-semibold text-xs text-center"
                  onClick={() => handleStateSelection(stateKey)}
                  style={{
                    background: 'linear-gradient(135deg, #e1ad01 0%, #ff9933 100%)',
                    border: '2px solid #800000',
                    color: '#3a2c1a'
                  }}
                >
                  <div className="text-sm mb-1"></div>
                  <div className="text-[10px] leading-tight font-bold text-stone-900">
                    {stateData.name}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Modal for showing state details */}
      {selectedState && selectedStateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-amber-400">
            <div className="p-6" style={{background: 'linear-gradient(135deg, #fff8f0 0%, #fef3e2 100%)'}}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold header-indian">{selectedStateData.name}</h2>
                <button 
                  onClick={closeModal}
                  className="text-stone-700 hover:text-red-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="mb-6">
                <p className="text-stone-700 text-lg leading-relaxed mb-4">
                  {selectedStateData.story}
                </p>
                <p className="text-sm text-stone-600">
                  <strong>Capital:</strong> {selectedStateData.capital}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4" style={{color: '#800000'}}>Traditional Art Forms</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedStateData.artforms.map((artform, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 hover:bg-yellow-50 transition-colors border-2 border-amber-200 hover:border-amber-400">
                      <img 
                        src={artform.image} 
                        alt={artform.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold mb-2" style={{color: '#800000'}}>{artform.name}</h4>
                      <p className="text-sm text-stone-700">{artform.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <button 
                  onClick={closeModal}
                  className="btn-indian px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMapGrid;
