// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
//   CircularProgress,
//   Divider,
//   InputAdornment,
//   alpha,
//   useTheme,
//   Slide,
//   Skeleton,
//   Fade,
//   Tooltip,
// } from '@mui/material';
// import {
//   Close as CloseIcon,
//   LocalOffer as LocalOfferIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   ContentCopy as ContentCopyIcon,
//   Percent as PercentIcon,
//   CurrencyRupee as CurrencyRupeeIcon,
//   Bolt as BoltIcon,
//   Celebration as CelebrationIcon,
//   Discount as DiscountIcon,
//   AutoAwesome as AutoAwesomeIcon,
//   ArrowForward as ArrowForwardIcon,
// } from '@mui/icons-material';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   validateCoupon,
//   clearValidationResult,
//   getAllCoupons
// } from '../../../redux/slices/couponSlice';
// import { toast } from 'react-toastify';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// // ── design tokens (light theme) ───────────────────────────────────────────────
// const T = {
//   indigo: '#6366f1',
//   indigoLight: '#818cf8',
//   indigoPale: '#eef2ff',
//   emerald: '#10b981',
//   emeraldLight: '#34d399',
//   emeraldPale: '#ecfdf5',
//   gold: '#f59e0b',
//   goldPale: '#fffbeb',
//   red: '#ef4444',
//   redPale: '#fef2f2',
//   surface: '#ffffff',
//   surfaceAlt: '#f8fafc',
//   border: '#e2e8f0',
//   borderStrong: '#cbd5e1',
//   text: '#0f172a',
//   textSub: '#64748b',
//   textMuted: '#94a3b8',
// };

// // ── CouponSkeleton ─────────────────────────────────────────────────────────────
// const CouponSkeleton = () => (
//   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//     {[1, 2, 3].map((item) => (
//       <Box key={item} sx={{ p: 1.2, borderRadius: 2, border: `1px solid ${T.border}`, bgcolor: T.surfaceAlt }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
//           <Skeleton variant="rounded" width={70} height={20} sx={{ borderRadius: 1 }} />
//           <Skeleton variant="rounded" width={50} height={18} sx={{ borderRadius: 1 }} />
//         </Box>
//         <Skeleton variant="text" width="70%" height={12} />
//         <Box sx={{ display: 'flex', gap: 1, mt: 0.6 }}>
//           <Skeleton variant="text" width={45} height={10} />
//           <Skeleton variant="text" width={35} height={10} />
//         </Box>
//       </Box>
//     ))}
//   </Box>
// );

// // ── CouponCard (compact, light theme) ─────────────────────────────────────────
// const CouponCard = ({ coupon, onUse, onCopy, copiedCode, isEligible, isApplying }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const isPercent = coupon.discountType === 'percentage';
//   const accent = isPercent ? T.indigo : T.emerald;
//   const accentPale = isPercent ? T.indigoPale : T.emeraldPale;
//   const accentLight = isPercent ? T.indigoLight : T.emeraldLight;
//   const isPopular = coupon.discountValue > 20 && isPercent;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 6 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25 }}
//     >
//       <Box
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={() => isEligible && !isApplying && onUse(coupon.code)}
//         sx={{
//           px: 1.5, py: 1.1,
//           borderRadius: 2,
//           border: `1.5px solid`,
//           borderColor: isEligible && isHovered ? accent : T.border,
//           bgcolor: isEligible && isHovered ? accentPale : T.surface,
//           cursor: isEligible ? (isApplying ? 'wait' : 'pointer') : 'not-allowed',
//           opacity: isEligible ? 1 : 0.5,
//           transition: 'all 0.18s ease',
//           transform: isHovered && isEligible && !isApplying ? 'translateX(3px)' : 'none',
//           boxShadow: isHovered && isEligible ? `0 2px 12px -3px ${alpha(accent, 0.18)}` : 'none',
//           position: 'relative',
//           overflow: 'hidden',
//           '&::before': isEligible ? {
//             content: '""',
//             position: 'absolute',
//             left: 0, top: 0, bottom: 0,
//             width: '3px',
//             background: accent,
//             opacity: isHovered ? 1 : 0,
//             transition: 'opacity 0.18s ease',
//             borderRadius: '0 2px 2px 0',
//           } : {},
//         }}
//       >
//         {/* Loading overlay */}
//         {isApplying && (
//           <Box sx={{
//             position: 'absolute', inset: 0, borderRadius: 2,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             bgcolor: alpha(T.surface, 0.75),
//             backdropFilter: 'blur(2px)',
//             zIndex: 2,
//           }}>
//             <CircularProgress size={16} sx={{ color: accent }} />
//           </Box>
//         )}

//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           {/* Left: code + copy */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
//             {/* Popular tag */}
//             {isPopular && (
//               <Box sx={{
//                 display: 'flex', alignItems: 'center', gap: 0.2,
//                 px: 0.5, py: 0.1, borderRadius: 0.8,
//                 bgcolor: alpha(T.gold, 0.12),
//                 border: `1px solid ${alpha(T.gold, 0.3)}`,
//               }}>
//                 <BoltIcon sx={{ fontSize: 9, color: T.gold }} />
//                 <Typography sx={{ fontSize: '0.48rem', fontWeight: 800, color: T.gold, letterSpacing: 0.3 }}>HOT</Typography>
//               </Box>
//             )}

//             {/* Code pill */}
//             <Box sx={{
//               display: 'flex', alignItems: 'center', gap: 0.4,
//               px: 0.8, py: 0.3, borderRadius: 1,
//               bgcolor: alpha(accent, 0.08),
//               border: `1px solid ${alpha(accent, 0.2)}`,
//             }}>
//               <LocalOfferIcon sx={{ fontSize: 9, color: accent }} />
//               <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: accent, letterSpacing: 0.8 }}>
//                 {coupon.code}
//               </Typography>
//             </Box>

//             {/* Copy btn */}
//             <Tooltip title="Copy code">
//               <IconButton size="small" onClick={(e) => { e.stopPropagation(); onCopy(coupon.code); }}
//                 sx={{
//                   width: 18, height: 18, p: 0,
//                   color: copiedCode === coupon.code ? T.emerald : T.textMuted,
//                   '&:hover': { color: accent, bgcolor: alpha(accent, 0.08) },
//                   transition: 'all 0.15s',
//                   position: 'relative',
//                 }}>
//                 <ContentCopyIcon sx={{ fontSize: 10 }} />
//                 {copiedCode === coupon.code && (
//                   <Box sx={{
//                     position: 'absolute', top: -16, left: '50%',
//                     transform: 'translateX(-50%)',
//                     bgcolor: T.emerald, color: 'white',
//                     px: 0.5, py: 0.1, borderRadius: 0.6,
//                     fontSize: '0.42rem', whiteSpace: 'nowrap', fontWeight: 700,
//                   }}>Copied!</Box>
//                 )}
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* Right: discount badge */}
//           <Box sx={{
//             display: 'flex', alignItems: 'center', gap: 0.2,
//             px: 0.7, py: 0.2, borderRadius: 0.8,
//             bgcolor: accentPale,
//             border: `1px solid ${alpha(accent, 0.2)}`,
//           }}>
//             {isPercent
//               ? <PercentIcon sx={{ fontSize: 8, color: accentLight }} />
//               : <CurrencyRupeeIcon sx={{ fontSize: 8, color: accentLight }} />}
//             <Typography sx={{ fontSize: '0.55rem', fontWeight: 800, color: accent }}>
//               {isPercent ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} OFF
//             </Typography>
//           </Box>
//         </Box>

//         {/* Description */}
//         <Typography sx={{
//           fontSize: '0.6rem', color: T.textSub,
//           mt: 0.5, lineHeight: 1.3,
//           overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
//           maxWidth: '90%',
//         }}>
//           {coupon.description}
//         </Typography>

//         {/* Footer */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5 }}>
//           {coupon.minAmount > 0 && (
//             <Typography sx={{
//               fontSize: '0.5rem', color: T.textMuted,
//               px: 0.5, py: 0.1, borderRadius: 0.6,
//               bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
//             }}>
//               Min ₹{coupon.minAmount}
//             </Typography>
//           )}
//           <Typography sx={{
//             fontSize: '0.5rem', color: T.textMuted,
//             px: 0.5, py: 0.1, borderRadius: 0.6,
//             bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
//           }}>
//             {coupon.usedCount || 0} used
//           </Typography>

//           {!isEligible && (
//             <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.3 }}>
//               <ErrorIcon sx={{ fontSize: 9, color: T.red }} />
//               <Typography sx={{ fontSize: '0.5rem', color: T.red }}>Not eligible</Typography>
//             </Box>
//           )}

//           {isEligible && isHovered && !isApplying && (
//             <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: 'auto' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
//                 <AutoAwesomeIcon sx={{ fontSize: 8, color: accent }} />
//                 <Typography sx={{ fontSize: '0.5rem', color: accent, fontWeight: 700 }}>Click to apply</Typography>
//               </Box>
//             </motion.div>
//           )}
//         </Box>
//       </Box>
//     </motion.div>
//   );
// };

// // ── Main CouponPopup ───────────────────────────────────────────────────────────
// const CouponPopup = ({ open, onClose, onApplyCoupon, planPrice, planName }) => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   const [couponCode, setCouponCode] = useState('');
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const [validationError, setValidationError] = useState('');
//   const [copiedCode, setCopiedCode] = useState(null);
//   const [fetchError, setFetchError] = useState(false);
//   const [isDirectPayment, setIsDirectPayment] = useState(false);
//   const [applyingCode, setApplyingCode] = useState(null); // which card is applying

//   const {
//     validationLoading,
//     validationResult,
//     validationError: reduxValidationError,
//     coupons,
//     loading: couponsLoading,
//     error
//   } = useSelector((state) => state.coupon);

//   // Reset all state when popup opens to ensure fresh start
//   useEffect(() => {
//     if (open) {
//       // Clear all state when popup opens
//       setCouponCode('');
//       setAppliedCoupon(null);
//       setValidationError('');
//       setCopiedCode(null);
//       setFetchError(false);
//       setIsDirectPayment(false);
//       setApplyingCode(null);
//       dispatch(clearValidationResult());
//       localStorage.removeItem('appliedCoupon'); // Clear any saved coupon
//     }
//   }, [open, dispatch]);

//   useEffect(() => {
//     if (open) {
//       setFetchError(false);
//       dispatch(getAllCoupons({ status: 'active', limit: 50 }))
//         .unwrap()
//         .catch((err) => { console.error('Failed to fetch coupons:', err); setFetchError(true); });
//     }
//   }, [dispatch, open]);

//   const availableCoupons = Array.isArray(coupons)
//     ? coupons.filter(c => c.status === 'active' && c.minAmount <= planPrice)
//     : [];

//   // Shared validate logic — used by both manual input and card click
//   const doValidate = async (code) => {
//     if (!code?.trim()) { setValidationError('Please enter a coupon code'); return; }
//     setValidationError('');
//     const result = await dispatch(validateCoupon({ code, amount: planPrice }));
//     if (validateCoupon.fulfilled.match(result)) {
//       const couponData = result.payload.data;
//       setAppliedCoupon(couponData);
//       toast.success(
//         <Box>
//           <Typography variant="body2" fontWeight="bold">🎉 Coupon Applied!</Typography>
//           <Typography variant="caption">You saved ₹{couponData.discountAmount}</Typography>
//         </Box>,
//         { icon: <CelebrationIcon sx={{ color: T.emerald }} /> }
//       );
//     } else {
//       setValidationError(result.payload?.message || 'Invalid coupon code');
//       setAppliedCoupon(null);
//     }
//   };

//   const handleValidateCoupon = () => doValidate(couponCode);

//   // Card click — auto apply immediately
//   const handleUseCoupon = async (code) => {
//     setApplyingCode(code);
//     setCouponCode(code);
//     await doValidate(code);
//     setApplyingCode(null);
//   };

//   const handleApplyCoupon = () => {
//     if (appliedCoupon) {
//       onApplyCoupon({
//         code: appliedCoupon.code,
//         discountAmount: appliedCoupon.discountAmount,
//         finalAmount: appliedCoupon.finalAmount,
//         originalAmount: appliedCoupon.originalAmount,
//         couponId: appliedCoupon.couponId,
//         discountType: appliedCoupon.discountType,
//         discountValue: appliedCoupon.discountValue,
//         description: appliedCoupon.description,
//       });
//       onClose();
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponCode('');
//     setValidationError('');
//     dispatch(clearValidationResult());
//     toast.info('Coupon removed');
//   };

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//     toast.success('Code copied!', { icon: <ContentCopyIcon sx={{ fontSize: 18 }} /> });
//   };

//   const handleDirectPayment = () => {
//     setIsDirectPayment(true);
//     onApplyCoupon(null);
//     onClose();
//     toast.info('Continuing with original amount');
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       TransitionComponent={Transition}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: 'hidden',
//           bgcolor: T.surface,
//           border: `1px solid ${T.border}`,
//           boxShadow: '0 20px 48px -8px rgba(0,0,0,0.14), 0 4px 16px -4px rgba(0,0,0,0.08)',
//           maxHeight: '90vh',
//         }
//       }}
//       sx={{
//         '& .MuiBackdrop-root': {
//           backdropFilter: 'blur(4px)',
//           bgcolor: 'rgba(15,23,42,0.4)',
//         }
//       }}
//     >
//       {/* ── Header ── */}
//       <Box sx={{
//         px: 2, py: 1.5,
//         background: `linear-gradient(135deg, ${T.indigoPale} 0%, ${alpha(T.indigo, 0.04)} 100%)`,
//         borderBottom: `1px solid ${T.border}`,
//         display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//       }}>
//         <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}
//           style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//           <Box sx={{
//             width: 34, height: 34, borderRadius: 1.8,
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             background: `linear-gradient(135deg, ${alpha(T.indigo, 0.15)}, ${alpha(T.indigoLight, 0.08)})`,
//             border: `1px solid ${alpha(T.indigo, 0.2)}`,
//           }}>
//             <LocalOfferIcon sx={{ fontSize: 17, color: T.indigo }} />
//           </Box>
//           <Box>
//             <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: T.text, letterSpacing: -0.2, lineHeight: 1.2 }}>
//               {appliedCoupon ? 'Coupon Applied! 🎉' : 'Apply Coupon'}
//             </Typography>
//             <Typography sx={{ fontSize: '0.6rem', color: T.textMuted, mt: 0.1 }}>
//               {appliedCoupon ? 'Review your savings' : 'Save more on your purchase'}
//             </Typography>
//           </Box>
//         </motion.div>

//         <IconButton onClick={onClose} size="small" sx={{
//           width: 26, height: 26,
//           color: T.textMuted,
//           '&:hover': { bgcolor: alpha(T.indigo, 0.06), color: T.indigo },
//         }}>
//           <CloseIcon sx={{ fontSize: 15 }} />
//         </IconButton>
//       </Box>

//       <DialogContent sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{
//           px: 2, pt: 1.8, pb: 1.5, overflowY: 'auto', flex: 1,
//           '&::-webkit-scrollbar': { width: 3 },
//           '&::-webkit-scrollbar-thumb': { bgcolor: T.border, borderRadius: 2 },
//         }}>

//           {/* ── Plan info ── */}
//           <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.07 }}>
//             <Box sx={{
//               px: 1.8, py: 1.2, mb: 1.8, borderRadius: 2,
//               bgcolor: T.surfaceAlt,
//               border: `1px solid ${T.border}`,
//               display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             }}>
//               <Box>
//                 <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.2 }}>
//                   Selected Plan
//                 </Typography>
//                 <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: T.text, letterSpacing: -0.1 }}>
//                   {planName}
//                 </Typography>
//               </Box>
//               <Box sx={{ textAlign: 'right' }}>
//                 <Typography sx={{ fontSize: '0.5rem', color: T.textMuted, mb: 0.1 }}>one-time</Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.2 }}>
//                   <Typography sx={{ fontSize: '0.7rem', color: T.gold, fontWeight: 700 }}>₹</Typography>
//                   <Typography sx={{ fontSize: '1.35rem', fontWeight: 900, color: T.gold, letterSpacing: -0.8, lineHeight: 1 }}>
//                     {planPrice}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </motion.div>

//           {/* ── Applied coupon / Input ── */}
//           <AnimatePresence mode="wait">
//             {appliedCoupon ? (
//               <motion.div key="applied"
//                 initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.22 }}
//               >
//                 <Box sx={{
//                   p: 1.8, mb: 1.8, borderRadius: 2,
//                   bgcolor: T.emeraldPale,
//                   border: `1.5px solid ${alpha(T.emerald, 0.3)}`,
//                 }}>
//                   {/* Header - Simplified without remove confirmation */}
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
//                       <Box sx={{
//                         width: 24, height: 24, borderRadius: 1.2,
//                         display: 'flex', alignItems: 'center', justifyContent: 'center',
//                         bgcolor: alpha(T.emerald, 0.15), border: `1px solid ${alpha(T.emerald, 0.3)}`,
//                       }}>
//                         <CheckCircleIcon sx={{ fontSize: 14, color: T.emerald }} />
//                       </Box>
//                       <Box>
//                         <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: T.emerald }}>Coupon Applied!</Typography>
//                         <Typography sx={{ fontSize: '0.55rem', color: T.textSub }}>Discount calculated</Typography>
//                       </Box>
//                     </Box>
//                     <Tooltip title="Remove Coupon">
//                       <IconButton onClick={handleRemoveCoupon} size="small"
//                         sx={{
//                           width: 22, height: 22,
//                           bgcolor: alpha(T.emerald, 0.1), border: `1px solid ${alpha(T.emerald, 0.2)}`, color: T.emerald,
//                           '&:hover': { bgcolor: T.redPale, borderColor: T.red, color: T.red },
//                           transition: 'all 0.18s',
//                         }}>
//                         <CloseIcon sx={{ fontSize: 12 }} />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>

//                   <Typography sx={{ fontSize: '0.6rem', color: T.textSub, fontStyle: 'italic', mb: 1.2, lineHeight: 1.4 }}>
//                     "{appliedCoupon.description}"
//                   </Typography>

//                   <Divider sx={{ borderColor: alpha(T.emerald, 0.15), mb: 1.2 }} />

//                   {/* Price breakdown */}
//                   <Box sx={{ display: 'flex', gap: 0.8, mb: 0.8 }}>
//                     <Box sx={{ flex: 1, p: 1, borderRadius: 1.2, bgcolor: T.surface, border: `1px solid ${T.border}` }}>
//                       <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, mb: 0.2 }}>Original</Typography>
//                       <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: T.textSub }}>₹{appliedCoupon.originalAmount}</Typography>
//                     </Box>
//                     <Box sx={{ flex: 1, p: 1, borderRadius: 1.2, bgcolor: alpha(T.emerald, 0.06), border: `1px solid ${alpha(T.emerald, 0.15)}` }}>
//                       <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, mb: 0.2 }}>Discount</Typography>
//                       <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: T.emerald }}>−₹{appliedCoupon.discountAmount}</Typography>
//                     </Box>
//                   </Box>

//                   {/* Final */}
//                   <Box sx={{
//                     px: 1.5, py: 1, borderRadius: 1.2,
//                     background: `linear-gradient(135deg, ${alpha(T.emerald, 0.1)}, ${alpha(T.emeraldLight, 0.06)})`,
//                     border: `1px solid ${alpha(T.emerald, 0.25)}`,
//                     display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//                   }}>
//                     <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: T.text }}>Final Amount</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6 }}>
//                       <Typography sx={{ fontSize: '0.6rem', color: T.textMuted, textDecoration: 'line-through' }}>
//                         ₹{appliedCoupon.originalAmount}
//                       </Typography>
//                       <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, color: T.emerald, letterSpacing: -0.5 }}>
//                         ₹{appliedCoupon.finalAmount}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </motion.div>
//             ) : (
//               <motion.div key="input"
//                 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
//               >
//                 <Box sx={{ mb: 1.8 }}>
//                   <TextField
//                     fullWidth size="small"
//                     placeholder="Enter coupon code"
//                     value={couponCode}
//                     onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setValidationError(''); }}
//                     error={!!validationError}
//                     helperText={validationError}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocalOfferIcon sx={{ fontSize: 15, color: alpha(T.indigo, 0.6) }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <Button onClick={handleValidateCoupon}
//                             disabled={validationLoading || !couponCode.trim()} size="small"
//                             sx={{
//                               minWidth: 58, height: 26, fontSize: '0.62rem', fontWeight: 800,
//                               borderRadius: 1.2,
//                               background: `linear-gradient(135deg, ${T.indigo}, ${T.indigoLight})`,
//                               color: 'white', letterSpacing: 0.4,
//                               boxShadow: `0 3px 8px ${alpha(T.indigo, 0.28)}`,
//                               '&:hover': { background: `linear-gradient(135deg, ${alpha(T.indigo, 0.85)}, ${T.indigo})` },
//                               '&.Mui-disabled': { background: T.border, color: T.textMuted },
//                             }}>
//                             {validationLoading ? <CircularProgress size={12} sx={{ color: T.textMuted }} /> : 'Apply'}
//                           </Button>
//                         </InputAdornment>
//                       ),
//                       sx: {
//                         fontSize: '0.72rem', fontWeight: 600, color: T.text,
//                         bgcolor: T.surfaceAlt, borderRadius: 1.8,
//                         '& input': { textTransform: 'uppercase', letterSpacing: 0.5 },
//                         '& .MuiOutlinedInput-notchedOutline': { borderColor: T.border },
//                         '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: T.indigoLight },
//                         '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: T.indigo, boxShadow: `0 0 0 3px ${alpha(T.indigo, 0.1)}` },
//                       },
//                     }}
//                     FormHelperTextProps={{ sx: { fontSize: '0.58rem', mt: 0.3 } }}
//                   />
//                 </Box>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* ── Available Coupons ── */}
//           {!appliedCoupon && (
//             <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <DiscountIcon sx={{ fontSize: 12, color: T.indigo }} />
//                   <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: T.textSub, letterSpacing: 0.6, textTransform: 'uppercase' }}>
//                     Available Coupons
//                   </Typography>
//                 </Box>
//                 {availableCoupons.length > 0 && (
//                   <Box sx={{
//                     px: 0.7, py: 0.15, borderRadius: 0.8,
//                     bgcolor: T.indigoPale, border: `1px solid ${alpha(T.indigo, 0.2)}`,
//                   }}>
//                     <Typography sx={{ fontSize: '0.52rem', fontWeight: 700, color: T.indigo }}>
//                       {availableCoupons.length} available
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>

//               <Box sx={{
//                 maxHeight: 220, overflowY: 'auto', pr: 0.3,
//                 '&::-webkit-scrollbar': { width: 2 },
//                 '&::-webkit-scrollbar-thumb': { bgcolor: T.border, borderRadius: 2 },
//               }}>
//                 {couponsLoading ? (
//                   <CouponSkeleton />
//                 ) : fetchError || error ? (
//                   <Box sx={{ p: 2.5, textAlign: 'center', borderRadius: 1.8, border: `1px dashed ${alpha(T.red, 0.3)}`, bgcolor: T.redPale }}>
//                     <ErrorIcon sx={{ fontSize: 28, color: alpha(T.red, 0.4), mb: 0.8 }} />
//                     <Typography sx={{ fontSize: '0.68rem', color: T.textSub, mb: 1.2 }}>Failed to load coupons</Typography>
//                     <Button size="small" onClick={() => { setFetchError(false); dispatch(getAllCoupons({ status: 'active', limit: 50 })); }}
//                       sx={{ fontSize: '0.58rem', borderRadius: 1.2, border: `1px solid ${alpha(T.red, 0.3)}`, color: T.red, '&:hover': { bgcolor: alpha(T.red, 0.06) } }}>
//                       Retry
//                     </Button>
//                   </Box>
//                 ) : availableCoupons.length > 0 ? (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
//                     {availableCoupons.map((coupon) => (
//                       <CouponCard key={coupon._id} coupon={coupon}
//                         onUse={handleUseCoupon}
//                         onCopy={handleCopyCode}
//                         copiedCode={copiedCode}
//                         isEligible={true}
//                         isApplying={applyingCode === coupon.code}
//                       />
//                     ))}
//                   </Box>
//                 ) : (
//                   <Box sx={{ p: 2.5, textAlign: 'center', borderRadius: 1.8, border: `1px dashed ${T.border}`, bgcolor: T.surfaceAlt }}>
//                     <LocalOfferIcon sx={{ fontSize: 30, color: T.textMuted, mb: 0.8 }} />
//                     <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: T.textSub, mb: 0.2 }}>No coupons available</Typography>
//                     <Typography sx={{ fontSize: '0.58rem', color: T.textMuted }}>No active coupons for this plan</Typography>
//                   </Box>
//                 )}
//               </Box>

//               {/* OR divider */}
//               <Box sx={{ mt: 1.8, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
//                 <Typography sx={{ fontSize: '0.55rem', fontWeight: 700, color: T.textMuted, letterSpacing: 0.8 }}>OR</Typography>
//                 <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
//               </Box>

//               <Button fullWidth onClick={handleDirectPayment} disabled={isDirectPayment}
//                 endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
//                 sx={{
//                   mt: 1.2, py: 0.9, borderRadius: 1.8,
//                   border: `1px dashed ${T.borderStrong}`,
//                   color: T.textSub, fontSize: '0.65rem', fontWeight: 600,
//                   bgcolor: 'transparent',
//                   '&:hover': { border: `1px dashed ${T.indigo}`, bgcolor: T.indigoPale, color: T.indigo },
//                   transition: 'all 0.18s ease',
//                 }}>
//                 Continue without coupon — ₹{planPrice}
//               </Button>
//             </motion.div>
//           )}

//           {/* Errors */}
//           {validationError && !appliedCoupon && (
//             <Fade in>
//               <Box sx={{
//                 mt: 1.2, px: 1, py: 0.7, borderRadius: 1.2,
//                 bgcolor: T.redPale, border: `1px solid ${alpha(T.red, 0.25)}`,
//                 display: 'flex', alignItems: 'center', gap: 0.5,
//               }}>
//                 <ErrorIcon sx={{ fontSize: 12, color: T.red }} />
//                 <Typography sx={{ fontSize: '0.6rem', color: T.red }}>{validationError}</Typography>
//               </Box>
//             </Fade>
//           )}

//           {reduxValidationError && !appliedCoupon && !validationError && (
//             <Fade in>
//               <Box sx={{
//                 mt: 1.2, px: 1, py: 0.7, borderRadius: 1.2,
//                 bgcolor: T.redPale, border: `1px solid ${alpha(T.red, 0.25)}`,
//                 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//               }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <ErrorIcon sx={{ fontSize: 12, color: T.red }} />
//                   <Typography sx={{ fontSize: '0.6rem', color: T.red }}>
//                     {reduxValidationError.message || 'Invalid coupon'}
//                   </Typography>
//                 </Box>
//                 <IconButton size="small" onClick={() => dispatch(clearValidationResult())}
//                   sx={{ p: 0.2, color: alpha(T.red, 0.5), '&:hover': { color: T.red } }}>
//                   <CloseIcon sx={{ fontSize: 10 }} />
//                 </IconButton>
//               </Box>
//             </Fade>
//           )}
//         </Box>
//       </DialogContent>

//       {/* ── Footer ── */}
//       <Box sx={{
//         px: 2, py: 1.5,
//         borderTop: `1px solid ${T.border}`,
//         display: 'flex', gap: 0.8,
//         bgcolor: T.surfaceAlt,
//       }}>
//         <Button fullWidth onClick={onClose}
//           sx={{
//             py: 0.8, borderRadius: 1.8, fontSize: '0.68rem', fontWeight: 700,
//             border: `1px solid ${T.border}`, color: T.textSub,
//             '&:hover': { bgcolor: T.border, color: T.text },
//           }}>
//           Cancel
//         </Button>

//         {appliedCoupon && (
//           <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
//             <Button fullWidth onClick={handleApplyCoupon}
//               startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
//               sx={{
//                 py: 0.8, borderRadius: 1.8, fontSize: '0.68rem', fontWeight: 800,
//                 background: `linear-gradient(135deg, ${T.emerald}, ${T.emeraldLight})`,
//                 color: 'white',
//                 boxShadow: `0 4px 14px -3px ${alpha(T.emerald, 0.4)}`,
//                 '&:hover': {
//                   background: `linear-gradient(135deg, ${alpha(T.emerald, 0.9)}, ${T.emeraldLight})`,
//                   boxShadow: `0 6px 18px -3px ${alpha(T.emerald, 0.45)}`,
//                 },
//               }}>
//               Pay ₹{appliedCoupon.finalAmount}
//             </Button>
//           </motion.div>
//         )}
//       </Box>
//     </Dialog>
//   );
// };

// export default CouponPopup;

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Divider,
  InputAdornment,
  alpha,
  useTheme,
  Slide,
  Skeleton,
  Fade,
  Tooltip,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocalOffer as LocalOfferIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  ContentCopy as ContentCopyIcon,
  Percent as PercentIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Bolt as BoltIcon,
  Celebration as CelebrationIcon,
  Discount as DiscountIcon,
  AutoAwesome as AutoAwesomeIcon,
  ArrowForward as ArrowForwardIcon,
  DateRange as DateRangeIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  validateCoupon,
  clearValidationResult,
  getAllCoupons
} from '../../../redux/slices/couponSlice';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Design tokens
const T = {
  indigo: '#6366f1',
  indigoLight: '#818cf8',
  indigoPale: '#eef2ff',
  emerald: '#10b981',
  emeraldLight: '#34d399',
  emeraldPale: '#ecfdf5',
  gold: '#f59e0b',
  goldPale: '#fffbeb',
  red: '#ef4444',
  redPale: '#fef2f2',
  surface: '#ffffff',
  surfaceAlt: '#f8fafc',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
  text: '#0f172a',
  textSub: '#64748b',
  textMuted: '#94a3b8',
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Helper to check if coupon is about to expire (within 7 days)
const isExpiringSoon = (endDate) => {
  if (!endDate) return false;
  const now = new Date();
  const end = new Date(endDate);
  const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return daysLeft <= 7 && daysLeft > 0;
};

// CouponSkeleton
const CouponSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {[1, 2, 3].map((item) => (
      <Box key={item} sx={{ p: 1.2, borderRadius: 2, border: `1px solid ${T.border}`, bgcolor: T.surfaceAlt }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
          <Skeleton variant="rounded" width={70} height={20} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rounded" width={50} height={18} sx={{ borderRadius: 1 }} />
        </Box>
        <Skeleton variant="text" width="70%" height={12} />
        <Box sx={{ display: 'flex', gap: 1, mt: 0.6 }}>
          <Skeleton variant="text" width={45} height={10} />
          <Skeleton variant="text" width={35} height={10} />
        </Box>
      </Box>
    ))}
  </Box>
);

// CouponCard Component with new fields
const CouponCard = ({ coupon, onUse, onCopy, copiedCode, isEligible, isApplying }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPercent = coupon.discountType === 'percentage';
  const accent = isPercent ? T.indigo : T.emerald;
  const accentPale = isPercent ? T.indigoPale : T.emeraldPale;
  const accentLight = isPercent ? T.indigoLight : T.emeraldLight;
  const isPopular = coupon.discountValue > 20 && isPercent;
  const expiringSoon = isExpiringSoon(coupon.endDate);
  const isUnlimited = coupon.maxUsageCount === null || coupon.maxUsageCount === undefined;
  const remainingUses = !isUnlimited ? (coupon.maxUsageCount - (coupon.usedCount || 0)) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isEligible && !isApplying && onUse(coupon.code)}
        sx={{
          px: 1.5, py: 1.1,
          borderRadius: 2,
          border: `1.5px solid`,
          borderColor: isEligible && isHovered ? accent : T.border,
          bgcolor: isEligible && isHovered ? accentPale : T.surface,
          cursor: isEligible ? (isApplying ? 'wait' : 'pointer') : 'not-allowed',
          opacity: isEligible ? 1 : 0.5,
          transition: 'all 0.18s ease',
          transform: isHovered && isEligible && !isApplying ? 'translateX(3px)' : 'none',
          boxShadow: isHovered && isEligible ? `0 2px 12px -3px ${alpha(accent, 0.18)}` : 'none',
          position: 'relative',
          overflow: 'hidden',
          '&::before': isEligible ? {
            content: '""',
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            width: '3px',
            background: accent,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.18s ease',
            borderRadius: '0 2px 2px 0',
          } : {},
        }}
      >
        {isApplying && (
          <Box sx={{
            position: 'absolute', inset: 0, borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: alpha(T.surface, 0.75),
            backdropFilter: 'blur(2px)',
            zIndex: 2,
          }}>
            <CircularProgress size={16} sx={{ color: accent }} />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            {isPopular && (
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0.2,
                px: 0.5, py: 0.1, borderRadius: 0.8,
                bgcolor: alpha(T.gold, 0.12),
                border: `1px solid ${alpha(T.gold, 0.3)}`,
              }}>
                <BoltIcon sx={{ fontSize: 9, color: T.gold }} />
                <Typography sx={{ fontSize: '0.48rem', fontWeight: 800, color: T.gold, letterSpacing: 0.3 }}>HOT</Typography>
              </Box>
            )}
            
            {expiringSoon && !isPopular && (
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0.2,
                px: 0.5, py: 0.1, borderRadius: 0.8,
                bgcolor: alpha(T.gold, 0.08),
                border: `1px solid ${alpha(T.gold, 0.2)}`,
              }}>
                <Typography sx={{ fontSize: '0.48rem', fontWeight: 600, color: T.gold }}>Expiring Soon</Typography>
              </Box>
            )}

            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.4,
              px: 0.8, py: 0.3, borderRadius: 1,
              bgcolor: alpha(accent, 0.08),
              border: `1px solid ${alpha(accent, 0.2)}`,
            }}>
              <LocalOfferIcon sx={{ fontSize: 9, color: accent }} />
              <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: accent, letterSpacing: 0.8 }}>
                {coupon.code}
              </Typography>
            </Box>

            <Tooltip title="Copy code">
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); onCopy(coupon.code); }}
                sx={{
                  width: 18, height: 18, p: 0,
                  color: copiedCode === coupon.code ? T.emerald : T.textMuted,
                  '&:hover': { color: accent, bgcolor: alpha(accent, 0.08) },
                  transition: 'all 0.15s',
                }}>
                <ContentCopyIcon sx={{ fontSize: 10 }} />
                {copiedCode === coupon.code && (
                  <Box sx={{
                    position: 'absolute', top: -16, left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: T.emerald, color: 'white',
                    px: 0.5, py: 0.1, borderRadius: 0.6,
                    fontSize: '0.42rem', whiteSpace: 'nowrap', fontWeight: 700,
                  }}>Copied!</Box>
                )}
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{
            display: 'flex', alignItems: 'center', gap: 0.2,
            px: 0.7, py: 0.2, borderRadius: 0.8,
            bgcolor: accentPale,
            border: `1px solid ${alpha(accent, 0.2)}`,
          }}>
            {isPercent
              ? <PercentIcon sx={{ fontSize: 8, color: accentLight }} />
              : <CurrencyRupeeIcon sx={{ fontSize: 8, color: accentLight }} />}
            <Typography sx={{ fontSize: '0.55rem', fontWeight: 800, color: accent }}>
              {isPercent ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} OFF
            </Typography>
          </Box>
        </Box>

        <Typography sx={{
          fontSize: '0.6rem', color: T.textSub,
          mt: 0.5, lineHeight: 1.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          maxWidth: '90%',
        }}>
          {coupon.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5, flexWrap: 'wrap' }}>
          {coupon.minAmount > 0 && (
            <Typography sx={{
              fontSize: '0.5rem', color: T.textMuted,
              px: 0.5, py: 0.1, borderRadius: 0.6,
              bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
            }}>
              Min ₹{coupon.minAmount}
            </Typography>
          )}
          
          {!isUnlimited && remainingUses !== null && (
            <Tooltip title={`${remainingUses} uses left`}>
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0.3,
                px: 0.5, py: 0.1, borderRadius: 0.6,
                bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
              }}>
                <PeopleIcon sx={{ fontSize: 8, color: T.textMuted }} />
                <Typography sx={{ fontSize: '0.5rem', color: T.textMuted }}>
                  {remainingUses} left
                </Typography>
              </Box>
            </Tooltip>
          )}
          
          {isUnlimited && (
            <Tooltip title="Unlimited uses">
              <Box sx={{
                display: 'flex', alignItems: 'center', gap: 0.3,
                px: 0.5, py: 0.1, borderRadius: 0.6,
                bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
              }}>
                <PeopleIcon sx={{ fontSize: 8, color: T.textMuted }} />
                <Typography sx={{ fontSize: '0.5rem', color: T.textMuted }}>
                  Unlimited
                </Typography>
              </Box>
            </Tooltip>
          )}

          <Tooltip title={`Valid until ${formatDate(coupon.endDate)}`}>
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 0.3,
              px: 0.5, py: 0.1, borderRadius: 0.6,
              bgcolor: T.surfaceAlt, border: `1px solid ${T.border}`,
            }}>
              <DateRangeIcon sx={{ fontSize: 8, color: T.textMuted }} />
              <Typography sx={{ fontSize: '0.5rem', color: T.textMuted }}>
                {formatDate(coupon.endDate)}
              </Typography>
            </Box>
          </Tooltip>

          {!isEligible && (
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <ErrorIcon sx={{ fontSize: 9, color: T.red }} />
              <Typography sx={{ fontSize: '0.5rem', color: T.red }}>Not eligible</Typography>
            </Box>
          )}

          {isEligible && isHovered && !isApplying && (
            <motion.div initial={{ opacity: 0, x: 4 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
                <AutoAwesomeIcon sx={{ fontSize: 8, color: accent }} />
                <Typography sx={{ fontSize: '0.5rem', color: accent, fontWeight: 700 }}>Click to apply</Typography>
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

// Main CouponPopup Component
const CouponPopup = ({ open, onClose, onApplyCoupon, planPrice, planName }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [isDirectPayment, setIsDirectPayment] = useState(false);
  const [applyingCode, setApplyingCode] = useState(null);

  const {
    validationLoading,
    validationResult,
    validationError: reduxValidationError,
    coupons,
    loading: couponsLoading,
    error
  } = useSelector((state) => state.coupon);

  useEffect(() => {
    if (open) {
      setCouponCode('');
      setAppliedCoupon(null);
      setValidationError('');
      setCopiedCode(null);
      setFetchError(false);
      setIsDirectPayment(false);
      setApplyingCode(null);
      dispatch(clearValidationResult());
      localStorage.removeItem('appliedCoupon');
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open) {
      setFetchError(false);
      dispatch(getAllCoupons({ status: 'active', limit: 50 }))
        .unwrap()
        .catch((err) => { console.error('Failed to fetch coupons:', err); setFetchError(true); });
    }
  }, [dispatch, open]);

  const availableCoupons = Array.isArray(coupons)
    ? coupons.filter(c => c.status === 'active' && c.minAmount <= planPrice)
    : [];

  const doValidate = async (code) => {
    if (!code?.trim()) { setValidationError('Please enter a coupon code'); return; }
    setValidationError('');
    const result = await dispatch(validateCoupon({ code, amount: planPrice }));
    
    if (validateCoupon.fulfilled.match(result)) {
      const couponData = result.payload?.data || result.payload;
      
      if (!couponData) {
        setValidationError('Invalid response from server');
        return;
      }
      
      setAppliedCoupon(couponData);
      const savedAmount = couponData.discountAmount;
      toast.success(
        <Box>
          <Typography variant="body2" fontWeight="bold">🎉 Coupon Applied!</Typography>
          <Typography variant="caption">You saved ₹{savedAmount}</Typography>
          {couponData.remainingUses !== "Unlimited" && couponData.remainingUses <= 5 && (
            <Typography variant="caption" sx={{ display: 'block', color: T.gold }}>
              Only {couponData.remainingUses} uses left!
            </Typography>
          )}
        </Box>,
        { icon: <CelebrationIcon style={{ color: T.emerald }} /> }
      );
    } else {
      const errorMsg = result.payload?.message || (typeof result.payload === 'string' ? result.payload : 'Invalid coupon code');
      setValidationError(errorMsg);
      setAppliedCoupon(null);
    }
  };

  const handleValidateCoupon = () => doValidate(couponCode);

  const handleUseCoupon = async (code) => {
    setApplyingCode(code);
    setCouponCode(code);
    await doValidate(code);
    setApplyingCode(null);
  };

  const handleApplyCoupon = () => {
    if (appliedCoupon) {
      onApplyCoupon({
        code: appliedCoupon.code,
        discountAmount: appliedCoupon.discountAmount,
        finalAmount: appliedCoupon.finalAmount,
        originalAmount: appliedCoupon.originalAmount,
        couponId: appliedCoupon.couponId,
        discountType: appliedCoupon.discountType,
        discountValue: appliedCoupon.discountValue,
        description: appliedCoupon.description,
        maxUsageCount: appliedCoupon.maxUsageCount,
        remainingUses: appliedCoupon.remainingUses,
        validFrom: appliedCoupon.validFrom,
        validUntil: appliedCoupon.validUntil,
      });
      onClose();
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setValidationError('');
    dispatch(clearValidationResult());
    toast.info('Coupon removed');
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    toast.success('Code copied!', { icon: <ContentCopyIcon sx={{ fontSize: 18 }} /> });
  };

  const handleDirectPayment = () => {
    setIsDirectPayment(true);
    onApplyCoupon(null);
    onClose();
    toast.info('Continuing with original amount');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: T.surface,
          border: `1px solid ${T.border}`,
          boxShadow: '0 20px 48px -8px rgba(0,0,0,0.14), 0 4px 16px -4px rgba(0,0,0,0.08)',
          maxHeight: '90vh',
        }
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(4px)',
          bgcolor: 'rgba(15,23,42,0.4)',
        }
      }}
    >
      <Box sx={{
        px: 2, py: 1.5,
        background: `linear-gradient(135deg, ${T.indigoPale} 0%, ${alpha(T.indigo, 0.04)} 100%)`,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: 1.8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${alpha(T.indigo, 0.15)}, ${alpha(T.indigoLight, 0.08)})`,
            border: `1px solid ${alpha(T.indigo, 0.2)}`,
          }}>
            <LocalOfferIcon sx={{ fontSize: 17, color: T.indigo }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: T.text, letterSpacing: -0.2, lineHeight: 1.2 }}>
              {appliedCoupon ? 'Coupon Applied! 🎉' : 'Apply Coupon'}
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: T.textMuted, mt: 0.1 }}>
              {appliedCoupon ? 'Review your savings' : 'Save more on your purchase'}
            </Typography>
          </Box>
        </motion.div>

        <IconButton onClick={onClose} size="small" sx={{
          width: 26, height: 26,
          color: T.textMuted,
          '&:hover': { bgcolor: alpha(T.indigo, 0.06), color: T.indigo },
        }}>
          <CloseIcon sx={{ fontSize: 15 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          px: 2, pt: 1.8, pb: 1.5, overflowY: 'auto', flex: 1,
          '&::-webkit-scrollbar': { width: 3 },
          '&::-webkit-scrollbar-thumb': { bgcolor: T.border, borderRadius: 2 },
        }}>
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.07 }}>
            <Box sx={{
              px: 1.8, py: 1.2, mb: 1.8, borderRadius: 2,
              bgcolor: T.surfaceAlt,
              border: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <Box>
                <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8, mb: 0.2 }}>
                  Selected Plan
                </Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: T.text, letterSpacing: -0.1 }}>
                  {planName}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.5rem', color: T.textMuted, mb: 0.1 }}>one-time</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.2 }}>
                  <Typography sx={{ fontSize: '0.7rem', color: T.gold, fontWeight: 700 }}>₹</Typography>
                  <Typography sx={{ fontSize: '1.35rem', fontWeight: 900, color: T.gold, letterSpacing: -0.8, lineHeight: 1 }}>
                    {planPrice}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <AnimatePresence mode="wait">
            {appliedCoupon ? (
              <motion.div key="applied"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.22 }}
              >
                <Box sx={{
                  p: 1.8, mb: 1.8, borderRadius: 2,
                  bgcolor: T.emeraldPale,
                  border: `1.5px solid ${alpha(T.emerald, 0.3)}`,
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: 1.2,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        bgcolor: alpha(T.emerald, 0.15), border: `1px solid ${alpha(T.emerald, 0.3)}`,
                      }}>
                        <CheckCircleIcon sx={{ fontSize: 14, color: T.emerald }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: T.emerald }}>Coupon Applied!</Typography>
                        <Typography sx={{ fontSize: '0.55rem', color: T.textSub }}>Discount calculated</Typography>
                      </Box>
                    </Box>
                    <Tooltip title="Remove Coupon">
                      <IconButton onClick={handleRemoveCoupon} size="small"
                        sx={{
                          width: 22, height: 22,
                          bgcolor: alpha(T.emerald, 0.1), border: `1px solid ${alpha(T.emerald, 0.2)}`, color: T.emerald,
                          '&:hover': { bgcolor: T.redPale, borderColor: T.red, color: T.red },
                          transition: 'all 0.18s',
                        }}>
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Typography sx={{ fontSize: '0.6rem', color: T.textSub, fontStyle: 'italic', mb: 1.2, lineHeight: 1.4 }}>
                    "{appliedCoupon.description}"
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.8, mb: 1.2, flexWrap: 'wrap' }}>
                    {appliedCoupon.maxUsageCount !== "Unlimited" && appliedCoupon.remainingUses !== "Unlimited" && (
                      <Chip
                        icon={<PeopleIcon sx={{ fontSize: 12 }} />}
                        label={`${appliedCoupon.remainingUses} uses left`}
                        size="small"
                        sx={{ height: 20, fontSize: '0.5rem', bgcolor: alpha(T.emerald, 0.1) }}
                      />
                    )}
                    <Chip
                      icon={<DateRangeIcon sx={{ fontSize: 12 }} />}
                      label={`Valid until ${formatDate(appliedCoupon.validUntil)}`}
                      size="small"
                      sx={{ height: 20, fontSize: '0.5rem', bgcolor: alpha(T.emerald, 0.1) }}
                    />
                  </Box>

                  <Divider sx={{ borderColor: alpha(T.emerald, 0.15), mb: 1.2 }} />

                  <Box sx={{ display: 'flex', gap: 0.8, mb: 0.8 }}>
                    <Box sx={{ flex: 1, p: 1, borderRadius: 1.2, bgcolor: T.surface, border: `1px solid ${T.border}` }}>
                      <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, mb: 0.2 }}>Original</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: T.textSub }}>₹{appliedCoupon.originalAmount}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 1, borderRadius: 1.2, bgcolor: alpha(T.emerald, 0.06), border: `1px solid ${alpha(T.emerald, 0.15)}` }}>
                      <Typography sx={{ fontSize: '0.52rem', color: T.textMuted, mb: 0.2 }}>Discount</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: T.emerald }}>−₹{appliedCoupon.discountAmount}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    px: 1.5, py: 1, borderRadius: 1.2,
                    background: `linear-gradient(135deg, ${alpha(T.emerald, 0.1)}, ${alpha(T.emeraldLight, 0.06)})`,
                    border: `1px solid ${alpha(T.emerald, 0.25)}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: T.text }}>Final Amount</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.6 }}>
                      <Typography sx={{ fontSize: '0.6rem', color: T.textMuted, textDecoration: 'line-through' }}>
                        ₹{appliedCoupon.originalAmount}
                      </Typography>
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, color: T.emerald, letterSpacing: -0.5 }}>
                        ₹{appliedCoupon.finalAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ) : (
              <motion.div key="input"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              >
                <Box sx={{ mb: 1.8 }}>
                  <TextField
                    fullWidth size="small"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setValidationError(''); }}
                    error={!!validationError}
                    helperText={validationError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocalOfferIcon sx={{ fontSize: 15, color: alpha(T.indigo, 0.6) }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={handleValidateCoupon}
                            disabled={validationLoading || !couponCode.trim()} size="small"
                            sx={{
                              minWidth: 58, height: 26, fontSize: '0.62rem', fontWeight: 800,
                              borderRadius: 1.2,
                              background: `linear-gradient(135deg, ${T.indigo}, ${T.indigoLight})`,
                              color: 'white', letterSpacing: 0.4,
                              boxShadow: `0 3px 8px ${alpha(T.indigo, 0.28)}`,
                              '&:hover': { background: `linear-gradient(135deg, ${alpha(T.indigo, 0.85)}, ${T.indigo})` },
                              '&.Mui-disabled': { background: T.border, color: T.textMuted },
                            }}>
                            {validationLoading ? <CircularProgress size={12} sx={{ color: T.textMuted }} /> : 'Apply'}
                          </Button>
                        </InputAdornment>
                      ),
                      sx: {
                        fontSize: '0.72rem', fontWeight: 600, color: T.text,
                        bgcolor: T.surfaceAlt, borderRadius: 1.8,
                        '& input': { textTransform: 'uppercase', letterSpacing: 0.5 },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: T.border },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: T.indigoLight },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: T.indigo, boxShadow: `0 0 0 3px ${alpha(T.indigo, 0.1)}` },
                      },
                    }}
                    FormHelperTextProps={{ sx: { fontSize: '0.58rem', mt: 0.3 } }}
                  />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {!appliedCoupon && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <DiscountIcon sx={{ fontSize: 12, color: T.indigo }} />
                  <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: T.textSub, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                    Available Coupons
                  </Typography>
                </Box>
                {availableCoupons.length > 0 && (
                  <Box sx={{
                    px: 0.7, py: 0.15, borderRadius: 0.8,
                    bgcolor: T.indigoPale, border: `1px solid ${alpha(T.indigo, 0.2)}`,
                  }}>
                    <Typography sx={{ fontSize: '0.52rem', fontWeight: 700, color: T.indigo }}>
                      {availableCoupons.length} available
                    </Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{
                maxHeight: 220, overflowY: 'auto', pr: 0.3,
                '&::-webkit-scrollbar': { width: 2 },
                '&::-webkit-scrollbar-thumb': { bgcolor: T.border, borderRadius: 2 },
              }}>
                {couponsLoading ? (
                  <CouponSkeleton />
                ) : fetchError || error ? (
                  <Box sx={{ p: 2.5, textAlign: 'center', borderRadius: 1.8, border: `1px dashed ${alpha(T.red, 0.3)}`, bgcolor: T.redPale }}>
                    <ErrorIcon sx={{ fontSize: 28, color: alpha(T.red, 0.4), mb: 0.8 }} />
                    <Typography sx={{ fontSize: '0.68rem', color: T.textSub, mb: 1.2 }}>Failed to load coupons</Typography>
                    <Button size="small" onClick={() => { setFetchError(false); dispatch(getAllCoupons({ status: 'active', limit: 50 })); }}
                      sx={{ fontSize: '0.58rem', borderRadius: 1.2, border: `1px solid ${alpha(T.red, 0.3)}`, color: T.red, '&:hover': { bgcolor: alpha(T.red, 0.06) } }}>
                      Retry
                    </Button>
                  </Box>
                ) : availableCoupons.length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                    {availableCoupons.map((coupon) => (
                      <CouponCard key={coupon._id} coupon={coupon}
                        onUse={handleUseCoupon}
                        onCopy={handleCopyCode}
                        copiedCode={copiedCode}
                        isEligible={true}
                        isApplying={applyingCode === coupon.code}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ p: 2.5, textAlign: 'center', borderRadius: 1.8, border: `1px dashed ${T.border}`, bgcolor: T.surfaceAlt }}>
                    <LocalOfferIcon sx={{ fontSize: 30, color: T.textMuted, mb: 0.8 }} />
                    <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: T.textSub, mb: 0.2 }}>No coupons available</Typography>
                    <Typography sx={{ fontSize: '0.58rem', color: T.textMuted }}>No active coupons for this plan</Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ mt: 1.8, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
                <Typography sx={{ fontSize: '0.55rem', fontWeight: 700, color: T.textMuted, letterSpacing: 0.8 }}>OR</Typography>
                <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
              </Box>

              <Button fullWidth onClick={handleDirectPayment} disabled={isDirectPayment}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
                sx={{
                  mt: 1.2, py: 0.9, borderRadius: 1.8,
                  border: `1px dashed ${T.borderStrong}`,
                  color: T.textSub, fontSize: '0.65rem', fontWeight: 600,
                  bgcolor: 'transparent',
                  '&:hover': { border: `1px dashed ${T.indigo}`, bgcolor: T.indigoPale, color: T.indigo },
                  transition: 'all 0.18s ease',
                }}>
                Continue without coupon — ₹{planPrice}
              </Button>
            </motion.div>
          )}

          {validationError && !appliedCoupon && (
            <Fade in>
              <Box sx={{
                mt: 1.2, px: 1, py: 0.7, borderRadius: 1.2,
                bgcolor: T.redPale, border: `1px solid ${alpha(T.red, 0.25)}`,
                display: 'flex', alignItems: 'center', gap: 0.5,
              }}>
                <ErrorIcon sx={{ fontSize: 12, color: T.red }} />
                <Typography sx={{ fontSize: '0.6rem', color: T.red }}>{validationError}</Typography>
              </Box>
            </Fade>
          )}

          {reduxValidationError && !appliedCoupon && !validationError && (
            <Fade in>
              <Box sx={{
                mt: 1.2, px: 1, py: 0.7, borderRadius: 1.2,
                bgcolor: T.redPale, border: `1px solid ${alpha(T.red, 0.25)}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ErrorIcon sx={{ fontSize: 12, color: T.red }} />
                  <Typography sx={{ fontSize: '0.6rem', color: T.red }}>
                    {reduxValidationError.message || 'Invalid coupon'}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => dispatch(clearValidationResult())}
                  sx={{ p: 0.2, color: alpha(T.red, 0.5), '&:hover': { color: T.red } }}>
                  <CloseIcon sx={{ fontSize: 10 }} />
                </IconButton>
              </Box>
            </Fade>
          )}
        </Box>
      </DialogContent>

      <Box sx={{
        px: 2, py: 1.5,
        borderTop: `1px solid ${T.border}`,
        display: 'flex', gap: 0.8,
        bgcolor: T.surfaceAlt,
      }}>
        <Button fullWidth onClick={onClose}
          sx={{
            py: 0.8, borderRadius: 1.8, fontSize: '0.68rem', fontWeight: 700,
            border: `1px solid ${T.border}`, color: T.textSub,
            '&:hover': { bgcolor: T.border, color: T.text },
          }}>
          Cancel
        </Button>

        {appliedCoupon && (
          <motion.div style={{ flex: 1 }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button fullWidth onClick={handleApplyCoupon}
              startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
              sx={{
                py: 0.8, borderRadius: 1.8, fontSize: '0.68rem', fontWeight: 800,
                background: `linear-gradient(135deg, ${T.emerald}, ${T.emeraldLight})`,
                color: 'white',
                boxShadow: `0 4px 14px -3px ${alpha(T.emerald, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(T.emerald, 0.9)}, ${T.emeraldLight})`,
                  boxShadow: `0 6px 18px -3px ${alpha(T.emerald, 0.45)}`,
                },
              }}>
              Pay ₹{appliedCoupon.finalAmount}
            </Button>
          </motion.div>
        )}
      </Box>
    </Dialog>
  );
};

export default CouponPopup;