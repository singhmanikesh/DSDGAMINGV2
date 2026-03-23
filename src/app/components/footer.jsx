import { MessageCircle, Instagram, Twitch, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-black py-12 md:py-16 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-[#FF4D00] blur-[100px] opacity-20"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Join the Community */}
        <div className="text-center mb-8 md:mb-12">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
          >
            Join the <span className="text-[#FF4D00]">Community</span>
          </h3>

          {/* Social Icons */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 mb-8 md:mb-12">
            {/* <a
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141419] border border-[#26262B] flex items-center justify-center hover:border-[#FF4D00] hover:bg-[#FF4D00]/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 group"
              aria-label="Discord"
            >
              <MessageCircle size={20} className="sm:w-6 sm:h-6 text-[#A0A0A0] group-hover:text-[#FF4D00] transition-colors" />
            </a> */}

            <a
              href="https://www.instagram.com/dsd.premiumgaming/"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141419] border border-[#26262B] flex items-center justify-center hover:border-[#FF4D00] hover:bg-[#FF4D00]/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 group"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={20}
                className="sm:w-6 sm:h-6 text-[#A0A0A0] group-hover:text-[#FF4D00] transition-colors"
              />
            </a>
            <a
              href="https://wa.me/919538585761" // replace with your number
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141419] border border-[#26262B] flex items-center justify-center hover:border-[#25D366] hover:bg-[#25D366]/20 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all duration-300 group"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-[#A0A0A0] group-hover:text-[#25D366] w-5 h-5 sm:w-6 sm:h-6 transition-colors" />
            </a>
            {/* <a
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141419] border border-[#26262B] flex items-center justify-center hover:border-[#FF4D00] hover:bg-[#FF4D00]/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 group"
              aria-label="Twitch"
            >
              <Twitch size={20} className="sm:w-6 sm:h-6 text-[#A0A0A0] group-hover:text-[#FF4D00] transition-colors" />
            </a> */}

            {/* <a
              href="#"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#141419] border border-[#26262B] flex items-center justify-center hover:border-[#FF4D00] hover:bg-[#FF4D00]/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 group"
              aria-label="YouTube"
            >
              <Youtube size={20} className="sm:w-6 sm:h-6 text-[#A0A0A0] group-hover:text-[#FF4D00] transition-colors" />
            </a> */}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#26262B] to-transparent mb-6 md:mb-8"></div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#A0A0A0]"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
          >
            <a href="#" className="hover:text-[#FF4D00] transition-colors">
              Privacy Policy
            </a>
            <span className="text-[#26262B]">|</span>
            <a href="#" className="hover:text-[#FF4D00] transition-colors">
              Terms of Service
            </a>
          </div>

          <div
            className="text-xs sm:text-sm text-[#A0A0A0] text-center"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
          >
            © 2026 <span className="text-white font-semibold">DSD Gaming</span>.
            All rights reserved.
          </div>
        </div>

        {/* Logo at bottom */}
        <div className="text-center mt-6 md:mt-8">
          <h2
            className="text-lg sm:text-xl font-bold tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
          >
            <span className="text-white">DSD</span>
            <span className="text-[#FF4D00]"> Gaming</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
