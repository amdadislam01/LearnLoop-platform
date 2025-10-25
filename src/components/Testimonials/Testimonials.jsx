import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
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
          What Our Students Say
          <span className="block w-24 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></span>
        </h2>

        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-2xl p-6 text-left cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-purple-700 text-sm">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.feedback}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
