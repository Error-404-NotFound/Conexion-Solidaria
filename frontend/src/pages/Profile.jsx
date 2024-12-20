import React from 'react';
import { useAuth } from "../context/AuthContext";


export const ProfileCard = () => {
  const { user } = useAuth();
  const date = new Date();

  return (
    <div className="dark:bg-gray-900 mt-0 mb-20 flex justify-center">
      <div className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-10 transition-colors duration-500 ease-in-out">
        <div className="bg-gray-800 dark:bg-gray-700 text-white rounded-lg shadow-lg p-10 w-80 mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 transition-all ease-in-out">
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center transition-all duration-500 ease-in-out">
            <img
              src="/pphoto.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-3 shadow-lg border-4 border-gray-700 dark:border-gray-800 transition-all duration-500"
            />
            <h2 className="text-2xl font-bold transition-all duration-500">{user.username}</h2>
            <p className="text-pink-400 dark:text-pink-300 text-sm mt-1 transition-colors duration-500">📍 Tirupati</p>
          </div>

          {/* Contact Details */}
          <div className="mt-6 space-y-4">
            {/* Phone */}
            <div className="flex items-center space-x-3 transition-all duration-500">
              <img src="/phone.png" alt="Phone" className="w-6 h-6 shadow-md transition-all duration-500" />
              <span>{user.phone}</span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 transition-all duration-500">
              <img src="/email.png" alt="Email" className="w-6 h-6 shadow-md transition-all duration-500" />
              <span>{user.email}</span>
            </div>

            {/* Date */}
            <div className="flex items-center space-x-3 transition-all duration-500">
              <img src="/calender.png" alt="Calendar" className="w-6 h-6 shadow-md transition-all duration-500" />
              <span>{date.toDateString()}</span>
            </div>

            {/* Amounts */}
            <div className="flex justify-between mt-4 transition-all duration-500">
              <div className="flex items-center space-x-3">
                <img src="/income.png" alt="Amount" className="w-6 h-6 shadow-md transition-all duration-500" />
                <span>Rs. 20000</span>
              </div>
              <div className="flex items-center space-x-3">
                <img src="/donate.png" alt="Donate" className="w-6 h-6 shadow-md transition-all duration-500" />
                <span>Rs. 100</span>
              </div>
            </div>

            {/* Additional Details */}
            <div className="flex justify-between items-center mt-4 transition-all duration-500">
              <div className="flex items-center space-x-5">
                <img src="/badge1.png" alt="Badge" className="w-11 h-11 shadow-md transition-all duration-500" />
                <img src="/badge2.png" alt="Badge" className="w-11 h-11 shadow-md transition-all duration-500" />
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 transition-all duration-500">
              <img src="/idk.png" alt="Gallery" className="w-6 h-6 shadow-md transition-all duration-500" />
              <span>04</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
