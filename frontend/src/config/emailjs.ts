// EmailJS Configuration
// These values should be set in your environment variables
// For development, you can set them in your .env file

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_lhjkvj7',
  USER_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_USER_TEMPLATE_ID || 'template_smi0e0d',
  ADMIN_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID || 'template_s3obfhm',
  PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'KqUXMuNmwcbk4P3r3',
};

// Validate configuration
export const validateEmailJSConfig = () => {
  const required = [
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.USER_TEMPLATE_ID,
    EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
    EMAILJS_CONFIG.PUBLIC_KEY,
  ];
  
  const missing = required.filter(value => !value || value.includes('xxxxx'));
  
  if (missing.length > 0) {
    console.warn('⚠️ EmailJS configuration incomplete. Please set environment variables:');
    console.warn('REACT_APP_EMAILJS_SERVICE_ID');
    console.warn('REACT_APP_EMAILJS_USER_TEMPLATE_ID');
    console.warn('REACT_APP_EMAILJS_ADMIN_TEMPLATE_ID');
    console.warn('REACT_APP_EMAILJS_PUBLIC_KEY');
    return false;
  }
  
  return true;
}; 