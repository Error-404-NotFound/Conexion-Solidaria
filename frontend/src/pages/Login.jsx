// import React from 'react';
// import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture } from 'react-icons/ai';
// import { FaGenderless } from 'react-icons/fa';
// import { MdLocationOn } from 'react-icons/md';

// const Login = () => {
//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
//             <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full dark:bg-black dark:text-white">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Please Login</h2>
//                 <form className="space-y-6">
//                     {/* Email Field */}
//                     <div className="flex items-center border-b border-gray-300 py-2 dark:text-white">
//                         <AiOutlineMail className="text-gray-500 mr-3" />
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             className="w-full outline-none focus:border-indigo-500 dark:text-black"
//                         />
//                     </div>

//                     {/* Password Field */}
//                     <div className="flex items-center border-b border-gray-300 py-2">
//                         <AiOutlineLock className="text-gray-500 mr-3" />
//                         <input
//                             type="password"
//                             placeholder="Enter your password"
//                             className="w-full outline-none focus:border-indigo-500 dark:text-black"
//                         />
//                     </div>

//                     {/* Submit Button */}
//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full bg-indigo-500 text-white py-3 rounded-lg mt-4 hover:bg-indigo-600 transition"
//                         >
//                             Login
//                         </button>
//                     </div>
//                 </form>
//                 {/* Optional: Add forgot password and signup links */}
//                 <div className="text-center mt-4">
//                     <a href="#" className="text-indigo-500 hover:underline">Forgot Password?</a>
//                     <p className="mt-2">
//                         Don't have an account?{" "}
//                         <a href="/register" className="text-indigo-500 hover:underline">Sign up</a>
//                     </p>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default Login;


import React from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePhone, AiOutlinePicture, AiOutlineHeatMap } from "react-icons/ai";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    // const {signUp, updateUser, setError} = useContext(AuthContext);
    const {
        formState: { errors },
    } = useForm();


    async function handleSubmit(ev) {
        ev.preventDefault();
        console.log(ev);
        const username = ev.target[0].value;
        const password = ev.target[1].value;
        // const url = isLoginOrRegister === 'register' ? '/register' : '/login';
        const { data } = await axios.post("http://localhost:3000/login", { username: username, password: password });
        if(data.redirectUrl) {
            navigate(data.redirectUrl);
        }
        // setLoggedInUsername(username);
        // setId(data.id);
    }




    return (
        <div className="flex justify-center items-center pt-14 min-h-screen bg-gray-100 mt-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md dark:bg-black dark:text-white">
                <h2 className="text-3xl font-bold text-center mb-6">Please Register</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="flex items-center border-b border-gray-300 py-2 dark:text-white">
                        <AiOutlineMail className="inline-block mr-2 mb-1 text-lg" />
                        <input
                            type="username"
                            placeholder="Enter your username"
                            className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:text-black"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex items-center border-b border-gray-300 py-2 dark:text-white">
                        <AiOutlineLock className="text-gray-500 mr-3" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="dark:placeholder-black w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring focus:border-blue-300 dark:text-black"
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