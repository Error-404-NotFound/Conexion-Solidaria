import React from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 text-gray-900 dark:text-gray-100 font-sans transition-all ease-in-out duration-500 pt-0">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-950 dark:text-white transform transition-all duration-700 hover:scale-105">
                <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">Please Login</h2>
                
                <form className="space-y-6">
                    {/* Email Field */}
                    <div className="relative flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
                        <AiOutlineMail className="absolute left-3 text-xl text-gray-500 dark:text-gray-300" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
                        <AiOutlineLock className="absolute left-3 text-xl text-gray-500 dark:text-gray-300" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-4 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Additional Links */}
                <div className="text-center mt-6">
                    <a href="#" className="text-indigo-500 hover:underline dark:text-indigo-400">Forgot Password?</a>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                        Don't have an account?{" "}
                        <a href="/register" className="text-indigo-500 hover:underline dark:text-indigo-400">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
