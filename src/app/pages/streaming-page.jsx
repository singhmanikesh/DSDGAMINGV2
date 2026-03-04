import { useState } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { FloatingBar } from '../components/floating-bar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import streamingImage from '../../assets/streaming.png';

export function StreamingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });

  const carouselImages = [
    'https://images.unsplash.com/photo-1767455471230-c0957aba5034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1759701547036-bf7d7b05cc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
    'https://images.unsplash.com/photo-1614738499301-d2eed34f7b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please consent to the processing of personal data');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', topic: '', message: '', consent: false });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
                    alt={`Streaming ${index + 1}`}
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
                STREAMING
              </h1>

              {/* Character Doodle */}
              <div className="mb-8">
                <img 
                  src={streamingImage} 
                  alt="Streaming Character" 
                  className="w-full max-w-[200px] h-auto object-contain"
                />
              </div>

              {/* Description */}
              <div className="space-y-4 text-sm text-gray-700 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p>
                  If you're looking to <span className="font-semibold">create professional-quality gaming content</span>, our streaming facilities offer everything you need to broadcast your gameplay to the world with studio-grade equipment.
                </p>
                <p>
                  Whether you're an aspiring streamer or established content creator, we provide dedicated streaming booths with professional cameras, lighting, green screens, and powerful encoding PCs. Perfect for live streams, content creation, or tournament broadcasting.
                </p>
              </div>

              {/* Pricing Box */}
              <div className="bg-[#FF4D00] text-white p-6 mb-8">
                <h3 
                  className="text-lg uppercase mb-4"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  STREAMING PACKAGE – PLN 80/hour
                </h3>
                <ul className="space-y-2 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <li>• Professional streaming booth</li>
                  <li>• High-end gaming PC + dedicated encoding PC</li>
                  <li>• Professional webcam (1080p 60fps)</li>
                  <li>• Studio lighting setup</li>
                  <li>• Green screen background</li>
                  <li>• Professional microphone with boom arm</li>
                  <li>• Stream deck for easy control</li>
                  <li>• Pre-configured OBS/Streamlabs setup</li>
                  <li>• Ultra-fast internet (1Gbps upload)</li>
                  <li>• Soundproofed environment</li>
                  <li>• Technical support on-site</li>
                  <li>• Optional: Video editing workstation</li>
                </ul>
              </div>

              <p className="text-sm text-gray-700 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Our streaming facilities are designed for creators who want professional results without the hassle of setting up their own studio. Stream to Twitch, YouTube, or any platform with confidence!
              </p>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <h2
                className="text-xl uppercase tracking-wide text-[#0B0B0F] mb-6"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Start your streaming journey
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
                    my inquiry.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="px-8 py-2 border-2 border-[#FF4D00] text-[#FF4D00] rounded-full text-xs uppercase tracking-wider hover:bg-[#FF4D00] hover:text-white transition-all duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    SEND
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
