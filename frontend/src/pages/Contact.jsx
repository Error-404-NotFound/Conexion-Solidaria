import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic goes here (e.g., API call)
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' }); // Clear form after submission
  };

  return (
    <div className="contact-container p-6 max-w-lg mx-auto my-10 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
      <p className="text-gray-600 mb-6 text-center">
        Have questions about how you can help or need assistance? Fill out the form below and we’ll respond promptly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
