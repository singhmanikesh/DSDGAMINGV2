import { useState } from 'react';
import { toast } from 'sonner';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { FloatingBar } from '../components/floating-bar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bootcampImage from '../../assets/Bootcamp.png';
import { submitContactForm } from '../utils/contact-api';

export function BootcampPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });

  const carouselImages = [
    'https://images.unsplash.com/photo-1614738499301-d2eed34f7b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudCUyMHRlYW0lMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzI0MzAyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1759701547036-bf7d7b05cc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwc2V0dXAlMjBjb21wZXRpdGlvbnxlbnwxfHx8fDE3NzI0MzAyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758410473735-c76baff30a79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjYWZlJTIwcGVvcGxlJTIwcGxheWluZ3xlbnwxfHx8fDE3NzI0MzAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.error('Please consent to the processing of personal data');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        topic: formData.topic || 'Bootcamp',
        message: formData.message || '',
        consent: formData.consent,
      });

      toast.success(response?.message || 'Contact form submitted successfully');
      setFormData({ name: '', email: '', topic: '', message: '', consent: false });
    } catch (error) {
      console.error('Bootcamp contact form failed:', error);
      toast.error('There was a problem submitting the form. Please try again.');
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Image Carousel */}
      <section className="pt-24 md:pt-28 pb-8 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4">
          <Slider {...sliderSettings}>
            {carouselImages.map((img, index) => (
              <div key={index} className="px-2">
                <div className="w-full h-[200px] md:h-[250px] overflow-hidden">
                  <img 
                    src={img} 
                    alt={`Gaming ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Content */}
            <div>
              <h1
                className="text-4xl md:text-5xl text-[#0B0B0F] mb-8 uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
              >
                BOOTCAMP
              </h1>

              {/* Character Doodle */}
              <div className="mb-8">
                <img 
                  src={bootcampImage} 
                  alt="Bootcamp Character" 
                  className="w-full max-w-[200px] h-auto object-contain"
                />
              </div>

              {/* Description */}
              <div className="space-y-4 text-sm text-gray-700 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  Looking for a space where teamwork, focus, and performance come together? Our bootcamp is designed for players who want to train, compete, and grow in a comfortable yet high-performance environment.
                </p>
                <p>
                  At DSD Gaming, you get access to the latest technology, professional-grade gaming stations, and a setup built for seamless team coordination. Whether you're grinding ranked, preparing for tournaments, or just playing with your squad, our space is engineered for uninterrupted, high-level gameplay.
                </p>
                <p>
                  What sets us apart is the balance between intensity and comfort. When it's time to reset, step into our in-house cafe—unwind, refuel with great food, and strategize your next move with your team.
                </p>
                <p>
                  Train harder. Play smarter. Win together.
                </p>
              </div>

              {/* Pricing Boxes */}
              <div className="space-y-4 mb-8">
                <div className="bg-[#FF4D00] text-white p-6">
                  <h3 
                    className="text-lg uppercase mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    🎮 Bounty Bootcamp – Esports Lounge
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <li><span className="font-semibold">Day Bootcamp</span> — Duration: 8 Hours</li>
                    <li className="pl-4">• 1 Starter of choice</li>
                    <li className="pl-4">• 1 Soda of choice</li>
                    <li className="pl-4">• Noodles</li>
                    <li>Price: ₹800</li>
                    <li className="pt-2"><span className="font-semibold">LAN Bootcamp</span> — Offer: Come as 5, pay for 4</li>
                    <li className="pl-4">• Rate: ₹130 per person per hour</li>
                    <li className="pt-2"><span className="font-semibold">Offers</span></li>
                    <li className="pl-4">• More than 2 hours: Get 1 starter free for each person</li>
                    <li className="pl-4">• More than 5 hours: Get 1 starter of choice + 1 soda of choice for each person</li>
                  </ul>
                </div>

                <div className="bg-[#FF4D00] text-white p-6">
                  <h3 
                    className="text-lg uppercase mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    ❄️ Chill Lounge
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    <li><span className="font-semibold">Day Chillz</span> — Duration: 8 Hours PC</li>
                    <li className="pl-4">• 1 Starter of choice</li>
                    <li>Price: ₹640</li>
                    <li className="pt-2"><span className="font-semibold">LAN Chill</span> — Offer: Come as 5, pay for 4</li>
                    <li className="pl-4">• Rate: ₹100 per person per hour</li>
                    <li className="pt-2"><span className="font-semibold">Offers</span></li>
                    <li className="pl-4">• More than 2 hours: Get 1 soda of choice for each person</li>
                    <li className="pl-4">• More than 5 hours: Get 1 starter of choice + 1 soda of choice for each person</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our space is designed to provide players with complete comfort and freedom. Whether you're playing for the trophy, training for the next match, testing new strategies, or simply relaxing with a delicious meal, you'll create countless gaming memories in our gaming lounge!
              </p>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2
                className="text-xl uppercase tracking-wide text-[#0B0B0F] mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Experience gaming at the highest level
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] uppercase tracking-wide text-[#0B0B0F] mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    YOUR NAME AND SURNAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white focus:border-[#FF4D00] focus:outline-none transition-all text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-wide text-[#0B0B0F] mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    YOUR EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white focus:border-[#FF4D00] focus:outline-none transition-all text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="topic"
                    className="block text-[10px] uppercase tracking-wide text-[#0B0B0F] mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    TOPIC
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white focus:border-[#FF4D00] focus:outline-none transition-all text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[10px] uppercase tracking-wide text-[#0B0B0F] mb-2"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    YOUR MESSAGE (OPTIONAL)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2.5 border border-gray-200 bg-white focus:border-[#FF4D00] focus:outline-none transition-all resize-none text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className="mt-0.5 w-3.5 h-3.5 border-2 border-gray-300 rounded focus:ring-[#FF4D00] text-[#FF4D00]"
                    />
                    <label
                      htmlFor="consent"
                      className="text-[10px] text-gray-600 leading-relaxed"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      I CONSENT TO THE PROCESSING OF PERSONAL DATA
                    </label>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-relaxed pl-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    I consent to the processing of my personal data by the data controller{' '}
                    <span className="font-semibold">DSD GAMING</span> for the purpose of responding to 
                    my inquiry. I acknowledge that I provide my personal data voluntarily and that it is 
                    truthful.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={!formData.consent || isSubmitting}
                    className={`px-8 py-2 border-2 border-[#FF4D00] text-[#FF4D00] rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#FF4D00] hover:text-white'}`}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    {isSubmitting ? 'Sending...' : 'SEND'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingBar />
    </div>
  );
}
