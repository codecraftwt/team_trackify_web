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
  Slide,
  Skeleton,
  Fade,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  LocalOfferRounded as LocalOfferIcon,
  CheckCircleRounded as CheckCircleIcon,
  ErrorOutlineRounded as ErrorIcon,
  ContentCopyRounded as ContentCopyIcon,
  PercentRounded as PercentIcon,
  CurrencyRupeeRounded as CurrencyRupeeIcon,
  BoltRounded as BoltIcon,
  DiscountRounded as DiscountIcon,
  AutoAwesomeRounded as AutoAwesomeIcon,
  ArrowForwardRounded as ArrowForwardIcon,
  CalendarTodayRounded as DateRangeIcon,
  PeopleRounded as PeopleIcon,
  ConfirmationNumberRounded as TicketIcon,
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

// Design tokens aligned with the application navy theme
const T = {
  primary: '#102c4a',
  primaryDark: '#0b2138',
  primaryHover: '#1e4f7a',
  primaryLight: '#3088c7',
  primaryPale: '#eef4fa',
  primaryAlpha: (o = 0.1) => `rgba(16, 44, 74, ${o})`,

  emerald: '#16a34a',
  emeraldDark: '#15803d',
  emeraldLight: '#22c55e',
  emeraldPale: '#f0fdf4',
  emeraldBorder: '#bbf7d0',

  gold: '#d97706',
  goldPale: '#fffbeb',
  goldBorder: '#fde68a',

  red: '#dc2626',
  redPale: '#fef2f2',
  redBorder: '#fecaca',

  surface: '#ffffff',
  surfaceAlt: '#f8fafc',
  border: '#e2e8f0',
  borderStrong: '#cbd5e1',
  text: '#0f172a',
  textSub: '#475569',
  textMuted: '#64748b',
};

// Safe Icon Component
const SafeIcon = ({ icon: Icon, sx, fontSize, color, ...props }) => {
  if (!Icon) return null;
  const safeSx = sx && typeof sx === 'object' ? sx : {};
  return <Icon sx={safeSx} fontSize={fontSize || 'medium'} color={color} {...props} />;
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (error) {
    return '';
  }
};

// Helper to check if coupon is about to expire (within 7 days)
const isExpiringSoon = (endDate) => {
  if (!endDate) return false;
  try {
    const now = new Date();
    const end = new Date(endDate);
    if (isNaN(end.getTime())) return false;
    const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  } catch (error) {
    return false;
  }
};

// CouponSkeleton
const CouponSkeleton = () => (
  <Stack spacing={1.2}>
    {[1, 2, 3].map((item) => (
      <Box
        key={item}
        sx={{
          p: 1.8,
          borderRadius: '14px',
          border: `1px solid ${T.border}`,
          bgcolor: T.surfaceAlt,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Skeleton variant="rounded" width={90} height={26} sx={{ borderRadius: '8px' }} />
          <Skeleton variant="rounded" width={65} height={24} sx={{ borderRadius: '8px' }} />
        </Box>
        <Skeleton variant="text" width="75%" height={16} />
        <Box sx={{ display: 'flex', gap: 1.2, mt: 1 }}>
          <Skeleton variant="rounded" width={60} height={18} sx={{ borderRadius: '6px' }} />
          <Skeleton variant="rounded" width={80} height={18} sx={{ borderRadius: '6px' }} />
        </Box>
      </Box>
    ))}
  </Stack>
);

// CouponCard Component
const CouponCard = ({ coupon, onUse, onCopy, copiedCode, isEligible, isApplying }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!coupon || typeof coupon !== 'object') return null;

  const discountType = coupon.discountType || 'fixed';
  const discountValue = coupon.discountValue || 0;
  const code = coupon.code || '';
  const description = coupon.description || 'No description';
  const minAmount = coupon.minAmount || 0;
  const endDate = coupon.endDate;
  const maxUsageCount = coupon.maxUsageCount;
  const usedCount = coupon.usedCount || 0;

  if (!code) return null;

  const isPercent = discountType === 'percentage';
  const isPopular = discountValue >= 20 && isPercent;
  const expiringSoon = isExpiringSoon(endDate);
  const isUnlimited = maxUsageCount === null || maxUsageCount === undefined;
  const remainingUses = !isUnlimited ? maxUsageCount - usedCount : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => isEligible && !isApplying && onUse(code)}
        sx={{
          p: 1.8,
          borderRadius: '14px',
          border: '1.5px solid',
          borderColor: isHovered && isEligible ? T.primary : T.border,
          bgcolor: isHovered && isEligible ? T.primaryPale : T.surface,
          cursor: isEligible ? (isApplying ? 'wait' : 'pointer') : 'not-allowed',
          opacity: isEligible ? 1 : 0.55,
          transition: 'all 0.2s ease',
          boxShadow: isHovered && isEligible ? `0 6px 18px -4px ${T.primaryAlpha(0.12)}` : 'none',
          transform: isHovered && isEligible && !isApplying ? 'translateY(-2px)' : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isApplying && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(3px)',
              zIndex: 3,
            }}
          >
            <CircularProgress size={22} sx={{ color: T.primary }} />
          </Box>
        )}

        {/* Header: Code & Discount Badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Code Pill */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.7,
                px: 1.2,
                py: 0.4,
                borderRadius: '8px',
                bgcolor: isHovered ? '#ffffff' : T.primaryPale,
                border: `1.5px dashed ${T.primary}`,
              }}
            >
              <TicketIcon sx={{ fontSize: 15, color: T.primary }} />
              <Typography
                sx={{
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: T.primary,
                  letterSpacing: '0.04em',
                }}
              >
                {code}
              </Typography>
            </Box>

            {/* Copy Button */}
            <Tooltip title={copiedCode === code ? 'Copied!' : 'Copy Code'}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(code);
                }}
                sx={{
                  width: 26,
                  height: 26,
                  color: copiedCode === code ? T.emerald : T.textMuted,
                  bgcolor: copiedCode === code ? T.emeraldPale : 'transparent',
                  '&:hover': { color: T.primary, bgcolor: T.primaryAlpha(0.08) },
                }}
              >
                <ContentCopyIcon sx={{ fontSize: 13 }} />
              </IconButton>
            </Tooltip>

            {/* Tags (Hot / Expiring) */}
            {isPopular && (
              <Chip
                icon={<BoltIcon sx={{ fontSize: '13px !important', color: `${T.gold} !important` }} />}
                label="HOT"
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  bgcolor: T.goldPale,
                  color: T.gold,
                  border: `1px solid ${T.goldBorder}`,
                }}
              />
            )}

            {expiringSoon && !isPopular && (
              <Chip
                label="Expiring Soon"
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  bgcolor: T.goldPale,
                  color: T.gold,
                  border: `1px solid ${T.goldBorder}`,
                }}
              />
            )}
          </Box>

          {/* Discount Badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.4,
              px: 1.2,
              py: 0.4,
              borderRadius: '8px',
              bgcolor: T.emeraldPale,
              border: `1px solid ${T.emeraldBorder}`,
            }}
          >
            {isPercent ? (
              <PercentIcon sx={{ fontSize: 14, color: T.emerald }} />
            ) : (
              <CurrencyRupeeIcon sx={{ fontSize: 14, color: T.emerald }} />
            )}
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: T.emerald }}>
              {isPercent ? `${discountValue}% OFF` : `₹${discountValue} OFF`}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          sx={{
            fontSize: '0.76rem',
            color: T.textSub,
            lineHeight: 1.4,
            mb: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {description}
        </Typography>

        {/* Footer Meta Chips */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap' }}>
          {minAmount > 0 && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 0.9,
                py: 0.3,
                borderRadius: '6px',
                bgcolor: T.surfaceAlt,
                border: `1px solid ${T.border}`,
              }}
            >
              <Typography sx={{ fontSize: '0.68rem', color: T.textMuted, fontWeight: 600 }}>
                Min ₹{minAmount}
              </Typography>
            </Box>
          )}

          {!isUnlimited && remainingUses !== null && remainingUses > 0 && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.4,
                px: 0.9,
                py: 0.3,
                borderRadius: '6px',
                bgcolor: T.surfaceAlt,
                border: `1px solid ${T.border}`,
              }}
            >
              <PeopleIcon sx={{ fontSize: 12, color: T.textMuted }} />
              <Typography sx={{ fontSize: '0.68rem', color: T.textMuted, fontWeight: 600 }}>
                {remainingUses} left
              </Typography>
            </Box>
          )}

          {endDate && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.4,
                px: 0.9,
                py: 0.3,
                borderRadius: '6px',
                bgcolor: T.surfaceAlt,
                border: `1px solid ${T.border}`,
              }}
            >
              <DateRangeIcon sx={{ fontSize: 12, color: T.textMuted }} />
              <Typography sx={{ fontSize: '0.68rem', color: T.textMuted, fontWeight: 600 }}>
                Valid till {formatDate(endDate)}
              </Typography>
            </Box>
          )}

          {isEligible && isHovered && !isApplying && (
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.4 }}>
              <AutoAwesomeIcon sx={{ fontSize: 13, color: T.primary }} />
              <Typography sx={{ fontSize: '0.7rem', color: T.primary, fontWeight: 800 }}>
                Click to Apply
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

// Main CouponPopup Component
const CouponPopup = ({ open, onClose, onApplyCoupon, planPrice, planName }) => {
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
    coupons,
    loading: couponsLoading,
    error,
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
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open) {
      setFetchError(false);
      dispatch(getAllCoupons({ status: 'active', limit: 50 }))
        .unwrap()
        .catch((err) => {
          console.error('Failed to fetch coupons:', err);
          setFetchError(true);
        });
    }
  }, [dispatch, open]);

  const availableCoupons = Array.isArray(coupons)
    ? coupons.filter((c) => c && c.status === 'active' && (c.minAmount || 0) <= (planPrice || 0))
    : [];

  const doValidate = async (code) => {
    if (!code?.trim()) {
      setValidationError('Please enter a coupon code');
      return;
    }
    setValidationError('');
    const result = await dispatch(validateCoupon({ code, amount: planPrice || 0 }));
    if (validateCoupon.fulfilled.match(result)) {
      const couponData = result.payload.data;
      setAppliedCoupon(couponData);
      const savedAmount = couponData.discountAmount || 0;
      toast.success(`🎉 Coupon Applied! You saved ₹${savedAmount}`);
    } else {
      setValidationError(result.payload?.message || 'Invalid coupon code');
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
    toast.success('Code copied!');
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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '22px',
          overflow: 'hidden',
          bgcolor: T.surface,
          border: `1px solid ${T.border}`,
          boxShadow: '0 24px 48px -12px rgba(16, 44, 74, 0.2), 0 4px 16px -4px rgba(16, 44, 74, 0.08)',
          maxWidth: { xs: '92%', sm: '480px' },
          m: { xs: 1.5, sm: 2 },
        },
      }}
      sx={{
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(6px)',
          bgcolor: 'rgba(15, 23, 42, 0.45)',
        },
      }}
    >
      {/* ── Modal Header ── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 2,
          background: `linear-gradient(135deg, ${T.primaryPale} 0%, rgba(255,255,255,0.9) 100%)`,
          borderBottom: `1px solid ${T.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: T.primary,
              color: '#ffffff',
              boxShadow: `0 4px 12px ${T.primaryAlpha(0.25)}`,
            }}
          >
            <LocalOfferIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: T.text, lineHeight: 1.2 }}>
              {appliedCoupon ? 'Coupon Applied! 🎉' : 'Apply Coupon'}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: T.textMuted, mt: 0.3, fontWeight: 500 }}>
              {appliedCoupon ? 'Review your savings and proceed' : 'Enter a promo code or pick from available offers'}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            width: 32,
            height: 32,
            borderRadius: '10px',
            color: T.textMuted,
            bgcolor: '#ffffff',
            border: `1px solid ${T.border}`,
            '&:hover': { bgcolor: T.redPale, color: T.red, borderColor: T.redBorder },
          }}
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* ── Dialog Content ── */}
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        {/* Selected Plan Summary Banner */}
        <Box
          sx={{
            p: 1.8,
            mb: 2.2,
            borderRadius: '14px',
            bgcolor: T.surfaceAlt,
            border: `1px solid ${T.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.68rem',
                color: T.textMuted,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                mb: 0.3,
              }}
            >
              Selected Plan
            </Typography>
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: T.text }}>
              {planName || 'Plan'}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '0.68rem', color: T.textMuted, fontWeight: 600 }}>
              Plan Price
            </Typography>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: T.primary,
                lineHeight: 1.1,
              }}
            >
              ₹{planPrice || 0}
            </Typography>
          </Box>
        </Box>

        <AnimatePresence mode="wait">
          {appliedCoupon ? (
            /* ── Applied Coupon Success Card ── */
            <motion.div
              key="applied"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  p: 2.2,
                  mb: 2.2,
                  borderRadius: '16px',
                  bgcolor: T.emeraldPale,
                  border: `1.5px solid ${T.emeraldBorder}`,
                }}
              >
                {/* Applied Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: T.emerald }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: T.emeraldDark }}>
                        Coupon Applied ({appliedCoupon.code})
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: T.textSub }}>
                        You saved ₹{appliedCoupon.discountAmount || 0} on this purchase!
                      </Typography>
                    </Box>
                  </Box>

                  <Tooltip title="Remove Coupon">
                    <IconButton
                      onClick={handleRemoveCoupon}
                      size="small"
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#ffffff',
                        border: `1px solid ${T.emeraldBorder}`,
                        color: T.emerald,
                        '&:hover': { bgcolor: T.redPale, borderColor: T.redBorder, color: T.red },
                      }}
                    >
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Price Breakdown Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.2, mb: 1.5 }}>
                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '10px',
                      bgcolor: '#ffffff',
                      border: `1px solid ${T.border}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.68rem', color: T.textMuted, fontWeight: 600, mb: 0.2 }}>
                      Original Amount
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: T.text }}>
                      ₹{appliedCoupon.originalAmount || 0}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 1.2,
                      borderRadius: '10px',
                      bgcolor: '#ffffff',
                      border: `1px solid ${T.emeraldBorder}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.68rem', color: T.emerald, fontWeight: 700, mb: 0.2 }}>
                      Discount Savings
                    </Typography>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: T.emerald }}>
                      −₹{appliedCoupon.discountAmount || 0}
                    </Typography>
                  </Box>
                </Box>

                {/* Final Payable Box */}
                <Box
                  sx={{
                    px: 1.8,
                    py: 1.2,
                    borderRadius: '12px',
                    bgcolor: '#ffffff',
                    border: `1.5px solid ${T.emerald}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: T.text }}>
                    Final Payable Amount
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
                    <Typography sx={{ fontSize: '0.8rem', color: T.textMuted, textDecoration: 'line-through' }}>
                      ₹{appliedCoupon.originalAmount || 0}
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 900, color: T.emerald }}>
                      ₹{appliedCoupon.finalAmount || 0}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ) : (
            /* ── Coupon Code Input Box ── */
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: T.text, mb: 0.8 }}>
                  Have a Promo Code?
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter code (e.g. SAVE20)"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value.toUpperCase());
                    setValidationError('');
                  }}
                  error={!!validationError}
                  helperText={validationError}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferIcon sx={{ fontSize: 18, color: T.primary }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={handleValidateCoupon}
                          disabled={validationLoading || !couponCode.trim()}
                          size="small"
                          sx={{
                            minWidth: 70,
                            height: 32,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            borderRadius: '8px',
                            bgcolor: T.primary,
                            color: '#ffffff',
                            textTransform: 'none',
                            '&:hover': { bgcolor: T.primaryHover },
                            '&.Mui-disabled': { bgcolor: T.border, color: T.textMuted },
                          }}
                        >
                          {validationLoading ? <CircularProgress size={14} sx={{ color: '#ffffff' }} /> : 'Apply'}
                        </Button>
                      </InputAdornment>
                    ),
                    sx: {
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: T.text,
                      borderRadius: '12px',
                      '& input': { textTransform: 'uppercase', letterSpacing: '0.04em' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: T.border },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: T.primary },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: T.primary, borderWidth: '1.5px' },
                    },
                  }}
                  FormHelperTextProps={{ sx: { fontSize: '0.72rem', mt: 0.4 } }}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Available Coupons Section (when no coupon is currently applied) ── */}
        {!appliedCoupon && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <DiscountIcon sx={{ fontSize: 16, color: T.primary }} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: T.text }}>
                  Available Offers
                </Typography>
              </Box>
              {availableCoupons.length > 0 && (
                <Chip
                  label={`${availableCoupons.length} Offers`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    bgcolor: T.primaryPale,
                    color: T.primary,
                  }}
                />
              )}
            </Box>

            <Box
              sx={{
                maxHeight: 250,
                overflowY: 'auto',
                pr: 0.4,
                '&::-webkit-scrollbar': { width: 4 },
                '&::-webkit-scrollbar-thumb': { bgcolor: T.borderStrong, borderRadius: 2 },
              }}
            >
              {couponsLoading ? (
                <CouponSkeleton />
              ) : fetchError || error ? (
                <Box
                  sx={{
                    p: 2.5,
                    textAlign: 'center',
                    borderRadius: '14px',
                    border: `1px dashed ${T.redBorder}`,
                    bgcolor: T.redPale,
                  }}
                >
                  <ErrorIcon sx={{ fontSize: 28, color: T.red, mb: 0.6 }} />
                  <Typography sx={{ fontSize: '0.8rem', color: T.textSub, mb: 1 }}>
                    Failed to load coupons
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setFetchError(false);
                      dispatch(getAllCoupons({ status: 'active', limit: 50 }));
                    }}
                    sx={{
                      fontSize: '0.72rem',
                      borderRadius: '8px',
                      color: T.red,
                      borderColor: T.redBorder,
                      textTransform: 'none',
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              ) : availableCoupons.length > 0 ? (
                <Stack spacing={1.2}>
                  {availableCoupons.map((coupon) =>
                    coupon && coupon.code ? (
                      <CouponCard
                        key={coupon._id}
                        coupon={coupon}
                        onUse={handleUseCoupon}
                        onCopy={handleCopyCode}
                        copiedCode={copiedCode}
                        isEligible={true}
                        isApplying={applyingCode === coupon.code}
                      />
                    ) : null
                  )}
                </Stack>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '14px',
                    border: `1px dashed ${T.border}`,
                    bgcolor: T.surfaceAlt,
                  }}
                >
                  <LocalOfferIcon sx={{ fontSize: 32, color: T.textMuted, mb: 0.8 }} />
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: T.textSub, mb: 0.2 }}>
                    No Coupons Available
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: T.textMuted }}>
                    There are no active coupons matching this plan at this time.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Direct Continue Button */}
            <Button
              fullWidth
              onClick={handleDirectPayment}
              disabled={isDirectPayment}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              sx={{
                mt: 2,
                py: 1.1,
                borderRadius: '12px',
                border: `1.5px solid ${T.primary}`,
                color: T.primary,
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'none',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: T.primaryPale,
                  borderColor: T.primary,
                },
              }}
            >
              Continue without coupon — ₹{planPrice || 0}
            </Button>
          </Box>
        )}
      </DialogContent>

      {/* ── Dialog Footer ── */}
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: 2,
          borderTop: `1px solid ${T.border}`,
          display: 'flex',
          gap: 1.2,
          bgcolor: T.surfaceAlt,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{
            py: 1,
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 700,
            borderColor: T.border,
            color: T.textSub,
            textTransform: 'none',
            '&:hover': { bgcolor: '#ffffff', borderColor: T.borderStrong, color: T.text },
          }}
        >
          Cancel
        </Button>

        {appliedCoupon && (
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyCoupon}
            startIcon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            sx={{
              py: 1,
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 800,
              bgcolor: T.emerald,
              color: '#ffffff',
              textTransform: 'none',
              boxShadow: `0 4px 14px ${alpha(T.emerald, 0.3)}`,
              '&:hover': {
                bgcolor: T.emeraldDark,
              },
            }}
          >
            Pay ₹{appliedCoupon.finalAmount || 0}
          </Button>
        )}
      </Box>
    </Dialog>
  );
};

export default CouponPopup;