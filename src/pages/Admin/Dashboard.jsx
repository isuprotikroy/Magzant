import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiRefreshCw, FiExternalLink, FiLogOut } from 'react-icons/fi';
import AIBlogService from '../../services/AIBlogService';
import AuthService from '../../services/AuthService';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('portfolioItems')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const blogPosts = AIBlogService.getBlogPosts();
    setPosts(blogPosts);
  };

  const saveItems = (newItems) => {
    localStorage.setItem('portfolioItems', JSON.stringify(newItems));
    setItems(newItems);
  };

  const handleAddItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
    };
    const newItems = [...items, newItem];
    saveItems(newItems);
    setShowModal(false);
  };

  const handleEditItem = (item) => {
    const newItems = items.map((i) => 
      i.id === item.id ? item : i
    );
    saveItems(newItems);
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    saveItems(newItems);
  };

  const handleLogout = () => {
    // Add confirmation dialog
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      try {
        console.group('🚪 Logout Process');
        console.log('🕒 Logout initiated at:', new Date().toISOString());

        // Perform logout with detailed logging
        AuthService.logout();
        
        // Clear all local storage with logging
        console.log('🧹 Clearing local storage...');
        localStorage.clear();
        console.log('✅ Local storage cleared');

        // Navigate with error handling
        console.log('🔀 Navigating to login page...');
        navigate('/admin/login', { 
          replace: true,
          state: { logoutMessage: 'You have been successfully logged out.' }
        });

        console.log('✅ Logout successful');
        console.groupEnd();
      } catch (error) {
        console.error('❌ Logout failed:', error);
        console.groupEnd();
        
        // More informative error handling
        alert(`Logout failed. 
Error: ${error.message}
Please try again or contact support.`);
      }
    } else {
      console.log('🚫 Logout cancelled by user');
    }
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  const generateNewPost = async () => {
    setGenerating(true);
    setMessage('');
    try {
      const post = await AIBlogService.generatePost(topic);
      loadPosts();
      setMessage('Post generated successfully!');
      setShowTopicModal(false);
      setTopic('');
    } catch (error) {
      console.error('Error generating post:', error);
      setMessage('Error generating post: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const deletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const success = AIBlogService.deletePost(id);
      if (success) {
        loadPosts();
        setMessage('Post deleted successfully!');
      } else {
        setMessage('Error deleting post');
      }
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setMessage('');
    try {
      await AIBlogService.createPost(blogPost);
      loadPosts();
      setMessage('Post created successfully!');
      setShowBlogModal(false);
      setBlogPost({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post:', error);
      setMessage('Error creating post: ' + error.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 p-8 pb-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portfolio Items Section */}
          <div className="bg-dark-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Portfolio Items</h2>
              <motion.button
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.1 }}
                className="text-primary-400 hover:text-primary-300"
              >
                <FiPlus size={24} />
              </motion.button>
            </div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full ${
                  filter === 'all'
                    ? 'bg-yellow-500 text-dark-900'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('web')}
                className={`px-4 py-2 rounded-full ${
                  filter === 'web'
                    ? 'bg-yellow-500 text-dark-900'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Web
              </button>
              <button
                onClick={() => setFilter('mobile')}
                className={`px-4 py-2 rounded-full ${
                  filter === 'mobile'
                    ? 'bg-yellow-500 text-dark-900'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                Mobile
              </button>
            </div>

            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-dark-700 rounded-lg p-4 mb-4 flex items-center justify-between group hover:bg-dark-600"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCurrentItem(item);
                        setShowModal(true);
                      }}
                      className="text-yellow-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Blog Posts Section */}
          <div className="bg-dark-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Blog Posts</h2>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setShowBlogModal(true)}
                  whileHover={{ scale: 1.1 }}
                  className="text-primary-400 hover:text-primary-300"
                >
                  <FiPlus size={24} />
                </motion.button>
                <motion.button
                  onClick={() => setShowTopicModal(true)}
                  whileHover={{ scale: 1.1 }}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <FiRefreshCw size={24} />
                </motion.button>
              </div>
            </div>
            {message && (
              <div className={`mb-4 p-4 rounded ${message.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-700 rounded-lg p-4 flex items-center justify-between group hover:bg-dark-600 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate mb-1">
                      {post.title}
                    </h3>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{post.published}</span>
                      <span>{post.author}</span>
                      <span>{post.source}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 ml-4">
                    <button
                      onClick={() => deletePost(post.id)}
                      className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete Post"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-800 rounded-lg p-6 max-w-lg w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {currentItem ? 'Edit Item' : 'Add New Item'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setCurrentItem(null);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newItem = {
                      id: currentItem?.id,
                      title: formData.get('title'),
                      category: formData.get('category'),
                      description: formData.get('description'),
                      image: formData.get('image'),
                      client: formData.get('client'),
                      year: formData.get('year'),
                      tags: formData.get('tags').split(',').map(tag => tag.trim()),
                    };
                    if (currentItem) {
                      handleEditItem(newItem);
                    } else {
                      handleAddItem(newItem);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={currentItem?.title}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={currentItem?.category}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={currentItem?.description}
                      required
                      rows={3}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      defaultValue={currentItem?.image}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      name="client"
                      defaultValue={currentItem?.client}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      defaultValue={currentItem?.year}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={currentItem?.tags?.join(', ')}
                      required
                      placeholder="e.g., Motion Graphics, Color Grading, Sound Design"
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setCurrentItem(null);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      {currentItem ? 'Save Changes' : 'Add Item'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Post Modal */}
        <AnimatePresence>
          {showBlogModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Create New Blog Post</h3>
                  <button
                    onClick={() => setShowBlogModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleCreatePost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={blogPost.title}
                      onChange={(e) => setBlogPost({ ...blogPost, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      placeholder="Enter post title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={blogPost.author}
                      onChange={(e) => setBlogPost({ ...blogPost, author: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      placeholder="Enter author name (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea
                      value={blogPost.content}
                      onChange={(e) => setBlogPost({ ...blogPost, content: e.target.value })}
                      required
                      rows={15}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      placeholder="Write your blog post content here... (Supports HTML formatting)"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowBlogModal(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={generating}
                      className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-dark-900 rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {generating ? (
                        <>
                          <FiRefreshCw className="w-5 h-5 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Post'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Topic Modal */}
        <AnimatePresence>
          {showTopicModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-dark-800 rounded-lg p-6 max-w-lg w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Generate New Blog Post</h3>
                  <button
                    onClick={() => setShowTopicModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                      placeholder="Enter topic for the blog post"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowTopicModal(false)}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={generateNewPost}
                      disabled={generating || !topic.trim()}
                      className="flex items-center gap-2 px-6 py-2 bg-yellow-500 text-dark-900 rounded-full hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {generating ? (
                        <>
                          <FiRefreshCw className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logout Button - Positioned at bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-dark-900/50 backdrop-blur-sm z-40">
          <div className="container mx-auto flex justify-center">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-red-500/20 text-red-400 px-6 py-3 rounded-lg hover:bg-red-500/30 transition-colors shadow-lg"
            >
              <FiLogOut size={20} /> Logout
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
