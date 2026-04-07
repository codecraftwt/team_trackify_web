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
//   InputAdornment,
//   useMediaQuery,
//   Paper,
//   Box,
//   Typography,
//   Container,
//   Grid,
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

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
//       icon: <LocationOnIcon sx={{ fontSize: 24 }} />,
//       title: 'Visit Us',
//       content:
//         'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
//       extra: 'Kolhapur HQ • Serving India-wide',
//     },
//     {
//       icon: <EmailIcon sx={{ fontSize: 24 }} />,
//       title: 'Email',
//       content: 'Walstarappdev@gmail.com',
//       href: 'mailto:Walstarappdev@gmail.com',
//     },
//     {
//       icon: <PhoneIcon sx={{ fontSize: 24 }} />,
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

//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
//       <Header />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           pt: { xs: 8, sm: 10, md: 12 },
//           pb: { xs: 4, sm: 5, md: 6 },
//           position: 'relative',
//           overflow: 'hidden',
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
//         }}
//       >
//         <Container maxWidth="lg">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
//               <Typography
//                 variant="h1"
//                 sx={{
//                   fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '2.8rem' },
//                   fontWeight: 800,
//                   lineHeight: 1.2,
//                   mb: 2,
//                   color: theme.palette.text.primary,
//                 }}
//               >
//                 Let's build{' '}
//                 <Box component="span" sx={{ color: theme.palette.primary.main, display: 'inline-block' }}>
//                   smarter field teams
//                 </Box>
//                 <br />
//                 together
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                   color: theme.palette.text.secondary,
//                   maxWidth: '600px',
//                   mx: 'auto',
//                   mb: 4,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
//               </Typography>

//               <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
//                   endIcon={<SendIcon />}
//                   sx={{
//                     py: { xs: 1, sm: 1.2 },
//                     px: { xs: 3, sm: 4 },
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
//                     '&:hover': {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                   }}
//                 >
//                   Send Message Now
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={() => navigate('/demo')}
//                   sx={{
//                     py: { xs: 1, sm: 1.2 },
//                     px: { xs: 3, sm: 4 },
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                     borderWidth: 2,
//                     '&:hover': {
//                       borderColor: theme.palette.primary.dark,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                     },
//                   }}
//                 >
//                   Book Live Demo
//                 </Button>
//               </Box>
//             </Box>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* Main Content */}
//       <Box id="form-section" sx={{ py: { xs: 4, sm: 5, md: 6 }, flexGrow: 1 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             {/* Form Column */}
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     borderRadius: 2.5,
//                     border: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     overflow: 'hidden',
//                     height: '100%',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       p: { xs: 2, sm: 2.5 },
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="700" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
//                       Get in Touch
//                     </Typography>
//                     <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                       Usually reply within 2–6 hours • Mon–Sat
//                     </Typography>
//                   </Box>

//                   <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
//                     <AnimatePresence mode="wait">
//                       {submitted ? (
//                         <motion.div
//                           key="success"
//                           initial={{ opacity: 0, scale: 0.92 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.92 }}
//                           transition={{ duration: 0.5 }}
//                         >
//                           <Box sx={{ py: 4, textAlign: 'center' }}>
//                             <motion.div
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
//                             >
//                               <CheckCircleIcon sx={{ fontSize: { xs: 48, sm: 56 }, color: '#22c55e' }} />
//                             </motion.div>
//                             <Typography variant="h6" fontWeight="700" sx={{ mt: 2, mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//                               Message Sent!
//                             </Typography>
//                             <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
//                               Thank you — we'll get back to you very soon (usually within hours).
//                             </Typography>
//                           </Box>
//                         </motion.div>
//                       ) : (
//                         <motion.form
//                           key="form"
//                           onSubmit={handleSubmit(onSubmit)}
//                         >
//                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                             <TextField
//                               fullWidth
//                               label="Full Name"
//                               variant="outlined"
//                               size="small"
//                               {...register('name', { required: 'Please enter your name' })}
//                               error={!!errors.name}
//                               helperText={errors.name?.message}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <TextField
//                               fullWidth
//                               label="Email"
//                               type="email"
//                               variant="outlined"
//                               size="small"
//                               {...register('email', {
//                                 required: 'Email is required',
//                                 pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
//                               })}
//                               error={!!errors.email}
//                               helperText={errors.email?.message}
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <EmailIcon sx={{ color: theme.palette.primary.light, fontSize: 18 }} />
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <TextField
//                               fullWidth
//                               label="Your Message"
//                               multiline
//                               rows={4}
//                               variant="outlined"
//                               size="small"
//                               placeholder="Tell us about your team, challenges, or demo request..."
//                               {...register('message', {
//                                 required: 'Message is required',
//                                 minLength: { value: 10, message: 'Please write a bit more' },
//                               })}
//                               error={!!errors.message}
//                               helperText={errors.message?.message}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                               <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 disabled={isSending}
//                                 sx={{
//                                   py: 1,
//                                   borderRadius: 1.5,
//                                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                   fontWeight: 600,
//                                   boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
//                                   '&:hover': {
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                                   },
//                                 }}
//                               >
//                                 {isSending ? (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <CircularProgress size={16} sx={{ color: 'white' }} />
//                                     <span>Sending...</span>
//                                   </Box>
//                                 ) : (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     Send Message
//                                     <SendIcon sx={{ fontSize: 16 }} />
//                                   </Box>
//                                 )}
//                               </Button>
//                             </motion.div>
//                           </Box>
//                         </motion.form>
//                       )}
//                     </AnimatePresence>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>

//             {/* Info Column */}
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//                   {/* Contact Cards */}
//                   <Box>
//                     <Typography variant="h6" fontWeight="700" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//                       Reach Us Directly
//                     </Typography>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//                       {contactBlocks.map((block, i) => (
//                         <motion.a
//                           key={i}
//                           href={block.href}
//                           target={block.href ? '_blank' : undefined}
//                           rel="noopener noreferrer"
//                           whileHover={{ y: -2 }}
//                           style={{ textDecoration: 'none' }}
//                         >
//                           <Paper
//                             elevation={0}
//                             sx={{
//                               p: 1.5,
//                               borderRadius: 2,
//                               border: '1px solid',
//                               borderColor: alpha(theme.palette.primary.main, 0.1),
//                               backgroundColor: theme.palette.background.paper,
//                               transition: 'all 0.3s ease',
//                               '&:hover': {
//                                 borderColor: theme.palette.primary.main,
//                                 boxShadow: `0 8px 16px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
//                               },
//                             }}
//                           >
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                               <Box
//                                 sx={{
//                                   width: 40,
//                                   height: 40,
//                                   borderRadius: 1.5,
//                                   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                   color: theme.palette.primary.main,
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                   flexShrink: 0,
//                                 }}
//                               >
//                                 {block.icon}
//                               </Box>
//                               <Box sx={{ minWidth: 0 }}>
//                                 <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>
//                                   {block.title}
//                                 </Typography>
//                                 <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', display: 'block' }}>
//                                   {block.content}
//                                 </Typography>
//                                 {block.extra && (
//                                   <Typography variant="caption" sx={{ color: alpha(theme.palette.text.secondary, 0.7), fontSize: '0.65rem', display: 'block', mt: 0.25 }}>
//                                     {block.extra}
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </Box>
//                           </Paper>
//                         </motion.a>
//                       ))}
//                     </Box>
//                   </Box>

//                   {/* Why Contact Us */}
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       border: '1px solid',
//                       borderColor: alpha(theme.palette.primary.main, 0.2),
//                       backgroundColor: alpha(theme.palette.primary.main, 0.03),
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       fontWeight="600"
//                       sx={{
//                         mb: 1.5,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1,
//                         fontSize: { xs: '0.9rem', sm: '1rem' },
//                         color: theme.palette.text.primary,
//                       }}
//                     >
//                       <FaCheckCircle size={16} style={{ color: theme.palette.primary.main }} />
//                       Why contact us?
//                     </Typography>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                       {reasons.map((reason, i) => (
//                         <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//                           <FaCheckCircle size={14} style={{ color: theme.palette.primary.main, marginTop: 2, flexShrink: 0 }} />
//                           <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
//                             {reason}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Paper>
//                 </Box>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Footer />
//       <ScrollToTopButton />
//     </Box>
//   );
// };

// export default Contact;


// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { useTheme, alpha } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import { 
//   TextField, 
//   Button, 
//   CircularProgress, 
//   InputAdornment,
//   useMediaQuery,
//   Paper,
//   Box,
//   Typography,
//   Container,
//   Grid,
// } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SendIcon from '@mui/icons-material/Send';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { FaCheckCircle } from 'react-icons/fa';
// import { createContact } from '../redux/slices/contactSlice'; // Import the contact thunk

// const Contact = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [submitted, setSubmitted] = useState(false);
//   const [isSending, setIsSending] = useState(false);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({ mode: 'onTouched' });

//   const onSubmit = async (data) => {
//     setIsSending(true);
    
//     try {
//       // Prepare contact data according to your API format
//       const contactData = {
//         name: data.name,
//         email: data.email,
//         message: data.message,
//         // You can add phone if you have a field for it
//         // phone: data.phone,
//       };
      
//       // Dispatch the createContact thunk
//       const result = await dispatch(createContact(contactData)).unwrap();
      
//       console.log('Contact form submitted:', result);
//       setIsSending(false);
//       setSubmitted(true);
//       reset();
//       setTimeout(() => setSubmitted(false), 5500);
//     } catch (error) {
//       console.error('Error submitting contact form:', error);
//       setIsSending(false);
//       // Optionally show error message to user
//     }
//   };

//   const contactBlocks = [
//     {
//       icon: <LocationOnIcon sx={{ fontSize: 24 }} />,
//       title: 'Visit Us',
//       content:
//         'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
//       extra: 'Kolhapur HQ • Serving India-wide',
//     },
//     {
//       icon: <EmailIcon sx={{ fontSize: 24 }} />,
//       title: 'Email',
//       content: 'Walstarappdev@gmail.com',
//       href: 'mailto:Walstarappdev@gmail.com',
//     },
//     {
//       icon: <PhoneIcon sx={{ fontSize: 24 }} />,
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

//   return (
//     <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
//       <Header />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           pt: { xs: 8, sm: 10, md: 12 },
//           pb: { xs: 4, sm: 5, md: 6 },
//           position: 'relative',
//           overflow: 'hidden',
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
//         }}
//       >
//         <Container maxWidth="lg">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
//               <Typography
//                 variant="h1"
//                 sx={{
//                   fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '2.8rem' },
//                   fontWeight: 800,
//                   lineHeight: 1.2,
//                   mb: 2,
//                   color: theme.palette.text.primary,
//                 }}
//               >
//                 Let's build{' '}
//                 <Box component="span" sx={{ color: theme.palette.primary.main, display: 'inline-block' }}>
//                   smarter field teams
//                 </Box>
//                 <br />
//                 together
//               </Typography>

//               <Typography
//                 sx={{
//                   fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                   color: theme.palette.text.secondary,
//                   maxWidth: '600px',
//                   mx: 'auto',
//                   mb: 4,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
//               </Typography>

//               <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
//                   endIcon={<SendIcon />}
//                   sx={{
//                     py: { xs: 1, sm: 1.2 },
//                     px: { xs: 3, sm: 4 },
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
//                     '&:hover': {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                   }}
//                 >
//                   Send Message Now
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={() => navigate('/demo')}
//                   sx={{
//                     py: { xs: 1, sm: 1.2 },
//                     px: { xs: 3, sm: 4 },
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     fontWeight: 600,
//                     borderRadius: 2,
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                     borderWidth: 2,
//                     '&:hover': {
//                       borderColor: theme.palette.primary.dark,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                     },
//                   }}
//                 >
//                   Book Live Demo
//                 </Button>
//               </Box>
//             </Box>
//           </motion.div>
//         </Container>
//       </Box>

//       {/* Main Content */}
//       <Box id="form-section" sx={{ py: { xs: 4, sm: 5, md: 6 }, flexGrow: 1 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             {/* Form Column */}
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     borderRadius: 2.5,
//                     border: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     overflow: 'hidden',
//                     height: '100%',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       p: { xs: 2, sm: 2.5 },
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="700" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
//                       Get in Touch
//                     </Typography>
//                     <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                       Usually reply within 2–6 hours • Mon–Sat
//                     </Typography>
//                   </Box>

//                   <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
//                     <AnimatePresence mode="wait">
//                       {submitted ? (
//                         <motion.div
//                           key="success"
//                           initial={{ opacity: 0, scale: 0.92 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           exit={{ opacity: 0, scale: 0.92 }}
//                           transition={{ duration: 0.5 }}
//                         >
//                           <Box sx={{ py: 4, textAlign: 'center' }}>
//                             <motion.div
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
//                             >
//                               <CheckCircleIcon sx={{ fontSize: { xs: 48, sm: 56 }, color: '#22c55e' }} />
//                             </motion.div>
//                             <Typography variant="h6" fontWeight="700" sx={{ mt: 2, mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//                               Message Sent!
//                             </Typography>
//                             <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
//                               Thank you — we'll get back to you very soon (usually within hours).
//                             </Typography>
//                           </Box>
//                         </motion.div>
//                       ) : (
//                         <motion.form
//                           key="form"
//                           onSubmit={handleSubmit(onSubmit)}
//                         >
//                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                             <TextField
//                               fullWidth
//                               label="Full Name"
//                               variant="outlined"
//                               size="small"
//                               {...register('name', { required: 'Please enter your name' })}
//                               error={!!errors.name}
//                               helperText={errors.name?.message}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <TextField
//                               fullWidth
//                               label="Email"
//                               type="email"
//                               variant="outlined"
//                               size="small"
//                               {...register('email', {
//                                 required: 'Email is required',
//                                 pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
//                               })}
//                               error={!!errors.email}
//                               helperText={errors.email?.message}
//                               InputProps={{
//                                 startAdornment: (
//                                   <InputAdornment position="start">
//                                     <EmailIcon sx={{ color: theme.palette.primary.light, fontSize: 18 }} />
//                                   </InputAdornment>
//                                 ),
//                               }}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <TextField
//                               fullWidth
//                               label="Your Message"
//                               multiline
//                               rows={4}
//                               variant="outlined"
//                               size="small"
//                               placeholder="Tell us about your team, challenges, or demo request..."
//                               {...register('message', {
//                                 required: 'Message is required',
//                                 minLength: { value: 10, message: 'Please write a bit more' },
//                               })}
//                               error={!!errors.message}
//                               helperText={errors.message?.message}
//                               sx={{
//                                 '& .MuiInputLabel-root': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiInputBase-input': {
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                 },
//                                 '& .MuiFormHelperText-root': {
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                                 },
//                                 '& .MuiOutlinedInput-root': {
//                                   borderRadius: 1.5,
//                                   '&:hover fieldset': {
//                                     borderColor: theme.palette.primary.main,
//                                   },
//                                 },
//                               }}
//                             />

//                             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                               <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 disabled={isSending}
//                                 sx={{
//                                   py: 1,
//                                   borderRadius: 1.5,
//                                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                   fontWeight: 600,
//                                   boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
//                                   '&:hover': {
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                                   },
//                                 }}
//                               >
//                                 {isSending ? (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <CircularProgress size={16} sx={{ color: 'white' }} />
//                                     <span>Sending...</span>
//                                   </Box>
//                                 ) : (
//                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     Send Message
//                                     <SendIcon sx={{ fontSize: 16 }} />
//                                   </Box>
//                                 )}
//                               </Button>
//                             </motion.div>
//                           </Box>
//                         </motion.form>
//                       )}
//                     </AnimatePresence>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>

//             {/* Info Column */}
//             <Grid item xs={12} md={6}>
//               <motion.div
//                 initial={{ opacity: 0, x: 30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//                   {/* Contact Cards */}
//                   <Box>
//                     <Typography variant="h6" fontWeight="700" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//                       Reach Us Directly
//                     </Typography>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//                       {contactBlocks.map((block, i) => (
//                         <motion.a
//                           key={i}
//                           href={block.href}
//                           target={block.href ? '_blank' : undefined}
//                           rel="noopener noreferrer"
//                           whileHover={{ y: -2 }}
//                           style={{ textDecoration: 'none' }}
//                         >
//                           <Paper
//                             elevation={0}
//                             sx={{
//                               p: 1.5,
//                               borderRadius: 2,
//                               border: '1px solid',
//                               borderColor: alpha(theme.palette.primary.main, 0.1),
//                               backgroundColor: theme.palette.background.paper,
//                               transition: 'all 0.3s ease',
//                               '&:hover': {
//                                 borderColor: theme.palette.primary.main,
//                                 boxShadow: `0 8px 16px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
//                               },
//                             }}
//                           >
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                               <Box
//                                 sx={{
//                                   width: 40,
//                                   height: 40,
//                                   borderRadius: 1.5,
//                                   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                                   color: theme.palette.primary.main,
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                   justifyContent: 'center',
//                                   flexShrink: 0,
//                                 }}
//                               >
//                                 {block.icon}
//                               </Box>
//                               <Box sx={{ minWidth: 0 }}>
//                                 <Typography variant="subtitle2" fontWeight="600" sx={{ fontSize: '0.85rem' }}>
//                                   {block.title}
//                                 </Typography>
//                                 <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem', display: 'block' }}>
//                                   {block.content}
//                                 </Typography>
//                                 {block.extra && (
//                                   <Typography variant="caption" sx={{ color: alpha(theme.palette.text.secondary, 0.7), fontSize: '0.65rem', display: 'block', mt: 0.25 }}>
//                                     {block.extra}
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </Box>
//                           </Paper>
//                         </motion.a>
//                       ))}
//                     </Box>
//                   </Box>

//                   {/* Why Contact Us */}
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       border: '1px solid',
//                       borderColor: alpha(theme.palette.primary.main, 0.2),
//                       backgroundColor: alpha(theme.palette.primary.main, 0.03),
//                     }}
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       fontWeight="600"
//                       sx={{
//                         mb: 1.5,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1,
//                         fontSize: { xs: '0.9rem', sm: '1rem' },
//                         color: theme.palette.text.primary,
//                       }}
//                     >
//                       <FaCheckCircle size={16} style={{ color: theme.palette.primary.main }} />
//                       Why contact us?
//                     </Typography>
                    
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//                       {reasons.map((reason, i) => (
//                         <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//                           <FaCheckCircle size={14} style={{ color: theme.palette.primary.main, marginTop: 2, flexShrink: 0 }} />
//                           <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
//                             {reason}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Paper>
//                 </Box>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Footer />
//       <ScrollToTopButton />
//     </Box>
//   );
// };

// export default Contact;


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material';
import { useDispatch } from 'react-redux';
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
import { createContact } from '../redux/slices/contactSlice';

const Contact = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
    try {
      const contactData = {
        name: data.name,
        email: data.email,
        message: data.message,
      };
      const result = await dispatch(createContact(contactData)).unwrap();
      // console.log('Contact form submitted:', result);
      setIsSending(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5500);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSending(false);
    }
  };

  const contactBlocks = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 22 }} />,
      title: 'Visit Us',
      content: 'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
      extra: 'Kolhapur HQ • Serving India-wide',
      iconBg: `linear-gradient(135deg, ${alpha('#3b82f6', 0.15)}, ${alpha('#1d4ed8', 0.1)})`,
      iconColor: '#3b82f6',
    },
    {
      icon: <EmailIcon sx={{ fontSize: 22 }} />,
      title: 'Email',
      content: 'Walstarappdev@gmail.com',
      href: 'mailto:Walstarappdev@gmail.com',
      iconBg: `linear-gradient(135deg, ${alpha('#06b6d4', 0.15)}, ${alpha('#0284c7', 0.1)})`,
      iconColor: '#06b6d4',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 22 }} />,
      title: 'Call / WhatsApp',
      content: '+91 8530111646',
      href: 'tel:+918530111646',
      iconBg: `linear-gradient(135deg, ${alpha('#10b981', 0.15)}, ${alpha('#059669', 0.1)})`,
      iconColor: '#10b981',
    },
  ];

  const reasons = [
    'Request a live demo (15–25 min)',
    'Ask for custom pricing',
    'Get technical / integration help',
  ];

  const fieldSx = {
    '& .MuiInputLabel-root': { fontSize: { xs: '0.8rem', sm: '0.85rem' } },
    '& .MuiInputBase-input': { fontSize: { xs: '0.8rem', sm: '0.85rem' } },
    '& .MuiFormHelperText-root': { fontSize: { xs: '0.65rem', sm: '0.7rem' } },
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: alpha(theme.palette.primary.main, 0.02),
      '& fieldset': { borderColor: alpha(theme.palette.primary.main, 0.15) },
      '&:hover fieldset': { borderColor: alpha(theme.palette.primary.main, 0.45) },
      '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
    },
  };

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
        @keyframes floatB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(14px); } }
        @keyframes pulseDot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34,197,94,0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .orb-a { animation: floatA 9s ease-in-out infinite; }
        .orb-b { animation: floatB 12s ease-in-out infinite; }
        .orb-c { animation: floatA 7s ease-in-out infinite reverse; }
        .live-dot { animation: pulseDot 2s infinite; }
        .contact-card {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper }}>
        <Header />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <Box
          sx={{
            pt: { xs: 8, sm: 10, md: 12 },
            pb: { xs: 5, sm: 6, md: 7 },
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(150deg,
              ${alpha(theme.palette.primary.main, 0.07)} 0%,
              ${theme.palette.background.paper} 50%,
              ${alpha(theme.palette.primary.light, 0.06)} 100%)`,
          }}
        >
          {/* Floating orbs */}
          <Box className="orb-a" sx={{
            position: 'absolute', top: '8%', left: '4%',
            width: { xs: 140, md: 260 }, height: { xs: 140, md: 260 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <Box className="orb-b" sx={{
            position: 'absolute', top: '5%', right: '6%',
            width: { xs: 100, md: 200 }, height: { xs: 100, md: 200 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha('#06b6d4', 0.09)}, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <Box className="orb-c" sx={{
            position: 'absolute', bottom: '-5%', right: '30%',
            width: { xs: 70, md: 130 }, height: { xs: 70, md: 130 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.08)}, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Dot grid texture */}
          <Box sx={{
            position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
            backgroundImage: `radial-gradient(${theme.palette.primary.main} 1.5px, transparent 1.5px)`,
            backgroundSize: '26px 26px',
          }} />

          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>

                {/* Live badge */}
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.45 }}>
                  <Box sx={{
                    display: 'inline-flex', alignItems: 'center', gap: 1,
                    px: 2, py: 0.55,
                    borderRadius: 10,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    mb: 2.5,
                  }}>
                    <Box className="live-dot" sx={{
                      width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e',
                    }} />
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: theme.palette.primary.main, letterSpacing: '0.07em' }}>
                      USUALLY ONLINE WITHIN HOURS
                    </Typography>
                  </Box>
                </motion.div>

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
                  <Box component="span" sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, #06b6d4)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}>
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

                
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* ── Main Content ──────────────────────────────────────────────────── */}
        <Box id="form-section" sx={{ py: { xs: 4, sm: 5, md: 6 }, flexGrow: 1 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>

              {/* ── Form Column ── */}
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
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                      overflow: 'hidden',
                      height: '100%',
                      boxShadow: `0 16px 48px -16px ${alpha(theme.palette.primary.main, 0.14)}, 0 2px 16px -4px ${alpha(theme.palette.common.black, 0.06)}`,
                    }}
                  >
                    {/* Card header */}
                    <Box
                      sx={{
                        p: { xs: 2, sm: 2.5 },
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Decorative circles in header */}
                      <Box sx={{ position: 'absolute', top: -25, right: -25, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
                      <Box sx={{ position: 'absolute', bottom: -30, left: '35%', width: 70, height: 70, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

                      <Box sx={{ position: 'relative', zIndex: 1 }}>
                        <Typography variant="h6" fontWeight="700" sx={{ color: 'white', fontSize: { xs: '1.1rem', sm: '1.2rem' }, mb: 0.3 }}>
                          Get in Touch
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#4ade80' }} />
                          <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.85), fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                            Usually reply within 2–6 hours • Mon–Sat
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                      <AnimatePresence mode="wait">
                        {submitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.92, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Box sx={{ py: 4, textAlign: 'center' }}>
                              <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                              >
                                <Box sx={{
                                  width: 68, height: 68, borderRadius: '50%',
                                  bgcolor: alpha('#22c55e', 0.1),
                                  border: `2px solid ${alpha('#22c55e', 0.25)}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  mx: 'auto', mb: 2,
                                }}>
                                  <CheckCircleIcon sx={{ fontSize: { xs: 36, sm: 40 }, color: '#22c55e' }} />
                                </Box>
                              </motion.div>
                              <Typography variant="h6" fontWeight="700" sx={{ mt: 1, mb: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                                Message Sent!
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                                Thank you — we'll get back to you very soon (usually within hours).
                              </Typography>
                            </Box>
                          </motion.div>
                        ) : (
                          <motion.form key="form" onSubmit={handleSubmit(onSubmit)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                size="small"
                                {...register('name', { required: 'Please enter your name' })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                sx={fieldSx}
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
                                      <EmailIcon sx={{ color: alpha(theme.palette.primary.main, 0.5), fontSize: 16 }} />
                                    </InputAdornment>
                                  ),
                                }}
                                sx={fieldSx}
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
                                sx={fieldSx}
                              />

                              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  fullWidth
                                  disabled={isSending}
                                  sx={{
                                    py: 1.1,
                                    borderRadius: 1.5,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                    fontWeight: 600,
                                    letterSpacing: '0.02em',
                                    boxShadow: `0 6px 18px -4px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                      boxShadow: `0 10px 24px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
                                    },
                                    '&:disabled': { background: alpha(theme.palette.primary.main, 0.4), color: 'white' },
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

                              <Typography sx={{ textAlign: 'center', fontSize: '0.67rem', color: alpha(theme.palette.text.secondary, 0.5) }}>
                                🔒 Your information is safe with us. No spam, ever.
                              </Typography>
                            </Box>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>

              {/* ── Info Column ── */}
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
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                          >
                            <motion.a
                              href={block.href}
                              target={block.href ? '_blank' : undefined}
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', display: 'block' }}
                            >
                              <Paper
                                elevation={0}
                                className="contact-card"
                                sx={{
                                  p: 1.5,
                                  borderRadius: 2.5,
                                  border: '1px solid',
                                  borderColor: alpha(theme.palette.primary.main, 0.08),
                                  backgroundColor: theme.palette.background.paper,
                                  boxShadow: `0 2px 10px -4px ${alpha(theme.palette.common.black, 0.06)}`,
                                  '&:hover': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                    boxShadow: `0 10px 24px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                  <Box
                                    sx={{
                                      width: 42,
                                      height: 42,
                                      borderRadius: 2,
                                      background: block.iconBg,
                                      color: block.iconColor,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                      border: `1px solid ${alpha(block.iconColor, 0.15)}`,
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
                                      <Typography variant="caption" sx={{ color: alpha(theme.palette.text.secondary, 0.65), fontSize: '0.65rem', display: 'block', mt: 0.25 }}>
                                        {block.extra}
                                      </Typography>
                                    )}
                                  </Box>
                                </Box>
                              </Paper>
                            </motion.a>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>

                    {/* Why Contact Us */}
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2.5,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.12),
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.04)}, ${alpha(theme.palette.primary.light, 0.06)})`,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Accent orb */}
                        <Box sx={{
                          position: 'absolute', top: -20, right: -20,
                          width: 80, height: 80, borderRadius: '50%',
                          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)}, transparent)`,
                          pointerEvents: 'none',
                        }} />

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

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.1 }}>
                          {reasons.map((reason, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + i * 0.08 }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                <Box sx={{
                                  width: 20, height: 20, borderRadius: '50%',
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  <FaCheckCircle size={10} style={{ color: theme.palette.primary.main }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.7rem' }}>
                                  {reason}
                                </Typography>
                              </Box>
                            </motion.div>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>

                  </Box>
                </motion.div>
              </Grid>

            </Grid>
          </Container>
        </Box>

        <Footer />
        <ScrollToTopButton />
      </Box>
    </>
  );
};

export default Contact;