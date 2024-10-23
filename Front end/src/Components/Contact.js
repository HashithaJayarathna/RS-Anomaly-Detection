import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here

    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-purple-500 min-h-screen min-h-screen p-4 bg-gray-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-base font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-center mt-4">
              Your message has been sent successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
