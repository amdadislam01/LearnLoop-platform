import React, { use, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaSignInAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";

const Login = () => {
  const { loginUser, signInWithGoogle, emailInput, setEmailInput } =
    use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        e.target.reset();
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
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
          Login Now
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
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
            <label className="block mb-1 text-gray-600 font-medium">Password</label>
            <div className="flex items-center border rounded-lg p-3">
              <FaLock className="text-purple-500 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
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
            <p
              onClick={() =>
                navigate("/forget-password", { state: { email: emailInput } })
              }
              className="text-center text-purple-600 font-medium text-sm cursor-pointer hover:underline mt-3"
            >
              Forgot Password?
            </p>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2.5 rounded-lg font-medium hover:opacity-95 hover:shadow-md transition-all cursor-pointer"
          >
            <FaSignInAlt /> Login
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
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-purple-600 font-semibold hover:underline"
            >
              SignUp Now
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
