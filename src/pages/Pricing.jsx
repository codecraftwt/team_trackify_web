// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AccordionSummary,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import StarIcon from '@mui/icons-material/Star';
// import { FaCheck, FaTimes } from 'react-icons/fa';

// const Pricing = () => {
//   const navigate = useNavigate();
//   const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

//   const faqs = [
//     {
//       question: 'Can I change plans later?',
//       answer:
//         'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
//     },
//     {
//       question: 'What happens after the free trial?',
//       answer:
//         'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
//     },
//     {
//       question: 'Do you offer discounts for annual plans?',
//       answer:
//         'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
//     },
//     {
//       question: 'Is there a setup fee?',
//       answer:
//         'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
//     },
//     {
//       question: 'Can I get a custom plan?',
//       answer:
//         'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
//     },
//     {
//       question: 'What payment methods do you accept?',
//       answer:
//         'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
//     },
//   ];

//   const plans = [
//     {
//       name: 'Starter',
//       description: 'Great for small teams just getting started',
//       monthlyPrice: 29,
//       yearlyPrice: 290,      // ~17% → you can change to 260 for ~25% saving
//       icon: '🚀',
//       features: [
//         'Up to 10 team members',
//         'Real-time location tracking – anytime',
//         'Basic route history (30 days)',
//         'Simple daily reports',
//         'Mobile app access',
//         'Email support',
//       ],
//       limitations: [
//         'No photo verification',
//         'No geofencing/alerts',
//         'No developer API',
//         'No advanced analytics',
//       ],
//       popular: false,
//       color: 'from-gray-50 to-gray-100',
//       buttonColor: 'bg-gray-700 hover:bg-gray-800',
//     },
//     {
//       name: 'Growth',
//       description: 'Everything most field teams need',
//       monthlyPrice: 79,
//       yearlyPrice: 710,      // Changed → ~25% saving ($79 × 12 = 948 → save ~$238/year)
//       icon: '⭐',
//       features: [
//         'Up to 50 team members',
//         'Unlimited real-time location tracking',
//         'Route history + playback (90 days)',
//         'Geo-tagged photo verification',
//         'Custom geofences & arrival alerts',
//         'Professional PDF/Excel reports',
//         'Advanced analytics dashboard',
//         'Data export (CSV, PDF)',
//         'Priority email support',
//         'Mobile + web access',
//       ],
//       limitations: ['No developer API', 'No dedicated manager'],
//       popular: true,
//       color: 'from-blue-50 to-blue-100',
//       buttonColor: 'bg-blue-600 hover:bg-blue-700',
//     },
//     {
//       name: 'Enterprise',
//       description: 'Custom solution for large teams',
//       monthlyPrice: 199,
//       yearlyPrice: 1990,
//       icon: '🏢',
//       features: [
//         'Unlimited team members',
//         'Everything in Growth',
//         'Developer API & webhooks',
//         'Dedicated account manager',
//         '24/7 phone + email support',
//         'Custom integrations',
//         'White-label option',
//         'Advanced security & compliance',
//         'Custom dashboards & reports',
//         'On-premise option (available)',
//         'SLA & training included',
//       ],
//       limitations: [],
//       popular: false,
//       color: 'from-purple-50 to-purple-100',
//       buttonColor: 'bg-purple-600 hover:bg-purple-700',
//     },
//   ];

//   const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

//   const getSavings = (plan) => {
//     if (billingCycle === 'yearly') {
//       const monthlyTotal = plan.monthlyPrice * 12;
//       return monthlyTotal - plan.yearlyPrice;
//     }
//     return 0;
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* Hero Section – stronger focus on live location */}
//       <section className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm px-5 py-2 rounded-full mb-6">
//               Simple. Transparent. No surprises.
//             </div>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
//               Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
//               <span className="text-gradient">right now</span>
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
//               Real-time GPS tracking + simple reports for field teams.<br />
//               No complex setup. <strong>No developer API required</strong> on affordable plans.
//             </p>

//             {/* Billing Toggle + bigger savings callout */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
//               <div className="flex items-center gap-4">
//                 <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                   Monthly
//                 </span>
//                 <button
//                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//                   className="relative w-16 h-9 bg-blue-600 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <motion.div
//                     className="w-6 h-6 bg-white rounded-full shadow-md"
//                     animate={{ x: billingCycle === 'yearly' ? 28 : 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   />
//                 </button>
//                 <div className="flex items-center gap-3">
//                   <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                     Yearly
//                   </span>
//                   <Chip
//                     label="Save up to 25%"
//                     size="medium"
//                     className="bg-green-600 text-white font-bold px-4 py-1.5 text-base shadow-md"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-center gap-4 text-gray-700 text-sm md:text-base">
//               <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> 14-day free trial</div>
//               <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> No credit card required</div>
//               <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> Cancel anytime</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
//             {plans.map((plan, index) => {
//               const savings = getSavings(plan);
//               const isPopular = plan.popular;

//               return (
//                 <motion.div
//                   key={plan.name}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   className={`relative ${isPopular ? 'md:scale-105 lg:scale-110 z-10' : ''}`}
//                 >
//                   {isPopular && (
//                     <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
//                       <Chip
//                         icon={<StarIcon />}
//                         label="Most Popular"
//                         color="primary"
//                         className="font-bold shadow-xl px-5 py-2 text-base"
//                       />
//                     </div>
//                   )}

//                   <Card
//                     elevation={isPopular ? 12 : 4}
//                     className={`h-full border transition-all duration-300 rounded-2xl overflow-hidden ${
//                       isPopular
//                         ? 'border-blue-500 shadow-2xl'
//                         : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
//                     }`}
//                   >
//                     <CardContent className="p-8 md:p-10 flex flex-col h-full">
//                       <div className="text-center mb-8">
//                         <div className="text-6xl mb-4">{plan.icon}</div>
//                         <Typography variant="h4" className="font-bold text-gray-900 mb-2">
//                           {plan.name}
//                         </Typography>
//                         <Typography variant="body1" className="text-gray-600 mb-6">
//                           {plan.description}
//                         </Typography>

//                         <div className="mb-6">
//                           <div className="flex items-baseline justify-center gap-2">
//                             <span className="text-5xl font-extrabold text-gray-900">
//                               ${getPrice(plan)}
//                             </span>
//                             <span className="text-xl text-gray-600">
//                               /{billingCycle === 'monthly' ? 'mo' : 'yr'}
//                             </span>
//                           </div>
//                           {savings > 0 && (
//                             <Typography variant="body2" className="text-green-700 font-semibold mt-1">
//                               Save ${savings}/year (~{Math.round((savings / (plan.monthlyPrice * 12)) * 100)}%)
//                             </Typography>
//                           )}
//                         </div>
//                       </div>

//                       <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mb-10">
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           size="large"
//                           onClick={() => navigate('/signup?plan=' + plan.name.toLowerCase())}
//                           className={`${plan.buttonColor} text-white font-bold py-4 text-lg rounded-xl shadow-lg normal-case`}
//                         >
//                           Start Free Trial – 14 Days
//                         </Button>
//                       </motion.div>

//                       <List className="space-y-3 flex-grow">
//                         {plan.features.map((feature, i) => (
//                           <ListItem key={i} disableGutters className="px-0 py-1">
//                             <ListItemIcon className="min-w-[32px]">
//                               <CheckCircleIcon className="text-blue-600" />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={feature}
//                               primaryTypographyProps={{ className: 'text-gray-800 text-base' }}
//                             />
//                           </ListItem>
//                         ))}

//                         {plan.limitations.map((lim, i) => (
//                           <ListItem key={`lim-${i}`} disableGutters className="px-0 py-1 opacity-70">
//                             <ListItemIcon className="min-w-[32px]">
//                               <FaTimes className="text-gray-400" size={18} />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={lim}
//                               primaryTypographyProps={{ className: 'text-gray-500 text-base line-through' }}
//                             />
//                           </ListItem>
//                         ))}
//                       </List>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//     {/* FAQ Section – Improved Accordion Style */}
// <section className="py-16 md:py-24 bg-gray-50">
//   <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className="text-center mb-12 md:mb-16"
//     >
//       <h2 className="text-2xl md:text-5xl lg:text-4xl font-bold text-gray-900 mb-4">
//         Frequently Asked Questions
//       </h2>
//       <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//         Quick answers to the questions we hear most often
//       </p>
//     </motion.div>

//     <div className="space-y-4">
//       {faqs.map((faq, index) => (
//         <Accordion
//           key={index}
//           elevation={0}
//           className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:border-blue-200"
//           sx={{
//             '&:before': { display: 'none' }, // remove default MUI divider line
//             boxShadow: 'none',
//           }}
//         >
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon className="text-blue-600" />}
//             aria-controls={`panel${index}-content`}
//             id={`panel${index}-header`}
//             sx={{
//               px: { xs: 3, md: 4 },
//               py: { xs: 2.5, md: 3 },
//               '& .MuiAccordionSummary-content': {
//                 margin: '0 !important',
//               },
//               '&:hover': {
//                 backgroundColor: 'rgba(59, 130, 246, 0.04)', // subtle blue hover
//               },
//             }}
//           >
//             <Typography
//               variant="h6"
//               className="font-semibold text-gray-900 text-left"
//               sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
//             >
//               {faq.question}
//             </Typography>
//           </AccordionSummary>

//           <AccordionDetails
//             sx={{
//               px: { xs: 3, md: 4 },
//               pb: { xs: 3, md: 4 },
//               pt: 1,
//               borderTop: '1px solid',
//               borderColor: 'divider',
//             }}
//           >
//             <Typography
//               variant="body1"
//               className="text-gray-700 leading-relaxed"
//               sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
//             >
//               {faq.answer}
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>

//     {/* Optional mini CTA at bottom of FAQ */}
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ delay: 0.4 }}
//       className="text-center mt-12"
//     >
//       <Typography variant="body1" className="text-gray-600 mb-6">
//         Still have questions? We're happy to help.
//       </Typography>
//       <Button
//         variant="outlined"
//         color="primary"
//         size="large"
//         onClick={() => navigate('/contact')}
//         sx={{
//           borderWidth: 2,
//           px: 5,
//           py: 1.5,
//           fontSize: '1.1rem',
//           fontWeight: 600,
//           borderRadius: '9999px',
//           textTransform: 'none',
//           '&:hover': {
//             backgroundColor: 'primary.main',
//             color: 'white',
//           },
//           marginTop: '20px',
//         }}
//       >
//         Contact Us →
//       </Button>
//     </motion.div>
//   </div>
// </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Pricing;











// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AccordionSummary,
//   Grid,
//   Paper,
//   CircularProgress,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import StarIcon from '@mui/icons-material/Star';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import { getAllPlans } from '../redux/slices/planSlice';

// const Pricing = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [loading, setLoading] = useState(true);

//   // Get plans from Redux state
//   const { plansList = [], loading: plansLoading } = useSelector((state) => state.plan || {});

//   // Helper functions
//   const getPlanIcon = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return '🚀';
//     if (name.includes('growth') || name.includes('pro')) return '⭐';
//     if (name.includes('enterprise') || name.includes('business')) return '🏢';
//     return '📦';
//   };

//   const getPlanColor = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return 'from-gray-50 to-gray-100';
//     if (name.includes('growth') || name.includes('pro')) return 'from-blue-50 to-blue-100';
//     if (name.includes('enterprise') || name.includes('business')) return 'from-purple-50 to-purple-100';
//     return 'from-gray-50 to-gray-100';
//   };

//   const getButtonColor = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return 'bg-gray-700 hover:bg-gray-800';
//     if (name.includes('growth') || name.includes('pro')) return 'bg-blue-600 hover:bg-blue-700';
//     if (name.includes('enterprise') || name.includes('business')) return 'bg-purple-600 hover:bg-purple-700';
//     return 'bg-gray-700 hover:bg-gray-800';
//   };

//   // Map API data to plan format
//   const subscriptionPlans = plansList.map((plan) => ({
//     id: plan._id,
//     name: plan.name || 'Plan',
//     description: plan.description || 'Plan description',
//     monthlyPrice: plan.monthlyPrice || plan.price || 0,
//     yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
//     icon: plan.icon || getPlanIcon(plan.name),
//     features: plan.features || [],
//     limitations: plan.limitations || [],
//     popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
//     color: plan.color || getPlanColor(plan.name),
//     buttonColor: plan.buttonColor || getButtonColor(plan.name),
//   }));

//   // Fetch plans on component mount
//   useEffect(() => {
//     const fetchPlans = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPlans();
//   }, [dispatch]);

//   const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

//   const getSavings = (plan) => {
//     if (billingCycle === 'yearly' && plan.monthlyPrice) {
//       const monthlyTotal = plan.monthlyPrice * 12;
//       return monthlyTotal - plan.yearlyPrice;
//     }
//     return 0;
//   };

//   const renderPlanCard = (plan, index) => {
//     const isPopular = plan.popular;
//     const savings = getSavings(plan);

//     return (
//       <Grid item xs={12} sm={6} md={4} key={plan.id || index}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: index * 0.1 }}
//           style={{ height: '100%' }}
//         >
//           <div className={`relative h-full ${isPopular && !isMobile ? 'md:scale-105 lg:scale-110 z-10' : ''}`}>
//             {isPopular && (
//               <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
//                 <Chip
//                   icon={<StarIcon />}
//                   label="Most Popular"
//                   color="primary"
//                   sx={{ 
//                     bgcolor: '#0f766e', 
//                     color: 'white', 
//                     '& .MuiChip-icon': { color: 'white' },
//                     fontWeight: 'bold',
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 0.5, sm: 1 },
//                     fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                   }}
//                 />
//               </div>
//             )}

//             <Card
//               elevation={isPopular ? 12 : 4}
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 border: isPopular ? '2px solid' : '1px solid',
//                 borderColor: isPopular ? '#0f766e' : alpha('#e2e8f0', 0.5),
//                 transition: 'all 0.3s ease',
//                 borderRadius: { xs: 2, sm: 3 },
//                 '&:hover': {
//                   transform: !isMobile ? 'translateY(-8px)' : 'none',
//                   boxShadow: !isMobile ? '0 20px 40px -10px rgba(15, 118, 110, 0.3)' : 'none',
//                   borderColor: '#0f766e',
//                 },
//               }}
//             >
//               <CardContent sx={{ 
//                 p: { xs: 2, sm: 3, md: 4 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//               }}>
//                 <div className="text-center mb-4 sm:mb-6">
//                   <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-3 md:mb-4">{plan.icon}</div>
//                   <Typography 
//                     variant={isMobile ? "h5" : "h4"} 
//                     sx={{ 
//                       fontWeight: 700, 
//                       color: '#1e293b',
//                       fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
//                       mb: 1,
//                     }}
//                   >
//                     {plan.name}
//                   </Typography>
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       color: '#64748b',
//                       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//                       mb: { xs: 2, sm: 3 },
//                       px: { xs: 1, sm: 2 },
//                     }}
//                   >
//                     {plan.description}
//                   </Typography>

//                   <Box sx={{ mb: { xs: 2, sm: 3 } }}>
//                     <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
//                       <Typography 
//                         component="span" 
//                         sx={{ 
//                           fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                           fontWeight: 800,
//                           color: '#1e293b',
//                           lineHeight: 1,
//                         }}
//                       >
//                         ${getPrice(plan)}
//                       </Typography>
//                       <Typography 
//                         component="span" 
//                         sx={{ 
//                           fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//                           color: '#64748b',
//                         }}
//                       >
//                         /{billingCycle === 'monthly' ? 'mo' : 'yr'}
//                       </Typography>
//                     </Box>
//                     {savings > 0 && (
//                       <Typography 
//                         variant="caption" 
//                         sx={{ 
//                           color: '#059669',
//                           fontWeight: 600,
//                           display: 'block',
//                           mt: 1,
//                           fontSize: { xs: '0.65rem', sm: '0.75rem' },
//                         }}
//                       >
//                         Save ${savings}/year (~{Math.round((savings / (plan.monthlyPrice * 12)) * 100)}%)
//                       </Typography>
//                     )}
//                   </Box>
//                 </div>

//                 <motion.div 
//                   whileHover={{ scale: isMobile ? 1 : 1.02 }} 
//                   whileTap={{ scale: 0.98 }} 
//                   className="mb-4 sm:mb-6"
//                 >
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     onClick={() => navigate(`/signup?plan=${plan.name.toLowerCase()}&id=${plan.id}`)}
//                     sx={{
//                       py: { xs: 1, sm: 1.5 },
//                       px: { xs: 2, sm: 3 },
//                       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//                       fontWeight: 600,
//                       borderRadius: { xs: 1.5, sm: 2 },
//                       textTransform: 'none',
//                       bgcolor: plan.name?.toLowerCase().includes('growth') ? '#0f766e' : 
//                                plan.name?.toLowerCase().includes('enterprise') ? '#7e22ce' : '#374151',
//                       '&:hover': {
//                         bgcolor: plan.name?.toLowerCase().includes('growth') ? '#0a5c55' : 
//                                  plan.name?.toLowerCase().includes('enterprise') ? '#6b21a8' : '#1f2937',
//                       }
//                     }}
//                   >
//                     Start Free Trial – 14 Days
//                   </Button>
//                 </motion.div>

//                 <List sx={{ 
//                   flexGrow: 1,
//                   '& .MuiListItem-root': { 
//                     px: 0, 
//                     py: { xs: 0.25, sm: 0.5 },
//                   },
//                 }}>
//                   {plan.features.map((feature, i) => (
//                     <ListItem key={i} disableGutters>
//                       <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                         <CheckCircleIcon sx={{ 
//                           color: '#0f766e',
//                           fontSize: { xs: 18, sm: 20, md: 22 },
//                         }} />
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={feature}
//                         primaryTypographyProps={{ 
//                           sx: { 
//                             fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                             color: '#334155',
//                           }
//                         }}
//                       />
//                     </ListItem>
//                   ))}

//                   {plan.limitations && plan.limitations.map((lim, i) => (
//                     <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
//                       <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                         <FaTimes style={{ 
//                           color: '#94a3b8',
//                           fontSize: isMobile ? 14 : 16,
//                         }} />
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={lim}
//                         primaryTypographyProps={{ 
//                           sx: { 
//                             fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                             color: '#64748b',
//                             textDecoration: 'line-through',
//                           }
//                         }}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               </CardContent>
//             </Card>
//           </div>
//         </motion.div>
//       </Grid>
//     );
//   };

//   if (loading || plansLoading) {
//     return (
//       <div className="min-h-screen flex flex-col bg-white">
//         <Header />
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           minHeight: '60vh',
//           flexDirection: 'column',
//           gap: 2,
//         }}>
//           <CircularProgress size={isMobile ? 40 : 60} sx={{ color: '#0f766e' }} />
//           <Typography variant="body1" color="text.secondary">
//             Loading plans...
//           </Typography>
//         </Box>
//         <Footer />
//         <ScrollToTopButton />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* Hero Section - Responsive */}
//       <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
//               Simple. Transparent. No surprises.
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 px-2">
//               Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
//               <span className="text-gradient">right now</span>
//             </h1>

//             <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
//               Real-time GPS tracking + simple reports for field teams.<br />
//               No complex setup. <strong>No developer API required</strong> on affordable plans.
//             </p>

//             {/* Billing Toggle - Responsive */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                   Monthly
//                 </span>
//                 <button
//                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//                   className="relative w-14 sm:w-16 h-8 sm:h-9 bg-blue-600 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <motion.div
//                     className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md"
//                     animate={{ x: billingCycle === 'yearly' ? (isMobile ? 22 : 28) : 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                     Yearly
//                   </span>
//                   <Chip
//                     label="Save up to 25%"
//                     size="small"
//                     sx={{
//                       bgcolor: '#059669',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.875rem' },
//                       height: { xs: 20, sm: 24, md: 28 },
//                       '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Features List - Responsive */}
//             <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-700 text-xs sm:text-sm md:text-base">
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> 14-day free trial</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> No credit card required</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> Cancel anytime</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards - Fully Responsive Grid */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} alignItems="stretch">
//             {subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{ 
//                   p: { xs: 3, sm: 4, md: 5 }, 
//                   textAlign: 'center', 
//                   borderRadius: { xs: 2, sm: 3 },
//                 }}>
//                   <CreditCardIcon sx={{ 
//                     fontSize: { xs: 36, sm: 42, md: 48 }, 
//                     color: alpha('#0f766e', 0.3), 
//                     mb: 2 
//                   }} />
//                   <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                     Please check back later for our pricing plans.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </div>
//       </section>

//       {/* FAQ Section - Responsive */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
//           >
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
//               Quick answers to the questions we hear most often
//             </p>
//           </motion.div>

//           <div className="space-y-3 sm:space-y-4">
//             {[
//               {
//                 question: 'Can I change plans later?',
//                 answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
//               },
//               {
//                 question: 'What happens after the free trial?',
//                 answer: 'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
//               },
//               {
//                 question: 'Do you offer discounts for annual plans?',
//                 answer: 'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
//               },
//               {
//                 question: 'Is there a setup fee?',
//                 answer: 'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
//               },
//               {
//                 question: 'Can I get a custom plan?',
//                 answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
//               },
//               {
//                 question: 'What payment methods do you accept?',
//                 answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
//               },
//             ].map((faq, index) => (
//               <Accordion
//                 key={index}
//                 elevation={0}
//                 sx={{
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   border: '1px solid',
//                   borderColor: alpha('#e2e8f0', 0.5),
//                   backgroundColor: 'white',
//                   overflow: 'hidden',
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                   },
//                   '&:before': { display: 'none' },
//                   boxShadow: 'none',
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon sx={{ color: '#0f766e', fontSize: { xs: 18, sm: 20, md: 24 } }} />}
//                   aria-controls={`panel${index}-content`}
//                   id={`panel${index}-header`}
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     py: { xs: 1.5, sm: 2, md: 2.5 },
//                     '& .MuiAccordionSummary-content': {
//                       margin: '0 !important',
//                     },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontWeight: 600,
//                       color: '#1e293b',
//                       fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
//                       textAlign: 'left',
//                     }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     pb: { xs: 2, sm: 3, md: 4 },
//                     pt: 0,
//                     borderTop: '1px solid',
//                     borderColor: alpha('#e2e8f0', 0.5),
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: '#475569',
//                       fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
//                       lineHeight: 1.6,
//                     }}
//                   >
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </div>

//           {/* CTA at bottom of FAQ */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16"
//           >
//             <Typography 
//               variant="body1" 
//               sx={{ 
//                 color: '#4b5563', 
//                 mb: { xs: 3, sm: 4 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//               }}
//             >
//               Still have questions? We're happy to help.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/contact')}
//               sx={{
//                 borderWidth: 2,
//                 px: { xs: 3, sm: 4, md: 5 },
//                 py: { xs: 1, sm: 1.2, md: 1.5 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
//                 fontWeight: 600,
//                 borderRadius: { xs: 4, sm: 5 },
//                 textTransform: 'none',
//                 borderColor: '#0f766e',
//                 color: '#0f766e',
//                 '&:hover': {
//                   backgroundColor: '#0f766e',
//                   color: 'white',
//                   borderColor: '#0f766e',
//                 },
//               }}
//             >
//               Contact Us →
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Pricing;












// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AccordionSummary,
//   Grid,
//   Paper,
//   Skeleton,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import StarIcon from '@mui/icons-material/Star';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import { getAllPlans } from '../redux/slices/planSlice';

// // Plan Card Skeleton Component
// const PlanCardSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//           borderRadius: { xs: 2, sm: 3 },
//           p: { xs: 2, sm: 3, md: 4 },
//         }}
//       >
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
//           <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto', mb: 1 }} />
//           <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 2 }} />

//           <Box sx={{ mb: 2 }}>
//             <Skeleton variant="text" width="40%" height={40} sx={{ mx: 'auto' }} />
//           </Box>
//         </Box>

//         <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 3, borderRadius: 2 }} />

//         <Box sx={{ flexGrow: 1 }}>
//           {[1, 2, 3, 4].map((item) => (
//             <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//               <Skeleton variant="circular" width={20} height={20} />
//               <Skeleton variant="text" width="80%" height={20} />
//             </Box>
//           ))}
//         </Box>
//       </Card>
//     </Grid>
//   );
// };

// const Pricing = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [loading, setLoading] = useState(true);

//   // Get plans from Redux state
//   const { plansList = [] } = useSelector((state) => state.plan || {});

//   // Helper functions
//   const getPlanIcon = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return '🚀';
//     if (name.includes('growth') || name.includes('pro')) return '⭐';
//     if (name.includes('enterprise') || name.includes('business')) return '🏢';
//     return '📦';
//   };

//   const getPlanColor = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return 'from-gray-50 to-gray-100';
//     if (name.includes('growth') || name.includes('pro')) return 'from-blue-50 to-blue-100';
//     if (name.includes('enterprise') || name.includes('business')) return 'from-purple-50 to-purple-100';
//     return 'from-gray-50 to-gray-100';
//   };

//   // Map API data to plan format
//   const subscriptionPlans = plansList.map((plan) => ({
//     id: plan._id,
//     name: plan.name || 'Plan',
//     description: plan.description || 'Plan description',
//     monthlyPrice: plan.monthlyPrice || plan.price || 0,
//     yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
//     icon: plan.icon || getPlanIcon(plan.name),
//     features: plan.features || [],
//     limitations: plan.limitations || [],
//     popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
//     color: plan.color || getPlanColor(plan.name),
//   }));

//   // Fetch plans on component mount
//   useEffect(() => {
//     const fetchPlans = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         // Show skeleton for 1 second minimum for better UX
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);
//       }
//     };
//     fetchPlans();
//   }, [dispatch]);

//   const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

//   const getSavings = (plan) => {
//     if (billingCycle === 'yearly' && plan.monthlyPrice) {
//       const monthlyTotal = plan.monthlyPrice * 12;
//       return monthlyTotal - plan.yearlyPrice;
//     }
//     return 0;
//   };

//   const getButtonVariant = (plan) => {
//     if (plan.popular) return 'contained';
//     return 'outlined';
//   };

//   const getButtonStyles = (plan) => {
//     const baseStyles = {
//       py: { xs: 1, sm: 1.2, md: 1.5 },
//       px: { xs: 2, sm: 3 },
//       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//       fontWeight: 600,
//       borderRadius: { xs: 1.5, sm: 2 },
//       textTransform: 'none',
//       width: '100%',
//       transition: 'all 0.3s ease',
//     };

//     if (plan.popular) {
//       return {
//         ...baseStyles,
//         bgcolor: '#0f766e',
//         color: 'white',
//         border: '2px solid #0f766e',
//         '&:hover': {
//           bgcolor: '#0a5c55',
//           borderColor: '#0a5c55',
//           transform: 'translateY(-2px)',
//           boxShadow: '0 10px 20px -5px rgba(15, 118, 110, 0.4)',
//         },
//       };
//     }

//     return {
//       ...baseStyles,
//       bgcolor: 'transparent',
//       color: '#0f766e',
//       border: '2px solid #0f766e',
//       '&:hover': {
//         bgcolor: alpha('#0f766e', 0.05),
//         transform: 'translateY(-2px)',
//         boxShadow: '0 10px 20px -5px rgba(15, 118, 110, 0.2)',
//       },
//     };
//   };

//   const renderPlanCard = (plan, index) => {
//     const isPopular = plan.popular;
//     const savings = getSavings(plan);

//     return (
//       <Grid item xs={12} sm={6} md={4} key={plan.id || index} sx={{ display: 'flex' }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: index * 0.1 }}
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Box
//             sx={{
//               position: 'relative',
//               height: '100%',
//               transform: isPopular && !isMobile ? 'scale(1.05)' : 'scale(1)',
//               zIndex: isPopular ? 10 : 1,
//               transition: 'transform 0.3s ease',
//               '&:hover': {
//                 transform: isPopular && !isMobile ? 'scale(1.08)' : 'scale(1.02)',
//               },
//             }}
//           >
//             {isPopular && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: -12,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   zIndex: 20,
//                 }}
//               >
//                 <Chip
//                   icon={<StarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                   label="Most Popular"
//                   sx={{
//                     bgcolor: '#0f766e',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     px: { xs: 1, sm: 2 },
//                     height: { xs: 28, sm: 32 },
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     '& .MuiChip-icon': { 
//                       color: 'white',
//                       ml: { xs: 0.5, sm: 1 },
//                     },
//                   }}
//                 />
//               </Box>
//             )}

//             <Card
//               elevation={isPopular ? 8 : 2}
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 border: isPopular ? '2px solid' : '1px solid',
//                 borderColor: isPopular ? '#0f766e' : alpha('#e2e8f0', 0.5),
//                 transition: 'all 0.3s ease',
//                 borderRadius: { xs: 2, sm: 3 },
//                 '&:hover': {
//                   boxShadow: !isMobile ? `0 20px 40px -10px ${alpha('#0f766e', 0.2)}` : 'none',
//                 },
//               }}
//             >
//               <CardContent sx={{ 
//                 p: { xs: 2, sm: 3, md: 4 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//               }}>
//                 {/* Icon and Title - Fixed height for consistent alignment */}
//                 <Box sx={{ 
//                   textAlign: 'center', 
//                   mb: 2,
//                   height: { xs: '100px', sm: '120px', md: '130px' }, // Fixed height
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'flex-start',
//                 }}>
//                   <Box sx={{ 
//                     fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
//                     lineHeight: 1,
//                     mb: 1,
//                   }}>
//                     {plan.icon}
//                   </Box>

//                   <Typography 
//                     variant={isMobile ? "h5" : "h4"} 
//                     sx={{ 
//                       fontWeight: 700, 
//                       color: '#1e293b',
//                       fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
//                       lineHeight: 1.2,
//                       mb: 0.5,
//                     }}
//                   >
//                     {plan.name}
//                   </Typography>
//                 </Box>

//                 {/* Description - Fixed height for consistent button alignment */}
//                 <Box sx={{ 
//                   height: { xs: '40px', sm: '50px', md: '60px' }, // Fixed height for description
//                   mb: 2,
//                   overflow: 'hidden',
//                 }}>
//                   <Typography 
//                     variant="body2" 
//                     sx={{ 
//                       color: '#64748b',
//                       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//                       textAlign: 'center',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     {plan.description}
//                   </Typography>
//                 </Box>

//                 {/* Price - Fixed height */}
//                 <Box sx={{ 
//                   textAlign: 'center', 
//                   mb: 2,
//                   height: { xs: '70px', sm: '80px', md: '90px' }, // Fixed height for price section
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
//                     <Typography 
//                       component="span" 
//                       sx={{ 
//                         fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                         fontWeight: 800,
//                         color: '#1e293b',
//                         lineHeight: 1,
//                       }}
//                     >
//                       ${getPrice(plan)}
//                     </Typography>
//                     <Typography 
//                       component="span" 
//                       sx={{ 
//                         fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//                         color: '#64748b',
//                       }}
//                     >
//                       /{billingCycle === 'monthly' ? 'mo' : 'yr'}
//                     </Typography>
//                   </Box>

//                   {savings > 0 && (
//                     <Typography 
//                       variant="caption" 
//                       sx={{ 
//                         color: '#059669',
//                         fontWeight: 600,
//                         display: 'block',
//                         mt: 0.5,
//                         fontSize: { xs: '0.65rem', sm: '0.75rem' },
//                       }}
//                     >
//                       Save ${savings}/year
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Button Section - Fixed position */}
//                 <Box sx={{ 
//                   mb: 2,
//                   height: { xs: '70px', sm: '80px', md: '90px' }, // Fixed height for button section
//                 }}>
//                   <Button
//                     fullWidth
//                     variant={getButtonVariant(plan)}
//                     onClick={() => navigate(`/signup?plan=${plan.name.toLowerCase()}&id=${plan.id}`)}
//                     sx={getButtonStyles(plan)}
//                   >
//                     Start Free Trial
//                   </Button>
//                   <Typography 
//                     variant="caption" 
//                     sx={{ 
//                       display: 'block', 
//                       textAlign: 'center', 
//                       mt: 0.5,
//                       color: '#64748b',
//                       fontSize: { xs: '0.6rem', sm: '0.7rem' },
//                     }}
//                   >
//                     14-day trial, no card required
//                   </Typography>
//                 </Box>

//                 {/* Features List - Scrollable if needed */}
//                 <Box sx={{ 
//                   flexGrow: 1,
//                   overflowY: 'auto',
//                   maxHeight: { xs: '200px', sm: '220px', md: '240px' },
//                   pr: 0.5,
//                 }}>
//                   <List sx={{ 
//                     '& .MuiListItem-root': { 
//                       px: 0, 
//                       py: { xs: 0.25, sm: 0.5 },
//                     },
//                   }}>
//                     {plan.features.map((feature, i) => (
//                       <ListItem key={i} disableGutters>
//                         <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                           <CheckCircleIcon sx={{ 
//                             color: '#0f766e',
//                             fontSize: { xs: 18, sm: 20, md: 22 },
//                           }} />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={feature}
//                           primaryTypographyProps={{ 
//                             sx: { 
//                               fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                               color: '#334155',
//                             }
//                           }}
//                         />
//                       </ListItem>
//                     ))}

//                     {plan.limitations && plan.limitations.map((lim, i) => (
//                       <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
//                         <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                           <FaTimes style={{ 
//                             color: '#94a3b8',
//                             fontSize: isMobile ? 14 : 16,
//                           }} />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={lim}
//                           primaryTypographyProps={{ 
//                             sx: { 
//                               fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                               color: '#64748b',
//                               textDecoration: 'line-through',
//                             }
//                           }}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//         </motion.div>
//       </Grid>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* Hero Section */}
//       <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
//               Simple. Transparent. No surprises.
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 px-2">
//               Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
//               <span className="text-gradient">right now</span>
//             </h1>

//             <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
//               Real-time GPS tracking + simple reports for field teams.<br />
//               No complex setup. <strong>No developer API required</strong> on affordable plans.
//             </p>

//             {/* Billing Toggle */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                   Monthly
//                 </span>
//                 <button
//                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//                   className="relative w-14 sm:w-16 h-8 sm:h-9 bg-blue-600 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <motion.div
//                     className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md"
//                     animate={{ x: billingCycle === 'yearly' ? (isMobile ? 22 : 28) : 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                     Yearly
//                   </span>
//                   <Chip
//                     label="Save up to 25%"
//                     size="small"
//                     sx={{
//                       bgcolor: '#059669',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.875rem' },
//                       height: { xs: 20, sm: 24, md: 28 },
//                       '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Features List */}
//             <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-700 text-xs sm:text-sm md:text-base">
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> 14-day free trial</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> No credit card required</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-green-600 text-xs sm:text-sm" /> Cancel anytime</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="stretch">
//             {loading ? (
//               // Show skeletons for 1 second
//               <>
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//               </>
//             ) : subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{ 
//                   p: { xs: 3, sm: 4, md: 5 }, 
//                   textAlign: 'center', 
//                   borderRadius: { xs: 2, sm: 3 },
//                 }}>
//                   <CreditCardIcon sx={{ 
//                     fontSize: { xs: 36, sm: 42, md: 48 }, 
//                     color: alpha('#0f766e', 0.3), 
//                     mb: 2 
//                   }} />
//                   <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                     Please check back later for our pricing plans.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
//           >
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
//               Quick answers to the questions we hear most often
//             </p>
//           </motion.div>

//           <div className="space-y-3 sm:space-y-4">
//             {[
//               {
//                 question: 'Can I change plans later?',
//                 answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
//               },
//               {
//                 question: 'What happens after the free trial?',
//                 answer: 'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
//               },
//               {
//                 question: 'Do you offer discounts for annual plans?',
//                 answer: 'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
//               },
//               {
//                 question: 'Is there a setup fee?',
//                 answer: 'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
//               },
//               {
//                 question: 'Can I get a custom plan?',
//                 answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
//               },
//               {
//                 question: 'What payment methods do you accept?',
//                 answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
//               },
//             ].map((faq, index) => (
//               <Accordion
//                 key={index}
//                 elevation={0}
//                 sx={{
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   border: '1px solid',
//                   borderColor: alpha('#e2e8f0', 0.5),
//                   backgroundColor: 'white',
//                   overflow: 'hidden',
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                   },
//                   '&:before': { display: 'none' },
//                   boxShadow: 'none',
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon sx={{ color: '#0f766e', fontSize: { xs: 18, sm: 20, md: 24 } }} />}
//                   aria-controls={`panel${index}-content`}
//                   id={`panel${index}-header`}
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     py: { xs: 1.5, sm: 2, md: 2.5 },
//                     '& .MuiAccordionSummary-content': {
//                       margin: '0 !important',
//                     },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontWeight: 600,
//                       color: '#1e293b',
//                       fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
//                       textAlign: 'left',
//                     }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     pb: { xs: 2, sm: 3, md: 4 },
//                     pt: 0,
//                     borderTop: '1px solid',
//                     borderColor: alpha('#e2e8f0', 0.5),
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: '#475569',
//                       fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
//                       lineHeight: 1.6,
//                     }}
//                   >
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </div>

//           {/* CTA at bottom of FAQ */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16"
//           >
//             <Typography 
//               variant="body1" 
//               sx={{ 
//                 color: '#4b5563', 
//                 mb: { xs: 3, sm: 4 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//               }}
//             >
//               Still have questions? We're happy to help.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/contact')}
//               sx={{
//                 borderWidth: 2,
//                 px: { xs: 3, sm: 4, md: 5 },
//                 py: { xs: 1, sm: 1.2, md: 1.5 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
//                 fontWeight: 600,
//                 borderRadius: { xs: 4, sm: 5 },
//                 textTransform: 'none',
//                 borderColor: '#0f766e',
//                 color: '#0f766e',
//                 '&:hover': {
//                   backgroundColor: '#0f766e',
//                   color: 'white',
//                   borderColor: '#0f766e',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 10px 20px -5px rgba(15, 118, 110, 0.4)',
//                 },
//               }}
//             >
//               Contact Us →
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Pricing;





// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
//   Button,
//   Chip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   AccordionSummary,
//   Grid,
//   Paper,
//   Skeleton,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import StarIcon from '@mui/icons-material/Star';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// import BoltIcon from '@mui/icons-material/Bolt';
// import BusinessIcon from '@mui/icons-material/Business';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import { getAllPlans } from '../redux/slices/planSlice';

// // Plan Card Skeleton Component
// const PlanCardSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//           borderRadius: { xs: 2, sm: 3 },
//           p: { xs: 2, sm: 3, md: 4 },
//         }}
//       >
//         <Box sx={{ textAlign: 'center', mb: 4 }}>
//           <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
//           <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto', mb: 1 }} />
//           <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 2 }} />

//           <Box sx={{ mb: 2 }}>
//             <Skeleton variant="text" width="40%" height={40} sx={{ mx: 'auto' }} />
//           </Box>
//         </Box>

//         <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 3, borderRadius: 2 }} />

//         <Box sx={{ flexGrow: 1 }}>
//           {[1, 2, 3, 4].map((item) => (
//             <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//               <Skeleton variant="circular" width={20} height={20} />
//               <Skeleton variant="text" width="80%" height={20} />
//             </Box>
//           ))}
//         </Box>
//       </Card>
//     </Grid>
//   );
// };

// const Pricing = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const [billingCycle, setBillingCycle] = useState('monthly');
//   const [loading, setLoading] = useState(true);

//   // Get plans from Redux state
//   const { plansList = [] } = useSelector((state) => state.plan || {});

//   // Helper functions
//   const getPlanIcon = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return <RocketLaunchIcon />;
//     if (name.includes('growth') || name.includes('pro')) return <BoltIcon />;
//     if (name.includes('enterprise') || name.includes('business')) return <BusinessIcon />;
//     return <InventoryIcon />;
//   };

//   const getPlanColor = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return '#f97316'; // Orange
//     if (name.includes('growth') || name.includes('pro')) return '#0f766e'; // Teal
//     if (name.includes('enterprise') || name.includes('business')) return '#8b5cf6'; // Purple
//     return '#64748b'; // Gray
//   };

//   const getPlanGradient = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return 'linear-gradient(135deg, #f97316, #fb923c)';
//     if (name.includes('growth') || name.includes('pro')) return 'linear-gradient(135deg, #0f766e, #14b8a6)';
//     if (name.includes('enterprise') || name.includes('business')) return 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
//     return 'linear-gradient(135deg, #64748b, #94a3b8)';
//   };

//   // Map API data to plan format
//   const subscriptionPlans = plansList.map((plan) => ({
//     id: plan._id,
//     name: plan.name || 'Plan',
//     description: plan.description || 'Plan description',
//     monthlyPrice: plan.monthlyPrice || plan.price || 0,
//     yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
//     icon: plan.icon || getPlanIcon(plan.name),
//     features: plan.features || [],
//     limitations: plan.limitations || [],
//     popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
//     color: getPlanColor(plan.name),
//     gradient: getPlanGradient(plan.name),
//   }));

//   // Fetch plans on component mount
//   useEffect(() => {
//     const fetchPlans = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         // Show skeleton for 1 second minimum for better UX
//         setTimeout(() => {
//           setLoading(false);
//         }, 1000);
//       }
//     };
//     fetchPlans();
//   }, [dispatch]);

//   const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

//   const getSavings = (plan) => {
//     if (billingCycle === 'yearly' && plan.monthlyPrice) {
//       const monthlyTotal = plan.monthlyPrice * 12;
//       return monthlyTotal - plan.yearlyPrice;
//     }
//     return 0;
//   };

//   const getButtonVariant = (plan) => {
//     if (plan.popular) return 'contained';
//     return 'outlined';
//   };

//   const getButtonStyles = (plan) => {
//     const baseStyles = {
//       py: { xs: 1, sm: 1.2, md: 1.5 },
//       px: { xs: 2, sm: 3 },
//       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//       fontWeight: 600,
//       borderRadius: { xs: 1.5, sm: 2 },
//       textTransform: 'none',
//       width: '100%',
//       transition: 'all 0.3s ease',
//     };

//     if (plan.popular) {
//       return {
//         ...baseStyles,
//         background: plan.gradient,
//         color: 'white',
//         border: 'none',
//         '&:hover': {
//           opacity: 0.9,
//           transform: 'translateY(-2px)',
//           boxShadow: `0 10px 20px -5px ${alpha(plan.color, 0.4)}`,
//         },
//       };
//     }

//     return {
//       ...baseStyles,
//       bgcolor: 'transparent',
//       color: plan.color,
//       border: `2px solid ${plan.color}`,
//       '&:hover': {
//         bgcolor: alpha(plan.color, 0.05),
//         transform: 'translateY(-2px)',
//         boxShadow: `0 10px 20px -5px ${alpha(plan.color, 0.2)}`,
//       },
//     };
//   };

//   const renderPlanCard = (plan, index) => {
//     const isPopular = plan.popular;
//     const savings = getSavings(plan);

//     return (
//       <Grid item xs={12} sm={6} md={4} key={plan.id || index} sx={{ display: 'flex' }}>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: index * 0.1 }}
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Box
//             sx={{
//               position: 'relative',
//               height: '100%',
//               transform: isPopular && !isMobile ? 'scale(1.05)' : 'scale(1)',
//               zIndex: isPopular ? 10 : 1,
//               transition: 'transform 0.3s ease',
//               '&:hover': {
//                 transform: isPopular && !isMobile ? 'scale(1.08)' : 'scale(1.02)',
//               },
//             }}
//           >
//             {isPopular && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: -12,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   zIndex: 20,
//                 }}
//               >
//                 <Chip
//                   icon={<StarIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#fff' }} />}
//                   label="Most Popular"
//                   sx={{
//                     background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     px: { xs: 1, sm: 2 },
//                     height: { xs: 28, sm: 32 },
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     boxShadow: '0 4px 10px rgba(15, 118, 110, 0.3)',
//                     '& .MuiChip-icon': {
//                       color: 'white',
//                       ml: { xs: 0.5, sm: 1 },
//                     },
//                   }}
//                 />
//               </Box>
//             )}

//             <Card
//               elevation={isPopular ? 8 : 2}
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 border: isPopular ? '2px solid' : '1px solid',
//                 borderColor: isPopular ? alpha(plan.color, 0.5) : alpha('#e2e8f0', 0.5),
//                 borderRadius: { xs: 2, sm: 3 },
//                 overflow: 'hidden',
//                 position: 'relative',
//                 '&:hover': {
//                   boxShadow: !isMobile ? `0 20px 40px -10px ${alpha(plan.color, 0.2)}` : 'none',
//                 },
//               }}
//             >
//               {/* Top gradient bar */}
//               <Box
//                 sx={{
//                   height: 4,
//                   background: plan.gradient,
//                   width: '100%',
//                 }}
//               />

//               <CardContent sx={{
//                 p: { xs: 2, sm: 3, md: 4 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//               }}>
//                 {/* Icon with gradient background */}
//                 <Box sx={{
//                   textAlign: 'center',
//                   mb: 2,
//                   height: { xs: '110px', sm: '130px', md: '140px' },
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'flex-start',
//                   alignItems: 'center',
//                 }}>
//                   <Box
//                     sx={{
//                       width: { xs: 60, sm: 70, md: 80 },
//                       height: { xs: 60, sm: 70, md: 80 },
//                       borderRadius: '50%',
//                       background: `linear-gradient(135deg, ${alpha(plan.color, 0.1)} 0%, ${alpha(plan.color, 0.2)} 100%)`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mb: 1.5,
//                       border: `2px solid ${alpha(plan.color, 0.2)}`,
//                     }}
//                   >
//                     <Box sx={{
//                       color: plan.color,
//                       fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
//                       lineHeight: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                       {plan.icon}
//                     </Box>
//                   </Box>

//                   <Typography
//                     variant={isMobile ? "h5" : "h4"}
//                     sx={{
//                       fontWeight: 700,
//                       color: '#1e293b',
//                       fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
//                       lineHeight: 1.2,
//                       mb: 0.5,
//                     }}
//                   >
//                     {plan.name}
//                   </Typography>
//                 </Box>

//                 {/* Description */}
//                 <Box sx={{
//                   height: { xs: '40px', sm: '50px', md: '60px' },
//                   mb: 2,
//                   overflow: 'hidden',
//                 }}>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: '#64748b',
//                       fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
//                       textAlign: 'center',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                       overflow: 'hidden',
//                     }}
//                   >
//                     {plan.description}
//                   </Typography>
//                 </Box>

//                 {/* Price */}
//                 <Box sx={{
//                   textAlign: 'center',
//                   mb: 2,
//                   height: { xs: '70px', sm: '80px', md: '90px' },
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
//                     <Typography
//                       component="span"
//                       sx={{
//                         fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
//                         fontWeight: 500,
//                         color: plan.color,
//                         lineHeight: 1,
//                       }}
//                     >
//                       ₹{getPrice(plan)}
//                     </Typography>
//                     <Typography
//                       component="span"
//                       sx={{
//                         fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//                         color: '#64748b',
//                       }}
//                     >
//                       /{billingCycle === 'monthly' ? 'mo' : 'yr'}
//                     </Typography>
//                   </Box>

//                   {savings > 0 && (
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         color: '#059669',
//                         fontWeight: 600,
//                         display: 'block',
//                         mt: 0.5,
//                         fontSize: { xs: '0.65rem', sm: '0.75rem' },
//                       }}
//                     >
//                       Save ${savings}/year
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Button Section */}
//                 <Box sx={{
//                   mb: 2,
//                   height: { xs: '70px', sm: '80px', md: '90px' },
//                 }}>
//                   <Button
//                     fullWidth
//                     variant={getButtonVariant(plan)}
//                     onClick={() => navigate(`/signup?plan=${plan.name.toLowerCase()}&id=${plan.id}`)}
//                     sx={getButtonStyles(plan)}
//                   >
//                     Start Free Trial
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: 'block',
//                       textAlign: 'center',
//                       mt: 0.5,
//                       color: '#64748b',
//                       fontSize: { xs: '0.6rem', sm: '0.7rem' },
//                     }}
//                   >
//                     14-day trial, no card required
//                   </Typography>
//                 </Box>

//                 {/* Features List */}
//                 <Box sx={{
//                   flexGrow: 1,
//                   overflowY: 'auto',
//                   maxHeight: { xs: '200px', sm: '220px', md: '240px' },
//                   pr: 0.5,
//                 }}>
//                   <List sx={{
//                     '& .MuiListItem-root': {
//                       px: 0,
//                       py: { xs: 0.25, sm: 0.5 },
//                     },
//                   }}>
//                     {plan.features.map((feature, i) => (
//                       <ListItem key={i} disableGutters>
//                         <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                           <Box
//                             sx={{
//                               width: { xs: 20, sm: 22, md: 24 },
//                               height: { xs: 20, sm: 22, md: 24 },
//                               borderRadius: '50%',
//                               background: alpha(plan.color, 0.1),
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <FaCheck style={{
//                               color: plan.color,
//                               fontSize: isMobile ? 10 : 12,
//                             }} />
//                           </Box>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={feature}
//                           primaryTypographyProps={{
//                             sx: {
//                               fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                               color: '#334155',
//                             }
//                           }}
//                         />
//                       </ListItem>
//                     ))}

//                     {plan.limitations && plan.limitations.map((lim, i) => (
//                       <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
//                         <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
//                           <Box
//                             sx={{
//                               width: { xs: 20, sm: 22, md: 24 },
//                               height: { xs: 20, sm: 22, md: 24 },
//                               borderRadius: '50%',
//                               background: alpha('#ef4444', 0.1),
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <FaTimes style={{
//                               color: '#ef4444',
//                               fontSize: isMobile ? 10 : 12,
//                             }} />
//                           </Box>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={lim}
//                           primaryTypographyProps={{
//                             sx: {
//                               fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
//                               color: '#64748b',
//                               textDecoration: 'line-through',
//                             }
//                           }}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//         </motion.div>
//       </Grid>
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Header />

//       {/* Hero Section */}
//       <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
//               Simple. Transparent. No surprises.
//             </div>

//             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 px-2">
//               Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
//               <span className="text-gradient">right now</span>
//             </h1>

//             <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
//               Real-time GPS tracking + simple reports for field teams.<br />
//               No complex setup. <strong>No developer API required</strong> on affordable plans.
//             </p>

//             {/* Billing Toggle */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
//               <div className="flex items-center gap-3 sm:gap-4">
//                 <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                   Monthly
//                 </span>
//                 <button
//                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//                   className="relative w-14 sm:w-16 h-8 sm:h-9 bg-gradient-to-r from-teal-600 to-teal-500 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
//                 >
//                   <motion.div
//                     className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md"
//                     animate={{ x: billingCycle === 'yearly' ? (isMobile ? 22 : 28) : 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   />
//                 </button>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
//                     Yearly
//                   </span>
//                   <Chip
//                     label="Save up to 25%"
//                     size="small"
//                     sx={{
//                       background: 'linear-gradient(135deg, #059669, #10b981)',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.875rem' },
//                       height: { xs: 20, sm: 24, md: 28 },
//                       '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Features List */}
//             <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-700 text-xs sm:text-sm md:text-base">
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-teal-600 text-xs sm:text-sm" /> 14-day free trial</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-teal-600 text-xs sm:text-sm" /> No credit card required</div>
//               <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-teal-600 text-xs sm:text-sm" /> Cancel anytime</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="stretch">
//             {loading ? (
//               // Show skeletons for 1 second
//               <>
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//               </>
//             ) : subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{
//                   p: { xs: 3, sm: 4, md: 5 },
//                   textAlign: 'center',
//                   borderRadius: { xs: 2, sm: 3 },
//                 }}>
//                   <CreditCardIcon sx={{
//                     fontSize: { xs: 36, sm: 42, md: 48 },
//                     color: alpha('#0f766e', 0.3),
//                     mb: 2
//                   }} />
//                   <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
//                     Please check back later for our pricing plans.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
//           >
//             <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
//               Quick answers to the questions we hear most often
//             </p>
//           </motion.div>

//           <div className="space-y-3 sm:space-y-4">
//             {[
//               {
//                 question: 'Can I change plans later?',
//                 answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
//               },
//               {
//                 question: 'What happens after the free trial?',
//                 answer: 'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
//               },
//               {
//                 question: 'Do you offer discounts for annual plans?',
//                 answer: 'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
//               },
//               {
//                 question: 'Is there a setup fee?',
//                 answer: 'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
//               },
//               {
//                 question: 'Can I get a custom plan?',
//                 answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
//               },
//               {
//                 question: 'What payment methods do you accept?',
//                 answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
//               },
//             ].map((faq, index) => (
//               <Accordion
//                 key={index}
//                 elevation={0}
//                 sx={{
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   border: '1px solid',
//                   borderColor: alpha('#e2e8f0', 0.5),
//                   backgroundColor: 'white',
//                   overflow: 'hidden',
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                   },
//                   '&:before': { display: 'none' },
//                   boxShadow: 'none',
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon sx={{ color: '#0f766e', fontSize: { xs: 18, sm: 20, md: 24 } }} />}
//                   aria-controls={`panel${index}-content`}
//                   id={`panel${index}-header`}
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     py: { xs: 1.5, sm: 2, md: 2.5 },
//                     '& .MuiAccordionSummary-content': {
//                       margin: '0 !important',
//                     },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontWeight: 600,
//                       color: '#1e293b',
//                       fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
//                       textAlign: 'left',
//                     }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails
//                   sx={{
//                     px: { xs: 2, sm: 3, md: 4 },
//                     pb: { xs: 2, sm: 3, md: 4 },
//                     pt: 0,
//                     borderTop: '1px solid',
//                     borderColor: alpha('#e2e8f0', 0.5),
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: '#475569',
//                       fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
//                       lineHeight: 1.6,
//                     }}
//                   >
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </div>

//           {/* CTA at bottom of FAQ */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16"
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 color: '#4b5563',
//                 mb: { xs: 3, sm: 4 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
//               }}
//             >
//               Still have questions? We're happy to help.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/contact')}
//               sx={{
//                 borderWidth: 2,
//                 px: { xs: 3, sm: 4, md: 5 },
//                 py: { xs: 1, sm: 1.2, md: 1.5 },
//                 fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
//                 fontWeight: 600,
//                 borderRadius: { xs: 4, sm: 5 },
//                 textTransform: 'none',
//                 borderColor: '#0f766e',
//                 color: '#0f766e',
//                 '&:hover': {
//                   backgroundColor: '#0f766e',
//                   color: 'white',
//                   borderColor: '#0f766e',
//                   transform: 'translateY(-2px)',
//                   boxShadow: '0 10px 20px -5px rgba(15, 118, 110, 0.4)',
//                 },
//               }}
//             >
//               Contact Us →
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Pricing;




















////////////////////////////// Change Color Theam/////////////////////////////////////

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AccordionSummary,
  Grid,
  Paper,
  Skeleton,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getAllPlans } from '../redux/slices/planSlice';

// Plan Card Skeleton Component
const PlanCardSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: alpha('#2563EB', 0.1),
          borderRadius: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2, bgcolor: alpha('#2563EB', 0.2) }} />
          <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto', mb: 1, bgcolor: alpha('#2563EB', 0.1) }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 2, bgcolor: alpha('#2563EB', 0.1) }} />

          <Box sx={{ mb: 2 }}>
            <Skeleton variant="text" width="40%" height={40} sx={{ mx: 'auto', bgcolor: alpha('#2563EB', 0.2) }} />
          </Box>
        </Box>

        <Skeleton variant="rounded" width="100%" height={40} sx={{ mb: 3, borderRadius: 2, bgcolor: alpha('#2563EB', 0.1) }} />

        <Box sx={{ flexGrow: 1 }}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
              <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: alpha('#2563EB', 0.1) }} />
            </Box>
          ))}
        </Box>
      </Card>
    </Grid>
  );
};

const Pricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(true);

  // Get plans from Redux state
  const { plansList = [] } = useSelector((state) => state.plan || {});

  // Helper functions
  const getPlanIcon = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return <RocketLaunchIcon />;
    if (name.includes('growth') || name.includes('pro')) return <BoltIcon />;
    if (name.includes('enterprise') || name.includes('business')) return <BusinessIcon />;
    return <InventoryIcon />;
  };

  const getPlanColor = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return '#f97316'; // Orange
    if (name.includes('growth') || name.includes('pro')) return '#2563EB'; // Blue
    if (name.includes('enterprise') || name.includes('business')) return '#8b5cf6'; // Purple
    return '#64748b'; // Gray
  };

  const getPlanGradient = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return 'linear-gradient(135deg, #f97316, #fb923c)';
    if (name.includes('growth') || name.includes('pro')) return 'linear-gradient(135deg, #2563EB, #1E40AF)';
    if (name.includes('enterprise') || name.includes('business')) return 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
    return 'linear-gradient(135deg, #64748b, #94a3b8)';
  };

  // Map API data to plan format
  const subscriptionPlans = plansList.map((plan) => ({
    id: plan._id,
    name: plan.name || 'Plan',
    description: plan.description || 'Plan description',
    monthlyPrice: plan.monthlyPrice || plan.price || 0,
    yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
    icon: plan.icon || getPlanIcon(plan.name),
    features: plan.features || [],
    limitations: plan.limitations || [],
    popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
    color: getPlanColor(plan.name),
    gradient: getPlanGradient(plan.name),
  }));

  // Fetch plans on component mount
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        await dispatch(getAllPlans()).unwrap();
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        // Show skeleton for 1 second minimum for better UX
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchPlans();
  }, [dispatch]);

  const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice) {
      const monthlyTotal = plan.monthlyPrice * 12;
      return monthlyTotal - plan.yearlyPrice;
    }
    return 0;
  };

  const getButtonVariant = (plan) => {
    if (plan.popular) return 'contained';
    return 'outlined';
  };

  const getButtonStyles = (plan) => {
    const baseStyles = {
      py: { xs: 1, sm: 1.2, md: 1.5 },
      px: { xs: 2, sm: 3 },
      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
      fontWeight: 600,
      borderRadius: { xs: 1.5, sm: 2 },
      textTransform: 'none',
      width: '100%',
      transition: 'all 0.3s ease',
    };

    if (plan.popular) {
      return {
        ...baseStyles,
        background: plan.gradient,
        color: 'white',
        border: 'none',
        '&:hover': {
          opacity: 0.9,
          transform: 'translateY(-2px)',
          boxShadow: `0 10px 20px -5px ${alpha(plan.color, 0.4)}`,
        },
      };
    }

    return {
      ...baseStyles,
      bgcolor: 'transparent',
      color: plan.color,
      border: `2px solid ${plan.color}`,
      '&:hover': {
        bgcolor: alpha(plan.color, 0.05),
        transform: 'translateY(-2px)',
        boxShadow: `0 10px 20px -5px ${alpha(plan.color, 0.2)}`,
      },
    };
  };

  const renderPlanCard = (plan, index) => {
    const isPopular = plan.popular;
    const savings = getSavings(plan);

    return (
      <Grid item xs={12} sm={6} md={4} key={plan.id || index} sx={{ display: 'flex' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              transform: isPopular && !isMobile ? 'scale(1.05)' : 'scale(1)',
              zIndex: isPopular ? 10 : 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: isPopular && !isMobile ? 'scale(1.08)' : 'scale(1.02)',
              },
            }}
          >
            {isPopular && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 20,
                }}
              >
                <Chip
                  icon={<StarIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#fff' }} />}
                  label="Most Popular"
                  sx={{
                    background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 1, sm: 2 },
                    height: { xs: 28, sm: 32 },
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
                    '& .MuiChip-icon': {
                      color: 'white',
                      ml: { xs: 0.5, sm: 1 },
                    },
                  }}
                />
              </Box>
            )}

            <Card
              elevation={isPopular ? 8 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: isPopular ? '2px solid' : '1px solid',
                borderColor: isPopular ? alpha(plan.color, 0.5) : alpha('#e2e8f0', 0.5),
                borderRadius: { xs: 2, sm: 3 },
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  boxShadow: !isMobile ? `0 20px 40px -10px ${alpha(plan.color, 0.2)}` : 'none',
                },
              }}
            >
              {/* Top gradient bar */}
              <Box
                sx={{
                  height: 4,
                  background: plan.gradient,
                  width: '100%',
                }}
              />

              <CardContent sx={{
                p: { xs: 2, sm: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                {/* Icon with gradient background */}
                <Box sx={{
                  textAlign: 'center',
                  mb: 2,
                  height: { xs: '110px', sm: '130px', md: '140px' },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                  <Box
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${alpha(plan.color, 0.1)} 0%, ${alpha(plan.color, 0.2)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5,
                      border: `2px solid ${alpha(plan.color, 0.2)}`,
                    }}
                  >
                    <Box sx={{
                      color: plan.color,
                      fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {plan.icon}
                    </Box>
                  </Box>

                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                      fontWeight: 700,
                      color: '#1e293b',
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {plan.name}
                  </Typography>
                </Box>

                {/* Description */}
                <Box sx={{
                  height: { xs: '40px', sm: '50px', md: '60px' },
                  mb: 2,
                  overflow: 'hidden',
                }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748b',
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      textAlign: 'center',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {plan.description}
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{
                  textAlign: 'center',
                  mb: 2,
                  height: { xs: '70px', sm: '80px', md: '90px' },
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        fontWeight: 500,
                        color: plan.color,
                        lineHeight: 1,
                      }}
                    >
                      ₹{getPrice(plan)}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                        color: '#64748b',
                      }}
                    >
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </Typography>
                  </Box>

                  {savings > 0 && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#059669',
                        fontWeight: 600,
                        display: 'block',
                        mt: 0.5,
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      }}
                    >
                      Save ₹{savings}/year
                    </Typography>
                  )}
                </Box>

                {/* Button Section */}
                <Box sx={{
                  mb: 2,
                  height: { xs: '70px', sm: '80px', md: '90px' },
                }}>
                  <Button
                    fullWidth
                    variant={getButtonVariant(plan)}
                    onClick={() => navigate(`/signup?plan=${plan.name.toLowerCase()}&id=${plan.id}`)}
                    sx={getButtonStyles(plan)}
                  >
                    Start Free Trial
                  </Button>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      mt: 0.5,
                      color: '#64748b',
                      fontSize: { xs: '0.6rem', sm: '0.7rem' },
                    }}
                  >
                    14-day trial, no card required
                  </Typography>
                </Box>

                {/* Features List */}
                <Box sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  maxHeight: { xs: '200px', sm: '220px', md: '240px' },
                  pr: 0.5,
                }}>
                  <List sx={{
                    '& .MuiListItem-root': {
                      px: 0,
                      py: { xs: 0.25, sm: 0.5 },
                    },
                  }}>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
                          <Box
                            sx={{
                              width: { xs: 20, sm: 22, md: 24 },
                              height: { xs: 20, sm: 22, md: 24 },
                              borderRadius: '50%',
                              background: alpha(plan.color, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <FaCheck style={{
                              color: plan.color,
                              fontSize: isMobile ? 10 : 12,
                            }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                              color: '#334155',
                            }
                          }}
                        />
                      </ListItem>
                    ))}

                    {plan.limitations && plan.limitations.map((lim, i) => (
                      <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
                        <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
                          <Box
                            sx={{
                              width: { xs: 20, sm: 22, md: 24 },
                              height: { xs: 20, sm: 22, md: 24 },
                              borderRadius: '50%',
                              background: alpha('#ef4444', 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <FaTimes style={{
                              color: '#ef4444',
                              fontSize: isMobile ? 10 : 12,
                            }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={lim}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                              color: '#64748b',
                              textDecoration: 'line-through',
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </motion.div>
      </Grid>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              Simple. Transparent. No surprises.
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 px-2">
              Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
              <span className="text-blue-600">right now</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-10 px-4">
              Real-time GPS tracking + simple reports for field teams.<br />
              No complex setup. <strong>No developer API required</strong> on affordable plans.
            </p>

            {/* Billing Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-14 sm:w-16 h-8 sm:h-9 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <motion.div
                    className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full shadow-md"
                    animate={{ x: billingCycle === 'yearly' ? (isMobile ? 22 : 28) : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className={`text-sm sm:text-base md:text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                    Yearly
                  </span>
                  <Chip
                    label="Save up to 25%"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.875rem' },
                      height: { xs: 20, sm: 24, md: 28 },
                      '& .MuiChip-label': { px: { xs: 1, sm: 1.5 } },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-700 text-xs sm:text-sm md:text-base">
              <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-blue-600 text-xs sm:text-sm" /> 14-day free trial</div>
              <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-blue-600 text-xs sm:text-sm" /> No credit card required</div>
              <div className="flex items-center gap-1 sm:gap-2"><FaCheck className="text-blue-600 text-xs sm:text-sm" /> Cancel anytime</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="stretch">
            {loading ? (
              // Show skeletons for 1 second
              <>
                <PlanCardSkeleton />
                <PlanCardSkeleton />
                <PlanCardSkeleton />
              </>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  textAlign: 'center',
                  borderRadius: { xs: 2, sm: 3 },
                  border: '1px solid',
                  borderColor: alpha('#2563EB', 0.1),
                }}>
                  <CreditCardIcon sx={{
                    fontSize: { xs: 36, sm: 42, md: 48 },
                    color: alpha('#2563EB', 0.3),
                    mb: 2
                  }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
                    No subscription plans available
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Please check back later for our pricing plans.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Quick answers to the questions we hear most often
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: 'Can I change plans later?',
                answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
              },
              {
                question: 'What happens after the free trial?',
                answer: 'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
              },
              {
                question: 'Do you offer discounts for annual plans?',
                answer: 'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
              },
              {
                question: 'Is there a setup fee?',
                answer: 'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
              },
              {
                question: 'Can I get a custom plan?',
                answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
              },
            ].map((faq, index) => (
              <Accordion
                key={index}
                elevation={0}
                sx={{
                  borderRadius: { xs: 1.5, sm: 2 },
                  border: '1px solid',
                  borderColor: alpha('#2563EB', 0.1),
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#2563EB',
                  },
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#2563EB', fontSize: { xs: 18, sm: 20, md: 24 } }} />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 1.5, sm: 2, md: 2.5 },
                    '& .MuiAccordionSummary-content': {
                      margin: '0 !important',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
                      textAlign: 'left',
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: { xs: 2, sm: 3, md: 4 },
                    pb: { xs: 2, sm: 3, md: 4 },
                    pt: 0,
                    borderTop: '1px solid',
                    borderColor: alpha('#2563EB', 0.1),
                  }}
                >
                  <Typography
                    sx={{
                      color: '#475569',
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          {/* CTA at bottom of FAQ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16"
          >
            <Typography
              variant="body1"
              sx={{
                color: '#4b5563',
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
              }}
            >
              Still have questions? We're happy to help.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/contact')}
              sx={{
                borderWidth: 2,
                px: { xs: 3, sm: 4, md: 5 },
                py: { xs: 1, sm: 1.2, md: 1.5 },
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: { xs: 4, sm: 5 },
                textTransform: 'none',
                borderColor: '#2563EB',
                color: '#2563EB',
                '&:hover': {
                  backgroundColor: '#2563EB',
                  color: 'white',
                  borderColor: '#2563EB',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                },
              }}
            >
              Contact Us →
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Pricing;