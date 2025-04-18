import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AIBlogService from '../services/AIBlogService';
import { FiClock, FiUser, FiGlobe, FiSearch, FiX, FiExternalLink } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    try {
      const blogPosts = AIBlogService.getBlogPosts();
      setPosts(blogPosts);
      setError(null);
    } catch (err) {
      console.error('Error loading posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const searchContent = `${post.title} ${post.description} ${post.content}`.toLowerCase();
    return searchContent.includes(searchQuery.toLowerCase());
  });

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 py-8">
            <FiAlertCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                loadPosts();
              }}
              className="px-6 py-2 bg-yellow-500 text-dark-900 rounded-full hover:bg-yellow-400"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Marketing <span className="text-yellow-500">Insights</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Latest insights from top digital marketing experts
          </motion.p>

          {/* Search Control */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400"
              />
            </div>
          </motion.div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800 rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/default-blog-image.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-yellow-500 text-sm mb-3">
                    <FiGlobe className="w-4 h-4" />
                    <span>{post.source}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{post.published}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <div className="prose prose-sm prose-invert line-clamp-3">
                    {post.description}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    {selectedPost.published}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    {selectedPost.author}
                  </div>
                  {selectedPost.source && (
                    <div className="flex items-center gap-2">
                      <FiGlobe className="w-4 h-4" />
                      {selectedPost.source}
                    </div>
                  )}
                </div>
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
