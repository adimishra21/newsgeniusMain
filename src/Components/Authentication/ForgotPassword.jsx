import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Box, Typography, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../config/api.config';
import { createConsoleDisplay, getPasswordResetLinks } from '../../utils/consoleCapture';
import './Auth.css';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [resetLink, setResetLink] = useState('');

  // Initialize console capture on component mount
  useEffect(() => {
    createConsoleDisplay();
  }, []);

  // Periodically check for reset links in development mode
  useEffect(() => {
    if (!emailSent || process.env.NODE_ENV !== 'development') {
      return;
    }

    const checkForLinks = () => {
      const links = getPasswordResetLinks();
      if (links.length > 0) {
        setResetLink(links[links.length - 1]); // Get the most recent link
      }
    };

    // Check immediately
    checkForLinks();
    
    // Then check periodically
    const interval = setInterval(checkForLinks, 1000);
    
    return () => clearInterval(interval);
  }, [emailSent]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError('');
        setSuccess('');
        setEmailSent(false);
        setResetLink('');
        console.log('Submitting forgot password request with email:', values.email);
        
        const response = await authAPI.requestPasswordReset({
          email: values.email
        });
        
        console.log('Password reset request response:', response);

        // Show success message
        setSuccess('Password reset instructions have been sent to your email address.');
        setEmailSent(true);
        
        // Clear form
        formik.resetForm();
      } catch (err) {
        console.error('Password reset request error:', err);
        
        let errorMessage = 'Password reset request failed. Please try again.';
        
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter your email address below and we'll send you instructions to reset your password.
        </Typography>
        
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" className="mb-4">
            {success}
          </Alert>
        )}

        {emailSent && process.env.NODE_ENV === 'development' && resetLink && (
          <Alert severity="info" className="mb-4">
            <Typography variant="body2" fontWeight="bold">
              Development Mode Only
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Use this link to reset your password:
            </Typography>
            <Box 
              sx={{ 
                mt: 1, 
                p: 1, 
                bgcolor: 'rgba(0, 0, 0, 0.04)', 
                borderRadius: 1,
                wordBreak: 'break-all'
              }}
            >
              <Link 
                href={resetLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {resetLink}
              </Link>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              This direct link is only shown in development mode.
            </Typography>
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="submit-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Sending...' : 'Reset Password'}
          </Button>
          
          <Box mt={2}>
            <Button 
              color="primary" 
              onClick={() => navigate('/auth')}
              sx={{ textTransform: 'none' }}
            >
              Back to Login
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 