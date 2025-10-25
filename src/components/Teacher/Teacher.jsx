import React, { useEffect, useState } from "react";
import { FaTwitter, FaLinkedin, FaSkype } from "react-icons/fa";
import { motion } from "framer-motion";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/teachers.json")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-[1550px] mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-14 relative inline-block">
          Browse By Teachers
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {teachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{teacher.name}</h3>
                <p className="text-purple-700 font-medium mb-2">{teacher.subject}</p>
                <p className="text-gray-500 text-sm mb-3">{teacher.position}</p>
                <p className="text-gray-600 text-sm mb-4">{teacher.description}</p>
                <div className="flex space-x-3 mt-2">
                  <a target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                    <FaTwitter />
                  </a>
                  <a  target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                    <FaLinkedin />
                  </a>
                  <a  target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800 transition">
                    <FaSkype />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Teacher;
