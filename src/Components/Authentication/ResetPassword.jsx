import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { authAPI } from '../../config/api.config';
import './Auth.css';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Get token from URL search params if not in the URL path
  const queryToken = new URLSearchParams(location.search).get('token');
  const resetToken = token || queryToken;

  useEffect(() => {
    // Validate token when component mounts
    if (!resetToken) {
      setError('Invalid or missing reset token. Please request a new password reset link.');
    }
  }, [resetToken]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!resetToken) {
          setError('Invalid or missing reset token. Please request a new password reset link.');
          return;
        }
        
        setError('');
        setSuccess('');
        console.log('Submitting password reset with token:', resetToken);
        
        const response = await authAPI.resetPassword({
          token: resetToken,
          password: values.password
        });
        
        console.log('Password reset response:', response);

        // Show success message
        setSuccess('Your password has been reset successfully. You can now login with your new password.');
        
        // Redirect to login after a few seconds
        setTimeout(() => {
          navigate('/auth');
        }, 3000);
      } catch (err) {
        console.error('Password reset error:', err);
        
        let errorMessage = 'Password reset failed. Please try again.';
        
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
        <h2>Reset Your Password</h2>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter your new password below.
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

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="New Password"
            variant="outlined"
            margin="normal"
            type="password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            variant="outlined"
            margin="normal"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="submit-button"
            disabled={formik.isSubmitting || !resetToken}
          >
            {formik.isSubmitting ? 'Resetting...' : 'Set New Password'}
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

export default ResetPassword; 