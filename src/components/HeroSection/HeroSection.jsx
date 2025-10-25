import React, { useContext, useRef } from "react";
import { Link } from "react-router";
import {
  FaBook,
  FaGraduationCap,
  FaArrowLeft,
  FaArrowRight,
  FaMobileAlt,
  FaUsers,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { AuthContext } from "../../context/AuthContext";
import { FaChartLine, FaHouseLaptop } from "react-icons/fa6";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Master New Skills",
    description: "Learn coding, design, and more with interactive courses.",
    icon: <FaHouseLaptop className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
  {
    title: "Get Certified",
    description:
      "Earn certificates for completed courses and showcase your skills.",
    icon: <FaGraduationCap className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
  {
    title: "Join Our Community",
    description:
      "Connect with learners worldwide and grow together with experts.",
    icon: <FaBook className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your learning journey with detailed analytics and reports.",
    icon: <FaChartLine className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
  {
    title: "Learn Anytime, Anywhere",
    description:
      "Access all your favorite courses from any device, any time.",
    icon: <FaMobileAlt className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
  {
    title: "Collaborate & Grow",
    description:
      "Work on group projects, share ideas, and learn through teamwork.",
    icon: <FaUsers className="text-6xl text-purple-800 mx-auto mb-4" />,
  },
];

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const swiperRef = useRef(null);

  return (
    <section className="relative bg-gradient-to-r from-purple-800 via-purple-700 to-purple-500 text-white overflow-hidden">
      <div className="md:max-w-[1550px] mx-auto px-6 py-16 md:py-44 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Column */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Welcome to <span className="text-yellow-300">Learnloop</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-100 max-w-md">
            Explore a world of courses, gain new skills, and unlock your potential.
          </p>

          {user ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/skills"
                className="bg-white text-purple-700 font-semibold px-10 py-3 rounded-xl w-max hover:bg-purple-50 transition-shadow shadow-lg hover:shadow-2xl duration-300"
              >
                Browse Courses
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-white text-purple-700 font-semibold px-10 py-3 rounded-xl w-max hover:bg-purple-50 transition-shadow shadow-lg hover:shadow-2xl duration-300"
              >
                Get Started
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column */}
        <div className="md:w-1/2 w-full max-w-md mx-auto relative">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition duration-300"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white/40 transition duration-300"
          >
            <FaArrowRight />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="rounded-3xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/20 backdrop-blur-lg border border-white/30 text-gray-800 p-10 rounded-3xl shadow-2xl flex flex-col items-center transform hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/50"
                >
                  {slide.icon}
                  <h3 className="text-2xl font-bold mb-2 text-center text-white drop-shadow-md">
                    {slide.title}
                  </h3>
                  <p className="text-base text-center text-gray-200">
                    {slide.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
