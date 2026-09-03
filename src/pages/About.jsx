import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme, alpha, Box, Typography, Button, Container, Grid } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { FaCheckCircle, FaGooglePlay, FaApple } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import GroupsIcon from '@mui/icons-material/Groups';
import TargetIcon from '@mui/icons-material/TrackChanges';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import aboutImage from '../assets/About_Section.jpg';
import mobileImage from '../assets/About.png';
import manImage from '../assets/man1.jpg';
import yearlyImage from '../assets/yearly.png';
import whiteBg from '../assets/white-bg.png';
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

const About = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const empowermentList = [
    'Monitor live employee locations seamlessly',
    'Review exact routes followed during the day',
    'Maintain accurate, tamper-resistant records',
    'Improve accountability without constant follow-ups',
  ];

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 28 }} />,
      title: 'Team First',
      description: 'We believe in empowering field teams with tools that make their jobs easier, not harder.',
      color: theme.palette.primary.main,
    },
    {
      icon: <TargetIcon sx={{ fontSize: 28 }} />,
      title: 'Absolute Transparency',
      description: 'Building trust through clear, undeniable data and real-time visibility for everyone involved.',
      color: '#8B5CF6',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 28 }} />,
      title: 'Speed & Efficiency',
      description: 'Optimizing routes and reducing administrative overhead so your team can focus on real work.',
      color: '#EAB308',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
      title: 'Continuous Growth',
      description: 'Providing the insights and analytics needed to scale operations predictably and profitably.',
      color: '#22c55e',
    },
  ];

  const stats = [
    { value: 10, suffix: 'K+', label: 'Active Users', decimals: 0 },
    { value: 500, suffix: '+', label: 'Companies', decimals: 0 },
    { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
    { value: 24, suffix: '/7', label: 'Support', decimals: 0 },
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: theme.palette.background.paper }}>
      <Header />

      {/* 1. Hero Section */}
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 bg-[#f5fbff]">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="font-medium text-sm tracking-wide" style={{ color: theme.palette.primary.main }}>About Team Trackify</div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] text-[#0f172a]">
                Transform Your <br />
                <span className="relative inline-block z-10">
                  Field Operations
                  <svg className="absolute -bottom-3 left-0 w-full h-5 -z-10" style={{ color: theme.palette.primary.main }} viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M2,15 Q25,5 50,12 T98,15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
                We're on a mission to bring unprecedented clarity, efficiency, and trust to businesses managing distributed workforces.
              </p>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                className="group text-white font-bold text-base px-8 py-3.5 rounded-md flex items-center gap-2 transition-shadow duration-300 w-max"
                style={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                }}
              >
                Discover More
                {/* <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" /> */}
              </motion.button>
            </motion.div>

            {/* Right Column: Images & Mockups */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full flex items-center justify-center lg:justify-end gap-3 min-[380px]:gap-6 sm:gap-8 lg:gap-10 mt-12 lg:mt-0"
            >

              {/* Main Image in Pill (The "1" shape - Narrow & Tall) */}
              <div className="w-[100px] min-[380px]:w-[130px] sm:w-[170px] md:w-[200px] h-[230px] min-[380px]:h-[300px] sm:h-[400px] md:h-[460px] rounded-[150px] overflow-hidden shadow-2xl relative z-10 flex-shrink-0 border-4 border-white">
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none z-10" />
                <img src={manImage} className="w-full h-full object-cover object-top" alt="Team Trackify App" />
              </div>

              {/* Light Blue Pill Container (The "0" shape - Rounded Rectangle) */}
              <div className="w-[150px] min-[380px]:w-[190px] sm:w-[280px] md:w-[320px] h-[220px] min-[380px]:h-[280px] sm:h-[380px] md:h-[440px] bg-[#d3efff] relative shadow-sm flex-shrink-0 flex flex-col items-center justify-center" style={{ borderRadius: '80px' }}>

                {/* Floating Card 1: Chart */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 w-28 sm:w-36 shadow-xl absolute top-[12%] -left-[12%] sm:-left-[8%] z-20">
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke={theme.palette.primary.main} strokeWidth="3.5" strokeDasharray="75, 100" />
                      <path d="M18 33.9155 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="25, 100" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-extrabold text-[10px] sm:text-xs" style={{ color: theme.palette.primary.main }}>10K+</div>
                  </div>
                  <div className="text-center text-[9px] sm:text-[10px] font-bold text-gray-700">Active Users</div>
                </div>

                {/* Floating Card 2: Notification */}
                <div className="bg-white rounded-[1rem] sm:rounded-[1.25rem] p-2 sm:p-3 w-40 sm:w-52 shadow-xl absolute bottom-[18%] -left-[15%] sm:-left-[10%] z-20 flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold flex-shrink-0 text-[10px] sm:text-xs">
                    S
                  </div>
                  <div className="text-[8px] sm:text-[10px] leading-tight">
                    <span className="font-bold text-gray-800 block">Sarah Manager</span>
                    <span className="text-gray-500">has assigned a new route</span>
                  </div>
                  <div className="absolute -right-2 -bottom-2 sm:-right-3 sm:-bottom-3 w-6 h-6 sm:w-8 sm:h-8 bg-[#ef4444] rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                  </div>
                </div>

                {/* Mock Bar Chart Inside */}
                <div className="bg-white rounded-xl p-2 sm:p-3 w-24 sm:w-32 absolute right-[0%] sm:right-[5%] top-[30%] shadow-md">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <img src="https://i.pravatar.cc/100?img=1" className="w-full h-full object-cover" alt="avatar" />
                    </div>
                    <div className="text-[7px] sm:text-[8px] font-bold leading-tight">
                      Kirsten Peters<br /><span className="text-gray-400 font-normal">2 Days Ago</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between h-8 sm:h-12 gap-[2px] mb-1">
                    {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                      <div key={i} className={`w-1 sm:w-1.5 rounded-t-sm transition-all duration-500 hover:h-full ${i % 2 === 0 ? 'bg-[#1e40af]' : 'bg-[#e2e8f0]'}`} style={{ height: `${h}%`, backgroundColor: i % 2 === 0 ? theme.palette.primary.main : undefined }} />
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden bg-white relative">
        {/* Soft Radial Background */}
        <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none blur-3xl" style={{ backgroundColor: theme.palette.primary.main }} />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center">

            {/* Left Column: Image & Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg mx-auto lg:max-w-none"
            >
              {/* Dotted Pattern Background */}
              <div
                className="absolute -top-10 -left-10 w-40 h-40 opacity-20 z-0 hidden sm:block"
                style={{
                  backgroundImage: `radial-gradient(${theme.palette.primary.main} 2px, transparent 2px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Main Circular Image */}
              <div
                className="relative z-10 w-[95%] sm:w-[90%] mx-auto aspect-square overflow-hidden bg-gray-100 shadow-xl"
                style={{ borderRadius: '50% 50% 50% 50%' }}
              >
                <img
                  src={aboutImage}
                  alt="Team collaborating"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'left' }}
                />
              </div>

              {/* Floating Performance Card */}
              <div
                className="absolute -bottom-6 -right-2 sm:-right-6 w-56 sm:w-64 rounded-2xl shadow-2xl p-4 sm:p-5 z-20 border border-white/20"
                style={{ background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})` }}
              >
                <div className="text-white/90 text-[11px] sm:text-xs font-semibold mb-1 tracking-wider uppercase">Live Sync</div>
                <div className="text-white font-bold text-sm sm:text-base mb-4 flex items-center justify-between">
                  <span>Update Speed</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs">0.5s ↑</span>
                </div>

                {/* Mock Line Chart */}
                <div className="relative h-20 sm:h-24 w-full flex items-end">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between opacity-20">
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                  </div>
                  {/* SVG Line */}
                  <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible z-10 drop-shadow-md" preserveAspectRatio="none">
                    <path
                      d="M0,30 L15,15 L30,25 L45,10 L60,35 L75,15 L85,25 L100,5"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Data Points */}
                    <circle cx="45" cy="10" r="3" fill="white" />
                    <circle cx="75" cy="15" r="3" fill="white" />
                    <circle cx="100" cy="5" r="3" fill="white" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Text & Features */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-6"
            >
              <div className="mb-1">
                <Kicker color={theme.palette.primary.main}>Our Story</Kicker>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold mb-3 md:mb-4 text-gray-900" style={{ lineHeight: '1.2' }}>
                Empowering Field Teams <br className="hidden lg:block" />
                <span style={{ color: theme.palette.primary.main }}>With Absolute Clarity</span>
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6 lg:mb-8">
                We built Team Trackify to eliminate the endless "Where are you?" phone calls. Our platform captures the truth of fieldwork automatically, giving you total visibility without burdening your team.
              </p>

              <ul className="space-y-4 pl-0 m-0 list-none">
                {[
                  "Monitor live employee locations",
                  "Review exact routes followed during the day",
                  "Maintain accurate, tamper-resistant records",
                  "Improve accountability without constant follow-ups"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      <FaCheckCircle size={16} />
                    </div>
                    <span className="text-gray-700 text-[15px] sm:text-base font-medium leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. By the Numbers (Apptek Style Redesign) */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-slate-50">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-12 lg:gap-20 items-center">

            {/* Left Side: Mock Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto w-full max-w-sm lg:max-w-[420px]"
            >
              {/* Main Card Image */}
              <div className="relative z-10 w-full">
                <img
                  src={yearlyImage}
                  alt="Yearly Statistics"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Right Side: Text & Stats */}
            <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start lg:items-center">

              {/* Title & Desc */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex-1 border-l-[4px] pl-6 lg:pl-8 py-2"
                style={{ borderColor: theme.palette.primary.main }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-medium mb-6 text-gray-900 max-w-[400px]" style={{ lineHeight: '1.2' }}>
                  Our Growing Traction
                </h2>
                <p className="text-gray-500 text-[15px] leading-relaxed max-w-sm">
                  Discover how our platform is transforming field operations and boosting efficiency across the industry.
                </p>
              </motion.div>

              {/* Stats List */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-8 min-w-[200px]"
              >
                {stats.slice(0, 3).map((s, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="text-[28px] font-medium text-gray-900 min-w-[75px]">
                      <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                    </div>
                    <div className="text-[15px] text-gray-500 whitespace-nowrap">
                      {s.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Values Grid (Apptek Style) */}
      <section className="py-12 md:py-16 bg-slate-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <Kicker color={theme.palette.primary.main} center>Our Values</Kicker>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold mb-5 text-gray-900 mx-auto" style={{ lineHeight: '1.2' }}>
              The Principles That Guide <br className="hidden lg:block" />
              <span style={{ color: theme.palette.primary.main }}>Everything We Do</span>
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed px-4">
              We believe in empowering field teams with tools that make their jobs easier, not harder, building trust through clear and undeniable data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl py-6 px-8 lg:py-7 lg:px-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-start gap-5 lg:gap-6">
                  <div
                    className="w-[52px] h-[52px] lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-lg lg:text-xl shadow-md"
                    style={{ backgroundColor: theme.palette.primary.main }}
                  >
                    0{index + 1}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl md:text-[22px] font-semibold text-gray-900 leading-tight mb-3">
                      {value.title.split(' ').map((word, i, arr) => (
                        <span key={i} style={i === arr.length - 1 ? { color: theme.palette.primary.main } : {}}>
                          {word}{' '}
                        </span>
                      ))}
                    </h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 Built for the Real World (Apptek Style) */}
      <section className="py-12 md:py-16 overflow-hidden relative" style={{ backgroundColor: '#f4f8fc' }}>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left Side: Staggered Tilted Cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[580px] mx-auto lg:mx-0 flex items-center justify-center lg:pr-8 my-10 lg:my-0"
            >
              {/* Background decorative blob (Soft Purple/Blue) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] bg-gradient-to-tr from-[#edf2ff] to-[#f8faff] rounded-[4rem] rotate-[10deg] z-0" />

              {/* Dashed line graphic */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] pt-[100%] border-[2px] border-dashed border-[#c7d2fe] rounded-full rotate-[-15deg] z-0" />

              {/* Tiny decorative shapes */}
              <div className="absolute top-[10%] left-[20%] w-3 h-3 bg-blue-500 rounded-sm rotate-45 z-10" />
              <div className="absolute bottom-[5%] left-[35%] w-2.5 h-2.5 bg-green-500 rounded-full z-10" />              {/* Cards Container (Flex Staggered) */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center px-4">

                {/* Left Column (User Analytics style) */}
                <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-[270px] sm:max-w-none sm:w-[320px]">
                  <div
                    className="p-[60px_25px] sm:p-[103px_50px_85px_50px] transform hover:-translate-y-2 transition-transform duration-300 relative bg-top bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${whiteBg})` }}
                  >
                    <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#fff8e1', color: '#ffb300' }}>
                      <BatteryChargingFullIcon sx={{ fontSize: 26 }} className="scale-75 sm:scale-100" />
                    </div>
                    <h4 className="font-semibold mb-2 text-[18px] sm:text-[20px] text-gray-900 leading-tight">Battery Optimized</h4>
                    <p className="text-[14px] sm:text-[15px] text-gray-500 leading-[1.6]">Minimal drain on mobile devices during shifts.</p>
                  </div>
                </div>

                {/* Right Column (Clean Design & Smart Coding style) */}
                <div className="flex flex-col gap-0 w-full max-w-[270px] sm:max-w-none sm:w-[320px] ml-0 sm:-ml-4 mt-0 sm:mt-0">
                  <div
                    className="p-[60px_25px] sm:p-[103px_50px_85px_50px] transform hover:-translate-y-2 transition-transform duration-300 relative bg-top bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${whiteBg})` }}
                  >
                    <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#ffebee', color: '#ef5350' }}>
                      <WifiOffIcon sx={{ fontSize: 26 }} className="scale-75 sm:scale-100" />
                    </div>
                    <h4 className="font-semibold mb-2 text-[18px] sm:text-[20px] text-gray-900 leading-tight">Offline Mode</h4>
                    <p className="text-[14px] sm:text-[15px] text-gray-500 leading-[1.6]">Keeps tracking even when signal drops entirely.</p>
                  </div>

                  <div
                    className="-mt-4 sm:-mt-16 p-[60px_25px] sm:p-[103px_50px_85px_50px] transform hover:-translate-y-2 transition-transform duration-300 relative bg-top bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${whiteBg})` }}
                  >
                    <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#e3f2fd', color: '#42a5f5' }}>
                      <PrivacyTipIcon sx={{ fontSize: 26 }} className="scale-75 sm:scale-100" />
                    </div>
                    <h4 className="font-semibold mb-2 text-[18px] sm:text-[20px] text-gray-900 leading-tight">Privacy First</h4>
                    <p className="text-[14px] sm:text-[15px] text-gray-500 leading-[1.6]">Tracking stops automatically when shifts end.</p>
                  </div>
                </div>

              </div>
            </motion.div>
            {/* Right Side: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8"
            >
              <div className="mb-1">
                <Kicker color={theme.palette.primary.main}>Our Approach</Kicker>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold mb-6 text-gray-900 max-w-[500px]" style={{ lineHeight: '1.2' }}>
                Built specifically for the <br className="hidden lg:block" />
                <span style={{ color: theme.palette.primary.main }}>people on the ground.</span>
              </h2>
              <p className="text-gray-500 text-[15.5px] leading-relaxed mb-6 max-w-[480px]">
                Most management software is built for people sitting behind desks. We built Team Trackify specifically for the people actually doing the work in the field.
              </p>
              <p className="text-gray-500 text-[15.5px] leading-relaxed mb-10 max-w-[480px]">
                It's lightweight, respects privacy, and never gets in the way of getting the job done.
              </p>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/pricing')}
                className="group text-white font-bold text-base px-8 py-3.5 rounded-md flex items-center justify-center gap-2 transition-shadow duration-300 w-max"
                style={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 6. App Download CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-24 text-white bg-[#030b21]">
        {/* Decorative Elements */}

        {/* Top Right Circles */}
        <div className="absolute -top-[50%] -right-[15%] w-[600px] h-[600px] rounded-full bg-transparent border-[60px] border-[#0a183d] pointer-events-none" />
        <div className="absolute -top-[30%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#0a183d] pointer-events-none" />

        {/* Bottom Left Circle */}
        <div className="absolute -bottom-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#0a183d] pointer-events-none" />

        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto relative"
          >

            {/* Dots Grid */}
            <div className="absolute -top-10 right-[15%] hidden md:block">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[0, 8, 16, 24].map(x => [0, 8, 16, 24].map(y => <circle key={`${x}-${y}`} cx={x + 3} cy={y + 3} r="1.5" fill="#2d4076" />))}
              </svg>
            </div>

            <div className="mb-1 text-white">
              <Kicker color="#ffffff" center>Try For Free Application</Kicker>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-10 text-white leading-tight">
              Take Team Trackify With You
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="https://apps.apple.com/in/app/team-trackify/id6744400871" target="_blank" rel="noopener noreferrer" className="flex items-center border border-white/30 hover:bg-white/10 transition-colors rounded-[2.5rem] px-8 py-3 min-w-[220px] group text-white hover:text-white no-underline">
                <FaApple className="text-[2.1rem] mr-4 text-white group-hover:scale-110 transition-transform mb-1" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-gray-300 mb-0.5">Download on the</div>
                  <div className="text-xl font-bold leading-none">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.whc_tracking" target="_blank" rel="noopener noreferrer" className="flex items-center border border-white/30 hover:bg-white/10 transition-colors rounded-[2.5rem] px-8 py-3 min-w-[220px] group text-white hover:text-white no-underline">
                <FaGooglePlay className="text-3xl mr-4 text-white group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-wider text-gray-300 mb-0.5">GET IT ON</div>
                  <div className="text-xl font-bold leading-none">Google Play</div>
                </div>
              </a>
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
