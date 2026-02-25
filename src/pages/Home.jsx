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

const Home = () => {
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
    appDownloadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <FaMapMarkedAlt size={32} />,
      title: 'Real-Time Live Tracking',
      description:
        "Instant visibility of your team's movement with a dynamic map interface.",
      gradient: 'from-primary-50 to-primary-100',
      iconColor: 'text-primary-600',
    },
    {
      icon: <FaRoute size={32} />,
      title: 'Route History & Playback',
      description:
        'Replay the day. Analyze routes. Optimize performance.',
      gradient: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: <FaCamera size={32} />,
      title: 'Geo-Tagged Photo Verification',
      description:
        'On-site photos automatically stamped with exact location data. Proof that builds trust — internally and externally.',
      gradient: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
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
      icon: <FaChartLine className="text-primary-600" />,
      label: 'Real-Time Accuracy',
    },
    {
      icon: <FaShieldAlt className="text-primary-600" />,
      label: 'Secure & Reliable Data',
    },
    {
      icon: <FaHandshake className="text-primary-600" />,
      label: 'Easy to Use Interface',
    },
    {
      icon: <FaUsers className="text-primary-600" />,
      label: 'Scalable for Growing Teams',
    },
    {
      icon: <FaHeadset className="text-primary-600" />,
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="min-h-[100vh] flex items-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 md:py-22">
  
        {/* ── Background animation ── */}
        <ParticlesBackground />

        <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto text-center"
            >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
              Track Every Move.{' '}
              <span className="text-gradient">Prove Every Visit.</span>
              <br className="hidden sm:block" /> Lead With Confidence.
            </h1>

            <h5 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
              Team Trackify – The Smart Way to Manage Field Teams
            </h5>

            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              When your employees are on the ground, your visibility shouldn't disappear. 
              Real-time workforce tracking, verified visit proof, and complete operational control — all from one intelligent platform.
            </p>

            <p className="text-xl md:text-2xl text-gray-800 font-medium mb-10">
              No assumptions. No blind spots. Just{' '}
              <span className="text-gradient italic font-bold">clarity</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleGetStartedClick}
                className="btn-primary text-lg px-10 py-4 flex items-center gap-2 shadow-lg"
              >
                Get Started <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/contact')}
                className="btn-outline text-lg px-10 py-4"
              >
                Book a Live Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Because Field Work Demands More */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
                Why Trackify?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Because Field Work Demands{' '}
                <span className="text-primary-600">More Than Trust</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Door-to-door visits. Client meetings. On-site services. Every
                movement matters. Trackify empowers you to:
              </p>
              <ul className="space-y-3">
                {empowermentList.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-semibold text-gray-900">
                You don't chase reports anymore —{' '}
                <span className="text-primary-600">
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
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                  />
                </div>
          
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for Businesses */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
              Who It's For
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Businesses That{' '}
              <span className="text-primary-600">Operate on the Field</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you manage 10 people or 1,000 — Trackify scales with your
              operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-6"
          >
            {perfectFor.map((item, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-full font-medium hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 cursor-pointer"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>

          <p className="text-center text-lg font-semibold text-gray-700">
            If your workforce moves,{' '}
            <span className="text-primary-600">Trackify tracks smarter.</span>
          </p>
        </div>
      </section>

      {/* Powerful Features */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white">
  <div className="container-custom">
    {/* Heading block - kept original scale */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        Features
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        Powerful Features.{' '}
        <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          Zero Complexity.
        </span>
      </h2>

      {/* Optional small subtitle – remove if you prefer exact original */}
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        Built for field teams — clear, fast, and simple to use every day.
      </p>
    </motion.div>

    {/* Cards – same grid, same visual footprint as original */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: index * 0.14 }}
          whileHover={{ y: -6, scale: 1.015 }}
          className={`
            group relative bg-white rounded-xl border border-gray-100 
            shadow-sm hover:shadow-lg hover:border-primary-200/60
            transition-all duration-300 ease-out overflow-hidden
          `}
        >
          {/* Very subtle hover gradient */}
          <div className={`
            absolute inset-0 bg-gradient-to-br ${feature.gradient} 
            opacity-0 group-hover:opacity-25 transition-opacity duration-400
          `} />

          <div className="p-6 md:p-7 relative z-10">
            {/* Icon – kept original w-16 h-16 */}
            <div className={`
              w-16 h-16 rounded-xl 
              bg-gradient-to-br ${feature.gradient} 
              flex items-center justify-center mb-5 
              shadow-sm group-hover:shadow-md transition-shadow
            `}>
              <div className={`text-3xl ${feature.iconColor}`}>
                {feature.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
              {feature.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Tiny visual cue at bottom – optional, very subtle */}
            <div className="mt-5 h-0.5 w-10 bg-primary-200/50 group-hover:w-16 group-hover:bg-primary-500 rounded-full transition-all duration-400" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* App Download Section */}
      <section
        className="section-padding bg-gray-50"
        ref={appDownloadRef}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                    className="w-full h-auto max-h-[550px] object-contain rounded-xl"
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
              <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
                Available Now
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Download Our Mobile App
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Get the full Trackify experience on your mobile device with our
                dedicated iOS and Android apps.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAppStoreClick}
                  className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors"
                >
                  <FaApple size={24} />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayStoreClick}
                  className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors"
                >
                  <FaGooglePlay size={24} />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-base font-semibold">Google Play</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-block bg-white/10 text-primary-300 font-semibold text-sm px-4 py-2 rounded-full mb-4">
              Performance Driven
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Turn Movement Into{' '}
              <span className="text-primary-400">Measurable Performance</span>
            </h2>
            <p className="text-lg text-gray-300 mb-4 leading-relaxed">
              Tracking isn't about surveillance. It's about smarter coordination,
              improved productivity, and stronger results.
            </p>
            <p className="text-base text-gray-400">
              Trackify transforms field operations into structured, data-driven
              performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Your Field Operations?
            </h2>
            <p className="text-lg text-primary-100 mb-2">
              Stop relying on manual reports.
            </p>
            <p className="text-lg text-primary-100 mb-4">
              Start managing with real-time clarity.
            </p>
            <p className="text-base text-primary-200 mb-8">
              Team Trackify gives you the visibility, accountability, and
              confidence your business needs to grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center"
              >
                Start Free Trial <FiArrowRight className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-primary-600 transition-colors"
              >
                Book a Live Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
              Why Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose{' '}
              <span className="text-primary-600">Team Trackify</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, y: -2 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-primary-600 hover:shadow-lg transition-all duration-300"
              >
                {item.icon}
                <span className="font-semibold text-gray-900">{item.label}</span>
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
            <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full"></div>
            <h4 className="text-2xl font-bold text-gray-900">
              Smarter Tracking. Stronger Teams.{' '}
              <span className="text-primary-600">Better Results.</span>
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
