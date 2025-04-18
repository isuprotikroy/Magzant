import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('portfolioItems')) || [
      {
        id: 1,
        title: 'Corporate Brand Story',
        category: 'editing',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        description: 'A cinematic corporate video showcasing company culture and values through dynamic storytelling.',
        client: 'TechCorp Inc.',
        year: '2024',
        tags: ['Motion Graphics', 'Color Grading', 'Sound Design']
      },
      {
        id: 2,
        title: 'Product Launch Video',
        category: 'editing',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        description: 'High-energy product launch video with stunning visuals and seamless transitions.',
        client: 'Fashion Brand X',
        year: '2024',
        tags: ['3D Animation', 'Visual Effects', 'Product Showcase']
      },
      {
        id: 3,
        title: 'Brand Identity Design',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        description: 'Complete brand identity design including logo, typography, and brand guidelines.',
        client: 'Startup Y',
        year: '2024',
        tags: ['Logo Design', 'Typography', 'Brand Guidelines']
      },
      {
        id: 4,
        title: 'Social Media Campaign',
        category: 'design',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        description: 'Eye-catching social media campaign designs with consistent branding.',
        client: 'Fashion Brand Z',
        year: '2024',
        tags: ['Social Media', 'Digital Design', 'Campaign']
      }
    ];
    setItems(storedItems);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Our Creative <span className="text-yellow-500">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Showcasing our passion for visual storytelling and design excellence
          </motion.p>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-dark-800 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500 text-dark-900"
                    >
                      <FiPlay className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs bg-yellow-500/10 text-yellow-500 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-xl overflow-hidden max-w-4xl w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-dark-900/50 text-white hover:bg-dark-900 transition-colors"
              >
                <FiX />
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span>Client: {selectedItem.client}</span>
                  <span>Year: {selectedItem.year}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-yellow-500/10 text-yellow-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
