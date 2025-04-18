import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: "4+", label: "Years Experience" },
    { number: "50+", label: "Projects Completed" },
    { number: "20+", label: "Happy Clients" },
  ];

  const process = [
    {
      title: "Research & Strategy",
      description: "We begin by understanding your business, target audience, and objectives to develop a comprehensive digital strategy."
    },
    {
      title: "Creative Development",
      description: "Our creative team brings your vision to life with engaging designs and compelling content that resonates with your audience."
    },
    {
      title: "Implementation",
      description: "We execute the strategy across chosen digital channels, ensuring consistent brand messaging and maximum impact."
    },
    {
      title: "Analysis & Optimization",
      description: "Continuous monitoring and optimization of campaigns to ensure the best possible results and ROI."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/50 to-dark-900"></div>
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            We are a full-service digital marketing agency that helps brands grow and succeed in the digital world.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Who We Are</h2>
              <p className="text-gray-300 text-lg mb-6">
                Magzant is a dynamic digital marketing agency that combines creativity with data-driven strategies to help businesses thrive in the digital landscape. We believe in creating meaningful connections between brands and their audiences through innovative digital solutions.
              </p>
              <p className="text-gray-300 text-lg">
                Our team of digital experts brings together diverse skills and perspectives to deliver comprehensive digital marketing solutions that drive real results. From social media management to web development, we handle every aspect of your digital presence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                alt="Our Team"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">What We Do</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We offer comprehensive digital marketing solutions tailored to your business needs. Our services are designed to help you achieve your digital goals and drive meaningful results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800 p-8 rounded-lg text-center hover:bg-dark-700 transition-colors"
              >
                <h3 className="text-4xl font-bold text-accent-400 mb-2">{stat.number}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Process</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              We follow a systematic approach to ensure the success of your digital marketing campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-dark-900 p-8 rounded-lg h-full hover:bg-dark-700 transition-colors">
                  <div className="text-4xl font-bold text-accent-400 mb-4">{(index + 1).toString().padStart(2, '0')}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Grow Your Digital Presence?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's create something amazing together. Get in touch with us to start your digital journey.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-accent-400 text-white px-8 py-4 rounded-lg hover:bg-accent-500 transition-colors font-medium text-lg"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
