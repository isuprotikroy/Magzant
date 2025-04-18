import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'digital-strategy',
      title: 'Digital Strategy and Planning',
      description: 'We leverage our years of experience to create the correct strategy and plans for your business which helps to grow your brand and revenue.',
      icon: '🎯',
      features: [
        'Market Research & Analysis',
        'Brand Strategy Development',
        'Digital Transformation Planning',
        'ROI Optimization',
        'Competitive Analysis'
      ]
    },
    {
      id: 'creative-strategy',
      title: 'Creative Strategy and Web Graphics',
      description: 'Creativity is our way of life. We create compelling visuals across all digital platforms - from websites and apps to social media and marketing materials.',
      icon: '🎨',
      features: [
        'UI/UX Design',
        'Brand Identity Design',
        'Social Media Graphics',
        'Marketing Collateral',
        'Infographic Design'
      ]
    },
    {
      id: 'social-media',
      title: 'Social Media Marketing',
      description: 'Social is in our DNA! We create engaging social media strategies across platforms to build your brand presence and connect with your audience.',
      icon: '📱',
      features: [
        'Content Strategy',
        'Community Management',
        'Social Media Advertising',
        'Influencer Marketing',
        'Social Analytics'
      ]
    },
    {
      id: 'video-content',
      title: 'Videos, GIFs and Content Marketing',
      description: 'Video has become the most engaging content format. We create compelling video content that tells your story and drives engagement.',
      icon: '🎥',
      features: [
        'Video Production',
        'Animation & Motion Graphics',
        'Content Strategy',
        'Storyboarding',
        'Video Analytics'
      ]
    },
    {
      id: 'web-development',
      title: 'Website Design and Development',
      description: 'We create beautiful, responsive websites that not only look great but also drive results for your business.',
      icon: '💻',
      features: [
        'Custom Web Development',
        'Responsive Design',
        'E-commerce Solutions',
        'CMS Integration',
        'Performance Optimization'
      ]
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      description: 'Get found online with our comprehensive SEO services that improve your visibility and drive organic traffic.',
      icon: '🔍',
      features: [
        'Technical SEO',
        'Content Optimization',
        'Link Building',
        'Local SEO',
        'SEO Analytics'
      ]
    },
    {
      id: 'email-marketing',
      title: 'Email Marketing',
      description: 'Build lasting relationships with your customers through targeted email campaigns that drive engagement and conversions.',
      icon: '📧',
      features: [
        'Campaign Strategy',
        'Email Design',
        'Automation',
        'List Management',
        'Performance Analytics'
      ]
    },
    {
      id: 'web-analytics',
      title: 'Web Analytics',
      description: 'Make data-driven decisions with our comprehensive analytics services that track and measure your digital performance.',
      icon: '📊',
      features: [
        'Data Analysis',
        'Performance Tracking',
        'Conversion Optimization',
        'Custom Reporting',
        'User Behavior Analysis'
      ]
    },
    {
      id: 'media-planning',
      title: 'Media Planning and Buying',
      description: 'Maximize your advertising ROI with strategic media planning and buying across digital channels.',
      icon: '📈',
      features: [
        'Media Strategy',
        'Budget Optimization',
        'Channel Selection',
        'Campaign Management',
        'Performance Analysis'
      ]
    },
    {
      id: 'shopify-development',
      title: 'Shopify Website & Development',
      description: 'Launch and grow your e-commerce business with our expert Shopify development services.',
      icon: '🛍️',
      features: [
        'Store Setup',
        'Theme Customization',
        'App Integration',
        'Payment Gateway Setup',
        'Performance Optimization'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive digital solutions to help your business thrive in the digital age
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800 rounded-xl p-6 hover:bg-dark-700 transition-colors"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-gray-400 flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center text-accent-400 hover:text-accent-300 transition-colors group"
                >
                  <span>Learn More</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
