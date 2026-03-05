import { useNavigate } from 'react-router';
import underImg from '../../assets/underconsturction.png';

export function UnderConstructionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-white px-6">
      <div className="max-w-[920px] w-full text-center py-16">
        <img src={underImg} alt="Under Construction" className="mx-auto w-full max-w-[420px] h-auto object-contain" />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-6">Under Construction</h1>
        <p className="text-gray-400 mt-3 mb-6">We're building something awesome — check back soon.</p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-[#FF4D00] hover:bg-[#ff6a00] text-white px-6 py-3 rounded-full font-bold w-full sm:w-auto max-w-xs"
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
}
