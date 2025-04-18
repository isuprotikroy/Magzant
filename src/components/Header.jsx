import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './Navbar';

const Header = () => {
  const { scrollY } = useScroll();

  // Create transforms for background and blur based on scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  );

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur, // For Safari compatibility
        transition: 'background-color 0.3s, backdrop-filter 0.3s'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-4">
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="overflow-hidden relative hidden sm:block"
              whileHover="hover"
            >
              <motion.span
                className="inline-block text-lg tracking-[0.3em] font-light text-white uppercase relative z-10"
                variants={{
                  hover: {
                    y: -20,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
              >
                Magzant
              </motion.span>
              <motion.span
                className="inline-block text-lg tracking-[0.3em] font-light text-accent-400 uppercase absolute top-0 left-0 z-10"
                variants={{
                  hover: {
                    y: 0,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }
                }}
                style={{ y: 20 }}
              >
                Magzant
              </motion.span>
            </motion.div>
          </Link>

          <div className="ml-auto">
            <Navbar />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;