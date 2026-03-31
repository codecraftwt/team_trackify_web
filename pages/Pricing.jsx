
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
// import { getAvailablePlans } from '../redux/slices/planSlice';

// // Plan Card Skeleton Component - Smaller version
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
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           borderRadius: 1.5,
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//         }}
//       >
//         <Box sx={{ textAlign: 'center', mb: 2 }}>
//           <Skeleton variant="circular" width={48} height={48} sx={{ mx: 'auto', mb: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width="80%" height={16} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

//           <Box sx={{ mb: 1 }}>
//             <Skeleton variant="text" width="40%" height={28} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//         </Box>

//         <Skeleton variant="rounded" width="100%" height={36} sx={{ mb: 1.5, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

//         <Box sx={{ flexGrow: 1 }}>
//           {[1, 2, 3, 4].map((item) => (
//             <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
//               <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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

//   // ✅ FIX: Use availablePlans instead of plansList
//   const { availablePlans = [] } = useSelector((state) => state.plan || {});

//   // Helper functions
//   const getPlanIcon = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return <RocketLaunchIcon sx={{ fontSize: 24 }} />;
//     if (name.includes('growth') || name.includes('pro')) return <BoltIcon sx={{ fontSize: 24 }} />;
//     if (name.includes('enterprise') || name.includes('business')) return <BusinessIcon sx={{ fontSize: 24 }} />;
//     return <InventoryIcon sx={{ fontSize: 24 }} />;
//   };

//   const getPlanColor = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return theme.palette.secondary.main;
//     if (name.includes('growth') || name.includes('pro')) return theme.palette.primary.main;
//     if (name.includes('enterprise') || name.includes('business')) return '#8b5cf6';
//     return theme.palette.text.secondary;
//   };

//   const getPlanGradient = (planName) => {
//     const name = planName?.toLowerCase() || '';
//     if (name.includes('starter') || name.includes('basic')) return `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`;
//     if (name.includes('growth') || name.includes('pro')) return `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;
//     if (name.includes('enterprise') || name.includes('business')) return 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
//     return `linear-gradient(135deg, ${theme.palette.text.secondary}, ${theme.palette.grey[400]})`;
//   };

//   // ✅ Map API data to plan format - using availablePlans
//   const subscriptionPlans = availablePlans.map((plan) => ({
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
//         await dispatch(getAvailablePlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//         }, 800);
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
//       py: 0.8,
//       px: 1.5,
//       fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//       fontWeight: 600,
//       borderRadius: 1.5,
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
//           boxShadow: `0 8px 16px -5px ${alpha(plan.color, 0.4)}`,
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
//         boxShadow: `0 8px 16px -5px ${alpha(plan.color, 0.2)}`,
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
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Box
//             sx={{
//               position: 'relative',
//               height: '100%',
//               transform: isPopular && !isMobile ? 'scale(1.02)' : 'scale(1)',
//               zIndex: isPopular ? 10 : 1,
//               transition: 'transform 0.3s ease',
//               '&:hover': {
//                 transform: isPopular && !isMobile ? 'scale(1.03)' : 'scale(1.01)',
//               },
//             }}
//           >
//             {isPopular && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: -10,
//                   left: '50%',
//                   transform: 'translateX(-50%)',
//                   zIndex: 20,
//                 }}
//               >
//                 <Chip
//                   icon={<StarIcon sx={{ fontSize: 12, color: '#fff' }} />}
//                   label="Most Popular"
//                   size="small"
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     color: 'white',
//                     fontWeight: 'bold',
//                     height: 22,
//                     fontSize: '0.65rem',
//                     boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
//                     '& .MuiChip-icon': {
//                       color: 'white',
//                     },
//                   }}
//                 />
//               </Box>
//             )}

//             <Card
//               elevation={isPopular ? 4 : 1}
//               sx={{
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 border: isPopular ? '2px solid' : '1px solid',
//                 borderColor: isPopular ? alpha(plan.color, 0.5) : alpha(theme.palette.divider, 0.5),
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 position: 'relative',
//                 '&:hover': {
//                   boxShadow: !isMobile ? `0 12px 24px -10px ${alpha(plan.color, 0.2)}` : 'none',
//                 },
//               }}
//             >
//               {/* Top gradient bar */}
//               <Box
//                 sx={{
//                   height: 3,
//                   background: plan.gradient,
//                   width: '100%',
//                 }}
//               />

//               <CardContent sx={{
//                 p: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//               }}>
//                 {/* Icon with gradient background */}
//                 <Box sx={{
//                   textAlign: 'center',
//                   mb: 1.5,
//                 }}>
//                   <Box
//                     sx={{
//                       width: 56,
//                       height: 56,
//                       borderRadius: '50%',
//                       background: `linear-gradient(135deg, ${alpha(plan.color, 0.1)} 0%, ${alpha(plan.color, 0.2)} 100%)`,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mx: 'auto',
//                       mb: 1,
//                       border: `2px solid ${alpha(plan.color, 0.2)}`,
//                     }}
//                   >
//                     <Box sx={{
//                       color: plan.color,
//                       fontSize: '1.5rem',
//                       lineHeight: 1,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                       {plan.icon}
//                     </Box>
//                   </Box>

//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       fontWeight: 700,
//                       color: 'text.primary',
//                       fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     {plan.name}
//                   </Typography>
//                 </Box>

//                 {/* Description */}
//                 <Box sx={{
//                   height: 32,
//                   mb: 1.5,
//                   overflow: 'hidden',
//                 }}>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: 'text.secondary',
//                       fontSize: '0.7rem',
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
//                   mb: 1.5,
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
//                     <Typography
//                       component="span"
//                       sx={{
//                         fontSize: '1.5rem',
//                         fontWeight: 600,
//                         color: plan.color,
//                         lineHeight: 1,
//                       }}
//                     >
//                       ₹{getPrice(plan)}
//                     </Typography>
//                     <Typography
//                       component="span"
//                       sx={{
//                         fontSize: '0.7rem',
//                         color: 'text.secondary',
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
//                         mt: 0.25,
//                         fontSize: '0.6rem',
//                       }}
//                     >
//                       Save ₹{savings}/year
//                     </Typography>
//                   )}
//                 </Box>

//                 {/* Button Section */}
//                 <Box sx={{ mb: 1.5 }}>
//                   <Button
//                     fullWidth
//                     variant={getButtonVariant(plan)}
//                     // onClick={() => navigate(`/signup?plan=${plan.name.toLowerCase()}&id=${plan.id}`)}
//                     onClick={() => navigate('/register')}
//                     sx={getButtonStyles(plan)}
//                   >
//                     Buy Now
//                   </Button>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: 'block',
//                       textAlign: 'center',
//                       mt: 0.5,
//                       color: 'text.secondary',
//                       fontSize: '0.6rem',
//                     }}
//                   >
//                     14-day trial, no card required
//                   </Typography>
//                 </Box>

//                 {/* Features List */}
//                 <Box sx={{
//                   flexGrow: 1,
//                   overflowY: 'auto',
//                   maxHeight: { xs: '180px', sm: '200px', md: '220px' },
//                   pr: 0.5,
//                 }}>
//                   <List sx={{
//                     '& .MuiListItem-root': {
//                       px: 0,
//                       py: 0.25,
//                     },
//                   }}>
//                     {plan.features.map((feature, i) => (
//                       <ListItem key={i} disableGutters>
//                         <ListItemIcon sx={{ minWidth: 24 }}>
//                           <Box
//                             sx={{
//                               width: 18,
//                               height: 18,
//                               borderRadius: '50%',
//                               background: alpha(plan.color, 0.1),
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <FaCheck style={{
//                               color: plan.color,
//                               fontSize: 10,
//                             }} />
//                           </Box>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={feature}
//                           primaryTypographyProps={{
//                             sx: {
//                               fontSize: '0.7rem',
//                               color: 'text.primary',
//                             }
//                           }}
//                         />
//                       </ListItem>
//                     ))}

//                     {plan.limitations && plan.limitations.map((lim, i) => (
//                       <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
//                         <ListItemIcon sx={{ minWidth: 24 }}>
//                           <Box
//                             sx={{
//                               width: 18,
//                               height: 18,
//                               borderRadius: '50%',
//                               background: alpha('#ef4444', 0.1),
//                               display: 'flex',
//                               alignItems: 'center',
//                               justifyContent: 'center',
//                             }}
//                           >
//                             <FaTimes style={{
//                               color: '#ef4444',
//                               fontSize: 10,
//                             }} />
//                           </Box>
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={lim}
//                           primaryTypographyProps={{
//                             sx: {
//                               fontSize: '0.7rem',
//                               color: 'text.secondary',
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
//     <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
//       <Header />

//       {/* Hero Section - Reduced padding */}
//       <section className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12" style={{ 
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` 
//       }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ 
//               backgroundColor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.dark
//             }}>
//               Simple. Transparent. No surprises.
//             </div>

//             <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3" style={{ color: theme.palette.text.primary }}>
//               Know <span style={{ color: theme.palette.primary.main }}>exactly</span> where your team is —<br className="hidden sm:block" />
//               <span style={{ color: theme.palette.primary.main }}>right now</span>
//             </h1>

//             <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-4" style={{ color: theme.palette.text.secondary }}>
//               Real-time GPS tracking + simple reports for field teams.<br />
//               No complex setup. <strong>No developer API required</strong> on affordable plans.
//             </p>

//             {/* Billing Toggle */}
//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
//               <div className="flex items-center gap-2">
//                 <span 
//                   className="text-xs sm:text-sm font-medium"
//                   style={{ 
//                     color: billingCycle === 'monthly' ? theme.palette.text.primary : theme.palette.text.secondary 
//                   }}
//                 >
//                   Monthly
//                 </span>
                
//                 <button
//                   onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
//                   className="relative w-12 h-6 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
//                   style={{ 
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                   }}
//                 >
//                   <motion.div
//                     className="w-4 h-4 bg-white rounded-full shadow-md"
//                     animate={{ x: billingCycle === 'yearly' ? (isMobile ? 20 : 24) : 0 }}
//                     transition={{ type: 'spring', stiffness: 500, damping: 30 }}
//                   />
//                 </button>
                
//                 <div className="flex items-center gap-1">
//                   <span 
//                     className="text-xs sm:text-sm font-medium"
//                     style={{ 
//                       color: billingCycle === 'yearly' ? theme.palette.text.primary : theme.palette.text.secondary 
//                     }}
//                   >
//                     Yearly
//                   </span>
//                   <Chip
//                     label="Save up to 25%"
//                     size="small"
//                     sx={{
//                       background: 'linear-gradient(135deg, #059669, #10b981)',
//                       color: 'white',
//                       fontWeight: 'bold',
//                       fontSize: '0.55rem',
//                       height: 18,
//                       '& .MuiChip-label': { px: 0.8 },
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Features List */}
//             <div className="flex flex-wrap justify-center gap-2 text-xs" style={{ color: theme.palette.text.secondary }}>
//               <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> 14-day free trial</div>
//               <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> No credit card required</div>
//               <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> Cancel anytime</div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Pricing Cards - Reduced spacing */}
//       <section className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: theme.palette.background.paper }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Grid container spacing={2} alignItems="stretch">
//             {loading ? (
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
//                   p: 3,
//                   textAlign: 'center',
//                   borderRadius: 2,
//                   border: '1px solid',
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                 }}>
//                   <CreditCardIcon sx={{
//                     fontSize: 32,
//                     color: alpha(theme.palette.primary.main, 0.3),
//                     mb: 1
//                   }} />
//                   <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.85rem' }}>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//                     Please check back later for our pricing plans.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </div>
//       </section>

//       {/* FAQ Section - Reduced spacing */}
//       <section className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-6"
//           >
//             <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme.palette.text.primary }}>
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xs sm:text-sm max-w-3xl mx-auto" style={{ color: theme.palette.text.secondary }}>
//               Quick answers to the questions we hear most often
//             </p>
//           </motion.div>

//           <div className="space-y-2">
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
//                   borderRadius: 1.5,
//                   border: '1px solid',
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   backgroundColor: theme.palette.background.paper,
//                   overflow: 'hidden',
//                   transition: 'all 0.2s ease',
//                   '&:hover': {
//                     borderColor: theme.palette.primary.main,
//                   },
//                   '&:before': { display: 'none' },
//                   boxShadow: 'none',
//                 }}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />}
//                   aria-controls={`panel${index}-content`}
//                   id={`panel${index}-header`}
//                   sx={{
//                     px: 2,
//                     py: 0.5,
//                     minHeight: 40,
//                     '& .MuiAccordionSummary-content': {
//                       margin: '0 !important',
//                     },
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       fontWeight: 600,
//                       color: 'text.primary',
//                       fontSize: '0.85rem',
//                       textAlign: 'left',
//                     }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>

//                 <AccordionDetails
//                   sx={{
//                     px: 2,
//                     pb: 1.5,
//                     pt: 0,
//                     borderTop: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: 'text.secondary',
//                       fontSize: '0.75rem',
//                       lineHeight: 1.5,
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
//             className="text-center mt-6"
//           >
//             <Typography
//               variant="body2"
//               sx={{
//                 color: 'text.secondary',
//                 mb: 2,
//                 fontSize: '0.75rem',
//               }}
//             >
//               Still have questions? We're happy to help.
//             </Typography>
//             <Button
//               variant="outlined"
//               onClick={() => navigate('/contact')}
//               sx={{
//                 borderWidth: 1.5,
//                 px: 2.5,
//                 py: 0.7,
//                 fontSize: '0.7rem',
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 borderColor: theme.palette.primary.main,
//                 color: theme.palette.primary.main,
//                 '&:hover': {
//                   backgroundColor: theme.palette.primary.main,
//                   color: 'white',
//                   borderColor: theme.palette.primary.main,
//                   transform: 'translateY(-2px)',
//                   boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.4)}`,
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
  Grid,
  Paper,
  Skeleton,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getAvailablePlans } from '../redux/slices/planSlice';

const PlanCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{
        height: '100%',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        borderRadius: 1.5,
        p: { xs: 1.5, sm: 2, md: 2.5 },
      }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={48} height={48} sx={{ mx: 'auto', mb: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width="80%" height={16} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Box sx={{ mb: 1 }}>
            <Skeleton variant="text" width="40%" height={28} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
        </Box>
        <Skeleton variant="rounded" width="100%" height={36} sx={{ mb: 1.5, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Box sx={{ flexGrow: 1 }}>
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
              <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(true);

  const { availablePlans = [] } = useSelector((state) => state.plan || {});

  console.log("=========================================");
  console.log("📍 PRICING PAGE LOADED");
  console.log("=========================================");

  const getPlanIcon = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return <RocketLaunchIcon sx={{ fontSize: 24 }} />;
    if (name.includes('growth') || name.includes('pro')) return <BoltIcon sx={{ fontSize: 24 }} />;
    if (name.includes('enterprise') || name.includes('business')) return <BusinessIcon sx={{ fontSize: 24 }} />;
    return <InventoryIcon sx={{ fontSize: 24 }} />;
  };

  const getPlanColor = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return theme.palette.secondary.main;
    if (name.includes('growth') || name.includes('pro')) return theme.palette.primary.main;
    if (name.includes('enterprise') || name.includes('business')) return '#8b5cf6';
    return theme.palette.text.secondary;
  };

  const getPlanGradient = (planName) => {
    const name = planName?.toLowerCase() || '';
    if (name.includes('starter') || name.includes('basic')) return `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`;
    if (name.includes('growth') || name.includes('pro')) return `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`;
    if (name.includes('enterprise') || name.includes('business')) return 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
    return `linear-gradient(135deg, ${theme.palette.text.secondary}, ${theme.palette.grey[400]})`;
  };

  const subscriptionPlans = availablePlans.map((plan) => ({
    id: plan._id,
    name: plan.name || 'Plan',
    description: plan.description || 'Plan description',
    monthlyPrice: plan.monthlyPrice || plan.price || 0,
    yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
    duration: plan.duration || 'month',
    icon: plan.icon || getPlanIcon(plan.name),
    features: plan.features || [],
    limitations: plan.limitations || [],
    popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
    color: getPlanColor(plan.name),
    gradient: getPlanGradient(plan.name),
    maxUsers: plan.maxUsers || 10,
    minUsers: plan.minUsers || 1,
  }));

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        await dispatch(getAvailablePlans()).unwrap();
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchPlans();
  }, [dispatch]);

  const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);
  const getSavings = (plan) => billingCycle === 'yearly' && plan.monthlyPrice ? (plan.monthlyPrice * 12) - plan.yearlyPrice : 0;

  const getButtonVariant = (plan) => plan.popular ? 'contained' : 'outlined';

  const getButtonStyles = (plan) => {
    const baseStyles = {
      py: 0.8,
      px: 1.5,
      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
      fontWeight: 600,
      borderRadius: 1.5,
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
        '&:hover': { opacity: 0.9, transform: 'translateY(-2px)', boxShadow: `0 8px 16px -5px ${alpha(plan.color, 0.4)}` },
      };
    }
    return {
      ...baseStyles,
      bgcolor: 'transparent',
      color: plan.color,
      border: `2px solid ${plan.color}`,
      '&:hover': { bgcolor: alpha(plan.color, 0.05), transform: 'translateY(-2px)', boxShadow: `0 8px 16px -5px ${alpha(plan.color, 0.2)}` },
    };
  };

  const handleSelectPlan = (plan) => {
    console.log("=========================================");
    console.log("🎯 PLAN SELECTED IN PRICING PAGE");
    console.log("Plan Details:", {
      id: plan.id,
      name: plan.name,
      price: getPrice(plan),
      billingCycle: billingCycle
    });
    
    const selectedPlanData = {
      id: plan.id,
      name: plan.name,
      price: getPrice(plan),
      originalPrice: billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice,
      billingCycle: billingCycle,
      duration: billingCycle === 'monthly' ? 'month' : 'year',
      maxUsers: plan.maxUsers,
      minUsers: plan.minUsers,
      description: plan.description,
      features: plan.features,
      color: plan.color,
    };
    
    console.log("📦 Selected Plan Data being sent to Register:", selectedPlanData);
    
    // Store in sessionStorage
    sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlanData));
    console.log("💾 Saved to sessionStorage");
    
    // Navigate with state
    console.log("🚀 Navigating to /register with state");
    navigate('/register', { 
      state: { 
        selectedPlan: selectedPlanData, 
        fromPricing: true 
      } 
    });
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
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Box sx={{
            position: 'relative',
            height: '100%',
            transform: isPopular && !isMobile ? 'scale(1.02)' : 'scale(1)',
            zIndex: isPopular ? 10 : 1,
            transition: 'transform 0.3s ease',
            '&:hover': { transform: isPopular && !isMobile ? 'scale(1.03)' : 'scale(1.01)' },
          }}>
            {isPopular && (
              <Box sx={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
                <Chip
                  icon={<StarIcon sx={{ fontSize: 12, color: '#fff' }} />}
                  label="Most Popular"
                  size="small"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'white',
                    fontWeight: 'bold',
                    height: 22,
                    fontSize: '0.65rem',
                    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '& .MuiChip-icon': { color: 'white' },
                  }}
                />
              </Box>
            )}
            <Card
              elevation={isPopular ? 4 : 1}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: isPopular ? '2px solid' : '1px solid',
                borderColor: isPopular ? alpha(plan.color, 0.5) : alpha(theme.palette.divider, 0.5),
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                '&:hover': { boxShadow: !isMobile ? `0 12px 24px -10px ${alpha(plan.color, 0.2)}` : 'none' },
              }}
            >
              <Box sx={{ height: 3, background: plan.gradient, width: '100%' }} />
              <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                  <Box sx={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${alpha(plan.color, 0.1)} 0%, ${alpha(plan.color, 0.2)} 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1,
                    border: `2px solid ${alpha(plan.color, 0.2)}`,
                  }}>
                    <Box sx={{ color: plan.color, fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {plan.icon}
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
                    {plan.name}
                  </Typography>
                </Box>
                <Box sx={{ height: 32, mb: 1.5, overflow: 'hidden' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {plan.description}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                    <Typography component="span" sx={{ fontSize: '1.5rem', fontWeight: 600, color: plan.color }}>₹{getPrice(plan)}</Typography>
                    <Typography component="span" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>/{billingCycle === 'monthly' ? 'mo' : 'yr'}</Typography>
                  </Box>
                  {savings > 0 && <Typography variant="caption" sx={{ color: '#059669', fontWeight: 600, display: 'block', mt: 0.25, fontSize: '0.6rem' }}>Save ₹{savings}/year</Typography>}
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Button fullWidth variant={getButtonVariant(plan)} onClick={() => handleSelectPlan(plan)} sx={getButtonStyles(plan)}>
                    Buy Now
                  </Button>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 0.5, color: 'text.secondary', fontSize: '0.6rem' }}>
                    14-day trial, no card required
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: { xs: '180px', sm: '200px', md: '220px' }, pr: 0.5 }}>
                  <List sx={{ '& .MuiListItem-root': { px: 0, py: 0.25 } }}>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: alpha(plan.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FaCheck style={{ color: plan.color, fontSize: 10 }} />
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={`Up to ${plan.maxUsers} users`} primaryTypographyProps={{ sx: { fontSize: '0.7rem', color: 'text.primary' } }} />
                    </ListItem>
                    {plan.features.map((feature, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: alpha(plan.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaCheck style={{ color: plan.color, fontSize: 10 }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText primary={feature} primaryTypographyProps={{ sx: { fontSize: '0.7rem', color: 'text.primary' } }} />
                      </ListItem>
                    ))}
                    {plan.limitations?.map((lim, i) => (
                      <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.7 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <Box sx={{ width: 18, height: 18, borderRadius: '50%', background: alpha('#ef4444', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FaTimes style={{ color: '#ef4444', fontSize: 10 }} />
                          </Box>
                        </ListItemIcon>
                        <ListItemText primary={lim} primaryTypographyProps={{ sx: { fontSize: '0.7rem', color: 'text.secondary', textDecoration: 'line-through' } }} />
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

  const faqs = [
    { question: 'Can I change plans later?', answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.' },
    { question: 'What happens after the free trial?', answer: 'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.' },
    { question: 'Do you offer discounts for annual plans?', answer: 'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.' },
    { question: 'Is there a setup fee?', answer: 'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.' },
    { question: 'Can I get a custom plan?', answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.palette.background.paper }}>
      <Header />
      <section className="pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12" style={{ background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block font-semibold text-xs px-3 py-1.5 rounded-full mb-3" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.dark }}>
              Simple. Transparent. No surprises.
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3" style={{ color: theme.palette.text.primary }}>
              Know <span style={{ color: theme.palette.primary.main }}>exactly</span> where your team is —<br className="hidden sm:block" />
              <span style={{ color: theme.palette.primary.main }}>right now</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed mb-4" style={{ color: theme.palette.text.secondary }}>
              Real-time GPS tracking + simple reports for field teams.<br />
              No complex setup. <strong>No developer API required</strong> on affordable plans.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium" style={{ color: billingCycle === 'monthly' ? theme.palette.text.primary : theme.palette.text.secondary }}>Monthly</span>
                <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className="relative w-12 h-6 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2" style={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` }}>
                  <motion.div className="w-4 h-4 bg-white rounded-full shadow-md" animate={{ x: billingCycle === 'yearly' ? (isMobile ? 20 : 24) : 0 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-medium" style={{ color: billingCycle === 'yearly' ? theme.palette.text.primary : theme.palette.text.secondary }}>Yearly</span>
                  <Chip label="Save up to 25%" size="small" sx={{ background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', fontWeight: 'bold', fontSize: '0.55rem', height: 18, '& .MuiChip-label': { px: 0.8 } }} />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs" style={{ color: theme.palette.text.secondary }}>
              <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> 14-day free trial</div>
              <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> No credit card required</div>
              <div className="flex items-center gap-1"><FaCheck size={8} style={{ color: theme.palette.primary.main }} /> Cancel anytime</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: theme.palette.background.paper }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Grid container spacing={2} alignItems="stretch">
            {loading ? (
              <>
                <PlanCardSkeleton /><PlanCardSkeleton /><PlanCardSkeleton />
              </>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                  <CreditCardIcon sx={{ fontSize: 32, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.85rem' }}>No subscription plans available</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Please check back later for our pricing plans.</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </section>

      <section className="py-8 sm:py-10 md:py-12" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.03) }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2" style={{ color: theme.palette.text.primary }}>Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm max-w-3xl mx-auto" style={{ color: theme.palette.text.secondary }}>Quick answers to the questions we hear most often</p>
          </motion.div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <Accordion key={index} elevation={0} sx={{ borderRadius: 1.5, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, backgroundColor: theme.palette.background.paper, overflow: 'hidden', transition: 'all 0.2s ease', '&:hover': { borderColor: theme.palette.primary.main }, '&:before': { display: 'none' }, boxShadow: 'none' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />} sx={{ px: 2, py: 0.5, minHeight: 40, '& .MuiAccordionSummary-content': { margin: '0 !important' } }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.85rem' }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pb: 1.5, pt: 0, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.5 }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center mt-6">
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.75rem' }}>Still have questions? We're happy to help.</Typography>
            <Button variant="outlined" onClick={() => navigate('/contact')} sx={{ borderWidth: 1.5, px: 2.5, py: 0.7, fontSize: '0.7rem', fontWeight: 600, borderRadius: 2, textTransform: 'none', borderColor: theme.palette.primary.main, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white', borderColor: theme.palette.primary.main, transform: 'translateY(-2px)', boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.4)}` } }}>
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