import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
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
} from 'react-icons/fa';
import GroupsIcon from '@mui/icons-material/Groups';
import TargetIcon from '@mui/icons-material/TrackChanges';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import mobileImage from '../assets/mobile.png';

const About = () => {
  const navigate = useNavigate();

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

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 48 }} />,
      title: 'Team First',
      description: 'We believe in empowering teams with the tools they need to succeed.',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      icon: <TargetIcon sx={{ fontSize: 48 }} />,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 48 }} />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality products and services.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: 'Growth',
      description: 'Helping businesses scale and achieve their full potential.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Companies' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-br from-primary-50 via-white to-primary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-6">
              About Us
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Team Trackify</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're on a mission to revolutionize how businesses track and manage
              their teams. With cutting-edge technology and a passion for innovation,
              we're building the future of workforce management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Because Field Work Demands{' '}
                <span className="text-primary-600">More Than Trust</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Team Trackify was born from a simple observation: businesses needed
                  better tools to track and manage their field teams. Traditional
                  solutions were clunky, expensive, and didn't provide the real-time
                  insights modern businesses require.
                </p>
                <p>
                  Door-to-door visits. Client meetings. On-site services. Every
                  movement matters. Trackify empowers you to:
                </p>
                <ul className="space-y-3 mt-4">
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
                <p className="mt-6 font-semibold text-gray-900">
                  You don't chase reports anymore —{' '}
                  <span className="text-primary-600">
                    you see everything in real time.
                  </span>
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-primary rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-4 text-center">
                  <img
                    src={mobileImage}
                    alt="Trackify in action"
                    className="w-full h-auto max-h-[500px] object-contain rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="container-custom">
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
              Our Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Powerful Features.{' '}
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Zero Complexity.
              </span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Built for field teams — clear, fast, and simple to use every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.14 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200/60 transition-all duration-300 ease-out overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-25 transition-opacity duration-400`}
                />

                <div className="p-6 md:p-7 relative z-10">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow`}
                  >
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

                  <div className="mt-5 h-0.5 w-10 bg-primary-200/50 group-hover:w-16 group-hover:bg-primary-500 rounded-full transition-all duration-400" />
                </div>
              </motion.div>
            ))}
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
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The reasons that make us the preferred choice for field team management
            </p>
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

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`w-20 h-20 ${value.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 ${value.color}`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-primary-100 leading-relaxed">
              To empower businesses of all sizes with powerful, intuitive tools that
              help them track, manage, and optimize their teams. We believe that
              technology should make work easier, not harder, and we're committed to
              building solutions that truly make a difference.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/pricing')}
                className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                View Pricing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-primary-600 transition-colors"
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default About;
