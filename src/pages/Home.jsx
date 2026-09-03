import { useRef, useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {
  FaRoute,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaCamera,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaUsers,
  FaUser,
  FaBuilding,
  FaShieldAlt,
  FaHandshake,
  FaHeadset,
  FaApple,
  FaGooglePlay,
  FaBullseye,
  FaCreditCard,
  FaWrench,
  FaBullhorn,
  FaClipboardList,
  FaTruck,
  FaPlayCircle,
  FaMobileAlt,
  FaRegClock,
} from 'react-icons/fa';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import mobileImage from '../assets/Home_1.png';
import mobileanimation from '../assets/Animation_Home2.mp4';
import Playstore from '../assets/Home_2.png';
import bgPlanLeft from '../assets/bg-plan-left.png';
import downapk from '../assets/downapk.png';
import heroImage from '../assets/Hero_Section.png';
import stepImage from '../assets/Step_S.png';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { useTheme, alpha } from '@mui/material';

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    let timer;
    if (phase === 'typing') {
      if (displayText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, 60);
      } else {
        timer = setTimeout(() => setPhase('paused'), 0);
      }
    } else if (phase === 'paused') {
      timer = setTimeout(() => setPhase('deleting'), 5000);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, 25);
      } else {
        timer = setTimeout(() => setPhase('typing'), 500);
      }
    }
    return () => clearTimeout(timer);
  }, [displayText, phase, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
        style={{ display: 'inline-block', marginLeft: '2px', fontWeight: 'bold' }}
      />
    </span>
  );
};

const Kicker = ({ children, color, center }) => (
  <div className={`flex items-center gap-2 mb-3 ${center ? 'justify-center' : ''}`}>
    <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
      {children}
    </span>
    <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
  </div>
);

const Counter = ({ value, suffix = '', decimals = 0, duration = 1.6 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf;
    let start;
    const tick = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const dotGrid = (color, size = 22) => ({
  backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
  backgroundSize: `${size}px ${size}px`,
});

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleAppStoreClick = () => {
    window.open('https://apps.apple.com/in/app/team-trackify/id6744400871', '_blank');
  };

  const handlePlayStoreClick = () => {
    window.open('https://play.google.com/store/apps/details?id=com.whc_tracking', '_blank');
  };

  const heroWords = [
    { text: 'Track', accent: false },
    { text: 'Every', accent: false },
    { text: 'Move.', accent: false },
    { text: 'Prove', accent: true },
    { text: 'Every', accent: true },
    { text: 'Visit.', accent: true },
  ];

  const stats = [
    { value: 10, suffix: 'K+', label: 'Active Users', icon: <FaUsers size={18} /> },
    { value: 500, suffix: '+', label: 'Companies', icon: <FaBuilding size={18} /> },
    { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1, icon: <FaShieldAlt size={18} /> },
    { value: 24, suffix: '/7', label: 'Support', icon: <FaHeadset size={18} /> },
  ];

  const perfectFor = [
    { label: 'Field Sales Teams', subtitle: 'Grow your business with real-time field tracking and instant reporting.', icon: <FaUsers size={26} />, color: '#ff6b6b', bgColor: '#ffeeee' },
    { label: 'Collection Agents', subtitle: 'Boost efficiency by verifying every visit with location proof.', icon: <FaUser size={26} />, color: '#4ade80', bgColor: '#e6ffea' },
    { label: 'Service Engineers', subtitle: 'Deliver excellence through streamlined task management on the go.', icon: <FaWrench size={26} />, color: '#60a5fa', bgColor: '#ebf4ff' },
    { label: 'Marketing Executives', subtitle: 'Expand reach with precise territory mapping and analytics.', icon: <FaBullhorn size={26} />, color: '#facc15', bgColor: '#fef9c3' },
    { label: 'Survey & Inspection Teams', subtitle: 'Ensure compliance using authentic, location-tagged inspection logs.', icon: <FaClipboardList size={26} />, color: '#c084fc', bgColor: '#f3e8ff' },
    { label: 'Delivery & Logistics', subtitle: 'Track and manage your field fleets for smoother, faster deliveries.', icon: <FaTruck size={26} />, color: '#f472b6', bgColor: '#fce7f3' },
  ];

  const oldWayPoints = [
    'Manual paper reports, hours wasted',
    'No real proof of field visit',
    'No answer to "Where are you right now?"',
    'Bills, leads and tasks all in doubt',
  ];

  const newWayPoints = [
    'Live employee location tracking',
    'Real-time visit proof with photo & location',
    'Accurate geo-verified reports',
    'Complete visibility & control',
  ];

  const steps = [
    {
      title: 'Sign Up & Invite Team',
      description: 'Create your workspace and invite team members instantly. Onboard everyone in minutes without any complex setup.',
      icon: <FaMobileAlt size={22} />,
    },
    {
      title: 'Track & Verify Visits',
      description: 'Employees easily check-in with GPS and live photo proof, ensuring every field visit is authenticated in real-time.',
      icon: <FaUsers size={22} />,
    },
    {
      title: 'Get Real-time Insights',
      description: 'Monitor live movement and access attendance reports. Analyze performance metrics anywhere through our admin dashboard.',
      icon: <FaChartLine size={22} />,
    },
  ];



  const whyChoose = [
    { 
      icon: <FaBullseye size={24} />, 
      title: 'Real-Time\nAccuracy', 
      subtitle: 'Know exactly where your team is, always. Leverage precision GPS tracking and live status updates for complete operational visibility.',
      iconColor: '#ff6b6b',
      iconBg: '#ffeeee'
    },
    { 
      icon: <FaShieldAlt size={24} />, 
      title: 'Secure &\nReliable Data', 
      subtitle: 'Your business information stays safe. We utilize enterprise-grade encryption and automated cloud backups to protect your sensitive data.',
      iconColor: '#facc15',
      iconBg: '#fef9c3',
      highlight: true
    },
    { 
      icon: <FaChartLine size={24} />, 
      title: 'Scalable for\nGrowing Teams', 
      subtitle: 'From 10 to 10,000+ users, we grow with you. Our robust cloud infrastructure seamlessly adapts without compromising on performance.',
      iconColor: '#60a5fa',
      iconBg: '#ebf4ff'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: theme.palette.background.paper }}>
      <style>{`
        @keyframes tf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tf-marquee-track { display: flex; width: max-content; animation: tf-marquee 28s linear infinite; }
        .tf-marquee-track.reverse { animation-direction: reverse; }
        .tf-marquee-wrap:hover .tf-marquee-track { animation-play-state: paused; }
        @keyframes tf-blob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, -25px) scale(1.08); } }
        .tf-blob { animation: tf-blob 10s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* Hero — animated gradient mesh, word-cascade headline, 3D-tilted device */}
      <section
        className="relative overflow-hidden pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-16"
        style={{ background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${theme.palette.background.paper} 70%)` }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="tf-blob absolute -top-24 -left-16 w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-full blur-3xl opacity-30" style={{ background: theme.palette.primary.main }} />
          <div className="tf-blob absolute -bottom-32 -right-16 w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full blur-3xl opacity-20" style={{ background: '#8B5CF6', animationDelay: '2s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full mb-3"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
                  🚀
                </span>
                <span className="text-sm font-bold" style={{ color: theme.palette.primary.main }}>
                  Trusted by 500+ Businesses Worldwide
                </span>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-2"
                style={{ color: theme.palette.text.primary }}
              >
                {heroWords.map((w, i) => (
                  <motion.span
                    key={i}
                    variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                    className={`inline-block mr-3 ${w.accent ? 'bg-gradient-to-r bg-clip-text text-transparent pb-1' : ''}`}
                    style={w.accent ? { backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` } : undefined}
                  >
                    {w.text}
                  </motion.span>
                ))}
              </motion.h1>

              <h5 className="text-base md:text-lg font-semibold mb-2 min-h-[1.75em]" style={{ color: theme.palette.text.secondary }}>
                <TypingText text="Team Trackify – Manage Your Workforce" />
              </h5>

              <p className="text-[15px] md:text-base mb-8 leading-relaxed max-w-lg" style={{ color: theme.palette.text.secondary }}>
                Real-time workforce tracking, verified visit proof, and complete operational control all from one intelligent platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start items-center mb-6">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/pricing')}
                  className="group text-white font-bold text-base px-8 py-3.5 rounded-md flex items-center gap-2 transition-shadow duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                  }}
                >
                  Get Started
                  {/* <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /> */}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/contact')}
                  className="font-bold text-base px-8 py-3.5 rounded-md transition-all duration-300 border border-transparent shadow-sm flex items-center gap-2"
                  style={{
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  {/* <FaPlayCircle size={18} /> */}
                  Book a Live Demo
                </motion.button>
              </div>

            </div>

            <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-none pt-2 pb-6 px-4 lg:px-6">

              <div className="flex justify-center">
                <img
                  src={heroImage}
                  alt="Trackify in action"
                  className="w-full h-auto max-h-[480px] lg:max-h-[600px] object-contain"
                />
              </div>

              <div
                className="hidden sm:flex absolute top-28 -right-10 lg:-right-24 xl:-right-36 items-center gap-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border px-4 py-3 z-10"
                style={{ borderColor: alpha(theme.palette.divider, 0.2) }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
                  <FaMapMarkerAlt style={{ color: theme.palette.primary.main }} size={14} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase leading-tight" style={{ color: theme.palette.text.primary }}>Real-time</div>
                  <div className="text-xs font-medium leading-tight" style={{ color: theme.palette.text.secondary }}>Location</div>
                </div>
              </div>

              <div
                className="hidden sm:flex absolute bottom-12 -left-16 lg:-left-24 xl:-left-32 items-center gap-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border px-4 py-3 z-10"
                style={{ borderColor: alpha(theme.palette.divider, 0.2) }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
                  <FaShieldAlt style={{ color: theme.palette.primary.main }} size={14} />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase leading-tight" style={{ color: theme.palette.text.primary }}>Verified</div>
                  <div className="text-xs font-medium leading-tight" style={{ color: theme.palette.text.secondary }}>Visit Proof</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid — who it's for */}
      <section className="py-12 md:py-16" style={{ backgroundColor: theme.palette.background.default }}>
        <div className="container-custom mb-16 text-center">
          <div className="mb-3">
            <Kicker color={theme.palette.primary.main} center>Who It's For</Kicker>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.25] mb-6 text-gray-900 mx-auto">
            Built for Every Kind of <span style={{ color: theme.palette.primary.main }}>Field Team</span>
          </h2>
        </div>

        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-x-12 md:gap-y-16">
            {perfectFor.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full mb-6 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ backgroundColor: item.bgColor, color: item.color }}
                >
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold mb-3 leading-tight" style={{ color: theme.palette.text.primary }}>
                  {item.label}
                </h3>
                <p className="text-[13px] md:text-sm font-medium leading-relaxed max-w-[280px]" style={{ color: theme.palette.text.secondary }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Old way vs Trackify way */}
      <section className="py-10 md:py-12" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="container-custom">
          <div className="rounded-[2.5rem] py-10 md:py-12 px-6 md:px-12" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.06) }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-10"
            >
              <Kicker color={theme.palette.primary.main} center>The Shift</Kicker>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-[1.25] mb-6 text-gray-900 mx-auto">
                From Guesswork to <span style={{ color: theme.palette.primary.main }}>Ground Truth</span>
              </h2>
              <p className="text-sm md:text-base max-w-2xl mx-auto font-medium" style={{ color: theme.palette.text.secondary }}>
                Move from assumptions to accurate, real-time data. Track, verify and<br className="hidden sm:block" />
                take smarter decisions with Team Trackify.
              </p>
            </motion.div>

            <div className="flex flex-col md:flex-row relative max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex-1 rounded-t-3xl md:rounded-none md:rounded-l-3xl p-8 md:p-10 md:pr-16 lg:pr-20 bg-white"
                style={{ boxShadow: `0 20px 50px -10px ${alpha(theme.palette.primary.main, 0.08)}` }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center justify-end" style={{ color: theme.palette.text.primary }}>
                  Without Trackify
                </h3>
                <ul className="space-y-4 text-right p-0 m-0 list-none">
                  {oldWayPoints.map((point, index) => (
                    <li key={index} className="flex items-center justify-end gap-3">
                      <span className="text-sm font-medium" style={{ color: theme.palette.text.secondary }}>{point}</span>
                      <div className="w-5 flex justify-center">
                        <FaTimesCircle className="flex-shrink-0" size={20} style={{ color: '#ef4444' }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full items-center justify-center text-white font-extrabold text-base shadow-xl border-[6px] border-white"
                style={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` }}
              >
                VS
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex-1 rounded-b-3xl md:rounded-none md:rounded-r-3xl p-8 md:p-10 md:pl-16 lg:pl-20 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, boxShadow: `0 20px 50px -10px ${alpha(theme.palette.primary.main, 0.4)}` }}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: '#ffffff' }} />
                <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center relative" style={{ color: '#ffffff' }}>
                  With Trackify
                </h3>
                <ul className="space-y-4 relative p-0 m-0 list-none">
                  {newWayPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-5 flex justify-center">
                        <FaCheckCircle className="flex-shrink-0" size={20} style={{ color: '#22c55e' }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: alpha('#ffffff', 0.95) }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: theme.palette.background.default }}>
        {/* Decorative Side Background */}
        <div
          className="absolute left-0 bottom-0 w-full h-full max-w-[500px] pointer-events-none opacity-80"
          style={{
            backgroundImage: `url(${bgPlanLeft})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left bottom'
          }}
        />

        <div className="container-custom max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Heading & Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start w-full"
            >
              <div className="mb-10 lg:mb-16 text-left w-full flex justify-start lg:justify-start">
                <Kicker color={theme.palette.primary.main}>HOW IT WORKS</Kicker>
              </div>
              {/* Main Image */}
              <div className="relative w-full max-w-[600px] lg:max-w-[750px] mx-auto lg:-ml-6 flex items-center justify-center pt-8 lg:pt-12">
                <img src={stepImage} alt="Three Steps Mockup" className="w-full h-auto object-contain scale-110 lg:scale-125 transform origin-center" />
              </div>
            </motion.div>

            {/* Right Column: Intro Text & Numbered Steps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-10 lg:pl-12 xl:pl-16"
            >
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold mb-6 text-left text-gray-900" style={{ lineHeight: '1.2' }}>
                  Up and Running in <br className="hidden lg:block" />
                  <span style={{ color: theme.palette.primary.main }}>Three Simple Steps</span>
                </h2>
              </div>

              <div className="flex flex-col gap-6 md:gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 border-[1.5px] border-dashed rounded-lg flex items-center justify-center font-bold text-base transition-colors"
                      style={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05)
                      }}>
                      {index + 1}
                    </div>
                    <div className="flex-1 mt-0">
                      <h3 className="text-base md:text-[17px] font-bold mb-1 leading-tight" style={{ color: theme.palette.text.primary }}>
                        {step.title}
                      </h3>
                      <p className="text-[12px] md:text-[13px] font-medium leading-relaxed max-w-sm" style={{ color: theme.palette.text.secondary }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Cards Grid — Why Us */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: theme.palette.background.default }}>
        <div className="container-custom max-w-6xl relative z-10">

          <div className="mb-16 max-w-2xl text-left">
            <div className="mb-3">
              <Kicker color={theme.palette.primary.main}>Know More About Us</Kicker>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-gray-900" style={{ lineHeight: '1.2' }}>
              We Believe In Good Ideas<br />
              <span style={{ color: theme.palette.primary.main }}>Built on Flexibility & Precision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {whyChoose.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col text-left p-8 md:p-10 transition-all duration-300 rounded-[2.5rem] ${item.highlight ? 'bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] scale-100 md:scale-105 z-10' : 'bg-white/50 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold leading-tight" style={{ color: theme.palette.text.primary }}>
                    {item.title.split('\n').map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        {i !== item.title.split('\n').length - 1 && <br />}
                      </Fragment>
                    ))}
                  </h3>
                </div>
                <p className="text-sm md:text-[15px] font-medium leading-relaxed" style={{ color: theme.palette.text.secondary }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Available Now — App Download Banner */}
      <section className="py-8 md:py-12" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="container-custom">
          <div
            className="rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row items-center relative shadow-sm border"
            style={{
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
              borderColor: alpha(theme.palette.primary.main, 0.05)
            }}
          >
            {/* Left Image Side */}
            <div className="w-full md:w-[45%] lg:w-[45%] py-6 px-6 md:py-8 md:pl-8 lg:pl-12 md:pr-4 flex justify-center md:justify-end items-center self-stretch">
              <motion.img
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src={downapk}
                alt="Trackify App on Mobile"
                className="w-[90%] md:w-[100%] max-w-[390px] h-auto object-contain object-center md:object-right md:translate-x-4 lg:translate-x-8"
              />
            </div>

            {/* Right Content Side */}
            <div className="w-full md:w-[55%] lg:w-[55%] p-6 md:px-10 md:py-8 lg:py-10 lg:pr-16 lg:pl-8 flex flex-col items-start justify-center text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-3">
                  <Kicker color={theme.palette.primary.main}>Available Now</Kicker>
                </div>
                <h2 className="text-3xl md:text-3xl lg:text-4xl xl:text-[2.75rem] lg:whitespace-nowrap font-extrabold tracking-tight mb-2 md:mb-3" style={{ color: theme.palette.text.primary }}>
                  Download Our Mobile App
                </h2>
                <p className="text-sm md:text-base mb-8 font-medium leading-relaxed max-w-md" style={{ color: theme.palette.text.secondary }}>
                  Get full control with Team Trackify on your mobile device. Track visits, manage teams and stay connected from anywhere.
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAppStoreClick}
                    className="text-white p-3.5 sm:p-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-md min-w-[170px]"
                    style={{ backgroundColor: theme.palette.grey[900] }}
                  >
                    <FaApple size={26} />
                    <div className="text-left">
                      <div className="text-[9px] opacity-90 leading-tight mb-0.5">Download on the</div>
                      <div className="text-[15px] font-bold leading-tight">App Store</div>
                    </div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handlePlayStoreClick}
                    className="text-white p-3.5 sm:p-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-md min-w-[170px]"
                    style={{ backgroundColor: theme.palette.grey[900] }}
                  >
                    <FaGooglePlay size={22} />
                    <div className="text-left">
                      <div className="text-[9px] opacity-90 leading-tight mb-0.5">GET IT ON</div>
                      <div className="text-[15px] font-bold leading-tight">Google Play</div>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Closing CTA & Footer Wrapper */}
      <div style={{ backgroundColor: alpha(theme.palette.primary.main, 0.04) }}>
        
        {/* Closing CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
              
              {/* Left: Text */}
              <div className="flex flex-col items-start text-left max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight mb-4 leading-[1.4]" style={{ color: theme.palette.text.primary }}>
                  Ready to Get Started with <br />
                  <span style={{ color: theme.palette.primary.main, position: 'relative', display: 'inline-block', marginTop: '0.2em' }}>
                    Team Trackify?
                    {/* <svg className="absolute w-full h-3 -bottom-1 left-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke={theme.palette.primary.main} strokeWidth="3" fill="transparent" strokeLinecap="round"/>
                    </svg> */}
                  </span>
                </h2>
                <p className="text-sm md:text-[15px] leading-relaxed mt-2" style={{ color: theme.palette.text.secondary }}>
                  Join thousands of businesses who trust Team Trackify for smarter tracking and stronger results.
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="flex-shrink-0 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/pricing')}
                  className="font-bold px-8 py-4 rounded-md transition-all duration-300 text-[15px] inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                >
                  Get Started Today
                </motion.button>
              </div>

            </div>
          </div>
        </section>

        {/* Dashed Separator */}
        <div className="w-full border-t border-dashed" style={{ borderColor: alpha(theme.palette.text.primary, 0.2) }} />

        {/* Footer */}
        <Footer />
        
      </div>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
