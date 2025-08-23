import React, { useState, useEffect, useRef } from 'react';
import { indiaStatesData } from '../data/indiaStatesData';
import './IndiaMap.css';

const IndiaMapGrid: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedStateData = selectedState ? indiaStatesData[selectedState as keyof typeof indiaStatesData] : null;

  const closeModal = () => {
    setSelectedState(null);
  };

  // Handle state selection
  const handleStateSelection = (stateName: string) => {
    setSelectedState(stateName);
    setIsDropdownOpen(false);
  };

  // Get all states as an array for the dropdown
  const allStates = Object.entries(indiaStatesData).map(([key, value]) => ({
    key,
    name: value.name
  }));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold header-indian mb-4">🇮🇳 Explore India's Rich Heritage 🎨</h2>
        <p className="text-lg text-stone-700">Select any state to discover its unique art forms and cultural traditions</p>
      </div>

      {/* States Dropdown */}
      <div className="max-w-lg mx-auto px-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            className={`w-full bg-gradient-to-br from-amber-200 to-orange-300 hover:from-amber-300 hover:to-orange-400 border-2 border-amber-400 hover:border-orange-500 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-between p-4 text-stone-800 font-semibold text-lg ${isDropdownOpen ? 'rounded-b-none border-b-0' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              background: isDropdownOpen ? 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' : 'linear-gradient(135deg, #e1ad01 0%, #ff9933 100%)',
              border: '2px solid #800000',
              color: '#3a2c1a'
            }}
          >
            <span className="flex items-center">
              <span className="mr-3 text-2xl">🗺️</span>
              {selectedState 
                ? indiaStatesData[selectedState as keyof typeof indiaStatesData].name
                : 'Choose a State to Explore'
              }
            </span>
            <svg 
              className={`w-6 h-6 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div 
              className="absolute top-full left-0 right-0 bg-white border-2 border-amber-400 border-t-0 rounded-b-lg shadow-xl z-50 max-h-80 overflow-y-auto"
              style={{ borderColor: '#800000' }}
            >
              {allStates.map(({ key, name }) => (
                <button
                  key={key}
                  className={`w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 transition-colors border-b border-amber-200 last:border-b-0 text-stone-800 ${selectedState === key ? 'bg-gradient-to-r from-amber-100 to-orange-200 font-bold' : ''}`}
                  onClick={() => handleStateSelection(key)}
                >
                  <span className="flex items-center">
                    <span className="mr-3 text-lg">🏛️</span>
                    {name}
                  </span>
                </button>
              ))}
            </div>
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
