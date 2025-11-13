import React from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaChevronRight,
  FaBookOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <footer className="relative mt-0 bg-gradient-to-b from-purple-800 to-purple-950 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform">
        <svg
          className="relative block w-full h-12 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#f9fafb]"
          ></path>
        </svg>
      </div>

      <motion.div
        className="pt-16 pb-8 container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12" variants={containerVariants}>
          <motion.div className="col-span-1 md:col-span-5" variants={columnVariants}>
            <div className="flex items-center mb-5">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg mr-2">
                <FaBookOpen className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">LearnLoop</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              LearnLoop is your gateway to continuous learning. Discover new skills, connect with mentors, and grow together in an ever-evolving community of learners.
            </p>
            <div className="flex space-x-3">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg flex items-center justify-center w-10 h-10 shadow-md"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div className="col-span-1 md:col-span-3 md:pl-4" variants={columnVariants}>
            <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-purple-500/30">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["/", "/skills", "/about", "/contact", "/login", "/signup"].map((path, index) => {
                const labels = ["Home", "Skills", "About", "Contact", "Login", "Signup"];
                return (
                  <li key={index} className="hover:translate-x-2 transition-transform duration-300">
                    <Link to={path} className="text-gray-300 hover:text-purple-400 flex items-center">
                      <FaChevronRight className="text-xs mr-2 text-purple-400" /> {labels[index]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div className="col-span-1 md:col-span-4 md:pl-4" variants={columnVariants}>
            <h3 className="text-lg font-bold text-white mb-5 pb-2 border-b border-purple-500/30">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {[
                { icon: FaEnvelope, title: "Email", info: <a href="mailto:info@learnloop.com" className="text-gray-300 hover:text-purple-400">info@learnloop.com</a> },
                { icon: FaPhone, title: "Phone", info: "+880 1300 567 890" },
                { icon: FaMapMarkerAlt, title: "Address", info: "23 Knowledge Street, Dhaka, Bangladesh" },
              ].map((item, i) => (
                <motion.li key={i} className="flex items-start" variants={iconVariants} whileHover="hover">
                  <div className="bg-purple-600 p-2 rounded-lg mt-1 mr-3 shadow-lg">
                    <item.icon className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-200 text-sm mb-1">{item.title}</h4>
                    <p className="text-gray-300">{item.info}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <div className="border-t border-purple-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} <span className="text-purple-400">LearnLoop</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
              {["/terms", "/privacy", "/faq", "/contact"].map((path, index) => {
                const labels = ["Terms", "Privacy", "FAQ", "Contact"];
                return (
                  <Link key={index} to={path} className="text-gray-400 text-sm hover:text-purple-400">
                    {labels[index]}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="text-center mt-6 text-xs text-gray-400">
            Developed with <span className="text-purple-400">♥</span> by{" "}
            <a href="https://amdadislam.netlify.app/" className="underline text-purple-400 hover:text-purple-300">
              MD Amdad Islam
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
