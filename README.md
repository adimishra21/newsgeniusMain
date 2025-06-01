# NewsGenius

## Overview
NewsGenius is a modern news application that allows users to explore news articles based on various categories, tags, and locations.

## Features
- Authentication system with login, signup, and forgot password functionality
- Location-based news search
- Trending news categories and tags
- Multi-language support

## Setting Up Email Functionality for Password Resets

The application uses EmailJS (@emailjs/browser) for sending password reset emails. To configure this functionality:

1. **Create an EmailJS Account**:
   - Go to [EmailJS](https://www.emailjs.com/) and create an account
   - Verify your email address

2. **Create an Email Service**:
   - In the EmailJS dashboard, go to "Email Services"
   - Connect your preferred email service (Gmail, Outlook, etc.)
   - Follow the provider-specific instructions to set up your service

3. **Create an Email Template**:
   - Go to "Email Templates" in the EmailJS dashboard
   - Create a new template for password reset emails
   - Include these parameters in your template:
     - `{{to_email}}`: The recipient's email address
     - `{{reset_link}}`: The password reset link
     - `{{from_name}}`: The name of the sender (NewsGenius)
   - Sample template content:
     ```
     Subject: Reset Your NewsGenius Password

     Hello,

     We received a request to reset your password for NewsGenius. 
     To reset your password, click on the link below:

     {{reset_link}}

     If you did not request a password reset, please ignore this email.

     This link will expire in 1 hour.

     Thanks,
     The {{from_name}} Team
     ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the project root based on `.env.example`
   - Add your EmailJS credentials:
     ```
     REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
     REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
     REACT_APP_EMAILJS_RESET_TEMPLATE_ID=your_emailjs_template_id
     ```

5. **Test Email Functionality**:
   - Start the application with `npm start`
   - Navigate to the forgot password page
   - Enter your email address and submit
   - Check your email for the reset link

### Development Mode Email Handling

In development mode, if EmailJS is not configured, the application will:
1. Log the reset link to the console
2. Display the reset link directly on the forgot password page

This allows for testing the password reset flow without requiring actual email delivery.

## Installation and Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create environment variables in `.env` file (see above for email configuration)
4. Start the development server:
   ```
   npm start
   ```

## Technologies Used
- React
- Material-UI
- EmailJS (@emailjs/browser) for password reset emails
- GNews API (for news content)
- Local Storage (for user data)

## License
[MIT License](LICENSE)
