import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, Building, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { EMAILJS_CONFIG, validateEmailJSConfig } from '../config/emailjs';
import { playClickSound } from '../utils/playSound';
import { analytics } from '../utils/analytics';
import { AnimatedToast } from './AnimatedToast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const sendUserAutoResponse = async (data: ContactFormData): Promise<boolean> => {
    try {
      // Validate EmailJS configuration
      if (!validateEmailJSConfig()) {
        console.error('EmailJS configuration incomplete');
        return false;
      }

      const templateParams = {
        to_name: data.name,
        to_email: data.email,  // Send to user's email
        from_name: "Divyansh Dubey",
        from_email: "divyanshhdubey10@gmail.com",
        subject: "Thank you for contacting Divyansh Dubey",
        user_message: data.message,  // Original message from user
        user_subject: data.subject,  // Original subject from user
        phone: data.phone || "",
        company: data.company || "",
        date: new Date().toLocaleString()
      };

      // Send auto-response email to user
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.SERVICE_ID,
          template_id: EMAILJS_CONFIG.USER_TEMPLATE_ID,
          user_id: EMAILJS_CONFIG.PUBLIC_KEY,
          template_params: templateParams
        })
      });

      return response.ok;
    } catch (error) {
      console.error('EmailJS user auto-response error:', error);
      return false;
    }
  };

  const sendAdminNotification = async (data: ContactFormData): Promise<boolean> => {
    try {
      // Validate EmailJS configuration
      if (!validateEmailJSConfig()) {
        console.error('EmailJS configuration incomplete');
        return false;
      }

      const templateParams = {
        from_name: "Portfolio Contact Form",
        from_email: "divyanshhdubey10@gmail.com",
        user_name: data.name,
        user_email: data.email,
        user_phone: data.phone || "Not provided",
        user_company: data.company || "Not provided",
        user_subject: data.subject,
        user_message: data.message,
        date: new Date().toLocaleString()
      };

      // Send notification email to admin
      const requestBody = {
        service_id: EMAILJS_CONFIG.SERVICE_ID,
        template_id: EMAILJS_CONFIG.ADMIN_TEMPLATE_ID,
        user_id: EMAILJS_CONFIG.PUBLIC_KEY,
        template_params: templateParams
      };

      console.log('📧 Admin Email Request:', requestBody);

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📧 Admin Email Response:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('📧 Admin Email Error:', errorText);
      }

      return response.ok;
    } catch (error) {
      console.error('EmailJS admin notification error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      playClickSound();
      toast.custom(
        <AnimatedToast
          message="Please fix the errors in the form"
          icon="⚠️"
          type="error"
        />, { duration: 4000 }
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Remove backend API call. Only send emails via EmailJS.
      // await fetch('http://localhost:8000/api/contact/submit', { ... });

      // Send notification email to admin
      const adminSuccess = await sendAdminNotification(formData);
      // Send auto-response to user
      const userSuccess = await sendUserAutoResponse(formData);

      if (adminSuccess && userSuccess) {
        analytics.trackContactSubmission();
        toast.custom(
          <AnimatedToast
            message="Message sent successfully!"
            icon={<CheckCircle className="text-green-400" />}
            type="success"
          />, { duration: 4000 }
        );
        setFormData({ name: '', email: '', subject: '', message: '', phone: '', company: '' });
      } else {
        toast.custom(
          <AnimatedToast
            message="Failed to send message. Please try again later."
            icon={<AlertCircle className="text-red-400" />}
            type="error"
          />, { duration: 4000 }
        );
      }
    } catch (error) {
      toast.custom(
        <AnimatedToast
          message="An error occurred. Please try again."
          icon={<AlertCircle className="text-red-400" />}
          type="error"
        />, { duration: 4000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-cyan-500 dark:focus:border-transparent dark:placeholder-gray-400";
  const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 ${className}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <MessageSquare className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Get In Touch
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Have a question or want to work together? Send me a message!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`${inputClasses} pl-10 ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <div className={errorClasses}>
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${inputClasses} pl-10 ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <div className={errorClasses}>
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${inputClasses} pl-10`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Company Field */}
          <div className="relative">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`${inputClasses} pl-10`}
                placeholder="Your company name"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Subject Field */}
        <div className="relative">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`${inputClasses} ${errors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
          {errors.subject && (
            <div className={errorClasses}>
              <AlertCircle className="w-4 h-4" />
              {errors.subject}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="relative">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className={`${inputClasses} resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300'}`}
            placeholder="Tell me about your project, question, or collaboration idea..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <div className={errorClasses}>
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            * Required fields
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary inline-flex items-center gap-2 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {!isSubmitting && Object.keys(errors).length === 0 && formData.name && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Form looks good! Ready to send.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm; 