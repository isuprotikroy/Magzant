import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`px-3 py-2 text-sm font-medium ${
              location.pathname === item.href
                ? 'text-primary-400'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-primary-400/20 to-accent-400/20 hover:from-primary-400/30 hover:to-accent-400/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative">
            <span
              className={`absolute h-0.5 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? 'w-6 rotate-45 top-2' : 'w-6 top-0'
              }`}
            />
            <span
              className={`absolute h-0.5 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? 'w-0 opacity-0 left-3' : 'w-4 top-2 right-0'
              }`}
            />
            <span
              className={`absolute h-0.5 bg-white rounded-full transform transition-all duration-300 ease-in-out ${
                isOpen ? 'w-6 -rotate-45 top-2' : 'w-6 top-4'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 right-0 w-64 bg-dark-900/95 backdrop-blur-md border border-gray-800/50 rounded-2xl shadow-xl overflow-hidden mx-4"
          >
            <motion.div 
              className="py-2"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 }
                      }
                    },
                    closed: {
                      y: 50,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 }
                      }
                    }
                  }}
                >
                  <Link
                    to={item.href}
                    className={`block px-6 py-3 text-base font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'text-white bg-gradient-to-r from-primary-400/20 to-accent-400/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center space-x-3">
                      <span className="text-sm text-primary-400/60"></span>
                      <span>{item.name}</span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
