// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';
// import ScrollToTopButton from '../components/common/ScrollToTopButton';
// import { TextField, Button, CircularProgress, InputAdornment } from '@mui/material';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SendIcon from '@mui/icons-material/Send';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { FaCheckCircle } from 'react-icons/fa';

// const Contact = () => {
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
//     <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
//       <Header />

//       {/* Hero – compact, floating CTAs */}
//       <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-primary-50/30 pointer-events-none" />
//         <div className="container-custom relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//             className="text-center max-w-4xl mx-auto"
//           >
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
//               Let's build{' '}
//               <span className="text-gradient inline-block">smarter field teams</span>
//               <br className="hidden sm:block" />
//               together
//             </h1>
//             <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
//               Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-5 justify-center">
//               <motion.button
//                 whileHover={{
//                   scale: 1.06,
//                   boxShadow: '0 20px 35px -10px rgba(59,130,246,0.25)',
//                 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
//               >
//                 Send Message Now
//               </motion.button>
//               <motion.button
//                 whileHover={{
//                   scale: 1.06,
//                   boxShadow: '0 15px 30px -8px rgba(59,130,246,0.18)',
//                 }}
//                 whileTap={{ scale: 0.96 }}
//                 onClick={() => navigate('/demo')}
//                 className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-10 py-4 rounded-xl font-semibold text-lg transition-all"
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
//               <div className="bg-white rounded-2xl shadow-xl border border-gray-100/70 overflow-hidden">
//                 <div className="bg-gradient-to-r from-primary-600 to-primary-500 px-7 py-6 text-white">
//                   <h2 className="text-2xl font-bold">Get in Touch</h2>
//                   <p className="text-primary-100 mt-1.5 opacity-90 text-sm md:text-base">
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
//                           <CheckCircleIcon className="text-green-500" sx={{ fontSize: { xs: 64, md: 80 } }} />
//                         </motion.div>
//                         <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-5 mb-3">
//                           Message Sent!
//                         </h3>
//                         <p className="text-gray-600 max-w-md text-sm md:text-base">
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
//                             startAdornment: <InputAdornment position="start"><EmailIcon className="text-gray-400" /></InputAdornment>,
//                             className: 'rounded-xl',
//                           }}
//                           InputLabelProps={{ shrink: true }}
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
//                         />

//                         <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             size="large"
//                             fullWidth
//                             disabled={isSending}
//                             className="bg-primary-600 hover:bg-primary-700 normal-case text-base md:text-lg font-semibold py-3 md:py-3.5 rounded-xl shadow-md"
//                           >
//                             {isSending ? (
//                               <>
//                                 <CircularProgress size={20} color="inherit" className="mr-2 md:mr-3" />
//                                 Sending...
//                               </>
//                             ) : (
//                               <>
//                                 Send Message
//                                 <SendIcon className="ml-2" />
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
//                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Reach Us Directly</h3>

//                 <div className="space-y-5 md:space-y-6">
//                   {contactBlocks.map((block, i) => (
//                     <motion.a
//                       key={i}
//                       href={block.href}
//                       target={block.href ? '_blank' : undefined}
//                       rel="noopener noreferrer"
//                       className="group block bg-white rounded-xl border border-gray-100 p-5 md:p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
//                       whileHover={{
//                         y: -5,
//                         transition: { type: 'spring', stiffness: 400, damping: 20 },
//                       }}
//                     >
//                       <div className="flex items-center gap-4 md:gap-5">
//                         <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors flex-shrink-0">
//                           {block.icon}
//                         </div>
//                         <div>
//                           <div className="font-semibold text-gray-900 text-base md:text-lg">{block.title}</div>
//                           <div className="text-gray-700 mt-0.5 text-sm md:text-base">{block.content}</div>
//                           {block.extra && (
//                             <div className="text-sm md:text-base text-gray-500 mt-1">{block.extra}</div>
//                           )}
//                         </div>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-primary-50/50 rounded-xl p-6 md:p-8 border border-primary-100/70">
//                 <h4 className="font-bold text-gray-900 mb-4 md:mb-5 flex items-center gap-2 md:gap-3 text-lg md:text-xl">
//                   <FaCheckCircle className="text-primary-600" size={20} /> Why contact us?
//                 </h4>
//                 <ul className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
//                   {reasons.map((reason, i) => (
//                     <li key={i} className="flex items-start gap-3 md:gap-4">
//                       <FaCheckCircle className="text-primary-500 mt-1 flex-shrink-0" size={18} />
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








////////////////////////////// Change Color Theam/////////////////////////////////////
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  InputAdornment,
  alpha 
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const navigate = useNavigate();
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
      icon: <LocationOnIcon fontSize="large" />,
      title: 'Visit Us',
      content:
        'Rukmini Nagar, Front Of Datta Mandir, 2103/47 E, Shahupuri, Kolhapur, Maharashtra 416005',
      extra: 'Kolhapur HQ • Serving India-wide',
    },
    {
      icon: <EmailIcon fontSize="large" />,
      title: 'Email',
      content: 'Walstarappdev@gmail.com',
      href: 'mailto:Walstarappdev@gmail.com',
    },
    {
      icon: <PhoneIcon fontSize="large" />,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero – compact, floating CTAs */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-blue-50/30 pointer-events-none" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Let's build{' '}
              <span className="text-blue-600 inline-block">smarter field teams</span>
              <br className="hidden sm:block" />
              together
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
              Demo • Pricing • Integration • Support — whatever you need, we're usually online within hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 20px 35px -10px rgba(37,99,235,0.25)',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all"
              >
                Send Message Now
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: '0 15px 30px -8px rgba(37,99,235,0.18)',
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/demo')}
                className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-xl font-semibold text-lg transition-all"
              >
                Book Live Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content – form first on desktop, info on right */}
      <section id="form-section" className="pb-20 md:pb-28">
        <div className="container-custom max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid lg:grid-cols-12 gap-10 lg:gap-14"
          >
            {/* Form – now narrower */}
            <motion.div variants={itemVariants} className="lg:col-span-5 xl:col-span-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100/70 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-6 text-white">
                  <h2 className="text-2xl font-bold">Get in Touch</h2>
                  <p className="text-blue-100 mt-1.5 opacity-90 text-sm md:text-base">
                    Usually reply within 2–6 hours • Mon–Sat
                  </p>
                </div>

                <div className="p-6 md:p-8 lg:p-9">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.5 }}
                        className="py-10 md:py-14 flex flex-col items-center justify-center text-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
                        >
                          <CheckCircleIcon className="text-green-500" sx={{ fontSize: { xs: 64, md: 80 } }} />
                        </motion.div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-5 mb-3">
                          Message Sent!
                        </h3>
                        <p className="text-gray-600 max-w-md text-sm md:text-base">
                          Thank you — we'll get back to you very soon (usually within hours).
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 md:space-y-7"
                      >
                        <TextField
                          fullWidth
                          label="Full Name"
                          variant="outlined"
                          size="medium"
                          {...register('name', { required: 'Please enter your name' })}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          InputProps={{ className: 'rounded-xl' }}
                          InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          variant="outlined"
                          size="medium"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' },
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailIcon className="text-blue-400" /></InputAdornment>,
                            className: 'rounded-xl',
                          }}
                          InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                          fullWidth
                          label="Your Message"
                          multiline
                          rows={5}
                          variant="outlined"
                          placeholder="Tell us about your team, challenges, or demo request..."
                          {...register('message', {
                            required: 'Message is required',
                            minLength: { value: 10, message: 'Please write a bit more' },
                          })}
                          error={!!errors.message}
                          helperText={errors.message?.message}
                          InputProps={{ className: 'rounded-xl' }}
                          InputLabelProps={{ shrink: true }}
                        />

                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={isSending}
                            sx={{
                              background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
                              color: 'white',
                              textTransform: 'none',
                              fontSize: { xs: '1rem', md: '1.125rem' },
                              fontWeight: 600,
                              py: { xs: 1.5, md: 1.75 },
                              borderRadius: '0.75rem',
                              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1E40AF, #2563EB)',
                              },
                              '&.Mui-disabled': {
                                background: alpha('#2563EB', 0.5),
                              },
                            }}
                          >
                            {isSending ? (
                              <>
                                <CircularProgress size={20} sx={{ color: 'white', mr: 1.5 }} />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <SendIcon sx={{ ml: 1.5 }} />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Contact info & reasons – now wider */}
            <motion.div variants={itemVariants} className="lg:col-span-7 xl:col-span-6 space-y-10 lg:space-y-12">
              <div className="space-y-6 md:space-y-7">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Reach Us Directly</h3>

                <div className="space-y-5 md:space-y-6">
                  {contactBlocks.map((block, i) => (
                    <motion.a
                      key={i}
                      href={block.href}
                      target={block.href ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="group block bg-white rounded-xl border border-gray-100 p-5 md:p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      whileHover={{
                        y: -5,
                        transition: { type: 'spring', stiffness: 400, damping: 20 },
                      }}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                          {block.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-base md:text-lg">{block.title}</div>
                          <div className="text-gray-700 mt-0.5 text-sm md:text-base">{block.content}</div>
                          {block.extra && (
                            <div className="text-sm md:text-base text-gray-500 mt-1">{block.extra}</div>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50/50 rounded-xl p-6 md:p-8 border border-blue-100/70">
                <h4 className="font-bold text-gray-900 mb-4 md:mb-5 flex items-center gap-2 md:gap-3 text-lg md:text-xl">
                  <FaCheckCircle className="text-blue-600" size={20} /> Why contact us?
                </h4>
                <ul className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
                  {reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-3 md:gap-4">
                      <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;