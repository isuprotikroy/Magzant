import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Admin/Login';
import Footer from './components/Footer';
import Services from './pages/Services';
import AuthService from './services/AuthService';

// Service Pages
import CreativeStrategy from './pages/services/CreativeStrategy';
import DigitalStrategy from './pages/services/DigitalStrategy';
import EmailMarketing from './pages/services/EmailMarketing';
import MediaPlanning from './pages/services/MediaPlanning';
import Seo from './pages/services/Seo';
import ShopifyDevelopment from './pages/services/ShopifyDevelopment';
import SocialMedia from './pages/services/SocialMedia';
import VideoContent from './pages/services/VideoContent';
import WebAnalytics from './pages/services/WebAnalytics';
import WebDevelopment from './pages/services/WebDevelopment';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-dark-400 to-dark-900 text-white">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Service Routes */}
            <Route path="/services/creative-strategy" element={<CreativeStrategy />} />
            <Route path="/services/digital-strategy" element={<DigitalStrategy />} />
            <Route path="/services/email-marketing" element={<EmailMarketing />} />
            <Route path="/services/media-planning" element={<MediaPlanning />} />
            <Route path="/services/seo" element={<Seo />} />
            <Route path="/services/shopify-development" element={<ShopifyDevelopment />} />
            <Route path="/services/social-media" element={<SocialMedia />} />
            <Route path="/services/video-content" element={<VideoContent />} />
            <Route path="/services/web-analytics" element={<WebAnalytics />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
