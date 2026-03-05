import { useNavigate } from 'react-router';
import foxCharacter from '../../assets/fox charcter left to dsd logo.png';
import bootcampImage from '../../assets/Bootcamp.png';
import birthdayImage from '../../assets/bday.png';
import schoolImage from '../../assets/school.png';
import spaceRentalImage from '../../assets/space rental.png';
import streamingImage from '../../assets/streaming.png';
import boardGamesImage from '../../assets/boardgames.png';

export function Offers() {
  const navigate = useNavigate();

  const occasions = [
    {
      id: 1,
      title: 'BOOTCAMP',
      path: '/bootcamp',
      illustration: (
        <img 
          src={bootcampImage} 
          alt="Bootcamp" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.1) contrast(1.1)' }}
        />
      ),
    },
    {
      id: 2,
      title: 'BIRTHDAY',
      path: '/birthday',
      illustration: (
        <img 
          src={birthdayImage} 
          alt="Birthday" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.05) contrast(1.05)' }}
        />
      ),
    },
    {
      id: 3,
      title: 'FOR SCHOOLS',
      path: '/schools',
      illustration: (
        <img 
          src={schoolImage} 
          alt="For Schools" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.0) contrast(1.05)' }}
        />
      ),
    },
    {
      id: 4,
      title: 'SPACE RENTAL',
      path: '/space-rental',
      illustration: (
        <img 
          src={spaceRentalImage} 
          alt="Space Rental" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.0) contrast(1.05)' }}
        />
      ),
    },
    {
      id: 5,
      title: 'STREAMING',
      path: '/streaming',
      illustration: (
        <img 
          src={streamingImage} 
          alt="Streaming" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.05) contrast(1.05)' }}
        />
      ),
    },
    {
      id: 6,
      title: 'BOARD GAMES',
      path: '/board-games',
      illustration: (
        <img 
          src={boardGamesImage} 
          alt="Board Games" 
          className="w-full max-w-[360px] h-auto object-contain sm:w-[252px] sm:h-[198px]"
          style={{ filter: 'brightness(1.05) contrast(1.05)' }}
        />
      ),
    },
  ];

  return (
    <section id="offers" className="py-12 md:py-16 bg-white">
      <div className="max-w-[2016px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 md:mb-10 text-[#0B0B0F]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
        >
          A GAME FOR EVERY OCCASION
        </h2>

        {/* Grid of Occasions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-[1434px] mx-auto">
          {occasions.map((occasion) => (
            <div
              key={occasion.id}
              onClick={() => navigate(occasion.path)}
              className="flex flex-col items-center justify-center p-6 sm:p-5 md:p-6 rounded-2xl transition-all duration-300 hover:bg-[#FFD700] hover:shadow-lg group cursor-pointer"
            >
              {/* Illustration */}
              <div className="mb-4">{occasion.illustration}</div>

              {/* Title */}
              <h3
                className="text-lg sm:text-sm md:text-base text-center text-[#0B0B0F] leading-tight"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                {occasion.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}