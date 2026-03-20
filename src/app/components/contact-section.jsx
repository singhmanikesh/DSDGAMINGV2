import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import foxDoodle from '../../assets/fox charcter left to dsd logos.png';
import { submitContactForm } from '../utils/contact-api';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.topic.trim() !== '' &&
      formData.consent &&
      !isSubmitting
    );
  }, [formData.consent, formData.email, formData.name, formData.topic, isSubmitting]);
  // just comment

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      toast.error('Please complete required fields and consent.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        topic: formData.topic || 'General Inquiry',
        message: formData.message || '',
        consent: formData.consent,
      });

      toast.success(response?.message || 'Contact form submitted successfully');
      setFormData({ name: '', email: '', topic: '', message: '', consent: false });
    } catch (error) {
      console.error('Contact form failed:', error);
      toast.error('There was a problem submitting the form. Please try again.');
    } finally {
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

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl text-[#0B0B0F] uppercase tracking-tight"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            SHALL WE PLAY?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form - Left Side */}
          <div className="order-2 md:order-1">
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
                  <span className="font-semibold">DSD PREMIUM GAMING</span> for the purpose of responding to 
                  my inquiry. I acknowledge that I provide my personal data voluntarily and that it is 
                  truthful. I also declare that I have read the content of the Information Clause, 
                  including information about the purpose and means of data processing and the right to 
                  access my personal data.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="px-8 py-2 border-2 border-[#FF4D00] text-[#FF4D00] rounded-full text-xs uppercase tracking-wider hover:bg-[#FF4D00] hover:text-white transition-all duration-300"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  {isSubmitting ? 'Sending...' : 'SEND'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info & Doodle - Right Side */}
          <div className="order-1 md:order-2 space-y-6">
            <div className="bg-white p-6 border border-gray-200">
              <h3
                className="text-xs uppercase tracking-wider text-[#0B0B0F] mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                DSD PREMIUM GAMING CAFE
              </h3>
              <div className="space-y-1.5 text-gray-700" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <p className="text-xs">DSD PREMIUM GAMING</p>
                <p className="text-xs">46/3, Kalinga Rao Rd, Sampangi Rama Nagara</p>
                <p className="text-xs">Bengaluru, Karnataka 560027</p>
                <p className="text-xs">Phone: +91 95385 85761</p>
                <p className="text-xs">management@dsdpremiumgaming.com</p>
              </div>
            </div>

            {/* Doodle Character */}
            <div className="flex justify-center items-center">
              <img 
                src={foxDoodle} 
                alt="DSD Gaming Character" 
                className="w-full max-w-[280px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}