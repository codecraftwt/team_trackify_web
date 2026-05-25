import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {
  FaRoute,
  FaMapMarkedAlt,
  FaCamera,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaHeadset,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import landingImage from '../assets/landing.png';
import mobileImage from '../assets/mobile.png';
import ParticlesBackground from '../components/common/ParticlesBackground';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { useTheme, alpha } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const appDownloadRef = useRef(null);


  
  const handleAppStoreClick = () => {
    window.open(
      'https://apps.apple.com/in/app/team-trackify/id6744400871',
      '_blank'
    );
  };

  const handlePlayStoreClick = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=com.whc_tracking&pcampaignid=web_share',
      '_blank'
    );
  };

  const handleGetStartedClick = () => {
    // appDownloadRef.current?.scrollIntoView({ behavior: 'smooth' });
    navigate('/pricing')
  };

  const features = [
    {
      icon: <FaMapMarkedAlt size={24} />,
      title: 'Real-Time Live Tracking',
      description:
        "Instant visibility of your team's movement with a dynamic map interface.",
      gradient: 'from-blue-50 to-blue-100',
      iconColor: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <FaRoute size={24} />,
      title: 'Route History & Playback',
      description:
        'Replay the day. Analyze routes. Optimize performance.',
      gradient: 'from-purple-50 to-purple-100',
      iconColor: '#8B5CF6',
      bgColor: alpha('#8B5CF6', 0.1),
    },
    {
      icon: <FaCamera size={24} />,
      title: 'Geo-Tagged Photo Verification',
      description:
        'On-site photos automatically stamped with exact location data. Proof that builds trust — internally and externally.',
      gradient: 'from-green-50 to-green-100',
      iconColor: '#22c55e',
      bgColor: alpha('#22c55e', 0.1),
    },
  ];

  const perfectFor = [
    '🎯 Field Sales Teams',
    '💳 Collection Agents',
    '🔧 Service Engineers',
    '📢 Marketing Executives',
    '📋 Survey & Inspection Teams',
    '🚚 Delivery & Logistics Staff',
  ];

  const whyChoose = [
    {
      icon: <FaChartLine className="text-blue-600" size={16} />,
      label: 'Real-Time Accuracy',
    },
    {
      icon: <FaShieldAlt className="text-blue-600" size={16} />,
      label: 'Secure & Reliable Data',
    },
    {
      icon: <FaHandshake className="text-blue-600" size={16} />,
      label: 'Easy to Use Interface',
    },
    {
      icon: <FaUsers className="text-blue-600" size={16} />,
      label: 'Scalable for Growing Teams',
    },
    {
      icon: <FaHeadset className="text-blue-600" size={16} />,
      label: 'Dedicated Support',
    },
  ];

  const empowermentList = [
    'Monitor live employee locations',
    'Review exact routes followed during the day',
    'Capture geo-verified photo proof of every visit',
    'Maintain accurate, tamper-resistant records',
    'Improve accountability without constant follow-ups',
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
      <Header />

      {/* Hero Section */}
      <section className="min-h-[100vh] flex items-center relative overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` 
      }}>
  
        {/* ── Background animation ── */}
        <ParticlesBackground />

        <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-6" style={{ color: theme.palette.text.primary }}>
              Track Every Move.{' '}
              <span style={{ color: theme.palette.primary.main }}>Prove Every Visit.</span>
              <br className="hidden sm:block" /> Lead With Confidence.
            </h1>

            <h5 className="text-lg md:text-xl font-semibold mb-6" style={{ color: theme.palette.text.secondary }}>
              Team Trackify – The Smart Way to Manage Field Teams
            </h5>

            <p className="text-base md:text-lg mb-6 leading-relaxed max-w-3xl mx-auto" style={{ color: theme.palette.text.secondary }}>
              When your employees are on the ground, your visibility shouldn't disappear. 
              Real-time workforce tracking, verified visit proof, and complete operational control — all from one intelligent platform.
            </p>

            <p className="text-lg md:text-xl font-medium mb-8" style={{ color: theme.palette.text.primary }}>
              No assumptions. No blind spots. Just{' '}
              <span className="italic font-bold" style={{ color: theme.palette.primary.main }}>clarity</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetStartedClick}
                className="text-white font-semibold text-base px-8 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                }}
              >
                Get Started <FiArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
                className="font-semibold text-base px-8 py-3 rounded-full transition-all duration-300"
                style={{ 
                  border: `2px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Book a Live Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Because Field Work Demands More */}
      <section className="section-padding py-12 md:py-16" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main 
              }}>
                Why Trackify?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.palette.text.primary }}>
                Because Field Work Demands{' '}
                <span style={{ color: theme.palette.primary.main }}>More Than Trust</span>
              </h2>
              <p className="text-base mb-4" style={{ color: theme.palette.text.secondary }}>
                Door-to-door visits. Client meetings. On-site services. Every
                movement matters. Trackify empowers you to:
              </p>
              <ul className="space-y-2">
                {empowermentList.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-2"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    <FaCheckCircle className="mt-0.5 flex-shrink-0" size={14} style={{ color: theme.palette.primary.main }} />
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-4 text-base font-semibold" style={{ color: theme.palette.text.primary }}>
                You don't chase reports anymore —{' '}
                <span style={{ color: theme.palette.primary.main }}>
                  you see everything in real time.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              
                <div className="bg-white p-2 text-center">
                  <img
                    src={mobileImage}
                    alt="Trackify in action"
                    className="w-full h-auto max-h-[450px] object-contain rounded-lg"
                  />
                </div>
          
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for Businesses */}
      <section className="section-padding py-12 md:py-16" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main 
            }}>
              Who It's For
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.palette.text.primary }}>
              Built for Businesses That{' '}
              <span style={{ color: theme.palette.primary.main }}>Operate on the Field</span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
              Whether you manage 10 people or 1,000 — Trackify scales with your
              operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-4"
          >
            {perfectFor.map((item, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="inline-flex items-center gap-2 border px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer text-sm"
                style={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: theme.palette.text.secondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = theme.palette.primary.main;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.palette.background.paper;
                  e.currentTarget.style.color = theme.palette.text.secondary;
                  e.currentTarget.style.borderColor = alpha(theme.palette.divider, 0.5);
                }}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          <p className="text-center text-base font-semibold" style={{ color: theme.palette.text.primary }}>
            If your workforce moves,{' '}
            <span style={{ color: theme.palette.primary.main }}>Trackify tracks smarter.</span>
          </p>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="section-padding py-12 md:py-16" style={{ 
        background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 50%, ${theme.palette.background.paper} 100%)` 
      }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 font-semibold text-xs px-3 py-1.5 rounded-full mb-4" style={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.dark
            }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: theme.palette.primary.main }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.palette.primary.main }}></span>
              </span>
              Features
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight" style={{ color: theme.palette.text.primary }}>
              Powerful Features.{' '}
              <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ 
                backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
              }}>
                Zero Complexity.
              </span>
            </h2>

            <p className="mt-2 max-w-2xl mx-auto text-sm" style={{ color: theme.palette.text.secondary }}>
              Built for field teams — clear, fast, and simple to use every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.14 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
                style={{ 
                  borderColor: alpha(theme.palette.divider, 0.5),
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                {/* Very subtle hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-400"
                  style={{ background: `linear-gradient(135deg, ${feature.bgColor} 0%, transparent 100%)` }}
                />

                <div className="p-4 md:p-5 relative z-10">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <div style={{ color: feature.iconColor }} className="text-xl">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold mb-2 transition-colors group-hover:text-blue-700"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-sm" style={{ color: theme.palette.text.secondary }}>
                    {feature.description}
                  </p>

                  <div className="mt-3 h-0.5 w-8 rounded-full transition-all duration-400 group-hover:w-12"
                    style={{ 
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section
        className="section-padding py-12 md:py-16"
        ref={appDownloadRef}
        style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative bg-white p-2">
                  <img
                    src={mobileImage}
                    alt="App Screenshot"
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main 
              }}>
                Available Now
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.palette.text.primary }}>
                Download Our Mobile App
              </h2>
              <p className="text-base mb-4" style={{ color: theme.palette.text.secondary }}>
                Get the full Trackify experience on your mobile device with our
                dedicated iOS and Android apps.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAppStoreClick}
                  className="text-white px-5 py-2 rounded-full flex items-center gap-2 transition-colors"
                  style={{ backgroundColor: theme.palette.grey[900] }}
                >
                  <FaApple size={20} />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayStoreClick}
                  className="text-white px-5 py-2 rounded-full flex items-center gap-2 transition-colors"
                  style={{ backgroundColor: theme.palette.grey[900] }}
                >
                  <FaGooglePlay size={20} />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section-padding py-12 md:py-16 text-white" style={{ 
        background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)` 
      }}>
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
              backgroundColor: alpha('#ffffff', 0.1),
              color: theme.palette.primary.light 
            }}>
              Performance Driven
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Turn Movement Into{' '}
              <span style={{ color: theme.palette.primary.light }}>Measurable Performance</span>
            </h2>
            <p className="text-base mb-3 leading-relaxed" style={{ color: alpha('#ffffff', 0.7) }}>
              Tracking isn't about surveillance. It's about smarter coordination,
              improved productivity, and stronger results.
            </p>
            <p className="text-sm" style={{ color: alpha('#ffffff', 0.5) }}>
              Trackify transforms field operations into structured, data-driven
              performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-12 md:py-16 text-white" style={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` 
      }}>
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Ready to Take Control of Your Field Operations?
            </h2>
            <p className="text-base mb-1" style={{ color: alpha('#ffffff', 0.9) }}>
              Stop relying on manual reports.
            </p>
            <p className="text-base mb-3" style={{ color: alpha('#ffffff', 0.9) }}>
              Start managing with real-time clarity.
            </p>
            <p className="text-sm mb-6" style={{ color: alpha('#ffffff', 0.7) }}>
              Team Trackify gives you the visibility, accountability, and
              confidence your business needs to grow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="font-bold px-6 py-2.5 rounded-full transition-colors flex items-center text-sm"
                style={{ 
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                }}
              >
                Start Free Trial <FiArrowRight className="ml-2" size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
                style={{ 
                  border: `2px solid white`,
                  color: 'white',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = theme.palette.primary.main;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Book a Live Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding py-12 md:py-16" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main 
            }}>
              Why Us
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.palette.text.primary }}>
              Why Businesses Choose{' '}
              <span style={{ color: theme.palette.primary.main }}>Team Trackify</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2 border px-3 py-2 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: theme.palette.background.paper,
                  borderColor: alpha(theme.palette.divider, 0.5),
                }}
              >
                <span style={{ color: theme.palette.primary.main }}>{item.icon}</span>
                <span className="font-semibold text-sm" style={{ color: theme.palette.text.primary }}>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-0.5 mx-auto mb-4 rounded-full" style={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
            }}></div>
            <h4 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
              Smarter Tracking. Stronger Teams.{' '}
              <span style={{ color: theme.palette.primary.main }}>Better Results.</span>
            </h4>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;