
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate EmailJS or Netlify forms
    setSent(true);
  };

  return (
    <div className="container mx-auto px-8 py-24">
      <motion.h2
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.h2>
      {sent ? (
        <p className="text-accent text-lg">Thanks! I'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
          <input
            type="text"
            required
            placeholder="Name"
            className="bg-secondary rounded-lg p-3 focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="bg-secondary rounded-lg p-3 focus:outline-none"
          />
          <textarea
            required
            placeholder="Message"
            rows="5"
            className="bg-secondary rounded-lg p-3 focus:outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-accent text-primary font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            Send
          </motion.button>
        </form>
      )}
    </div>
  );
}
