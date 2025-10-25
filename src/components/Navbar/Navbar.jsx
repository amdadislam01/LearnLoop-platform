import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router";
import {
  FaHome,
  FaBookOpen,
  FaInfoCircle,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/skills", label: "Skills", icon: <FaBookOpen /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
    ...(user ? [{ to: "/myprofile", label: "My Profile", icon: <FaUser /> }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-purple-100">
      <nav className="max-w-[1550px] mx-auto flex items-center justify-between h-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg text-white">
              <FaBookOpen className="text-xl" />
            </div>
            <span className="font-extrabold text-xl text-gray-800 group-hover:text-purple-600 transition">
              LearnLoop
            </span>
          </NavLink>
        </motion.div>

        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navLinks.map((link) => (
            <motion.div key={link.to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-sm"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="hidden lg:flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {loading ? (
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
          ) : !user ? (
            <>
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition"
              >
                <FaSignInAlt className="inline mr-2" /> Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-5 py-2 rounded-md font-medium border border-purple-500 text-purple-700 hover:bg-purple-50 transition"
              >
                <FaUserPlus className="inline mr-2" /> Signup
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to={"/myprofile"} className="relative group cursor-pointer">
                <img
                  src={user.photoURL || user.reloadUserInfo.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                />
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-xl p-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 text-center z-50">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.displayName || user.reloadUserInfo.displayName}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logoutUser}
                className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition cursor-pointer"
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </div>
          )}
        </motion.div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-purple-700 text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-md border-t border-purple-100 overflow-hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-3">
              {navLinks.map((link) => (
                <motion.div key={link.to} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                  <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-purple-600 text-white shadow-sm"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              {loading ? (
                <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto my-2" />
              ) : !user ? (
                <>
                  <NavLink
                    to="/login"
                    className="flex items-center justify-center px-5 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaSignInAlt className="inline mr-2" /> Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="flex items-center justify-center px-5 py-2 rounded-md font-medium border border-purple-500 text-purple-700 hover:bg-purple-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserPlus className="inline mr-2" /> Signup
                  </NavLink>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    logoutUser();
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:opacity-90 transition"
                >
                  <FaSignOutAlt /> Logout
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
