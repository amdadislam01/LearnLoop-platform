import React from "react";
import { FaLaptopCode, FaChalkboardTeacher, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    icon: <FaLaptopCode className="text-white w-10 h-10" />,
    title: "Choose a Skill",
    description:
      "Browse our wide range of skills and choose the one you want to master.",
    bg: "bg-purple-500",
  },
  {
    id: 2,
    icon: <FaChalkboardTeacher className="text-white w-10 h-10" />,
    title: "Learn from Experts",
    description:
      "Get high-quality learning materials and guidance from experienced instructors.",
    bg: "bg-indigo-500",
  },
  {
    id: 3,
    icon: <FaStar className="text-white w-10 h-10" />,
    title: "Master & Apply",
    description:
      "Practice, improve, and apply your skills to real-world projects.",
    bg: "bg-pink-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1550px] mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl font-bold text-purple-700 inline-block relative mb-14">
          How It Works
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Follow our simple process to learn new skills efficiently and effectively.
          Start from basics, gain expert guidance, and master your skills with practice.
        </p>

        <motion.div
          className="grid md:grid-cols-3 gap-10 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={stepVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center cursor-pointer"
            >
              <div className={`p-5 rounded-full mb-5 ${step.bg} shadow-lg`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
