import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme, alpha } from '@mui/material';
import { useDispatch } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Rating
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createContact } from '../redux/slices/contactSlice';

const Contact = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

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
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        message: data.message,
      };
      // Dispatch API Call
      const result = await dispatch(createContact(contactData)).unwrap();
      console.log('Contact form submitted:', result);
      setIsSending(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5500);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsSending(false);
    }
  };

  const fieldSx = {
    '& .MuiInputBase-input': { 
      fontSize: '1rem', 
      fontWeight: 400, 
      color: '#1a1a1a',
      padding: '14px 16px',
      '&::placeholder': {
        color: '#b3b3b3',
        opacity: 1,
      }
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      bgcolor: '#ffffff',
      transition: 'all 0.2s ease',
      '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' },
      '&:hover fieldset': { borderColor: '#d1d5db' },
      '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' },
    },
    '& .MuiInputBase-multiline': {
      padding: '0',
    },
    '& .MuiInputBase-inputMultiline': {
      padding: '14px 16px',
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f4f9fd', overflowX: 'hidden' }}>
      <Header />

      <Box sx={{ pt: { xs: 16, md: 24 }, pb: { xs: 8, md: 14 }, flexGrow: 1 }}>
        <div className="container-custom mx-auto px-4 md:px-6 lg:px-8">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="flex-start">
            
            {/* ── Left Column (Form) ── */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: 3,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                    bgcolor: 'white'
                  }}
                >
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Box sx={{ py: 6, textAlign: 'center' }}>
                          <CheckCircleIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                          <Typography variant="h5" fontWeight="700" sx={{ mb: 1 }}>
                            Message Sent!
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Thank you! We'll get back to you shortly.
                          </Typography>
                        </Box>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit(onSubmit)}>
                        <Typography variant="h4" sx={{ mb: 1.5, color: '#1a1a1a', fontWeight: 600, fontSize: { xs: '1.75rem', sm: '2rem' }, letterSpacing: '-0.01em' }}>
                          Need Any Help?
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1rem', fontWeight: 400 }}>
                          Demo • Pricing • Integration • Support <br /> Whatever you need, we're here to help.
                        </Typography>

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 400, color: '#1a1a1a', mb: 1, display: 'block' }}>First Name</Typography>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="John"
                              {...register('firstName', { required: 'Required' })}
                              error={!!errors.firstName}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 400, color: '#1a1a1a', mb: 1, display: 'block' }}>Last Name</Typography>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="Doe"
                              {...register('lastName', { required: 'Required' })}
                              error={!!errors.lastName}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 400, color: '#1a1a1a', mb: 1, display: 'block' }}>Email Address</Typography>
                            <TextField
                              fullWidth
                              type="email"
                              variant="outlined"
                              placeholder="john@example.com"
                              {...register('email', {
                                required: 'Required',
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                              })}
                              error={!!errors.email}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 400, color: '#1a1a1a', mb: 1, display: 'block' }}>Phone</Typography>
                            <TextField
                              fullWidth
                              variant="outlined"
                              placeholder="+1 (555) 000-0000"
                              {...register('phone')}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body1" sx={{ fontWeight: 400, color: '#1a1a1a', mb: 1, display: 'block' }}>Your Message</Typography>
                            <TextField
                              fullWidth
                              multiline
                              rows={4}
                              variant="outlined"
                              placeholder="Tell us about your requirements..."
                              {...register('message', { required: 'Required' })}
                              error={!!errors.message}
                              sx={fieldSx}
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 1 }}>
                            <motion.button
                              type="submit"
                              disabled={isSending}
                              whileHover={!isSending ? { scale: 1.03, y: -2 } : {}}
                              whileTap={!isSending ? { scale: 0.97 } : {}}
                              className="w-full text-white font-bold text-base py-3.5 rounded-md flex items-center justify-center gap-2 transition-shadow duration-300"
                              style={{
                                background: isSending ? alpha(theme.palette.primary.main, 0.5) : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                boxShadow: isSending ? 'none' : `0 10px 25px -8px ${alpha(theme.palette.primary.main, 0.6)}`,
                                cursor: isSending ? 'not-allowed' : 'pointer'
                              }}
                            >
                              {isSending ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Message'}
                            </motion.button>
                          </Grid>
                          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Read our <Link to="#" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}>Terms & Conditions</Link> for details.
                            </Typography>
                          </Grid>
                        </Grid>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </Paper>
              </motion.div>
            </Grid>

            {/* ── Right Column (Info) ── */}
            <Grid item xs={12} md={6}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Box sx={{ pt: { xs: 0, md: 3 } }}>
                  <Typography variant="body1" sx={{ color: '#ef4444', fontWeight: 500, mb: 1 }}>
                    Contact Us
                  </Typography>
                  <Typography variant="h2" sx={{ color: '#1a1a1a', fontWeight: 600, mb: 3.5, letterSpacing: '-0.02em', fontSize: { xs: '2.25rem', md: '2.8rem' } }}>
                    Get In Touch With Us
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    Whether you have questions about our software, need assistance with integration, or want to discuss custom pricing, our team is ready to help. Reach out to us and we'll get back to you promptly.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5, mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <EmailOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, minWidth: { xs: '120px', sm: '140px' }, flexShrink: 0, mr: 1 }}>
                          Email Now:
                        </Typography>
                        <a href="mailto:info@teamtrackify.com" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                          info@teamtrackify.com
                        </a>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <PhoneOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, minWidth: { xs: '120px', sm: '140px' }, flexShrink: 0, mr: 1 }}>
                          Call Us Now:
                        </Typography>
                        <a href="tel:+188823456789" style={{ color: theme.palette.primary.main, fontWeight: 600, textDecoration: 'none' }}>
                          +91 8530111646
                        </a>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                      <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                        <LocationOnOutlinedIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500, minWidth: { xs: '120px', sm: '140px' }, flexShrink: 0, mr: 1 }}>
                          Office Address:
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                          Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005
                        </Typography>
                      </Box>
                    </Box>
                  </Box>



                </Box>
              </motion.div>
            </Grid>

          </Grid>
        </div>
      </Box>

      <Footer />
      <ScrollToTopButton />
    </Box>
  );
};

export default Contact;