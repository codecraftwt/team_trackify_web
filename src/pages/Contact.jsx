// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useTheme, alpha } from '@mui/material';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import { 
//   TextField, 
//   Button, 
//   CircularProgress, 
//   InputAdornment
// } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SendIcon from '@mui/icons-material/Send';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { FaCheckCircle } from 'react-icons/fa';

// const Contact = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [submitted, setSubmitted] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({ mode: 'onTouched' });

//   const onSubmit = async (data) => {
//     setIsSending(true);
//     // Simulate network delay
//     await new Promise((r) => setTimeout(r, 1400));
//     console.log('Form submitted:', data);
//     setIsSending(false);
//     setSubmitted(true);
//     reset();
//     setTimeout(() => setSubmitted(false), 5500);
//   };

//   const contactBlocks = [
//     {
//       icon: <LocationOnIcon fontSize="large" />,
//       title: 'Visit Us',
//       content:
//         'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
//       extra: 'Kolhapur HQ • Serving India-wide',
//     },
//     {
//       icon: <EmailIcon fontSize="large" />,
//       title: 'Email',
//       content: 'Walstarappdev@gmail.com',
//       href: 'mailto:Walstarappdev@gmail.com',
//     },
//     {
//       icon: <PhoneIcon fontSize="large" />,
//       title: 'Call / WhatsApp',
//       content: '+91 8530111646',
//       href: 'tel:+918530111646',
//     },
//   ];

//   const reasons = [
//     'Request a live demo (15–25 min)',
//     'Ask for custom pricing',
//     'Get technical / integration help',
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.12, delayChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 24 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { type: 'spring', damping: 15, stiffness: 100 },
//     },
//   };

//   return (
//     <div className="min-h-screen flex flex-col" style={{ 
//       background: `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.5)} 0%, ${theme.palette.background.paper} 100%)` 
//     }}>
//       <Header />

//       {/* Hero – compact, floating CTAs */}
//       <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
//         <div 
//           className="absolute inset-0 pointer-events-none"
//           style={{ 
//             background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%)` 
//           }}
//         />
//         <div className="container-custom relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight" style={{ color: theme.palette.text.primary }}>
//               Let's build{' '}
//               <span className="inline-block" style={{ color: theme.palette.primary.main }}>smarter field teams</span>
//               <br className="hidden sm:block" />
//               together
//             </h1>
//             <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: theme.palette.text.secondary }}>
//               Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-5 justify-center">
//               <motion.button
//                 whileHover={{
//                   scale: 1.06,
//                   boxShadow: `0 20px 35px -10px ${alpha(theme.palette.primary.main, 0.25)}`,
//                 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
//                 style={{ 
//                   backgroundColor: theme.palette.primary.main,
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
//               >
//                 Send Message Now
//               </motion.button>
//               <motion.button
//                 whileHover={{
//                   scale: 1.06,
//                   boxShadow: `0 15px 30px -8px ${alpha(theme.palette.primary.main, 0.18)}`,
//                 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate('/demo')}
//                 className="font-semibold text-lg px-10 py-4 rounded-xl transition-all"
//                 style={{ 
//                   border: `2px solid ${theme.palette.primary.main}`,
//                   color: theme.palette.primary.main,
//                   backgroundColor: 'transparent',
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                 }}
//               >
//                 Book Live Demo
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main content – form first on desktop, info on right */}
//       <section id="form-section" className="pb-20 md:pb-28">
//         <div className="container-custom max-w-7xl">
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//             className="grid lg:grid-cols-12 gap-10 lg:gap-14"
//           >
//             {/* Form – now narrower */}
//             <motion.div variants={itemVariants} className="lg:col-span-5 xl:col-span-6">
//               <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
//                 <div 
//                   className="px-7 py-6 text-white"
//                   style={{ 
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})` 
//                   }}
//                 >
//                   <h2 className="text-2xl font-bold">Get in Touch</h2>
//                   <p className="mt-1.5 opacity-90 text-sm md:text-base" style={{ color: alpha('#ffffff', 0.9) }}>
//                     Usually reply within 2–6 hours • Mon–Sat
//                   </p>
//                 </div>

//                 <div className="p-6 md:p-8 lg:p-9">
//                   <AnimatePresence mode="wait">
//                     {submitted ? (
//                       <motion.div
//                         key="success"
//                         initial={{ opacity: 0, scale: 0.92 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.92 }}
//                         transition={{ duration: 0.5 }}
//                         className="py-10 md:py-14 flex flex-col items-center justify-center text-center"
//                       >
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
//                         >
//                           <CheckCircleIcon sx={{ fontSize: { xs: 64, md: 80 }, color: '#22c55e' }} />
//                         </motion.div>
//                         <h3 className="text-xl md:text-2xl font-bold mt-5 mb-3" style={{ color: theme.palette.text.primary }}>
//                           Message Sent!
//                         </h3>
//                         <p className="max-w-md text-sm md:text-base" style={{ color: theme.palette.text.secondary }}>
//                           Thank you — we'll get back to you very soon (usually within hours).
//                         </p>
//                       </motion.div>
//                     ) : (
//                       <motion.form
//                         key="form"
//                         onSubmit={handleSubmit(onSubmit)}
//                         className="space-y-6 md:space-y-7"
//                       >
//                         <TextField
//                           fullWidth
//                           label="Full Name"
//                           variant="outlined"
//                           size="medium"
//                           {...register('name', { required: 'Please enter your name' })}
//                           error={!!errors.name}
//                           helperText={errors.name?.message}
//                           InputProps={{ className: 'rounded-xl' }}
//                           InputLabelProps={{ shrink: true }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />

//                         <TextField
//                           fullWidth
//                           label="Email"
//                           type="email"
//                           variant="outlined"
//                           size="medium"
//                           {...register('email', {
//                             required: 'Email is required',
//                             pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
//                           })}
//                           error={!!errors.email}
//                           helperText={errors.email?.message}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <EmailIcon sx={{ color: theme.palette.primary.light }} />
//                               </InputAdornment>
//                             ),
//                             className: 'rounded-xl',
//                           }}
//                           InputLabelProps={{ shrink: true }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />

//                         <TextField
//                           fullWidth
//                           label="Your Message"
//                           multiline
//                           rows={5}
//                           variant="outlined"
//                           placeholder="Tell us about your team, challenges, or demo request..."
//                           {...register('message', {
//                             required: 'Message is required',
//                             minLength: { value: 10, message: 'Please write a bit more' },
//                           })}
//                           error={!!errors.message}
//                           helperText={errors.message?.message}
//                           InputProps={{ className: 'rounded-xl' }}
//                           InputLabelProps={{ shrink: true }}
//                           sx={{
//                             '& .MuiOutlinedInput-root': {
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />

//                         <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             size="large"
//                             fullWidth
//                             disabled={isSending}
//                             sx={{
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               color: 'white',
//                               textTransform: 'none',
//                               fontSize: { xs: '1rem', md: '1.125rem' },
//                               fontWeight: 600,
//                               py: { xs: 1.5, md: 1.75 },
//                               borderRadius: '0.75rem',
//                               boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
//                               '&:hover': {
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                               },
//                               '&.Mui-disabled': {
//                                 background: alpha(theme.palette.primary.main, 0.5),
//                               },
//                             }}
//                           >
//                             {isSending ? (
//                               <>
//                                 <CircularProgress size={20} sx={{ color: 'white', mr: 1.5 }} />
//                                 Sending...
//                               </>
//                             ) : (
//                               <>
//                                 Send Message
//                                 <SendIcon sx={{ ml: 1.5 }} />
//                               </>
//                             )}
//                           </Button>
//                         </motion.div>
//                       </motion.form>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Contact info & reasons – now wider */}
//             <motion.div variants={itemVariants} className="lg:col-span-7 xl:col-span-6 space-y-10 lg:space-y-12">
//               <div className="space-y-6 md:space-y-7">
//                 <h3 className="text-2xl md:text-3xl font-bold" style={{ color: theme.palette.text.primary }}>Reach Us Directly</h3>

//                 <div className="space-y-5 md:space-y-6">
//                   {contactBlocks.map((block, i) => (
//                     <motion.a
//                       key={i}
//                       href={block.href}
//                       target={block.href ? '_blank' : undefined}
//                       rel="noopener noreferrer"
//                       className="group block bg-white rounded-xl border p-5 md:p-6 hover:shadow-lg transition-all duration-300"
//                       style={{ 
//                         borderColor: alpha(theme.palette.divider, 0.5),
//                         backgroundColor: theme.palette.background.paper,
//                       }}
//                       whileHover={{
//                         y: -5,
//                         borderColor: theme.palette.primary.light,
//                         transition: { type: 'spring', stiffness: 400, damping: 20 },
//                       }}
//                     >
//                       <div className="flex items-center gap-4 md:gap-5">
//                         <div 
//                           className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
//                           style={{ 
//                             backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                           }}
//                         >
//                           {block.icon}
//                         </div>
//                         <div>
//                           <div className="font-semibold text-base md:text-lg" style={{ color: theme.palette.text.primary }}>{block.title}</div>
//                           <div className="mt-0.5 text-sm md:text-base" style={{ color: theme.palette.text.secondary }}>{block.content}</div>
//                           {block.extra && (
//                             <div className="text-sm md:text-base mt-1" style={{ color: alpha(theme.palette.text.secondary, 0.7) }}>{block.extra}</div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>

//               <div 
//                 className="rounded-xl p-6 md:p-8 border"
//                 style={{ 
//                   backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   borderColor: alpha(theme.palette.primary.main, 0.2)
//                 }}
//               >
//                 <h4 className="font-bold mb-4 md:mb-5 flex items-center gap-2 md:gap-3 text-lg md:text-xl" style={{ color: theme.palette.text.primary }}>
//                   <FaCheckCircle size={20} style={{ color: theme.palette.primary.main }} /> Why contact us?
//                 </h4>
//                 <ul className="space-y-3 md:space-y-4 text-sm md:text-base" style={{ color: theme.palette.text.secondary }}>
//                   {reasons.map((reason, i) => (
//                     <li key={i} className="flex items-start gap-3 md:gap-4">
//                       <FaCheckCircle size={18} className="mt-1 flex-shrink-0" style={{ color: theme.palette.primary.main }} />
//                       {reason}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//       <ScrollToTopButton />
//     </div>
//   );
// };

// export default Contact;




import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  InputAdornment,
  useMediaQuery,
  Paper,
  Box,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (data) => {
    setIsSending(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1400));
    console.log('Form submitted:', data);
    setIsSending(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5500);
  };

  const contactBlocks = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 24 }} />,
      title: 'Visit Us',
      content:
        'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
      extra: 'Kolhapur HQ • Serving India-wide',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      title: 'Email',
      content: 'Walstarappdev@gmail.com',
      href: 'mailto:Walstarappdev@gmail.com',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      title: 'Call / WhatsApp',
      content: '+91 8530111646',
      href: 'tel:+918530111646',
    },
  ];

  const reasons = [
    'Request a live demo (15–25 min)',
    'Ask for custom pricing',
    'Get technical / integration help',
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, sm: 10, md: 12 },
          pb: { xs: 4, sm: 5, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '2.8rem' },
                  fontWeight: 800,
                  lineHeight: 1.2,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Let's build{' '}
                <Box component="span" sx={{ color: theme.palette.primary.main, display: 'inline-block' }}>
                  smarter field teams
                </Box>
                <br />
                together
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  color: theme.palette.text.secondary,
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  endIcon={<SendIcon />}
                  sx={{
                    py: { xs: 1, sm: 1.2 },
                    px: { xs: 3, sm: 4 },
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    fontWeight: 600,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                  }}
                >
                  Send Message Now
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/demo')}
                  sx={{
                    py: { xs: 1, sm: 1.2 },
                    px: { xs: 3, sm: 4 },
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    fontWeight: 600,
                    borderRadius: 2,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Book Live Demo
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Main Content */}
      <Box id="form-section" sx={{ py: { xs: 4, sm: 5, md: 6 }, flexGrow: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Form Column */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2.5,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    overflow: 'hidden',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    }}
                  >
                    <Typography variant="h6" fontWeight="700" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                      Get in Touch
                    </Typography>
                    <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Usually reply within 2–6 hours • Mon–Sat
                    </Typography>
                  </Box>

                  <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <AnimatePresence mode="wait">
                      {submitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Box sx={{ py: 4, textAlign: 'center' }}>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
                            >
                              <CheckCircleIcon sx={{ fontSize: { xs: 48, sm: 56 }, color: '#22c55e' }} />
                            </motion.div>
                            <Typography variant="h6" fontWeight="700" sx={{ mt: 2, mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                              Message Sent!
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                              Thank you — we'll get back to you very soon (usually within hours).
                            </Typography>
                          </Box>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                              fullWidth
                              label="Full Name"
                              variant="outlined"
                              size="small"
                              {...register('name', { required: 'Please enter your name' })}
                              error={!!errors.name}
                              helperText={errors.name?.message}
                              sx={{
                                '& .MuiInputLabel-root': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiFormHelperText-root': {
                                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                },
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                              }}
                            />

                            <TextField
                              fullWidth
                              label="Email"
                              type="email"
                              variant="outlined"
                              size="small"
                              {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                              })}
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon sx={{ color: theme.palette.primary.light, fontSize: 18 }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiInputLabel-root': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiFormHelperText-root': {
                                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                },
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                              }}
                            />

                            <TextField
                              fullWidth
                              label="Your Message"
                              multiline
                              rows={4}
                              variant="outlined"
                              size="small"
                              placeholder="Tell us about your team, challenges, or demo request..."
                              {...register('message', {
                                required: 'Message is required',
                                minLength: { value: 10, message: 'Please write a bit more' },
                              })}
                              error={!!errors.message}
                              helperText={errors.message?.message}
                              sx={{
                                '& .MuiInputLabel-root': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiInputBase-input': {
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                },
                                '& .MuiFormHelperText-root': {
                                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                },
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  '&:hover fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                              }}
                            />

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isSending}
                                sx={{
                                  py: 1,
                                  borderRadius: 1.5,
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                  fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                  fontWeight: 600,
                                  boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                                  '&:hover': {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                  },
                                }}
                              >
                                {isSending ? (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CircularProgress size={16} sx={{ color: 'white' }} />
                                    <span>Sending...</span>
                                  </Box>
                                ) : (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    Send Message
                                    <SendIcon sx={{ fontSize: 16 }} />
                                  </Box>
                                )}
                              </Button>
                            </motion.div>
                          </Box>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Info Column */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Contact Cards */}
                  <Box>
                    <Typography variant="h6" fontWeight="700" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                      Reach Us Directly
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {contactBlocks.map((block, i) => (
                        <motion.a
                          key={i}
                          href={block.href}
                          target={block.href ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          whileHover={{ y: -2 }}
                          style={{ textDecoration: 'none' }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              p: 1.5,
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: alpha(theme.palette.primary.main, 0.1),
                              backgroundColor: theme.palette.background.paper,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                boxShadow: `0 8px 16px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 1.5,
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                {block.icon}
                              </Box>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>
                                  {block.title}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', display: 'block' }}>
                                  {block.content}
                                </Typography>
                                {block.extra && (
                                  <Typography variant="caption" sx={{ color: alpha(theme.palette.text.secondary, 0.7), fontSize: '0.65rem', display: 'block', mt: 0.25 }}>
                                    {block.extra}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </Paper>
                        </motion.a>
                      ))}
                    </Box>
                  </Box>

                  {/* Why Contact Us */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                      backgroundColor: alpha(theme.palette.primary.main, 0.03),
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: theme.palette.text.primary,
                      }}
                    >
                      <FaCheckCircle size={16} style={{ color: theme.palette.primary.main }} />
                      Why contact us?
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {reasons.map((reason, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <FaCheckCircle size={14} style={{ color: theme.palette.primary.main, marginTop: 2, flexShrink: 0 }} />
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                            {reason}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
      <ScrollToTopButton />
    </Box>
  );
};

export default Contact;