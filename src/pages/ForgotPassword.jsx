import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Card,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // Simulate API call to send reset email
      await new Promise((resolve) => setTimeout(resolve, 1400));

      // console.log('Password reset requested for:', data.email);

      // In real app → call your backend endpoint (POST /forgot-password or /reset-password-request)
      // Backend should:
      // 1. Verify email exists
      // 2. Generate reset token
      // 3. Send email with reset link

      // For demo: show success message
      setSuccess(true);
    } catch (err) {
      setError('Unable to process request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Team Trackify</span>
          </Link>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Reset Your Password
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Enter your email and we'll send you a link to reset your password
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 shadow-xl">
            {error && (
              <Alert severity="error" className="mb-6">
                {error}
              </Alert>
            )}

            {success ? (
              <div className="text-center py-4">
                <Alert severity="success" className="mb-6">
                  Password reset link has been sent to your email!
                </Alert>
                <Typography variant="body2" className="text-gray-600 mb-6">
                  Please check your inbox (and spam/junk folder). The link will expire in 1 hour.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/login')}
                  fullWidth
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  autoFocus
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    endIcon={<SendIcon />}
                    className="bg-primary-600 hover:bg-primary-700 py-3"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </motion.div>
              </form>
            )}

            <Divider className="my-6" />

            <div className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </Typography>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;