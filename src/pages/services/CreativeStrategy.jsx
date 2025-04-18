import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CreativeStrategy = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { value: '85%', label: 'Brand Recognition' },
    { value: '3x', label: 'Engagement Rate' },
    { value: '92%', label: 'Client Satisfaction' },
    { value: '40%', label: 'Conversion Boost' }
  ];

  const capabilities = [
    {
      title: 'Brand Identity Design',
      description: 'Create a unique and memorable brand identity that resonates with your target audience.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'Visual Communication',
      description: 'Develop compelling visual narratives that effectively communicate your brand message.',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      title: 'UI/UX Design',
      description: 'Design intuitive and engaging user interfaces that deliver exceptional user experiences.',
      image: 'https://images.unsplash.com/photo-1586936893354-362ad6ae47ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/50 to-dark-900" />
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
              alt="Creative Strategy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Creative Strategy & Design
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Where Innovation Meets Visual Excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideIn}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Crafting Visual Excellence
              </h2>
              <p className="text-gray-300 mb-6 text-lg">
                In the digital age, creative excellence is not just about aesthetics – it's about creating meaningful connections with your audience through compelling visual narratives and intuitive design solutions.
              </p>
              <p className="text-gray-300 text-lg">
                Our creative strategy combines artistic innovation with strategic thinking to deliver designs that not only look stunning but also drive real business results. Every visual element we create is purposefully crafted to enhance your brand's story and engage your target audience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                  alt="Creative Design Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-accent-400 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Our Creative Capabilities
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800 rounded-xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={capability.image}
                    alt={capability.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-gray-300">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-dark-800">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white text-center mb-16"
          >
            Our Creative Process
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  step: '01',
                  title: 'Discovery & Research',
                  description: 'Understanding your brand, audience, and objectives to inform our creative direction.'
                },
                {
                  step: '02',
                  title: 'Concept Development',
                  description: 'Creating innovative concepts that align with your brand strategy and market position.'
                },
                {
                  step: '03',
                  title: 'Design & Iteration',
                  description: 'Crafting polished designs through an iterative process of refinement and feedback.'
                },
                {
                  step: '04',
                  title: 'Implementation & Optimization',
                  description: 'Delivering final designs and ensuring they perform effectively across all platforms.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's create something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-400 text-white rounded-full hover:bg-accent-500 transition-colors text-lg font-medium"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreativeStrategy;
