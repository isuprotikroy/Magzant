import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/An-artistic-rendering-of-a-dark-galaxy-4K-wallpaper-with-swirling-patterns-and-faint-stars-evoking-a-sense-of-cosmic-wonder-and-depth.jpg', // Dark tech
  '/desert-doom-sand-dunes-dark-background-monochrome-landscape-3440x1440-6409.jpg', // Dark abstract
  '/pexels-eberhardgross-2098428.jpg',    // Dark geometric
];

const HeroBackground = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black">      
      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 0.7, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 2, ease: [0.45, 0, 0.55, 1] }}
            className="absolute inset-0"
          >
            <div className="h-full md:rounded-b-[60px] overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.15 }}
                transition={{ 
                  duration: 5,
                  ease: "easeOut",
                  times: [0, 1]
                }}
                className="w-full h-full"
              >
                <img
                  src={images[current]}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroBackground;
