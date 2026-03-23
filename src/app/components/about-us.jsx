import { ImageWithFallback } from './figma/ImageWithFallback';
import dsdReceptionImage from '../../assets/dsd image for about section.jpg';

export function AboutUs() {
  return (
    <section id="about" className="py-12 md:py-16 bg-[#F5F5F5]">
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
                DSD Gaming is a premium esports lounge built by gamers for gamers, where high-performance technology meets an immersive, cinematic environment. We exist to redefine what a gaming cafe can be and deliver an elite experience for players who expect nothing but the best.
              </p>

              <p>
                At the core of DSD Gaming is our commitment to cutting-edge performance. We feature powerful custom-built systems equipped with Ryzen 7 9800X3D processors and RTX 4070 Super graphics, engineered exclusively for competitive gaming and peak performance.
              </p>

              <p>
                DSD Gaming is a hub for ambition, talent, and the future of esports. Our mission is to nurture and empower the next generation of professional gamers, giving players in India a platform to train, compete, and rise to national and international prominence. This is where passion meets performance and where champions are made.
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
                <h5 className="font-bold text-[#0B0B0F] mb-2">1. Professional-Grade Gaming Hardware</h5>
                <p>
                  Experience gaming at its absolute peak with over 50 high-performance stations powered by RTX 40-series GPUs. Each setup features ultra-high refresh rate BenQ monitors (360Hz & 400Hz), precision mechanical keyboards, and pro-grade peripherals from Razer, Logitech G, and Cybeart chairs. Every detail is optimized to deliver a competitive edge.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">2. Daily Tournaments & Competitive Rewards</h5>
                <p>
                  Step into a dynamic competitive ecosystem with our daily tournaments and challenges, featured on the DSD Bounty Board. Compete across top titles like League of Legends, Valorant, CS2, and Dota 2 to complete quests, climb the ranks, and earn rewards.
                </p>
                <p className="mt-2">
                  HP Points can be redeemed for gaming hours, in-house cafe items, and more. DSD Coins unlock exclusive gaming peripherals and premium gear.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">3. Premium Gaming Environment</h5>
                <p>
                  Immerse yourself in a dark, cinematic setting designed for focus and performance. With high-speed fiber internet, climate-controlled zones, and acoustically optimized interiors, every element is engineered to elevate your gameplay experience.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#0B0B0F] mb-2">4. Events & Community</h5>
                <p>
                  DSD Gaming is more than a gaming lounge—it’s a thriving esports community hub. From intensive bootcamps and corporate team-building sessions to birthday celebrations and live viewing parties, we create high-energy experiences that bring gamers together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}