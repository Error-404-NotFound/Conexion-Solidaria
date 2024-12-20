import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import api from "../services/api";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/login", {
                username: data.username,
                password: data.password,
            });

            const responseData = response.data;
            if (responseData.message === 'Login successful') {
                setMessageType('success');
                setMessage('Login successful!');
                login(responseData);
                setTimeout(() => navigate(responseData.redirectUrl), 500);
            } else {
                setMessageType('error');
                setMessage(responseData.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessageType('error');
            setMessage(error.response?.data.message || 'An unexpected error occurred. Please try again');
        }
    };

    return (
        <div className="flex justify-center items-center pt-14 min-h-screen bg-gray-100 mt-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <motion.div
                className="bg-white p-8 rounded-lg shadow-md dark:bg-black dark:text-white"
                initial={{ rotateY: -450, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, duration: 0.3 }}
            >
                <h2 className="text-3xl font-bold text-center mb-6">Please Login</h2>
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

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center border-gray-300 py-2 dark:text-white">
                        <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                        <input
                            type="text"
                            placeholder="Enter your username"
                            {...register("username", { required: true })}
                            className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
                        />
                    </div>
                    {errors.username && <p className="text-red-500 text-xs italic">Username is required.</p>}

                    <div className="flex items-center border-gray-300 py-2 dark:text-white">
                        <AiOutlineLock className="inline-block mr-2 mb-1 text-lg" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:text-black"
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-xs italic">Password is required.</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 hover:bg-indigo-600 transition"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-indigo-500 hover:underline">Forgot Password?</a>
                    <p className="mt-2">
                        Don't have an account?{" "}
                        <a href="/register" className="text-indigo-500 hover:underline">Sign up</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
