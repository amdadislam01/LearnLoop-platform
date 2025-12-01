import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaStar, FaUser, FaEnvelope, FaTag, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../context/AuthContext";

const SkillDetails = () => {
  const { loading } = useContext(AuthContext);
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/popularSkills.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((s) => s.id === parseInt(id));
        setSkill(found);
      })
      .catch((err) => {
        console.error("Error loading skill:", err);
      });
  }, [id]);

  if (loading) return <Loading />;

  if (!skill)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Skill Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-purple-600 underline">
          Back to Home
        </Link>
      </div>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Session Booked!",
      text: `Thank you, ${name}. We received your request.`,
      timer: 2000,
      showConfirmButton: false,
    });
    setName("");
    setEmail("");
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto py-16 px-6 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="text-purple-600 underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      <motion.div
        className="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={skill.image}
          alt={skill.skillName}
          className="w-full h-72 object-cover md:h-full"
        />

        <div className="p-8 space-y-5 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {skill.skillName}
          </h1>

          <div className="flex items-center space-x-2 text-yellow-500">
            <FaStar />
            <span className="text-gray-700 font-semibold">{skill.rating}</span>
          </div>

          <p className="text-lg text-gray-700">{skill.description}</p>

          <div className="space-y-2 text-gray-600">
            <p className="flex items-center gap-2">
              <FaUser className="text-purple-600" />
              <span>
                Instructor: <strong>{skill.providerName}</strong>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-purple-600" />
              <span>{skill.providerEmail}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaUsers className="text-purple-600" />
              <span>Slots Available: {skill.slotsAvailable}</span>
            </p>
            <p className="flex items-center gap-2">
              <FaTag className="text-purple-600" />
              <span>Category: {skill.category}</span>
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-2xl font-bold text-purple-700">
              Price ${skill.price}
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </motion.div>

      {/*  Description Box */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaTag className="text-purple-600" />
          Description
        </h2>

        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
          {skill.fullyDescription || "No extended description available."}
        </p>
      </motion.div>

      {/* Booking  */}
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 md:p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-all duration-300"
          >
            Submit Booking
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SkillDetails;
