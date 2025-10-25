import React, { useEffect, useState } from "react";
import { FaStar, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";

const TopRated = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    fetch("/popularSkills.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
        setProviders(sorted);
      })
      .catch((err) => console.error("Error loading provider data:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.04, boxShadow: "0px 10px 25px rgba(0,0,0,0.1)" },
  };

  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-20">
      <div className="max-w-[1550px] mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-14 relative inline-block">
          Top Rated Providers
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </h2>

        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {providers.map((provider) => (
            <motion.div
              key={provider.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden text-left flex flex-col transition-all duration-300 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="relative">
                <img
                  src={provider.image}
                  alt={provider.skillName}
                  className="h-56 w-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {provider.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {provider.providerName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2 break-all">
                    <FaEnvelope className="text-purple-600" />
                    {provider.providerEmail}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-700 font-medium">
                      {provider.rating}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {provider.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <p className="text-purple-700 font-semibold text-lg">
                    Price ${provider.price}
                  </p>
                  <Link to={`/skill/${provider.id}`} className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-purple-700 transition-all">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopRated;
