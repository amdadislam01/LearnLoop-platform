import React, { useState, useContext } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaUserPlus,
  FaImage,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const SignUp = () => {
  const { createUser, signInWithGoogle, emailInput, setEmailInput, setLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must include uppercase, lowercase, and a number (min 6 characters)");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName,
          photoURL
        })
          .then(() => {
            console.log("Profile updated:", user);
            toast.success("Sign Up successful!");
            e.target.reset();
            setLoading(true);
            navigate('/');
          })
          .catch((err) => console.log("Profile update failed:", err));
      })
      .catch((error) => {
        console.log("SignUp error:", error.message);
        toast.error("Invalid email or password!");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-purple-200"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Sign Up Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-gray-600 font-medium">Full Name</label>
            <div className="flex items-center border rounded-lg p-3">
              <FaUser className="text-purple-500 mr-3" />
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <div className="flex items-center border rounded-lg p-3">
              <FaEnvelope className="text-purple-500 mr-3" />
              <input
                type="email"
                name="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-gray-600 font-medium">
              Profile Image URL
            </label>
            <div className="flex items-center border rounded-lg p-3">
              <FaImage className="text-purple-500 mr-3" />
              <input
                type="url"
                name="photo"
                required
                placeholder="Paste your image URL"
                className="w-full outline-none"
              />
            </div>
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <div className="flex items-center border rounded-lg p-3">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Create a password"
                className="w-full outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must include uppercase, lowercase, and a number (min 6 characters)
            </p>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2.5 rounded-lg font-medium hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
          >
            <FaUserPlus /> SignUp
          </motion.button>

          <motion.div
            className="w-full flex items-center justify-center mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
            >
              <FaGoogle /> Google
            </button>
          </motion.div>

          <motion.p
            className="text-center text-sm text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login Here
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
