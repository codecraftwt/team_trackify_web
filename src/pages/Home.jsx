// import { useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
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
//   FaApple,
//   FaGooglePlay,
// } from 'react-icons/fa';
// import { FiArrowRight } from 'react-icons/fi';
// import landingImage from '../assets/landing.png';
// import mobileImage from '../assets/mobile.png';
// import ParticlesBackground from '../components/common/ParticlesBackground';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';

// const Home = () => {
//   const navigate = useNavigate();
//   const appDownloadRef = useRef(null);

//   const handleAppStoreClick = () => {
//     window.open(
//       'https://apps.apple.com/in/app/team-trackify/id6744400871',
//       '_blank'
//     );
//   };

//   const handlePlayStoreClick = () => {
//     window.open(
//       'https://play.google.com/store/apps/details?id=com.whc_tracking&pcampaignid=web_share',
//       '_blank'
//     );
//   };

//   const handleGetStartedClick = () => {
//     appDownloadRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const features = [
//     {
//       icon: <FaMapMarkedAlt size={32} />,
//       title: 'Real-Time Live Tracking',
//       description:
//         "Instant visibility of your team's movement with a dynamic map interface.",
//       gradient: 'from-primary-50 to-primary-100',
//       iconColor: 'text-primary-600',
//     },
//     {
//       icon: <FaRoute size={32} />,
//       title: 'Route History & Playback',
//       description:
//         'Replay the day. Analyze routes. Optimize performance.',
//       gradient: 'from-purple-50 to-purple-100',
//       iconColor: 'text-purple-600',
//     },
//     {
//       icon: <FaCamera size={32} />,
//       title: 'Geo-Tagged Photo Verification',
//       description:
//         'On-site photos automatically stamped with exact location data. Proof that builds trust — internally and externally.',
//       gradient: 'from-green-50 to-green-100',
//       iconColor: 'text-green-600',
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
//       icon: <FaChartLine className="text-primary-600" />,
//       label: 'Real-Time Accuracy',
//     },
//     {
//       icon: <FaShieldAlt className="text-primary-600" />,
//       label: 'Secure & Reliable Data',
//     },
//     {
//       icon: <FaHandshake className="text-primary-600" />,
//       label: 'Easy to Use Interface',
//     },
//     {
//       icon: <FaUsers className="text-primary-600" />,
//       label: 'Scalable for Growing Teams',
//     },
//     {
//       icon: <FaHeadset className="text-primary-600" />,
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

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* Hero Section */}
//       <section className="min-h-[100vh] flex items-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20 md:py-22">
  
//         {/* ── Background animation ── */}
//         <ParticlesBackground />

//         <div className="container-custom relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="max-w-4xl mx-auto text-center"
//             >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
//               Track Every Move.{' '}
//               <span className="text-gradient">Prove Every Visit.</span>
//               <br className="hidden sm:block" /> Lead With Confidence.
//             </h1>

//             <h5 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
//               Team Trackify – The Smart Way to Manage Field Teams
//             </h5>

//             <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
//               When your employees are on the ground, your visibility shouldn't disappear. 
//               Real-time workforce tracking, verified visit proof, and complete operational control — all from one intelligent platform.
//             </p>

//             <p className="text-xl md:text-2xl text-gray-800 font-medium mb-10">
//               No assumptions. No blind spots. Just{' '}
//               <span className="text-gradient italic font-bold">clarity</span>.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={handleGetStartedClick}
//                 className="btn-primary text-lg px-10 py-4 flex items-center gap-2 shadow-lg"
//               >
//                 Get Started <FiArrowRight />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate('/contact')}
//                 className="btn-outline text-lg px-10 py-4"
//               >
//                 Book a Live Demo
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Because Field Work Demands More */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="order-2 lg:order-1"
//             >
//               <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
//                 Why Trackify?
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Because Field Work Demands{' '}
//                 <span className="text-primary-600">More Than Trust</span>
//               </h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Door-to-door visits. Client meetings. On-site services. Every
//                 movement matters. Trackify empowers you to:
//               </p>
//               <ul className="space-y-3">
//                 {empowermentList.map((item, index) => (
//                   <motion.li
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className="flex items-start gap-3 text-gray-700"
//                   >
//                     <FaCheckCircle className="text-primary-600 mt-1 flex-shrink-0" />
//                     <span>{item}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//               <p className="mt-6 text-lg font-semibold text-gray-900">
//                 You don't chase reports anymore —{' '}
//                 <span className="text-primary-600">
//                   you see everything in real time.
//                 </span>
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="order-1 lg:order-2"
//             >
              
//                 <div className="bg-white p-2 text-center">
//                   <img
//                     src={mobileImage}
//                     alt="Trackify in action"
//                     className="w-full h-auto max-h-[500px] object-contain rounded-lg"
//                   />
//                 </div>
          
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Built for Businesses */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
//               Who It's For
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Built for Businesses That{' '}
//               <span className="text-primary-600">Operate on the Field</span>
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
//                 className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-full font-medium hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 cursor-pointer"
//               >
//                 {item}
//               </motion.span>
//             ))}
//           </motion.div>

//           <p className="text-center text-lg font-semibold text-gray-700">
//             If your workforce moves,{' '}
//             <span className="text-primary-600">Trackify tracks smarter.</span>
//           </p>
//         </div>
//       </section>

//       {/* Powerful Features */}
//       <section className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white">
//   <div className="container-custom">
//     {/* Heading block - kept original scale */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.7 }}
//       className="text-center mb-12"
//     >
//       <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-5">
//         <span className="relative flex h-2 w-2">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-60"></span>
//           <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
//         </span>
//         Features
//       </div>

//       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
//         Powerful Features.{' '}
//         <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
//           Zero Complexity.
//         </span>
//       </h2>

//       {/* Optional small subtitle – remove if you prefer exact original */}
//       <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
//         Built for field teams — clear, fast, and simple to use every day.
//       </p>
//     </motion.div>

//     {/* Cards – same grid, same visual footprint as original */}
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {features.map((feature, index) => (
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.55, delay: index * 0.14 }}
//           whileHover={{ y: -6, scale: 1.015 }}
//           className={`
//             group relative bg-white rounded-xl border border-gray-100 
//             shadow-sm hover:shadow-lg hover:border-primary-200/60
//             transition-all duration-300 ease-out overflow-hidden
//           `}
//         >
//           {/* Very subtle hover gradient */}
//           <div className={`
//             absolute inset-0 bg-gradient-to-br ${feature.gradient} 
//             opacity-0 group-hover:opacity-25 transition-opacity duration-400
//           `} />

//           <div className="p-6 md:p-7 relative z-10">
//             {/* Icon – kept original w-16 h-16 */}
//             <div className={`
//               w-16 h-16 rounded-xl 
//               bg-gradient-to-br ${feature.gradient} 
//               flex items-center justify-center mb-5 
//               shadow-sm group-hover:shadow-md transition-shadow
//             `}>
//               <div className={`text-3xl ${feature.iconColor}`}>
//                 {feature.icon}
//               </div>
//             </div>

//             <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
//               {feature.title}
//             </h3>

//             <p className="text-gray-600 leading-relaxed">
//               {feature.description}
//             </p>

//             {/* Tiny visual cue at bottom – optional, very subtle */}
//             <div className="mt-5 h-0.5 w-10 bg-primary-200/50 group-hover:w-16 group-hover:bg-primary-500 rounded-full transition-all duration-400" />
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>

//       {/* App Download Section */}
//       <section
//         className="section-padding bg-gray-50"
//         ref={appDownloadRef}
//       >
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="relative">
//                 <div className="relative bg-white p-2">
//                   <img
//                     src={mobileImage}
//                     alt="App Screenshot"
//                     className="w-full h-auto max-h-[550px] object-contain rounded-xl"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
//                 Available Now
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Download Our Mobile App
//               </h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 Get the full Trackify experience on your mobile device with our
//                 dedicated iOS and Android apps.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleAppStoreClick}
//                   className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors"
//                 >
//                   <FaApple size={24} />
//                   <div className="text-left">
//                     <div className="text-xs">Download on the</div>
//                     <div className="text-base font-semibold">App Store</div>
//                   </div>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePlayStoreClick}
//                   className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors"
//                 >
//                   <FaGooglePlay size={24} />
//                   <div className="text-left">
//                     <div className="text-xs">Get it on</div>
//                     <div className="text-base font-semibold">Google Play</div>
//                   </div>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Performance Section */}
//       <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//         <div className="container-custom text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <div className="inline-block bg-white/10 text-primary-300 font-semibold text-sm px-4 py-2 rounded-full mb-4">
//               Performance Driven
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Turn Movement Into{' '}
//               <span className="text-primary-400">Measurable Performance</span>
//             </h2>
//             <p className="text-lg text-gray-300 mb-4 leading-relaxed">
//               Tracking isn't about surveillance. It's about smarter coordination,
//               improved productivity, and stronger results.
//             </p>
//             <p className="text-base text-gray-400">
//               Trackify transforms field operations into structured, data-driven
//               performance.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding bg-gradient-primary text-white">
//         <div className="container-custom text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Ready to Take Control of Your Field Operations?
//             </h2>
//             <p className="text-lg text-primary-100 mb-2">
//               Stop relying on manual reports.
//             </p>
//             <p className="text-lg text-primary-100 mb-4">
//               Start managing with real-time clarity.
//             </p>
//             <p className="text-base text-primary-200 mb-8">
//               Team Trackify gives you the visibility, accountability, and
//               confidence your business needs to grow.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center"
//               >
//                 Start Free Trial <FiArrowRight className="ml-2" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/contact')}
//                 className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-primary-600 transition-colors"
//               >
//                 Book a Live Demo
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Why Choose Section */}
//       <section className="section-padding bg-gray-50">
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-block bg-primary-50 text-primary-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
//               Why Us
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Businesses Choose{' '}
//               <span className="text-primary-600">Team Trackify</span>
//             </h2>
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
//                 className="flex items-center gap-3 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-primary-600 hover:shadow-lg transition-all duration-300"
//               >
//                 {item.icon}
//                 <span className="font-semibold text-gray-900">{item.label}</span>
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
//             <div className="w-20 h-1 bg-gradient-primary mx-auto mb-6 rounded-full"></div>
//             <h4 className="text-2xl font-bold text-gray-900">
//               Smarter Tracking. Stronger Teams.{' '}
//               <span className="text-primary-600">Better Results.</span>
//             </h4>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Home;













// import { useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
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
//   FaApple,
//   FaGooglePlay,
// } from 'react-icons/fa';
// import { FiArrowRight } from 'react-icons/fi';
// import landingImage from '../assets/landing.png';
// import mobileImage from '../assets/mobile.png';
// import ParticlesBackground from '../components/common/ParticlesBackground';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import { useTheme, alpha } from '@mui/material';

// const Home = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const appDownloadRef = useRef(null);

//   const handleAppStoreClick = () => {
//     window.open(
//       'https://apps.apple.com/in/app/team-trackify/id6744400871',
//       '_blank'
//     );
//   };

//   const handlePlayStoreClick = () => {
//     window.open(
//       'https://play.google.com/store/apps/details?id=com.whc_tracking&pcampaignid=web_share',
//       '_blank'
//     );
//   };

//   const handleGetStartedClick = () => {
//     appDownloadRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

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

//   return (
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
//       <Header />

//       {/* Hero Section */}
//       <section className="min-h-[100vh] flex items-center relative overflow-hidden" style={{ 
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` 
//       }}>
  
//         {/* ── Background animation ── */}
//         <ParticlesBackground />

//         <div className="container-custom relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               className="max-w-4xl mx-auto text-center"
//             >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8" style={{ color: theme.palette.text.primary }}>
//               Track Every Move.{' '}
//               <span style={{ color: theme.palette.primary.main }}>Prove Every Visit.</span>
//               <br className="hidden sm:block" /> Lead With Confidence.
//             </h1>

//             <h5 className="text-xl md:text-2xl font-semibold mb-8" style={{ color: theme.palette.text.secondary }}>
//               Team Trackify – The Smart Way to Manage Field Teams
//             </h5>

//             <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               When your employees are on the ground, your visibility shouldn't disappear. 
//               Real-time workforce tracking, verified visit proof, and complete operational control — all from one intelligent platform.
//             </p>

//             <p className="text-xl md:text-2xl font-medium mb-10" style={{ color: theme.palette.text.primary }}>
//               No assumptions. No blind spots. Just{' '}
//               <span className="italic font-bold" style={{ color: theme.palette.primary.main }}>clarity</span>.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={handleGetStartedClick}
//                 className="text-white font-semibold text-lg px-10 py-4 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300"
//                 style={{ 
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 }}
//               >
//                 Get Started <FiArrowRight />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate('/contact')}
//                 className="font-semibold text-lg px-10 py-4 rounded-full transition-all duration-300"
//                 style={{ 
//                   border: `2px solid ${theme.palette.primary.main}`,
//                   color: theme.palette.primary.main,
//                   backgroundColor: 'transparent',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05)}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//               >
//                 Book a Live Demo
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Because Field Work Demands More */}
//       <section className="section-padding" style={{ backgroundColor: theme.palette.background.paper }}>
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="order-2 lg:order-1"
//             >
//               <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main 
//               }}>
//                 Why Trackify?
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
//                 Because Field Work Demands{' '}
//                 <span style={{ color: theme.palette.primary.main }}>More Than Trust</span>
//               </h2>
//               <p className="text-lg mb-6" style={{ color: theme.palette.text.secondary }}>
//                 Door-to-door visits. Client meetings. On-site services. Every
//                 movement matters. Trackify empowers you to:
//               </p>
//               <ul className="space-y-3">
//                 {empowermentList.map((item, index) => (
//                   <motion.li
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className="flex items-start gap-3"
//                     style={{ color: theme.palette.text.secondary }}
//                   >
//                     <FaCheckCircle className="mt-1 flex-shrink-0" style={{ color: theme.palette.primary.main }} />
//                     <span>{item}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//               <p className="mt-6 text-lg font-semibold" style={{ color: theme.palette.text.primary }}>
//                 You don't chase reports anymore —{' '}
//                 <span style={{ color: theme.palette.primary.main }}>
//                   you see everything in real time.
//                 </span>
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="order-1 lg:order-2"
//             >
              
//                 <div className="bg-white p-2 text-center">
//                   <img
//                     src={mobileImage}
//                     alt="Trackify in action"
//                     className="w-full h-auto max-h-[500px] object-contain rounded-lg"
//                   />
//                 </div>
          
//             </motion.div>
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

//       {/* Powerful Features */}
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
//               Features
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
//                 {/* Very subtle hover gradient */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-400"
//                   style={{ background: `linear-gradient(135deg, ${feature.bgColor} 0%, transparent 100%)` }}
//                 />

//                 <div className="p-6 md:p-7 relative z-10">
//                   <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:shadow-md transition-shadow"
//                     style={{ backgroundColor: feature.bgColor }}
//                   >
//                     <div style={{ color: feature.iconColor }} className="text-3xl">
//                       {feature.icon}
//                     </div>
//                   </div>

//                   <h3 className="text-xl font-bold mb-3 transition-colors group-hover:text-blue-700"
//                     style={{ color: theme.palette.text.primary }}
//                   >
//                     {feature.title}
//                   </h3>

//                   <p className="leading-relaxed" style={{ color: theme.palette.text.secondary }}>
//                     {feature.description}
//                   </p>

//                   <div className="mt-5 h-0.5 w-10 rounded-full transition-all duration-400 group-hover:w-16"
//                     style={{ 
//                       backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                     }}
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* App Download Section */}
//       <section
//         className="section-padding"
//         ref={appDownloadRef}
//         style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}
//       >
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="relative">
//                 <div className="relative bg-white p-2">
//                   <img
//                     src={mobileImage}
//                     alt="App Screenshot"
//                     className="w-full h-auto max-h-[550px] object-contain rounded-xl"
//                   />
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//                 backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main 
//               }}>
//                 Available Now
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
//                 Download Our Mobile App
//               </h2>
//               <p className="text-lg mb-6" style={{ color: theme.palette.text.secondary }}>
//                 Get the full Trackify experience on your mobile device with our
//                 dedicated iOS and Android apps.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleAppStoreClick}
//                   className="text-white px-6 py-3 rounded-full flex items-center gap-3 transition-colors"
//                   style={{ backgroundColor: theme.palette.grey[900] }}
//                 >
//                   <FaApple size={24} />
//                   <div className="text-left">
//                     <div className="text-xs">Download on the</div>
//                     <div className="text-base font-semibold">App Store</div>
//                   </div>
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePlayStoreClick}
//                   className="text-white px-6 py-3 rounded-full flex items-center gap-3 transition-colors"
//                   style={{ backgroundColor: theme.palette.grey[900] }}
//                 >
//                   <FaGooglePlay size={24} />
//                   <div className="text-left">
//                     <div className="text-xs">Get it on</div>
//                     <div className="text-base font-semibold">Google Play</div>
//                   </div>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Performance Section */}
//       <section className="section-padding text-white" style={{ 
//         background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)` 
//       }}>
//         <div className="container-custom text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <div className="inline-block font-semibold text-sm px-4 py-2 rounded-full mb-4" style={{ 
//               backgroundColor: alpha('#ffffff', 0.1),
//               color: theme.palette.primary.light 
//             }}>
//               Performance Driven
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
//               Turn Movement Into{' '}
//               <span style={{ color: theme.palette.primary.light }}>Measurable Performance</span>
//             </h2>
//             <p className="text-lg mb-4 leading-relaxed" style={{ color: alpha('#ffffff', 0.7) }}>
//               Tracking isn't about surveillance. It's about smarter coordination,
//               improved productivity, and stronger results.
//             </p>
//             <p className="text-base" style={{ color: alpha('#ffffff', 0.5) }}>
//               Trackify transforms field operations into structured, data-driven
//               performance.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="section-padding text-white" style={{ 
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` 
//       }}>
//         <div className="container-custom text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
//               Ready to Take Control of Your Field Operations?
//             </h2>
//             <p className="text-lg mb-2" style={{ color: alpha('#ffffff', 0.9) }}>
//               Stop relying on manual reports.
//             </p>
//             <p className="text-lg mb-4" style={{ color: alpha('#ffffff', 0.9) }}>
//               Start managing with real-time clarity.
//             </p>
//             <p className="text-base mb-8" style={{ color: alpha('#ffffff', 0.7) }}>
//               Team Trackify gives you the visibility, accountability, and
//               confidence your business needs to grow.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate('/login')}
//                 className="font-bold px-8 py-3 rounded-full transition-colors flex items-center"
//                 style={{ 
//                   backgroundColor: 'white',
//                   color: theme.palette.primary.main,
//                 }}
//               >
//                 Start Free Trial <FiArrowRight className="ml-2" />
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
//                 Book a Live Demo
//               </motion.button>
//             </div>
//           </motion.div>
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

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Home;






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