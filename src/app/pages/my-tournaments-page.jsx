import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { TournamentNavbar } from '../components/tournament-navbar';

export function MyTournamentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <TournamentNavbar />
      
      <div className="pt-24 max-w-[1440px] mx-auto px-8">
        {/* Page Header */}
        <div className="py-12">
          <h1 
            className="text-4xl text-white mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            Tournaments
          </h1>
          <p 
            className="text-gray-400 text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            Discover tournaments via FACEIT
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-800 mb-8">
          <Link
            to="/tournaments"
            className="pb-4 text-gray-400 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Browse
          </Link>
          <button
            className="pb-4 text-[#FF4D00] text-sm uppercase tracking-wide border-b-2 border-[#FF4D00]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            My Tournaments
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors duration-200 ${
              activeTab === 'upcoming'
                ? 'text-[#FF4D00]'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {activeTab === 'upcoming' ? (
                <path 
                  d="M13.5 4L6 11.5L2.5 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <rect 
                  x="2" 
                  y="2" 
                  width="12" 
                  height="12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  rx="2"
                />
              )}
            </svg>
            Upcoming & Ongoing
          </button>
          
          <button
            onClick={() => setActiveTab('finished')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors duration-200 ${
              activeTab === 'finished'
                ? 'text-[#FF4D00]'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {activeTab === 'finished' ? (
                <path 
                  d="M13.5 4L6 11.5L2.5 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <rect 
                  x="2" 
                  y="2" 
                  width="12" 
                  height="12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  rx="2"
                />
              )}
            </svg>
            Finished
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-32">
          <h2 
            className="text-2xl text-white mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            You have not joined any tournaments yet
          </h2>
          <p 
            className="text-gray-400 text-sm mb-8"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            When you join tournaments will be shown here
          </p>
          <button
            onClick={() => navigate('/tournaments')}
            className="px-8 py-3 bg-gray-700 text-white rounded text-sm uppercase tracking-wide hover:bg-gray-600 transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Find Tournaments
          </button>
        </div>
      </div>
    </div>
  );
}