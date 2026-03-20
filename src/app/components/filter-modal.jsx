import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const GAME_MODE_OPTIONS = [
  { label: 'AIM_1V1', value: 'AIM_1V1' },
  { label: 'MODE_2V2', value: 'MODE_2V2' },
  { label: 'MODE_5V5', value: 'MODE_5V5' },
];

const STATUS_OPTIONS = [
  { label: 'UPCOMING', value: 'UPCOMING' },
  { label: 'ONGOING', value: 'ONGOING' },
  { label: 'FINISHED', value: 'FINISHED' },
];

const FORMAT_OPTIONS = [
  { label: 'SINGLE_ELIMINATION', value: 'SINGLE_ELIMINATION' },
  { label: 'DOUBLE_ELIMINATION', value: 'DOUBLE_ELIMINATION' },
  { label: 'ROUND_ROBIN', value: 'ROUND_ROBIN' },
  { label: 'SWISS_SYSTEM', value: 'SWISS_SYSTEM' },
  { label: 'FFA', value: 'FFA' },
];

const DEFAULT_FILTERS = {
  gameMode: [],
  joinable: 'all',
  status: [],
  format: [],
};

export function FilterModal({ isOpen, onClose, onApply, initialFilters }) {
  const hydratedInitial = useMemo(
    () => ({ ...DEFAULT_FILTERS, ...(initialFilters || {}) }),
    [initialFilters]
  );

  const [selectedFilters, setSelectedFilters] = useState(hydratedInitial);

  useEffect(() => {
    if (isOpen) {
      setSelectedFilters(hydratedInitial);
    }
  }, [hydratedInitial, isOpen]);

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
    setSelectedFilters({ ...DEFAULT_FILTERS });
  };

  const handleApply = () => {
    onApply?.(selectedFilters);
    onClose?.();
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
              {GAME_MODE_OPTIONS.map((mode) => (
                <button
                  key={mode.value}
                  onClick={() => toggleFilter('gameMode', mode.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.gameMode.includes(mode.value)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {mode.label}
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
              {[
                { label: 'All', value: 'all' },
                { label: 'Joinable only', value: 'joinable' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter('joinable', option.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.joinable === option.value
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {option.label}
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
              {STATUS_OPTIONS.map((status) => (
                <button
                  key={status.value}
                  onClick={() => toggleFilter('status', status.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.status.includes(status.value)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {status.label}
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
              {FORMAT_OPTIONS.map((format) => (
                <button
                  key={format.value}
                  onClick={() => toggleFilter('format', format.value)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    selectedFilters.format.includes(format.value)
                      ? 'bg-[#FF4D00] text-white'
                      : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  {format.label}
                </button>
              ))}
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
            onClick={handleApply}
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
