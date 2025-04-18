import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthService from '../../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Debug logging for environment variables
  useEffect(() => {
    console.log('Environment Variables:');
    console.log('VITE_ADMIN_USERNAME:', import.meta.env.VITE_ADMIN_USERNAME);
    console.log('VITE_ADMIN_PASSWORD Length:', 
      import.meta.env.VITE_ADMIN_PASSWORD ? 
      import.meta.env.VITE_ADMIN_PASSWORD.length : 
      'Not set'
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Extreme logging
    console.group('🔐 Login Attempt');
    console.log('📝 Input Username:', username);
    console.log('🔑 Input Password Length:', password ? password.length : 'No password');

    try {
      // Validate inputs with extreme logging
      if (!username.trim()) {
        console.error('❌ Username is empty');
        setError('Username cannot be empty');
        console.groupEnd();
        return;
      }
      if (!password.trim()) {
        console.error('❌ Password is empty');
        setError('Password cannot be empty');
        console.groupEnd();
        return;
      }

      // Detailed authentication logging
      console.log('🕵️ Checking Credentials');
      console.log('Expected Username:', import.meta.env.VITE_ADMIN_USERNAME);
      console.log('Input Username:', username);
      console.log('Username Match:', 
        username.trim().toLowerCase() === 
        import.meta.env.VITE_ADMIN_USERNAME.trim().toLowerCase()
      );

      // Attempt authentication with extreme logging
      console.log('🚀 Attempting Authentication...');
      const isAuthenticated = AuthService.login(username, password);

      console.log('🎉 Authentication Result:', isAuthenticated);

      if (isAuthenticated) {
        // Redirect to dashboard with comprehensive logging
        const from = location.state?.from?.pathname || '/admin/dashboard';
        console.log('✅ Login Successful');
        console.log('🔀 Redirecting to:', from);
        
        // Use multiple navigation methods
        try {
          window.location.href = from;
        } catch (navError) {
          console.error('🚨 Window Location Navigation Failed:', navError);
          try {
            navigate(from, { replace: true });
          } catch (reactNavError) {
            console.error('🚨 React Router Navigation Failed:', reactNavError);
            alert(`Login successful but navigation failed. Please go to ${from} manually.`);
          }
        }
      } else {
        // Extreme error logging
        console.error('❌ Login Failed');
        console.error('❌ Credentials Do Not Match');
        
        // Detailed error diagnostics
        console.log('Entered Username:', username);
        console.log('Entered Password:', '*'.repeat(password.length));
        console.log('Expected Username:', import.meta.env.VITE_ADMIN_USERNAME);
        console.log('Expected Password Length:', 
          import.meta.env.VITE_ADMIN_PASSWORD.length
        );
        
        // More descriptive error message
        setError('Invalid credentials. Please check your username and password.');
      }
    } catch (error) {
      console.error('🆘 Unexpected Login Error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      console.groupEnd();
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-dark-800 rounded-xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-dark-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-primary-400 text-dark-900 font-bold py-3 rounded-md hover:bg-primary-300 transition-colors"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
