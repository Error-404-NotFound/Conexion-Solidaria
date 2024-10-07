import React from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from 'react-icons/ai';
import { FaGenderless } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Please Register</h2>
        <form className="grid grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlineUser className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlineMail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlineLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlineLock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlinePhone className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Photo URL Field */}
          <div className="flex items-center border-b border-gray-300 py-2">
            <AiOutlinePicture className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Gender Field */}
          <div className="flex items-center border-b border-gray-300 py-2 col-span-2">
            <AiOutlineUser className="text-gray-500 mr-3" />
            <select className="w-full outline-none focus:border-indigo-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Address Field */}
          <div className="flex items-center border-b border-gray-300 py-2 col-span-2">
            <MdLocationOn className="text-gray-500 mr-3" />
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 hover:bg-indigo-600 transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
