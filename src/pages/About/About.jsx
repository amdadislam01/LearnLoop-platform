import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/about.png";

const About = () => {
  return (
    <section className="bg-gray-50 overflow-hidden">
      {/* About  */}
      <div className="max-w-[1550px] mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold text-purple-700 mb-6">
            About LearnLoop
          </h1>
          <p className="text-gray-700 mb-6">
            LearnLoop is a platform dedicated to helping learners worldwide
            enhance their skills through curated courses, expert instructors,
            and interactive learning experiences. Our mission is to make
            learning engaging, accessible, and impactful for everyone.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Join Now
          </motion.button>
        </motion.div>

        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src={aboutImage}
            alt="About LearnLoop"
            className="rounded-2xl shadow-lg w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* Mission  */}
      <motion.div
        className="bg-white py-20"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-purple-700 mb-12 relative inline-block">
            Our Mission
            <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Our mission is to empower learners everywhere by providing quality
            courses, guidance from industry experts, and a community of
            supportive peers. We believe that learning should be accessible,
            fun, and rewarding for everyone.
          </p>
        </div>
      </motion.div>

      {/* Work  */}
      <div className="py-20 max-w-[1550px] mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-purple-700 mb-14 relative inline-block"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          How We Work
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {[
            { icon: "🎯", title: "Curated Courses", text: "Carefully designed courses by experts to give you practical skills and knowledge." },
            { icon: "💡", title: "Expert Guidance", text: "Learn from experienced instructors and get personalized guidance." },
            { icon: "🌐", title: "Community Support", text: "Join a supportive community of learners and grow together." },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
