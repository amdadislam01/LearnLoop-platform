import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

const Skills = () => {
  const { loading } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("rating");

  useEffect(() => {
    fetch("/popularSkills.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.rating - a.rating);
        setSkills(sorted);
      })
      .catch((err) => {
        console.error("Error loading skills:", err);
      });
  }, []);

  if (loading) return <Loading />;

  // 🔍 Filter by Search
  const filteredSkills = skills.filter((skill) =>
    skill.skillName.toLowerCase().includes(search.toLowerCase())
  );

  // ↕ Sort by Selected Option
  const sortedSkills = [...filteredSkills].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    return 0;
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="bg-gray-50 py-16">
      <motion.div
        className="max-w-[1550px] mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        {/* 🔍 Search + Sort Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

          {/* Search */}
          <input
            type="text"
            placeholder="Search Skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full md:w-52 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="rating">Rating</option>
            <option value="price-low">Price (Low → High)</option>
            <option value="price-high">Price (High → Low)</option>
          </select>

        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSkills.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full text-xl">
              No skills found.
            </p>
          ) : (
            sortedSkills.map((skill, index) => (
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
                  />
                </div>

                <div className="p-5">
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
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
