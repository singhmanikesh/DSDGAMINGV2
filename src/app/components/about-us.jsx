import { ImageWithFallback } from './figma/ImageWithFallback';
import dsdReceptionImage from '../../assets/dsd image for about section.jpg';

export function AboutUs() {
  return (
    <section id="about" className="py-12 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* OUR STATS Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B0B0F] mb-4 md:mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            OUR STATS
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed text-[#333333] max-w-4xl mx-auto px-2"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            We invite you to visit DSD Gaming and experience esports at the highest level! Whether you're a competitive
            gamer, an esports enthusiast, or simply looking for a premium gaming environment, we're waiting for you. Take the first step and join our
            community where we share the best gaming moments together!
          </p>
        </div>

        {/* Two Images Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="w-full">
            <img
              src={dsdReceptionImage}
              alt="DSD Gaming Reception"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-lg"
            />
          </div>
          <div className="w-full">
            <ImageWithFallback
              src="https://lh3.googleusercontent.com/p/AF1QipNQtEbx7yi6Sw5Wa0FeVODwX7bnMNZCH7rM2nhD=s680-w680-h510-rw"
              alt="Gaming Setup"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Who are we? */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold text-[#0B0B0F] mb-3 md:mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              Who are we?
            </h3>
            
            <div
              className="text-sm sm:text-base leading-relaxed text-[#333333] space-y-3 md:space-y-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              <p>
                Welcome to DSD Gaming – a premium esports lounge that combines a passion for competitive gaming with cutting-edge technology and a cinematic atmosphere. We're a place created by gamers for gamers, designed for those who demand the absolute best gaming experience.
              </p>
              
              <p>
                Whether you're training for championships, competing in daily tournaments, or enjoying casual play with friends, DSD Gaming provides the professional infrastructure and competitive environment you need. Our mission is to deliver world-class gaming experiences and build a community united by a passion for esports excellence.
              </p>

              <p>
                Join a community where skill meets opportunity, where every match matters, and where gaming reaches its full competitive potential.
              </p>
            </div>
          </div>

          {/* Right Column - What do we offer? */}
          <div>
            <h3
              className="text-lg sm:text-xl font-bold text-[#0B0B0F] mb-3 md:mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              What do we offer?
            </h3>

            <div
              className="text-sm sm:text-base leading-relaxed text-[#333333] space-y-3 md:space-y-4"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">1. Professional Gaming Hardware:</h5>
                <p>
                  Experience gaming at its peak with over 50 high-end gaming stations featuring RTX 40-series GPUs, 240Hz high-refresh monitors, mechanical keyboards, and pro-grade peripherals from Razer, Logitech G, and SteelSeries. Every station is optimized for competitive performance.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">2. Daily Tournaments & Competitions:</h5>
                <p>
                  Compete in daily tournaments across League of Legends, Valorant, CS2, Dota 2, and more. Our competitive infrastructure includes prize pools, ranking systems, live streaming setups, and pathways to professional esports careers.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">3. Premium Gaming Environment:</h5>
                <p>
                  Immerse yourself in our dark, cinematic atmosphere designed for focus and performance. High-speed fiber internet, climate-controlled gaming zones, and acoustic optimization ensure you play at your best.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">4. Events & Community:</h5>
                <p>
                  DSD Gaming isn't just a gaming cafe – it's a hub for the esports community. From bootcamps and corporate team-building to birthday parties and viewing parties, we create unforgettable competitive gaming experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}