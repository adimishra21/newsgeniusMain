import emailjs from '@emailjs/browser';

// Initialize EmailJS with your user ID
// You should create a .env file with these values
const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID || 'your_emailjs_user_id';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_emailjs_service_id';
const EMAILJS_RESET_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_RESET_TEMPLATE_ID || 'your_emailjs_template_id';

/**
 * Send a password reset email
 * @param {string} toEmail - Recipient email address
 * @param {string} resetLink - Password reset link
 * @returns {Promise} - Promise that resolves when the email is sent
 */
export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  try {
    const templateParams = {
      to_email: toEmail,
      reset_link: resetLink,
      from_name: 'NewsGenius',
    };

    console.log('Sending password reset email to:', toEmail);
    console.log('Reset link:', resetLink);
    
    // In development or when EmailJS credentials aren't set up, 
    // we'll just log the email info instead of actually sending
    if (!EMAILJS_USER_ID || EMAILJS_USER_ID === 'your_emailjs_user_id') {
      console.log('EmailJS not configured. In a production environment, an email would be sent with these parameters:', templateParams);
      return Promise.resolve({ status: 'success', message: 'Email would be sent in production.' });
    }
    
    // Initialize EmailJS with user ID
    emailjs.init(EMAILJS_USER_ID);
    
    // Send the email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_RESET_TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
};

export default sendPasswordResetEmail; 