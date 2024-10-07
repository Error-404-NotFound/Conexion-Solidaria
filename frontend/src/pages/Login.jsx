import React from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from 'react-icons/ai';
import { FaGenderless } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Please Login</h2>
                <form className="space-y-6">
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
                            placeholder="Enter your password"
                            className="w-full outline-none focus:border-indigo-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 hover:bg-indigo-600 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {/* Optional: Add forgot password and signup links */}
                <div className="text-center mt-4">
                    <a href="#" className="text-indigo-500 hover:underline">Forgot Password?</a>
                    <p className="mt-2">
                        Don't have an account?{" "}
                        <a href="/register" className="text-indigo-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Login;
