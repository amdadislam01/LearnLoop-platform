import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const PopularSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/popularSkills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
      })
      .catch((err) => console.error("Error loading skills:", err));
  }, []);

  const displayedSkills = skills.slice(0, 6);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-gray-50 py-16">
      <motion.div
        className="max-w-[1550px] mx-auto px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-purple-700 inline-block relative mb-14">
          Popular Skills
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="bg-white shadow-md hover:shadow-2xl rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 transform hover:scale-[1.03] group cursor-pointer"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="overflow-hidden">
                <motion.img
                  src={skill.image}
                  alt={skill.skillName}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {skill.skillName}
                </h3>

                <div className="flex items-center mb-3">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600 font-medium">
                    {skill.rating}
                  </span>
                </div>

                <p className="text-purple-700 font-semibold mb-4 text-lg">
                  Price ${skill.price}
                </p>

                <Link
                  to={`/skill/${skill.id}`}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium inline-block text-center transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 md:mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            to="/skills"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-semibold transition-all duration-300"
          >
            View All Skills
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PopularSkills;
