import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer:
        'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges.',
    },
    {
      question: 'What happens after the free trial?',
      answer:
        'After your 14-day free trial, you can choose to continue with a paid plan or cancel. No charges until you decide.',
    },
    {
      question: 'Do you offer discounts for annual plans?',
      answer:
        'Yes! Annual plans save you up to 25% compared to monthly billing. Perfect for teams committed to long-term growth.',
    },
    {
      question: 'Is there a setup fee?',
      answer:
        'No setup fees, ever. What you see is what you pay. Transparent pricing with no hidden costs.',
    },
    {
      question: 'Can I get a custom plan?',
      answer:
        'Absolutely! Contact our sales team for custom Enterprise solutions tailored to your specific needs.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, debit cards, and bank transfers for Enterprise plans.',
    },
  ];

  const plans = [
    {
      name: 'Starter',
      description: 'Great for small teams just getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,      // ~17% → you can change to 260 for ~25% saving
      icon: '🚀',
      features: [
        'Up to 10 team members',
        'Real-time location tracking – anytime',
        'Basic route history (30 days)',
        'Simple daily reports',
        'Mobile app access',
        'Email support',
      ],
      limitations: [
        'No photo verification',
        'No geofencing/alerts',
        'No developer API',
        'No advanced analytics',
      ],
      popular: false,
      color: 'from-gray-50 to-gray-100',
      buttonColor: 'bg-gray-700 hover:bg-gray-800',
    },
    {
      name: 'Growth',
      description: 'Everything most field teams need',
      monthlyPrice: 79,
      yearlyPrice: 710,      // Changed → ~25% saving ($79 × 12 = 948 → save ~$238/year)
      icon: '⭐',
      features: [
        'Up to 50 team members',
        'Unlimited real-time location tracking',
        'Route history + playback (90 days)',
        'Geo-tagged photo verification',
        'Custom geofences & arrival alerts',
        'Professional PDF/Excel reports',
        'Advanced analytics dashboard',
        'Data export (CSV, PDF)',
        'Priority email support',
        'Mobile + web access',
      ],
      limitations: ['No developer API', 'No dedicated manager'],
      popular: true,
      color: 'from-blue-50 to-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Enterprise',
      description: 'Custom solution for large teams',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      icon: '🏢',
      features: [
        'Unlimited team members',
        'Everything in Growth',
        'Developer API & webhooks',
        'Dedicated account manager',
        '24/7 phone + email support',
        'Custom integrations',
        'White-label option',
        'Advanced security & compliance',
        'Custom dashboards & reports',
        'On-premise option (available)',
        'SLA & training included',
      ],
      limitations: [],
      popular: false,
      color: 'from-purple-50 to-purple-100',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const getPrice = (plan) => (billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice);

  const getSavings = (plan) => {
    if (billingCycle === 'yearly') {
      const monthlyTotal = plan.monthlyPrice * 12;
      return monthlyTotal - plan.yearlyPrice;
    }
    return 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section – stronger focus on live location */}
      <section className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block bg-blue-100 text-blue-700 font-semibold text-sm px-5 py-2 rounded-full mb-6">
              Simple. Transparent. No surprises.
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Know <span className="text-blue-600">exactly</span> where your team is —<br className="hidden sm:block" />
              <span className="text-gradient">right now</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-10">
              Real-time GPS tracking + simple reports for field teams.<br />
              No complex setup. <strong>No developer API required</strong> on affordable plans.
            </p>

            {/* Billing Toggle + bigger savings callout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-4">
                <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className="relative w-16 h-9 bg-blue-600 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                    animate={{ x: billingCycle === 'yearly' ? 28 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                    Yearly
                  </span>
                  <Chip
                    label="Save up to 25%"
                    size="medium"
                    className="bg-green-600 text-white font-bold px-4 py-1.5 text-base shadow-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-gray-700 text-sm md:text-base">
              <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> 14-day free trial</div>
              <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> No credit card required</div>
              <div className="flex items-center gap-2"><FaCheck className="text-green-600" /> Cancel anytime</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {plans.map((plan, index) => {
              const savings = getSavings(plan);
              const isPopular = plan.popular;

              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${isPopular ? 'md:scale-105 lg:scale-110 z-10' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                      <Chip
                        icon={<StarIcon />}
                        label="Most Popular"
                        color="primary"
                        className="font-bold shadow-xl px-5 py-2 text-base"
                      />
                    </div>
                  )}

                  <Card
                    elevation={isPopular ? 12 : 4}
                    className={`h-full border transition-all duration-300 rounded-2xl overflow-hidden ${
                      isPopular
                        ? 'border-blue-500 shadow-2xl'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                    }`}
                  >
                    <CardContent className="p-8 md:p-10 flex flex-col h-full">
                      <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{plan.icon}</div>
                        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
                          {plan.name}
                        </Typography>
                        <Typography variant="body1" className="text-gray-600 mb-6">
                          {plan.description}
                        </Typography>

                        <div className="mb-6">
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-extrabold text-gray-900">
                              ${getPrice(plan)}
                            </span>
                            <span className="text-xl text-gray-600">
                              /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                            </span>
                          </div>
                          {savings > 0 && (
                            <Typography variant="body2" className="text-green-700 font-semibold mt-1">
                              Save ${savings}/year (~{Math.round((savings / (plan.monthlyPrice * 12)) * 100)}%)
                            </Typography>
                          )}
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mb-10">
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          onClick={() => navigate('/signup?plan=' + plan.name.toLowerCase())}
                          className={`${plan.buttonColor} text-white font-bold py-4 text-lg rounded-xl shadow-lg normal-case`}
                        >
                          Start Free Trial – 14 Days
                        </Button>
                      </motion.div>

                      <List className="space-y-3 flex-grow">
                        {plan.features.map((feature, i) => (
                          <ListItem key={i} disableGutters className="px-0 py-1">
                            <ListItemIcon className="min-w-[32px]">
                              <CheckCircleIcon className="text-blue-600" />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{ className: 'text-gray-800 text-base' }}
                            />
                          </ListItem>
                        ))}

                        {plan.limitations.map((lim, i) => (
                          <ListItem key={`lim-${i}`} disableGutters className="px-0 py-1 opacity-70">
                            <ListItemIcon className="min-w-[32px]">
                              <FaTimes className="text-gray-400" size={18} />
                            </ListItemIcon>
                            <ListItemText
                              primary={lim}
                              primaryTypographyProps={{ className: 'text-gray-500 text-base line-through' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    {/* FAQ Section – Improved Accordion Style */}
<section className="py-16 md:py-24 bg-gray-50">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-2xl md:text-5xl lg:text-4xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
        Quick answers to the questions we hear most often
      </p>
    </motion.div>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          elevation={0}
          className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:border-blue-200"
          sx={{
            '&:before': { display: 'none' }, // remove default MUI divider line
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-blue-600" />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              px: { xs: 3, md: 4 },
              py: { xs: 2.5, md: 3 },
              '& .MuiAccordionSummary-content': {
                margin: '0 !important',
              },
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.04)', // subtle blue hover
              },
            }}
          >
            <Typography
              variant="h6"
              className="font-semibold text-gray-900 text-left"
              sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}
            >
              {faq.question}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              px: { xs: 3, md: 4 },
              pb: { xs: 3, md: 4 },
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="body1"
              className="text-gray-700 leading-relaxed"
              sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>

    {/* Optional mini CTA at bottom of FAQ */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-center mt-12"
    >
      <Typography variant="body1" className="text-gray-600 mb-6">
        Still have questions? We're happy to help.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => navigate('/contact')}
        sx={{
          borderWidth: 2,
          px: 5,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: '9999px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
          marginTop: '20px',
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