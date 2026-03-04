import { X } from 'lucide-react';
import { useState } from 'react';

export function FilterModal({ isOpen, onClose }) {
  const [selectedFilters, setSelectedFilters] = useState({
    gameMode: [],
    joinable: 'all',
    status: [],
    format: [],
    prize: [],
    region: 'all',
    country: 'all',
  });

  const toggleFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const current = prev[category];
      if (Array.isArray(current)) {
        return {
          ...prev,
          [category]: current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value],
        };
      }
      return { ...prev, [category]: value };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      gameMode: [],
      joinable: 'all',
      status: [],
      format: [],
      prize: [],
      region: 'all',
      country: 'all',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-[#1a1a1f] rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 
            className="text-xl text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Game Mode */}
          <div>
            <h3 
              className="text-sm text-gray-400 mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Game mode
            </h3>
            <div className="flex flex-wrap gap-2">
              {['1v1 Aim', '2v2', '5v5', 'Hostage', 'Wingman'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => toggleFilter('gameMode', mode)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.gameMode.includes(mode)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Joinable */}
          <div>
            <h3 
              className="text-sm text-gray-400 mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Joinable
            </h3>
            <div className="flex gap-2">
              {['All', 'Joinable only'].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter('joinable', option.toLowerCase())}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.joinable === option.toLowerCase()
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 
              className="text-sm text-gray-400 mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Upcoming', 'Ongoing', 'Finished'].map((status) => (
                <button
                  key={status}
                  onClick={() => toggleFilter('status', status)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.status.includes(status)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <h3 
              className="text-sm text-gray-400 mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Format
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Single Elimination', 'Double elimination', 'Round Robin', 'Swiss System', 'FFA'].map((format) => (
                <button
                  key={format}
                  onClick={() => toggleFilter('format', format)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.format.includes(format)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Prize */}
          <div>
            <h3 
              className="text-sm text-gray-400 mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Prize
            </h3>
            <div className="flex gap-2">
              {['FACEIT Points', 'Swag/Coupons', 'Custom'].map((prize) => (
                <button
                  key={prize}
                  onClick={() => toggleFilter('prize', prize)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.prize.includes(prize)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {prize}
                </button>
              ))}
            </div>
          </div>

          {/* Region & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 
                className="text-sm text-gray-400 mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Region
              </h3>
              <select
                value={selectedFilters.region}
                onChange={(e) => toggleFilter('region', e.target.value)}
                className="w-full bg-[#2a2a2f] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#FF4D00] focus:outline-none"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                <option value="all">All regions</option>
                <option value="eu">Europe</option>
                <option value="na">North America</option>
                <option value="asia">Asia</option>
              </select>
            </div>
            
            <div>
              <h3 
                className="text-sm text-gray-400 mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Country
              </h3>
              <select
                value={selectedFilters.country}
                onChange={(e) => toggleFilter('country', e.target.value)}
                className="w-full bg-[#2a2a2f] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#FF4D00] focus:outline-none"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                <option value="all">All countries</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-800">
          <button
            onClick={resetFilters}
            className="text-gray-400 hover:text-white text-sm transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            RESET FILTERS
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FF4D00] text-white rounded-lg text-sm uppercase tracking-wide hover:bg-[#FF6A00] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
}
