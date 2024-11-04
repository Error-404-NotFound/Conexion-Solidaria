import React from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  // const { signUp, updateUser, setError } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setError("");
    signUp(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          return updateUser(data.name, data.photoUrl)
            .then(() => {
              const userImp = {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: "user",
                gender: data.gender,
                phone: data.phone,
                address: data.address,
              };

              if (user.email && user.displayName) {
                return axios.post("http://localhost:5000/user-register", userImp).then(() => {
                  navigate("/");
                  return "Registration Successful!";
                }).catch((err) => {
                  throw new Error(err);
                });
              }
            })
            .catch((err) => {
              setError(err.code);
              throw new Error(err);
            });
        }
      });
    console.log(data);
  };

  const password = watch("password", "");

  return (
    <div className="">
      <div className=""></div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 text-gray-900 dark:text-gray-100 font-sans transition-all ease-in-out duration-500 pt-5 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full transform transition duration-500 hover:scale-105 shadow-md bg-white dark:bg-gray-950 dark:text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Please Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-5">
            <div className="mb-4 w-1/2">
              <label htmlFor="name" className="block text-gray-700 font-bold">
                <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="email" className="block text-gray-700 font-bold">
                <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4 w-1/2">
              <label htmlFor="password" className="block text-gray-700 font-bold">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold">
                <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                {...register("confirmPassword", { required: true, validate: (value) => value === password || "Passwords do not match" })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="mb-4 w-1/2">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-bold">
                <AiOutlinePhone className="inline-block mr-2 mb-1 text-lg" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Your Phone Number"
                {...register("phone", { required: true })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
            <div className="mb-4 w-1/2">
              <label htmlFor="photoUrl" className="block text-gray-700 font-bold">
                <AiOutlinePicture className="inline-block mr-2 mb-1 text-lg" />
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter Your Photo URL"
                {...register("photoUrl", { required: true })}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-bold">
              <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold">
              <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
              Address
            </label>
            <textarea
              {...register("address", { required: true })}
              rows="3"
              placeholder="Enter Your Address"
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-900 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"

            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-all duration-300">
              Register
            </button>

            {errors && (
              <div className="text-red-500 text-sm w-full mt-2">
                <p>Password doesn't match!</p>
              </div>
            )}
          </div>
        </form>

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-indigo-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
