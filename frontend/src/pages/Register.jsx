import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Register = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const { login } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the password to compare with confirm password
  const password = watch("password", "");

  const onSubmit = async (data) => {
    // If the passwords do not match, set an error message
    try {
      const response = await api.post("/register", {
        username: data.name,
        password: data.password,
        email: data.email,
        phone: data.phone,
        url: data.photoUrl,
        gender: data.gender,
        address: data.address,
      });

      const responseData = response.data;
      if (responseData.message === 'User registered successfully') {
        setMessageType('success');
        setMessage('Registered successfully!');
        login(responseData);
        setTimeout(() => navigate(responseData.redirectUrl), 500);
      } else {
        setMessageType('error');
        setMessage(responseData.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response.data.message) {
        setMessageType('error');
        setMessage(error.response.data.message);
      } else {
        setMessageType('error');
        setMessage('An unexpected error occurred. Please try again');
      }
    }
  };

  return (
    <div className="flex justify-center items-center pt-24 min-h-screen bg-gray-100 mt-20 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md dark:bg-black dark:text-white"
        initial={{ rotateY: -270, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        whileHover={{ scale: 1.05, duration: 0.3 }}
        >

        <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>
        {message && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-4 mb-4 text-center rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          >
            {message}
          </motion.div>
        )}

        {/* form data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Username
              </label>
              <input
                type="text"
                placeholder="Enter Your Username"
                {...register("name", { required: true })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.name && <p className="text-red-500 text-xs italic">Username is required.</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.email && <p className="text-red-500 text-xs italic">Email is required.</p>}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.password && <p className="text-red-500 text-xs italic">Password is required.</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required.",
                  validate: value => value === password || "Passwords do not match"
                })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>
              )}

            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                {...register("phone", { required: true })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.phone && <p className="text-red-500 text-xs italic">Phone Number is required.</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="photoUrl" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter Your Photo URL"
                {...register("photoUrl", { required: true })}
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.photoUrl && <p className="text-red-500 text-xs italic">Photo URL is required.</p>}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 font-bold dark:text-white">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Gender
              </label>
              <select {...register("gender", { required: true })} className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue dark:placeholder-black dark:text-gray-300 dark:bg-white dark:text-black">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs italic">Gender is required.</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold dark:text-white">
                <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                rows="3"
                placeholder="Enter Your Address"
                className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
              />
              {errors.address && <p className="text-red-500 text-xs italic">Address is required.</p>}
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md">Register</button>
          </div>
        </form>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-secondary">Login</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
