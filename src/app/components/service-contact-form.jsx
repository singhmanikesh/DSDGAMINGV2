import { useState } from 'react';

export function ServiceContactForm({ serviceName, pricing = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    topic: '',
    message: '',
    consent: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, service: serviceName });
    // Here you would typically send the data to a backend
    alert(`Thank you for your interest in ${serviceName}! We'll get back to you soon.`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
      <div className="mb-6">
        <h3 
          className="text-2xl md:text-3xl text-[#0B0B0F] mb-2"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
        >
          Everybody Plays
        </h3>
        <p 
          className="text-base md:text-lg text-[#0B0B0F]"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
        >
          Experience gaming at the highest level
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name and Surname */}
        <div>
          <label 
            className="block text-xs md:text-sm text-[#0B0B0F] mb-2 uppercase tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Your Name and Surname
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4D00] focus:outline-none transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
        </div>

        {/* Email */}
        <div>
          <label 
            className="block text-xs md:text-sm text-[#0B0B0F] mb-2 uppercase tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Your Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4D00] focus:outline-none transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
        </div>

        {/* Topic */}
        <div>
          <label 
            className="block text-xs md:text-sm text-[#0B0B0F] mb-2 uppercase tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Topic
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4D00] focus:outline-none transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
        </div>

        {/* Message */}
        <div>
          <label 
            className="block text-xs md:text-sm text-[#0B0B0F] mb-2 uppercase tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Your Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4D00] focus:outline-none transition-colors resize-none"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          />
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            className="mt-1 w-5 h-5 accent-[#FF4D00]"
          />
          <label 
            htmlFor="consent" 
            className="text-xs text-gray-600"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            I consent to the processing of my personal data by the site operator DSD Gaming Cafe in accordance with the Act. I declare that I provide my personal data voluntarily and that it is true. I understand that I can withdraw my consent at any time.
          </label>
        </div>

        {/* Social Media Preference */}
        <div>
          <p 
            className="text-xs md:text-sm text-[#0B0B0F] mb-3 uppercase tracking-wide"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Please prove you are human by selecting the heart:
          </p>
          <div className="flex gap-4">
            <button type="button" className="text-2xl hover:scale-110 transition-transform">❤️</button>
            <button type="button" className="text-2xl hover:scale-110 transition-transform">👍</button>
            <button type="button" className="text-2xl hover:scale-110 transition-transform">📧</button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.consent}
          className="w-full py-4 bg-[#FF4D00] text-white rounded-full font-bold text-lg hover:bg-[#FF6A00] hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
        >
          SEND
        </button>
      </form>
    </div>
  );
}
