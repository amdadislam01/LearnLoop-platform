import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ rotate: -15 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-purple-100 p-5 rounded-full inline-block mb-6"
        >
          <FaExclamationTriangle className="text-purple-600 text-5xl" />
        </motion.div>

        <h1 className="text-8xl font-extrabold text-purple-900 mb-2">404</h1>
        <div className="h-1 w-20 bg-purple-600 rounded-full mx-auto mb-4"></div>
        <p className="text-lg sm:text-xl text-purple-700 mb-8">
          Oops! The page you're looking for might have wandered off.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 hover:scale-105 transition-all duration-300 flex-1"
          >
            <FaHome /> Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg shadow-md hover:bg-purple-200 hover:scale-105 transition-all duration-300 flex-1 cursor-pointer"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
