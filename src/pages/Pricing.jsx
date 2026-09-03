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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { getAvailablePlans } from '../redux/slices/planSlice';

const Kicker = ({ children, color, center, className = "mb-3" }) => (
  <div className={`flex items-center gap-2 ${className} ${center ? 'justify-center' : ''}`}>
    <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
      {children}
    </span>
    <span className="w-6 h-0.5 rounded-full" style={{ backgroundColor: color }} />
  </div>
);

const PlanCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: { xs: '100%', sm: 320 }, maxWidth: 320 }}>
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
    </Box>
  );
};

const CouponSection = ({ theme }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'TRACKF20';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Background blobs */}
      <Box sx={{
        position: 'absolute', top: '-10%', right: '10%', width: 400, height: 400,
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
        borderRadius: '50%', zIndex: 0
      }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column */}
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Kicker color={theme.palette.primary.main} className="mb-4">SPECIAL PROMOTIONS</Kicker>

              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold mb-6 text-gray-900" style={{ lineHeight: '1.2' }}>
                Have a Coupon Code?<br className="hidden lg:block" />
                <span style={{ color: theme.palette.primary.main }}>Save on Every Plan!</span>
              </h2>
              <Typography sx={{ color: '#64748b', mb: 5, fontSize: '1rem', lineHeight: 1.6 }}>
                Whether you're starting small or scaling up, our promotional discounts apply across all tiers to help you unlock maximum value.
              </Typography>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { title: 'Available on All Plans', desc: 'From our Basic starter plan to fully customized Enterprise solutions, coupons apply to all options.' },
                  { title: 'Stackable with Discounts', desc: 'Our promo codes can be combined with existing annual billing discounts for maximum savings.' },
                  { title: 'Simple One-Click Activation', desc: 'Just enter your promo code at the checkout page. The discount updates your payment amount instantly.' },
                ].map((point, index) => (
                  <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start', py: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <FaCheck style={{ color: theme.palette.primary.main, fontSize: 12 }} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={point.title}
                      secondary={point.desc}
                      primaryTypographyProps={{ sx: { fontSize: '1rem', fontWeight: 700, color: 'text.primary', mb: 0.5 } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.4 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card sx={{
                p: { xs: 4, md: 5 },
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                textAlign: 'center',
                background: '#f0f8ff',
                border: 'none',
                position: 'relative',
                overflow: 'visible'
              }}>
                <Box sx={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)' }}>
                  <Chip
                    label="ACTIVE OFFER"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      px: 1,
                      boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                  />
                </Box>

                <Typography sx={{ color: '#ff6b6b', fontWeight: 700, mb: 1, mt: 2, fontSize: '1rem', letterSpacing: 1 }}>
                  WELCOME OFFER
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#1e293b', fontSize: { xs: '2.5rem', md: '3rem' } }}>
                  10% OFF
                </Typography>
                <Typography sx={{ color: '#64748b', mb: 4, fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
                  Apply on any plan checkout!<br />Limited time offer.
                </Typography>

                <Box sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                  borderRadius: 2,
                  p: 2,
                  mb: 3
                }}>
                  <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600, mb: 1, letterSpacing: 1 }}>
                    YOUR PROMO CODE
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, letterSpacing: 3, fontFamily: 'monospace' }}>
                    {promoCode}
                  </Typography>
                </Box>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopy}
                  className="w-full text-white font-bold text-base py-3.5 rounded-md flex items-center justify-center gap-2 transition-shadow duration-300"
                  style={{
                    background: copied ? '#10b981' : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: copied ? '0 10px 25px -8px rgba(16, 185, 129, 0.6)' : `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                  }}
                >
                  {copied ? 'Code Copied!' : 'Copy Code'}
                </motion.button>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};
const Pricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const { availablePlans = [] } = useSelector((state) => state.plan || {});



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

  const renderDescription = (description) => {
    if (!description) return null;
    const parts = description.split(/\s-\s|-\s/);
    const startsWithDash = description.trim().startsWith('-');
    const cleanParts = parts.map(p => p.trim()).filter(Boolean);

    if (cleanParts.length === 1 && !startsWithDash) {
      return (
        <span style={{ display: 'block', textAlign: 'center' }}>
          {cleanParts[0]}
        </span>
      );
    }

    return (
      <div style={{ display: 'inline-block', textAlign: 'left' }}>
        {cleanParts.map((part, idx) => (
          <span key={idx} style={{ display: 'block' }}>
            {(idx > 0 || startsWithDash) ? `✓ ${part}` : part}
          </span>
        ))}
      </div>
    );
  };


  const subscriptionPlans = [
    ...availablePlans.map((plan) => {
      let parsedFeatures = plan.features || [];
      if ((!parsedFeatures || parsedFeatures.length === 0) && plan.description) {
        const parts = plan.description.split(/\s-\s|-\s/);
        parsedFeatures = parts.map(p => p.trim()).filter(Boolean);
      }
      return {
        id: plan._id,
        name: plan.name || 'Plan',
        description: plan.description || 'Plan description',
        monthlyPrice: plan.monthlyPrice || plan.price || 0,
        yearlyPrice: plan.yearlyPrice || (plan.price ? Math.round(plan.price * 10 * 0.8) : 0),
        duration: plan.duration || 'month',
        icon: plan.icon || getPlanIcon(plan.name),
        features: parsedFeatures,
        limitations: plan.limitations || [],
        popular: plan.popular || plan.name?.toLowerCase().includes('growth') || plan.name?.toLowerCase().includes('pro') || false,
        color: getPlanColor(plan.name),
        gradient: getPlanGradient(plan.name),
        maxUsers: plan.maxUsers || 10,
        minUsers: plan.minUsers || 1,
      };
    }),
    {
      id: 'custom',
      name: 'Custom Plan',
      description: 'Tailored pricing for enterprise-scale operations',
      monthlyPrice: null,
      yearlyPrice: null,
      isCustom: true,
      duration: 'custom',
      icon: <SettingsIcon sx={{ fontSize: 24 }} />,
      features: [
        'Flexible user limits',
        'Custom duration settings',
        'Personalized support',
        'Advanced reporting features'
      ],
      limitations: [],
      popular: false,
      color: '#9c27b0',
      gradient: 'linear-gradient(135deg, #9c27b0, #ab47bc)',
      maxUsers: 'Custom',
      minUsers: 'Custom',
    }
  ];

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
    // console.log("=========================================");
    // console.log("🎯 PLAN SELECTED IN PRICING PAGE");
    // console.log("Plan Details:", {
    //   id: plan.id,
    //   name: plan.name,
    //   price: plan.isCustom ? 'Variable' : getPrice(plan),
    //   billingCycle: billingCycle
    // });

    const selectedPlanData = {
      id: plan.id,
      name: plan.name,
      price: plan.isCustom ? 'Variable' : getPrice(plan),
      originalPrice: plan.isCustom ? 0 : (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice),
      billingCycle: billingCycle,
      duration: plan.isCustom ? 'custom' : (billingCycle === 'monthly' ? 'month' : 'year'),
      maxUsers: plan.maxUsers,
      minUsers: plan.minUsers,
      description: plan.description,
      features: plan.features,
      color: plan.color,
      isCustom: plan.isCustom || false,
    };

    // console.log("📦 Selected Plan Data being sent to Register:", selectedPlanData);

    // // Store in sessionStorage
    sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlanData));
    // console.log("💾 Saved to sessionStorage");

    // // Navigate with state
    // console.log("🚀 Navigating to /register with state");
    navigate('/register', {
      state: {
        selectedPlan: selectedPlanData,
        fromPricing: true
      }
    });
  };

  const renderPlanCard = (plan, index) => {
    const isPopular = plan.popular;
    const isCustom = plan.isCustom;

    return (
      <Box key={plan.id || index} sx={{ width: { xs: '100%', sm: '48%', lg: '24%' }, maxWidth: 340, display: 'flex', mt: isPopular && !isMobile ? -2 : 0, mb: isPopular && !isMobile ? -2 : 0 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Card
            elevation={isPopular ? 10 : 2}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              overflow: 'visible',
              position: 'relative',
              background: isPopular ? theme.palette.primary.main : '#ffffff',
              color: isPopular ? '#ffffff' : 'text.primary',
              p: { xs: 3, sm: 4, md: 5 },
              transition: 'all 0.3s ease',
              boxShadow: isPopular ? '0 20px 40px rgba(37, 99, 235, 0.2)' : '0 10px 30px rgba(0,0,0,0.03)',
            }}
          >
            {isPopular && (
              <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                <Chip
                  label="Most Popular"
                  size="small"
                  sx={{
                    backgroundColor: '#f59e0b', // Amber for contrast against blue
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    borderRadius: 1,
                    height: 24,
                  }}
                />
              </Box>
            )}

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1.1rem' }}>
              {plan.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
              <Typography component="span" sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
                {plan.isCustom ? 'Custom' : `₹${getPrice(plan)}`}
              </Typography>
              {!plan.isCustom && (
                <Typography component="span" sx={{ fontSize: '0.9rem', ml: 1, opacity: 0.8, fontWeight: 500 }}>
                  /{billingCycle === 'monthly' ? 'Month' : 'Year'}
                </Typography>
              )}
            </Box>

            <Typography variant="body2" sx={{ opacity: 0.8, mb: 4, minHeight: 20 }}>
              {!plan.isCustom ? 'Get 7 Days Free Trial' : renderDescription(plan.description)}
            </Typography>

            <Box sx={{ flexGrow: 1, mb: 4 }}>
              <List sx={{ '& .MuiListItem-root': { px: 0, py: 1.5 } }}>
                {plan.features.map((feature, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0 }}>
                      <Box sx={{
                        width: 20, height: 20, borderRadius: '50%',
                        backgroundColor: isPopular ? '#ffffff' : '#ff6b6b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <FaCheck style={{ color: isPopular ? theme.palette.primary.main : '#ffffff', fontSize: 10 }} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ sx: { fontSize: '0.9rem', fontWeight: 500 } }}
                    />
                  </ListItem>
                ))}
                {plan.limitations?.map((lim, i) => (
                  <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: isPopular ? 0.6 : 0.4 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: 0 }}>
                      <Box sx={{
                        width: 20, height: 20, borderRadius: '50%',
                        backgroundColor: isPopular ? 'rgba(255,255,255,0.2)' : '#e5e7eb',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <FaCheck style={{ color: isPopular ? 'rgba(255,255,255,0.5)' : '#9ca3af', fontSize: 10 }} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={lim}
                      primaryTypographyProps={{ sx: { fontSize: '0.9rem', fontWeight: 500 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelectPlan(plan)}
              className="w-full font-bold text-base py-3.5 rounded-md flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                color: 'white',
                background: isPopular 
                  ? 'rgba(255,255,255,0.1)' 
                  : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: isPopular ? 'none' : `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                border: isPopular ? '1px solid rgba(255,255,255,0.5)' : 'none'
              }}
            >
              Get Started
            </motion.button>
          </Card>
        </motion.div>
      </Box>
    );
  };

  const faqs = [
    { question: 'Is there a setup fee?', answer: 'No setup fees. What you see is what you pay, with complete transparency.' },
    { question: 'Do you offer discounts?', answer: 'Yes, we are offering discounts on all plans.' },
    { question: 'Can I get a custom plan?', answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.' },
    { question: 'Can I add features to my current plan?', answer: 'Yes, we have add-on plans available that you can add anytime to your current plan.' }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: '#f0f8ff' }}>
      <Header />
      <section className="relative overflow-hidden pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Decorative Arrow SVG */}
            <Box sx={{ position: 'absolute', top: -40, left: '20%', display: { xs: 'none', md: 'block' } }}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M90 10 C 60 0, 30 20, 20 60 C 15 80, 40 90, 50 70 C 60 50, 40 30, 20 40" stroke="#a5b4fc" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              </svg>
            </Box>

            <Kicker color={theme.palette.primary.main} center className="mb-4">Our Best Features</Kicker>

            <Typography variant="h2" sx={{ color: '#1e293b', fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 4 }}>
              Choose Your <span style={{ position: 'relative' }}>
                Simple
                <svg style={{ position: 'absolute', bottom: -10, left: 0, width: '100%', height: '12px' }} viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q25,2 50,8 T100,8" stroke={theme.palette.primary.main} strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span> Pricing Plan
            </Typography>

            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '700px', mx: 'auto', mb: 2, lineHeight: 1.6 }}>
              Find the perfect plan for your team. From basic tracking to enterprise-grade analytics, our transparent pricing scales with your business.
            </Typography>

            {/* Monthly / Yearly Toggle - hidden to match mockup but functionality retained */}
            <div className="flex justify-center items-center mb-8" style={{ display: 'none' }}>
              <div className="relative flex items-center p-1.5 bg-white rounded-full border shadow-sm">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className="relative w-32 z-10 py-2.5 text-sm font-bold rounded-full transition-colors duration-300"
                  style={{ color: billingCycle !== 'monthly' ? theme.palette.text.secondary : theme.palette.primary.main }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className="relative w-32 z-10 py-2.5 text-sm font-bold rounded-full transition-colors duration-300"
                  style={{ color: billingCycle !== 'yearly' ? theme.palette.text.secondary : theme.palette.primary.main }}
                >
                  Yearly
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch', gap: { xs: 4, md: 2 } }}>
            {loading ? (
              <>
                <PlanCardSkeleton /><PlanCardSkeleton /><PlanCardSkeleton />
              </>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index))
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, width: '100%' }}>
                <CreditCardIcon sx={{ fontSize: 32, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.85rem' }}>No subscription plans available</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>Please check back later for our pricing plans.</Typography>
              </Paper>
            )}
          </Box>
        </div>
      </section>

      <CouponSection theme={theme} />

      <section className="py-20 md:py-28" style={{ backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <Kicker color={theme.palette.primary.main} center className="mb-3">Frequently Asked Questions</Kicker>
            <Typography variant="h2" sx={{ color: '#1a1a1a', fontWeight: 700, mb: 3, letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '2.8rem' } }}>
              We're Here to Answer<br />All Your Questions.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Got questions about our pricing, features, or setup? We're here to help you make the best decision for your field operations.
            </Typography>
          </motion.div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <Accordion
                  key={index}
                  expanded={isExpanded}
                  onChange={handleFaqChange(index)}
                  elevation={0}
                  disableGutters
                  sx={{
                    borderRadius: '8px !important',
                    backgroundColor: isExpanded ? 'transparent' : 'white',
                    transition: 'all 0.3s ease',
                    '&:before': { display: 'none' },
                    boxShadow: isExpanded ? 'none' : `0 4px 15px rgba(0,0,0,0.02)`,
                  }}
                >
                  <AccordionSummary
                    expandIcon={isExpanded ? <RemoveIcon sx={{ color: 'white' }} /> : <AddIcon sx={{ color: '#1a1a1a' }} />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: '8px',
                      backgroundColor: isExpanded ? theme.palette.primary.main : 'white',
                      transition: 'background-color 0.3s ease',
                      '& .MuiAccordionSummary-content': { margin: '0 !important' }
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, color: isExpanded ? 'white' : 'text.primary', fontSize: '1.05rem' }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 4, pt: 3, backgroundColor: 'transparent' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.8 }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>


        </div>
      </section>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Pricing;