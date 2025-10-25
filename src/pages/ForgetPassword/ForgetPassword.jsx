import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) return;

    await resetPassword(email);
    setEmail("");
    navigate("/login");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-200"
        variants={containerVariants}
      >
        <motion.h2
          className="text-2xl font-bold text-center text-purple-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Forgot Password
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Enter your email to reset your password
        </motion.p>

        <motion.form
          onSubmit={handleReset}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-500 transition"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Reset Email
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default ForgetPassword;
