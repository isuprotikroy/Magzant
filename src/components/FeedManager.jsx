import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import BlogService from '../services/BlogService';

const FeedManager = ({ onFeedsChange }) => {
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [feeds, setFeeds] = useState(BlogService.getFeeds());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFeed = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await BlogService.addFeed(newFeedUrl);
      if (success) {
        const updatedFeeds = BlogService.getFeeds();
        setFeeds(updatedFeeds);
        setNewFeedUrl('');
        onFeedsChange(updatedFeeds);
      } else {
        setError('Invalid RSS feed URL');
      }
    } catch (error) {
      setError('Error adding feed');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFeed = (feedUrl) => {
    const updatedFeeds = feeds.filter(feed => feed !== feedUrl);
    localStorage.setItem('blogFeeds', JSON.stringify(updatedFeeds));
    setFeeds(updatedFeeds);
    onFeedsChange(updatedFeeds);
  };

  return (
    <div className="bg-dark-800 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Manage Blog Sources</h2>
      
      {/* Add Feed Form */}
      <form onSubmit={handleAddFeed} className="mb-6">
        <div className="flex gap-2">
          <input
            type="url"
            value={newFeedUrl}
            onChange={(e) => setNewFeedUrl(e.target.value)}
            placeholder="Enter RSS feed URL"
            className="flex-1 px-4 py-2 bg-dark-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-yellow-500 text-dark-900 rounded-lg hover:bg-yellow-400 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="w-5 h-5" />
          </motion.button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      {/* Feed List */}
      <div className="space-y-2">
        {feeds.map((feed, index) => (
          <motion.div
            key={feed}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-dark-900 rounded-lg"
          >
            <span className="text-gray-300 truncate flex-1">{feed}</span>
            <motion.button
              onClick={() => handleRemoveFeed(feed)}
              className="ml-2 p-2 text-red-500 hover:text-red-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiTrash2 className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedManager;
