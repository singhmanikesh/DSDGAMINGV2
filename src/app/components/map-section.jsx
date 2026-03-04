export function MapSection() {
  return (
    <section id="map" className="w-full bg-white">
      {/* Map Container - Full Width */}
      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.147429853065!2d77.5943411!3d12.9624164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15003b0b83f9%3A0xec049528bab1c2e5!2sDSD%20PREMIUM%20GAMING!5e0!3m2!1sen!2sin!4v1772367014958!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="DSD Premium Gaming Location"
          className="h-[300px] sm:h-[350px] md:h-[450px]"
        ></iframe>
      </div>
    </section>
  );
}