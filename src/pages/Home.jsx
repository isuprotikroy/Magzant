import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground';
import Navbar from '../components/Navbar';

const TypeWriter = ({ text, delay = 3 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(c => c + 1);
      }, delay * 25);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, delay]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-block"
    >
      {displayText}
      {currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-white animate-pulse ml-1" />
      )}
    </motion.span>
  );
};

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const sections = useRef([]);
  const isScrolling = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0]
  );

  const phrases = [
    "Transforming Ideas into Digital Reality",
    "Creating Engaging User Experiences",
    "Building Powerful Digital Solutions",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [text] = useState("Magzant".split(""));
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 5000);

    return () => clearInterval(phraseInterval);
  }, [phrases.length]);

  useEffect(() => {
    const container = containerRef.current;
    let timeoutId;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling.current) return;

      const delta = e.deltaY;
      const direction = delta > 0 ? 1 : -1;

      const newSection = Math.max(0, Math.min(sections.current.length - 1, currentSection + direction));

      if (newSection !== currentSection) {
        isScrolling.current = true;
        setCurrentSection(newSection);

        sections.current[newSection].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        timeoutId = setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      clearTimeout(timeoutId);
    };
  }, [currentSection]);

  useEffect(() => {
    sections.current = document.querySelectorAll('section');
  }, []);

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="h-screen relative overflow-hidden"
      >
        <HeroBackground />

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div className="max-w-6xl mx-auto">
              <div className="pl-4 sm:pl-8 md:pl-12 lg:pl-16 pt-16 md:pt-0">
                <motion.h2
                  className="text-sm sm:text-base md:text-lg text-white mb-2 sm:mb-3 md:mb-4 tracking-wide uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Welcome to
                </motion.h2>

                <div className="flex items-baseline flex-wrap mb-4 sm:mb-6 md:mb-8 perspective-[1000px]">
                  {text.map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight inline-block transform-gpu"
                      style={{
                        display: char === " " ? "inline-block" : "inline-block",
                        width: char === " " ? "0.3em sm:0.4em md:0.5em" : "auto",
                        transformOrigin: "50% 50%"
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>

                {/* Typographic Animation */}
                <motion.div
                  className="h-8 sm:h-10 md:h-12 mb-6 sm:mb-8 md:mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhrase}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute max-w-2xl"
                    >
                      <h2 className="text-base sm:text-lg text-white/80 font-light tracking-wider">
                        <TypeWriter text={phrases[currentPhrase]} delay={2} />
                      </h2>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-white max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                  }}
                >
                  Empowering communities through innovative social initiatives and sustainable development programs
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="min-h-screen w-full bg-dark-900 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to elevate your brand and engage your audience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Digital Marketing",
                description: "Strategic digital marketing solutions to boost your online presence and reach your target audience effectively.",
                icon: (
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                )
              },
              {
                title: "Web Development",
                description: "Custom web solutions built with cutting-edge technologies to deliver exceptional user experiences.",
                icon: (
                  <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                )
              },
              {
                title: "Brand Strategy",
                description: "Comprehensive brand development and strategy services to help your business stand out in the market.",
                icon: (
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                )
              },
              {
                title: "Graphics Designing",
                description: "Creative graphic design solutions that visually communicate your brand’s story and leave a lasting impression on your audience.",
                icon: (
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                )
              },
              {
                title: "Social Media",
                description: "Strategic social media management to build and engage your community across platforms.",
                icon: (
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                )
              },
              {
                title: "Analytics",
                description: "Data-driven insights and analytics to measure and optimize your digital performance.",
                icon: (
                  <path d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" />
                )
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="text-gray-400 p-6 rounded-lg hover:bg-primary-900/10 transition-colors duration-300 h-full border-2 border-accent-400/10 hover:border-accent-400">
                  <div className="text-primary-500 mb-4">
                    <svg className="w-10 h-10" fill="rgb(211, 217, 4)" viewBox="0 0 20 20">
                      {service.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Solutions Section */}
      <section className="bg-dark-900 py-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent-400/20 to-transparent"></div>
          <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-gradient-to-l from-primary-400/20 to-transparent"></div>
          {/* Connected dots pattern */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-accent-400 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  boxShadow: '0 0 20px 2px rgba(var(--color-accent-400), 0.3)'
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Integrated Digital Solutions
              </h2>
              <p className="text-xl text-accent-400 tracking-wide">
                Everything is connected in the digital ecosystem
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    360° Digital Approach
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    In today's interconnected digital landscape, we believe in a unified approach to digital communications. Our solutions seamlessly blend creativity with cutting-edge technology, delivering results that make an impact.
                  </p>
                </div>

                <div className="relative">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Data-Driven Success
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We harness the power of insights, metrics, and analytics to drive your success. Every campaign is measured, analyzed, and optimized for maximum performance and ROI.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  { title: "Web Design", icon: "🎨" },
                  { title: "Social Media", icon: "🚀" },
                  { title: "Analytics", icon: "📊" },
                  { title: "Strategy", icon: "🎯" }
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="bg-dark-800/50 backdrop-blur-sm border border-accent-400/10 rounded-lg p-6 flex flex-col items-center text-center hover:border-accent-400/30 transition-colors"
                  >
                    <span className="text-3xl mb-3">{item.icon}</span>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="inline-flex items-center space-x-4 text-accent-400 text-lg">
                <span className="w-12 h-px bg-accent-400/30"></span>
                <p className="font-medium">All Under One Roof</p>
                <span className="w-12 h-px bg-accent-400/30"></span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-dark-900 py-8 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-400/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <motion.h2
                className="text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                What We Do
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We're not just another digital agency – we're your creative partners in the digital revolution.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">01.</span>
                    Digital Marketing Excellence
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    From strategic social media campaigns to comprehensive digital marketing solutions,
                    we help your brand stand out in the crowded digital space.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">02.</span>
                    Creative Graphics Designing
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our team designs visually striking graphics that tell your story, captivate your audience, and create impactful brand experiences across all platforms.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">03.</span>
                    Brand Development
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We build and evolve brands that resonate with your target audience,
                    creating memorable experiences that drive loyalty and growth.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">04.</span>
                    Web Development
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Creating stunning, functional websites that combine beautiful design
                    with seamless user experience and robust functionality.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">05.</span>
                    Video Production
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Professional video content that captures attention and delivers your
                    message effectively across all digital channels.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="text-accent-400 mr-3">06.</span>
                    Analytics & Optimization
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Data-driven insights and continuous optimization to ensure your
                    digital presence delivers measurable business results.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 text-accent-400 text-xl hover:text-accent-300 transition-colors group"
              >
                <span>Ready to Transform Your Digital Presence?</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Approach Section */}
      <section className="bg-dark-900 py-16 relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Strategy <span className="text-accent-400">&</span> Creativity
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transforming visions into measurable success through our proven methodology
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-accent-400/10 to-transparent p-8 rounded-lg border border-accent-400/20 h-full">
                  <div className="text-accent-400 text-4xl font-bold mb-4">01</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Strategic Foundation</h3>
                  <p className="text-gray-300">
                    Every project begins with deep research and strategic planning. We analyze your goals, audience, and market position to create a solid foundation.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-gradient-to-br from-primary-400/10 to-transparent p-8 rounded-lg border border-primary-400/20 h-full">
                  <div className="text-primary-400 text-4xl font-bold mb-4">02</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Creative Excellence</h3>
                  <p className="text-gray-300">
                    Our creative team transforms strategy into compelling visuals and engaging content that resonates with your target audience.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-gradient-to-br from-secondary-400/10 to-transparent p-8 rounded-lg border border-secondary-400/20 h-full">
                  <div className="text-secondary-400 text-4xl font-bold mb-4">03</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Measured Results</h3>
                  <p className="text-gray-300">
                    We continuously monitor, analyze, and optimize to ensure your digital presence delivers measurable business impact.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative bg-dark-800/50 rounded-xl p-10 border border-accent-400/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-6">
                    User-Centric Methodology
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    We understand that each client and project is unique. Our iterative process puts users at the heart of every decision, ensuring we create solutions that not only look beautiful but deliver targeted results.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Research & Discovery",
                      "Strategy Development",
                      "Creative Design",
                      "Implementation",
                      "Testing & Optimization"
                    ].map((step, index) => (
                      <motion.li
                        key={step}
                        className="flex items-center space-x-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <span className="w-1.5 h-1.5 bg-accent-400 rounded-full"></span>
                        <span>{step}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-400/20 to-primary-400/20 rounded-full blur-3xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 0.3, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                  <motion.div
                    className="relative aspect-square rounded-full border border-accent-400/20 flex items-center justify-center"
                    initial={{ rotate: -180 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    <div className="text-center">
                      <div className="text-5xl font-bold text-white mb-2">100%</div>
                      <div className="text-accent-400">Client Success</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <motion.section
        className="py-20 bg-dark-900 border-t border-dark-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl text-white font-bold">INDIA</h2>
              <p className="text-gray-500">2025</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="text-white hover:text-primary-500 transition-colors text-lg"
              >
                Let's Work Together →
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
