import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We will get back to you soon.",
      timer: 2500,
      showConfirmButton: false,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <motion.div
        className="max-w-[1400px] mx-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center mb-14"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-purple-700 relative inline-block">
            Contact Us
            <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="flex flex-col justify-center bg-white rounded-2xl shadow-md p-8 space-y-8"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Have any questions or suggestions? Feel free to reach out to us.
              We’re always happy to hear from you and will respond as soon as
              possible.
            </p>

            <div className="space-y-5 mt-6">
              <motion.div
                className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition"
                whileHover={{ scale: 1.02 }}
              >
                <FaEnvelope className="text-purple-600 text-2xl" />
                <p className="text-gray-700 font-medium">
                  contact@learnloop.com
                </p>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition"
                whileHover={{ scale: 1.02 }}
              >
                <FaPhoneAlt className="text-purple-600 text-2xl" />
                <p className="text-gray-700 font-medium">+880 1234 567890</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition"
                whileHover={{ scale: 1.02 }}
              >
                <FaMapMarkerAlt className="text-purple-600 text-2xl" />
                <p className="text-gray-700 font-medium">Dhaka, Bangladesh</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-md space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
