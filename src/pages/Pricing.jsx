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
import SettingsIcon from '@mui/icons-material/Settings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BoltIcon from '@mui/icons-material/Bolt';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
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

const CouponSection = ({ theme }) => {
  const [couponValue, setCouponValue] = useState(10);
  const [promoCode, setPromoCode] = useState('WELCOME20');
  const [revealIndex, setRevealIndex] = useState(0);

  const generateRandomPromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCouponValue((prev) => (prev >= 90 ? 10 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (revealIndex < 8) {
      timer = setTimeout(() => {
        setRevealIndex((prev) => prev + 1);
      }, 150);
    } else {
      timer = setTimeout(() => {
        setPromoCode(generateRandomPromoCode());
        setRevealIndex(0);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [revealIndex]);

  const getDisplayPromoCode = () => {
    let result = '';
    for (let i = 0; i < 8; i++) {
      if (i < revealIndex) {
        result += promoCode[i];
      } else {
        result += 'X';
      }
    }
    return result;
  };

  return (
    <section className="py-8 sm:py-10" style={{ background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.01)} 100%)`, borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Grid container spacing={3} alignItems="center">
          {/* Left Column: Static Points */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.palette.primary.main
                }}>
                  <LocalOfferIcon sx={{ fontSize: 15 }} />
                </Box>
                <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: 1.5, color: theme.palette.primary.main, lineHeight: 1 }}>
                  Special Promotions
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, color: 'text.primary', fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }, lineHeight: 1.2 }}>
                Have a Coupon Code? Save on Every Plan!
              </Typography>

              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: { xs: '0.8rem', sm: '0.85rem' }, lineHeight: 1.4 }}>
                Whether you are starting small or scaling up to an enterprise solution, our promotional discounts can be applied across all tiers. Look out for our seasonal campaigns to unlock maximum value!
              </Typography>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { title: 'Available on All Plans', desc: 'From our Basic starter plan to fully customized Enterprise solutions, coupons apply to all options.' },
                  { title: 'Stackable with Annual Discounts', desc: 'Combine any active coupon code with our 25% annual billing discount for ultimate savings.' },
                  { title: 'Simple One-Click Activation', desc: 'Just enter your promo code at the checkout page. The discount updates your payment amount instantly.' },
                  { title: 'Risk-Free Guarantee', desc: 'All discounted plans still come with our standard 14-day free trial period and flexible cancellation policy.' }
                ].map((point, index) => (
                  <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start', py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 26, mt: 0.25 }}>
                      <Box sx={{
                        width: 16, height: 16, borderRadius: '50%',
                        background: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <FaCheck style={{ color: theme.palette.primary.main, fontSize: 8 }} />
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={point.title}
                      secondary={point.desc}
                      primaryTypographyProps={{ sx: { fontSize: '0.8rem', fontWeight: 700, color: 'text.primary', mb: 0.25, lineHeight: 1.2 } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.3 } }}
                    />
                  </ListItem>
                ))}
              </List>
            </motion.div>
          </Grid>

          {/* Right Column: Stylish Virtual Coupon Card */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper
                elevation={4}
                sx={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  borderRadius: 3,
                  overflow: 'hidden',
                  p: { xs: 2.5, sm: 3 },
                  boxShadow: `0 15px 30px -10px ${alpha(theme.palette.primary.main, 0.4)}`,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  // Punch-out circles on the left & right sides
                  '&::before, &::after': {
                    content: '""',
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: theme.palette.background.paper,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                  },
                  '&::before': { left: -10 },
                  '&::after': { right: -10 },
                }}
              >
                {/* Decorative background glow */}
                <Box sx={{
                  position: 'absolute',
                  top: -40,
                  right: -40,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  filter: 'blur(15px)',
                }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <Chip
                    icon={<LocalOfferIcon sx={{ fontSize: 10, color: `${theme.palette.primary.main} !important` }} />}
                    label="ACTIVE OFFER"
                    size="small"
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: '0.6rem',
                      mb: 2,
                      height: 20,
                      px: 0.5,
                      '& .MuiChip-icon': { color: theme.palette.primary.main }
                    }}
                  />

                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, letterSpacing: -0.5, textShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: '1.8rem', lineHeight: 1.1 }}>
                    <motion.span
                      key={couponValue}
                      initial={{ opacity: 0.3, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'inline-block' }}
                    >
                      {couponValue}% OFF
                    </motion.span>
                  </Typography>

                  <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.75rem', mb: 2, lineHeight: 1.3 }}>
                    Welcome offer for new teams. Apply on any plan checkout!
                  </Typography>

                  {/* Dotted separator line */}
                  <Box sx={{
                    width: '100%',
                    borderTop: '2px dashed rgba(255, 255, 255, 0.3)',
                    my: 1.5,
                  }} />

                  <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.6rem', letterSpacing: 1, textTransform: 'uppercase', mb: 0.5, lineHeight: 1 }}>
                    Your Promo Code
                  </Typography>

                  <Box sx={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(5px)',
                    border: '1px dashed rgba(255, 255, 255, 0.3)',
                    borderRadius: 1.5,
                    py: 1,
                    px: 2,
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: 2,
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    mb: 1.5,
                    display: 'inline-block',
                    fontFamily: 'monospace'
                  }}>
                    {getDisplayPromoCode()}
                  </Box>

                  <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.55rem', lineHeight: 1.2 }}>
                    *Limited time offer. Enter code at final checkout page.
                  </Typography>
                </Box>
              </Paper>
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
    ...availablePlans.map((plan) => ({
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
    })),
    {
      id: 'custom',
      name: 'Custom Plan',
      description: 'Need more users or custom duration? - Configure your own plan - Tailored pricing for your specific needs',
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
    console.log("=========================================");
    console.log("🎯 PLAN SELECTED IN PRICING PAGE");
    console.log("Plan Details:", {
      id: plan.id,
      name: plan.name,
      price: plan.isCustom ? 'Variable' : getPrice(plan),
      billingCycle: billingCycle
    });

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
      <Grid item xs={12} sm={6} md={3} key={plan.id || index} sx={{ display: 'flex' }}>
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
            '&:hover': { transform: isPopular && !isMobile ? 'scale(1.04)' : 'scale(1.02)' },
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
              elevation={isPopular ? 6 : 2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: isPopular ? alpha(plan.color, 0.6) : alpha(theme.palette.divider, 0.15),
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isPopular 
                  ? `0 10px 25px -5px ${alpha(plan.color, 0.25)}` 
                  : `0 4px 20px -10px rgba(0,0,0,0.08)`,
                '&:hover': { 
                  boxShadow: !isMobile 
                    ? `0 20px 35px -10px ${alpha(plan.color, 0.35)}` 
                    : 'none',
                  borderColor: alpha(plan.color, 0.8),
                  '& .plan-icon-container': {
                    transform: 'scale(1.1) rotate(5deg)',
                    background: `linear-gradient(135deg, ${alpha(plan.color, 0.15)} 0%, ${alpha(plan.color, 0.35)} 100%)`,
                  }
                },
              }}
            >
              <Box sx={{ height: 4, background: plan.gradient, width: '100%' }} />
              <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ textAlign: 'center', mb: 1.5 }}>
                  <Box 
                    className="plan-icon-container"
                    sx={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${alpha(plan.color, 0.08)} 0%, ${alpha(plan.color, 0.18)} 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.25,
                      border: `1px solid ${alpha(plan.color, 0.25)}`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box sx={{ color: plan.color, fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {plan.icon}
                    </Box>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' }, letterSpacing: -0.2 }}>
                    {plan.name}
                  </Typography>
                </Box>
                
                <Box sx={{ minHeight: 32, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', textAlign: 'center', display: 'block', lineHeight: 1.3 }}>
                    {renderDescription(plan.description)}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  {plan.isCustom ? (
                    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', minHeight: 32 }}>
                      <Typography component="span" sx={{ fontSize: '1.25rem', fontWeight: 800, color: plan.color }}>Custom Pricing</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ minHeight: 32 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.25 }}>
                        <Typography component="span" sx={{ fontSize: '1.45rem', fontWeight: 800, color: plan.color, letterSpacing: -0.5 }}>₹{getPrice(plan)}</Typography>
                        <Typography component="span" sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 500 }}>/{plan.duration}</Typography>
                      </Box>
                      {savings > 0 && (
                        <Typography variant="caption" sx={{ color: '#059669', fontWeight: 700, display: 'block', mt: 0.25, fontSize: '0.55rem', letterSpacing: 0.2 }}>
                          Save ₹{savings}/year
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Button fullWidth variant={getButtonVariant(plan)} onClick={() => handleSelectPlan(plan)} sx={getButtonStyles(plan)}>
                    {plan.isCustom ? 'Configure Plan' : 'Buy Now'}
                  </Button>
                </Box>

                <Box sx={{ width: '100%', height: '1px', bgcolor: alpha(theme.palette.divider, 0.08), mb: 2 }} />

                {!plan.isCustom && (
                  <Box sx={{ 
                    flexGrow: 1, 
                    overflowY: 'auto', 
                    maxHeight: { xs: '180px', sm: '200px', md: '220px' }, 
                    pr: 0.5,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' }
                  }}>
                    <List sx={{ '& .MuiListItem-root': { px: 0, py: 0.2 } }}>
                      {plan.features.map((feature, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: alpha(plan.color, 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FaCheck style={{ color: plan.color, fontSize: 8 }} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText primary={feature} primaryTypographyProps={{ sx: { fontSize: '0.65rem', color: 'text.primary', fontWeight: 500 } }} />
                        </ListItem>
                      ))}
                      {plan.limitations?.map((lim, i) => (
                        <ListItem key={`lim-${i}`} disableGutters sx={{ opacity: 0.6 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: alpha('#ef4444', 0.1), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FaTimes style={{ color: '#ef4444', fontSize: 8 }} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText primary={lim} primaryTypographyProps={{ sx: { fontSize: '0.65rem', color: 'text.secondary', textDecoration: 'line-through' } }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        </motion.div>
      </Grid>
    );
  };

  const faqs = [
    { question: 'Is there a setup fee?', answer: 'No setup fees. What you see is what you pay, with complete transparency.' },
    { question: 'Do you offer discounts?', answer: 'Yes, we are offering discounts on all plans.' },
    { question: 'Can I get a custom plan?', answer: 'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.' },
    { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.' },
    { question: 'Can we add-on in current plan?', answer: 'Yes, we have add-on plans available that you can add anytime to your current plan.' }
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

      <CouponSection theme={theme} />

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