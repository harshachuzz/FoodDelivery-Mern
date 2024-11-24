// src/components/EnhancedContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    contactMethod: 'Email',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } else {
      setFormErrors(errors);
      setSubmitted(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="enhanced-contact-form">
      <h2>Contact Us</h2>
      {submitted && <p className="success-message">Thank you for your inquiry! We will get back to you soon.</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <p className="error-message">{formErrors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email ? 'error' : ''}
          />
          {formErrors.email && <p className="error-message">{formErrors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={formErrors.phone ? 'error' : ''}
          />
          {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="inquiryType">Inquiry Type</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Order Issue">Order Issue</option>
            <option value="Feedback">Feedback</option>
            <option value="Support">Support</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Contact Method</label>
          <div>
            <input
              type="radio"
              id="contactEmail"
              name="contactMethod"
              value="Email"
              checked={formData.contactMethod === 'Email'}
              onChange={handleChange}
            />
            <label htmlFor="contactEmail">Email</label>

            <input
              type="radio"
              id="contactPhone"
              name="contactMethod"
              value="Phone"
              checked={formData.contactMethod === 'Phone'}
              onChange={handleChange}
            />
            <label htmlFor="contactPhone">Phone</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={formErrors.message ? 'error' : ''}
          ></textarea>
          {formErrors.message && <p className="error-message">{formErrors.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;









// // src/components/ContactForm.js
// import React, { useState } from 'react';
// import './ContactForm.css';

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name) errors.name = 'Name is required';
//     if (!formData.email) errors.email = 'Email is required';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
//     if (!formData.message) errors.message = 'Message is required';
//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length === 0) {
//       setSubmitted(true);
//       console.log('Form submitted:', formData);
//       // Add your form submission logic here (e.g., API call)
//     } else {
//       setFormErrors(errors);
//       setSubmitted(false);
//     }
//   };

//   return (
//     <div className="contact-form">
//       <h2>Contact Us</h2>
//       {submitted && <p className="success-message">Thank you for reaching out! We'll get back to you soon.</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className={formErrors.name ? 'error' : ''}
//           />
//           {formErrors.name && <p className="error-message">{formErrors.name}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={formErrors.email ? 'error' : ''}
//           />
//           {formErrors.email && <p className="error-message">{formErrors.email}</p>}
//         </div>
//         <div className="form-group">
//           <label htmlFor="message">Message</label>
//           <textarea
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             className={formErrors.message ? 'error' : ''}
//           />
//           {formErrors.message && <p className="error-message">{formErrors.message}</p>}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;
