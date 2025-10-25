import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [preview, setPreview] = useState(user?.photoURL || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setPhoto(imageUrl);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPhoto(url);
    setPreview(url);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(name, photo);
    setShowModal(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const modalBackdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalContent = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex justify-center mt-10"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-purple-200 text-center"
        variants={cardVariants}
      >
        <motion.img
          src={user?.photoURL || user.reloadUserInfo.photoURL}
          alt="User"
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-2 border-purple-500"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h2
          className="text-2xl font-bold text-purple-700 mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {user?.displayName || user.reloadUserInfo.displayName}
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {user?.email}
        </motion.p>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Update Profile
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md border border-purple-200 shadow-2xl"
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.h3
                className="text-xl font-bold text-purple-700 mb-4 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Update Profile
              </motion.h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="flex flex-col items-center">
                  <motion.img
                    src={preview || user.reloadUserInfo.photoURL}
                    alt="Preview"
                    className="w-24 h-24 rounded-full mb-3 border-2 border-purple-500 object-cover"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  />
                  <label className="cursor-pointer text-purple-600 font-medium hover:underline">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1 font-medium">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    value={photo}
                    onChange={handleUrlChange}
                    placeholder="Enter photo URL"
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-purple-500 transition"
                    required
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Save
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyProfile;
