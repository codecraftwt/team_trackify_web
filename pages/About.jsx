// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useTheme, alpha } from '@mui/material';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import {
//   FaRoute,
//   FaMapMarkedAlt,
//   FaCamera,
//   FaCheckCircle,
//   FaChartLine,
//   FaUsers,
//   FaShieldAlt,
//   FaHandshake,
//   FaHeadset,
// } from 'react-icons/fa';
// import GroupsIcon from '@mui/icons-material/Groups';
// import TargetIcon from '@mui/icons-material/TrackChanges';
// import LightbulbIcon from '@mui/icons-material/Lightbulb';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import mobileImage from '../assets/mobile.png';

// const About = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <FaMapMarkedAlt size={32} />,
//       title: 'Real-Time Live Tracking',
//       description:
//         "Instant visibility of your team's movement with a dynamic map interface.",
//       gradient: 'from-blue-50 to-blue-100',
//       iconColor: theme.palette.primary.main,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//     },
//     {
//       icon: <FaRoute size={32} />,
//       title: 'Route History & Playback',
//       description:
//         'Replay the day. Analyze routes. Optimize performance.',
//       gradient: 'from-purple-50 to-purple-100',
//       iconColor: '#8B5CF6',
//       bgColor: alpha('#8B5CF6', 0.1),
//     },
//     {
//       icon: <FaCamera size={32} />,
//       title: 'Geo-Tagged Photo Verification',
//       description:
//         'On-site photos automatically stamped with exact location data. Proof that builds trust — internally and externally.',
//       gradient: 'from-green-50 to-green-100',
//       iconColor: '#22c55e',
//       bgColor: alpha('#22c55e', 0.1),
//     },
//   ];

//   const perfectFor = [
//     '🎯 Field Sales Teams',
//     '💳 Collection Agents',
//     '🔧 Service Engineers',
//     '📢 Marketing Executives',
//     '📋 Survey & Inspection Teams',
//     '🚚 Delivery & Logistics Staff',
//   ];

//   const whyChoose = [
//     {
//       icon: <FaChartLine className="text-blue-600" />,
//       label: 'Real-Time Accuracy',
//     },
//     {
//       icon: <FaShieldAlt className="text-blue-600" />,
//       label: 'Secure & Reliable Data',
//     },
//     {
//       icon: <FaHandshake className="text-blue-600" />,
//       label: 'Easy to Use Interface',
//     },
//     {
//       icon: <FaUsers className="text-blue-600" />,
//       label: 'Scalable for Growing Teams',
//     },
//     {
//       icon: <FaHeadset className="text-blue-600" />,
//       label: 'Dedicated Support',
//     },
//   ];

//   const empowermentList = [
//     'Monitor live employee locations',
//     'Review exact routes followed during the day',
//     'Capture geo-verified photo proof of every visit',
//     'Maintain accurate, tamper-resistant records',
//     'Improve accountability without constant follow-ups',
//   ];

//   const values = [
//     {
//       icon: <GroupsIcon sx={{ fontSize: 48 }} />,
//       title: 'Team First',
//       description: 'We believe in empowering teams with the tools they need to succeed.',
//       color: theme.palette.primary.main,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//     },
//     {
//       icon: <TargetIcon sx={{ fontSize: 48 }} />,
//       title: 'Innovation',
//       description: 'Constantly pushing boundaries to deliver cutting-edge solutions.',
//       color: '#8B5CF6',
//       bgColor: alpha('#8B5CF6', 0.1),
//     },
//     {
//       icon: <LightbulbIcon sx={{ fontSize: 48 }} />,
//       title: 'Excellence',
//       description: 'Committed to delivering the highest quality products and services.',
//       color: '#EAB308',
//       bgColor: alpha('#EAB308', 0.1),
//     },
//     {
//       icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
//       title: 'Growth',
//       description: 'Helping businesses scale and achieve their full potential.',
//       color: '#22c55e',
//       bgColor: alpha('#22c55e', 0.1),
//     },
//   ];

//   const stats = [
//     { number: '10K+', label: 'Active Users' },
//     { number: '500+', label: 'Companies' },
//     { number: '99.9%', label: 'Uptime' },
//     { number: '24/7', label: 'Support' },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
//       <Header />

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 md:pt-40 md:pb-32" style={{ 
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` 
//       }}>
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center max-w-3xl mx-auto"
//           >
//             <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-6" style={{ 
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main 
//             }}>
//               About Us
//             </div>
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: theme.palette.text.primary }}>
//               About <span style={{ color: theme.palette.primary.main }}>Team Trackify</span>
//             </h1>
//             <p className="text-xl leading-relaxed" style={{ color: theme.palette.text.secondary }}>
//               We're on a mission to revolutionize how businesses track and manage
//               their teams. With cutting-edge technology and a passion for innovation,
//               we're building the future of workforce management.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Story Section */}
//       <section className="section-padding" style={{ backgroundColor: theme.palette.background.paper }}>
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main 
//               }}>
//                 Our Story
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: theme.palette.text.primary }}>
//                 Because Field Work Demands{' '}
//                 <span style={{ color: theme.palette.primary.main }}>More Than Trust</span>
//               </h2>
//               <div className="space-y-4 text-lg leading-relaxed" style={{ color: theme.palette.text.secondary }}>
//                 <p>
//                   Team Trackify was born from a simple observation: businesses needed
//                   better tools to track and manage their field teams. Traditional
//                   solutions were clunky, expensive, and didn't provide the real-time
//                   insights modern businesses require.
//                 </p>
//                 <p>
//                   Door-to-door visits. Client meetings. On-site services. Every
//                   movement matters. Trackify empowers you to:
//                 </p>
//                 <ul className="space-y-3 mt-4">
//                   {empowermentList.map((item, index) => (
//                     <motion.li
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.4, delay: index * 0.1 }}
//                       className="flex items-start gap-3"
//                       style={{ color: theme.palette.text.secondary }}
//                     >
//                       <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: theme.palette.primary.main }} />
//                       <span>{item}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//                 <p className="mt-6 font-semibold" style={{ color: theme.palette.text.primary }}>
//                   You don't chase reports anymore —{' '}
//                   <span style={{ color: theme.palette.primary.main }}>
//                     you see everything in real time.
//                   </span>
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="rounded-2xl p-8 shadow-xl" style={{ 
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
//               }}>
//                 <div className="bg-white rounded-xl p-4 text-center">
//                   <img
//                     src={mobileImage}
//                     alt="Trackify in action"
//                     className="w-full h-auto max-h-[500px] object-contain rounded-lg"
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="section-padding" style={{ 
//         background: `linear-gradient(to bottom, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 50%, ${theme.palette.background.paper} 100%)` 
//       }}>
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-1.5 rounded-full mb-5" style={{ 
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.dark
//             }}>
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: theme.palette.primary.main }}></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.palette.primary.main }}></span>
//               </span>
//               Our Features
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: theme.palette.text.primary }}>
//               Powerful Features.{' '}
//               <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ 
//                 backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
//               }}>
//                 Zero Complexity.
//               </span>
//             </h2>
//             <p className="mt-3 max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               Built for field teams — clear, fast, and simple to use every day.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.55, delay: index * 0.14 }}
//                 whileHover={{ y: -6, scale: 1.015 }}
//                 className="group relative bg-white rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 ease-out overflow-hidden"
//                 style={{ 
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   backgroundColor: theme.palette.background.paper,
//                 }}
//               >
//                 <div
//                   className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-400"
//                   style={{ background: `linear-gradient(135deg, ${feature.bgColor} 0%, transparent 100%)` }}
//                 />

//                 <div className="p-6 md:p-7 relative z-10">
//                   <div
//                     className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow"
//                     style={{ backgroundColor: feature.bgColor }}
//                   >
//                     <div style={{ color: feature.iconColor }} className="text-3xl">
//                       {feature.icon}
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-blue-700"
//                     style={{ color: theme.palette.text.primary }}>
//                     {feature.title}
//                   </h3>

//                   <p className="leading-relaxed" style={{ color: theme.palette.text.secondary }}>
//                     {feature.description}
//                   </p>

//                   <div className="mt-5 h-0.5 w-10 rounded-full transition-all duration-400 group-hover:w-16"
//                     style={{ 
//                       backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                     }} />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Built for Businesses */}
//       <section className="section-padding" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main 
//             }}>
//               Who It's For
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
//               Built for Businesses That{' '}
//               <span style={{ color: theme.palette.primary.main }}>Operate on the Field</span>
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               Whether you manage 10 people or 1,000 — Trackify scales with your
//               operations.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="flex flex-wrap justify-center gap-3 mb-6"
//           >
//             {perfectFor.map((item, index) => (
//               <motion.span
//                 key={index}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 * index }}
//                 className="inline-flex items-center gap-2 border px-5 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer"
//                 style={{ 
//                   backgroundColor: theme.palette.background.paper,
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: theme.palette.text.secondary,
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.palette.primary.main;
//                   e.currentTarget.style.color = 'white';
//                   e.currentTarget.style.borderColor = theme.palette.primary.main;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.palette.background.paper;
//                   e.currentTarget.style.color = theme.palette.text.secondary;
//                   e.currentTarget.style.borderColor = alpha(theme.palette.divider, 0.5);
//                 }}
//               >
//                 {item}
//               </motion.span>
//             ))}
//           </motion.div>

//           <p className="text-center text-lg font-semibold" style={{ color: theme.palette.text.primary }}>
//             If your workforce moves,{' '}
//             <span style={{ color: theme.palette.primary.main }}>Trackify tracks smarter.</span>
//           </p>
//         </div>
//       </section>

//       {/* Why Choose Section */}
//       <section className="section-padding" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main 
//             }}>
//               Why Us
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
//               Why Businesses Choose{' '}
//               <span style={{ color: theme.palette.primary.main }}>Team Trackify</span>
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               The reasons that make us the preferred choice for field team management
//             </p>
//           </motion.div>

//           <div className="flex flex-wrap justify-center gap-4 mb-8">
//             {whyChoose.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.03, y: -2 }}
//                 initial={{ opacity: 0, y: 15 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 * index }}
//                 className="flex items-center gap-3 border px-5 py-3 rounded-xl transition-all duration-300"
//                 style={{ 
//                   backgroundColor: theme.palette.background.paper,
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                 }}
//               >
//                 <span style={{ color: theme.palette.primary.main }}>{item.icon}</span>
//                 <span className="font-semibold" style={{ color: theme.palette.text.primary }}>{item.label}</span>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <div className="w-20 h-1 mx-auto mb-6 rounded-full" style={{ 
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
//             }}></div>
//             <h4 className="text-2xl font-bold" style={{ color: theme.palette.text.primary }}>
//               Smarter Tracking. Stronger Teams.{' '}
//               <span style={{ color: theme.palette.primary.main }}>Better Results.</span>
//             </h4>
//           </motion.div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="section-padding" style={{ backgroundColor: theme.palette.background.paper }}>
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
//               Our Values
//             </h2>
//             <p className="text-xl max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               The principles that guide everything we do
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//                 className="card text-center hover:shadow-xl transition-shadow duration-300"
//                 style={{ backgroundColor: theme.palette.background.paper }}
//               >
//                 <div
//                   className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4"
//                   style={{ backgroundColor: value.bgColor, color: value.color }}
//                 >
//                   {value.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
//                   {value.title}
//                 </h3>
//                 <p style={{ color: theme.palette.text.secondary }}>{value.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="section-padding text-white" style={{ 
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
//       }}>
//         <div className="container-custom text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Mission</h2>
//             <p className="text-xl leading-relaxed" style={{ color: alpha('#ffffff', 0.9) }}>
//               To empower businesses of all sizes with powerful, intuitive tools that
//               help them track, manage, and optimize their teams. We believe that
//               technology should make work easier, not harder, and we're committed to
//               building solutions that truly make a difference.
//             </p>
//             <div className="mt-8 flex flex-wrap justify-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/pricing')}
//                 className="font-bold px-8 py-3 rounded-full transition-colors"
//                 style={{ 
//                   backgroundColor: 'white',
//                   color: theme.palette.primary.main,
//                 }}
//               >
//                 View Pricing
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/contact')}
//                 className="font-bold px-8 py-3 rounded-full transition-colors"
//                 style={{ 
//                   border: `2px solid white`,
//                   color: 'white',
//                   backgroundColor: 'transparent',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = 'white';
//                   e.currentTarget.style.color = theme.palette.primary.main;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.color = 'white';
//                 }}
//               >
//                 Get in Touch
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default About;




import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material';
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
  const theme = useTheme();
  const navigate = useNavigate();

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

  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 36 }} />,
      title: 'Team First',
      description: 'We believe in empowering teams with the tools they need to succeed.',
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      icon: <TargetIcon sx={{ fontSize: 36 }} />,
      title: 'Innovation',
      description: 'Constantly pushing boundaries to deliver cutting-edge solutions.',
      color: '#8B5CF6',
      bgColor: alpha('#8B5CF6', 0.1),
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 36 }} />,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality products and services.',
      color: '#EAB308',
      bgColor: alpha('#EAB308', 0.1),
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 36 }} />,
      title: 'Growth',
      description: 'Helping businesses scale and achieve their full potential.',
      color: '#22c55e',
      bgColor: alpha('#22c55e', 0.1),
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '500+', label: 'Companies' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24" style={{ 
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` 
      }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-4" style={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main 
            }}>
              About Us
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
              About <span style={{ color: theme.palette.primary.main }}>Team Trackify</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: theme.palette.text.secondary }}>
              We're on a mission to revolutionize how businesses track and manage
              their teams. With cutting-edge technology and a passion for innovation,
              we're building the future of workforce management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding py-12 md:py-16" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main 
              }}>
                Our Story
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Because Field Work Demands{' '}
                <span style={{ color: theme.palette.primary.main }}>More Than Trust</span>
              </h2>
              <div className="space-y-3 text-base leading-relaxed" style={{ color: theme.palette.text.secondary }}>
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
                <ul className="space-y-2 mt-3">
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
                <p className="mt-4 font-semibold text-sm" style={{ color: theme.palette.text.primary }}>
                  You don't chase reports anymore —{' '}
                  <span style={{ color: theme.palette.primary.main }}>
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
              <div className="rounded-xl p-6 shadow-lg" style={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
              }}>
                <div className="bg-white rounded-lg p-3 text-center">
                  <img
                    src={mobileImage}
                    alt="Trackify in action"
                    className="w-full h-auto max-h-[450px] object-contain rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Our Features
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
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-400"
                  style={{ background: `linear-gradient(135deg, ${feature.bgColor} 0%, transparent 100%)` }}
                />

                <div className="p-4 md:p-5 relative z-10">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ backgroundColor: feature.bgColor }}
                  >
                    <div style={{ color: feature.iconColor }} className="text-xl">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold mb-2 transition-colors group-hover:text-blue-700"
                    style={{ color: theme.palette.text.primary }}>
                    {feature.title}
                  </h3>

                  <p className="leading-relaxed text-sm" style={{ color: theme.palette.text.secondary }}>
                    {feature.description}
                  </p>

                  <div className="mt-3 h-0.5 w-8 rounded-full transition-all duration-400 group-hover:w-12"
                    style={{ 
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    }} />
                </div>
              </motion.div>
            ))}
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
            <p className="text-base max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
              The reasons that make us the preferred choice for field team management
            </p>
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
            <h4 className="text-lg font-bold" style={{ color: theme.palette.text.primary }}>
              Smarter Tracking. Stronger Teams.{' '}
              <span style={{ color: theme.palette.primary.main }}>Better Results.</span>
            </h4>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding py-12 md:py-16" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme.palette.text.primary }}>
              Our Values
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: theme.palette.text.secondary }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="card text-center hover:shadow-md transition-shadow duration-300 p-5 rounded-lg"
                style={{ backgroundColor: theme.palette.background.paper }}
              >
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: value.bgColor, color: value.color }}
                >
                  {value.icon}
                </div>
                <h3 className="text-base font-semibold mb-1" style={{ color: theme.palette.text.primary }}>
                  {value.title}
                </h3>
                <p className="text-sm" style={{ color: theme.palette.text.secondary }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding py-12 md:py-16 text-white" style={{ 
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
      }}>
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-base leading-relaxed" style={{ color: alpha('#ffffff', 0.9) }}>
              To empower businesses of all sizes with powerful, intuitive tools that
              help them track, manage, and optimize their teams. We believe that
              technology should make work easier, not harder, and we're committed to
              building solutions that truly make a difference.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/pricing')}
                className="font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
                style={{ 
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                }}
              >
                View Pricing
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