import React from 'react'

export const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      About
      <ProfileCard />
    </div>
  )
}


const ProfileCard = () => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-80 mx-auto">
      {/* Profile Image and Name */}
      <div className="flex flex-col items-center">
        <img
          src="/public/pphoto.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-3"
        />
        <h2 className="text-2xl font-bold">Aniket Johri</h2>
        <p className="text-pink-400 text-sm mt-1">📍 Tirupati</p>
      </div>

      {/* Contact Details */}
      <div className="mt-6 space-y-4">
        {/* Phone */}
        <div className="flex items-center space-x-3">
          <img src="/public/phone.png" alt="Phone" className="w-6 h-6" />
          <span>7069774750</span>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <img src="/public/email.png" alt="Email" className="w-6 h-6" />
          <span>cs22b028@iittp.ac.in</span>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-3">
          <img src="/public/calender.png" alt="Calendar" className="w-6 h-6" />
          <span>01/09/2024</span>
        </div>

        {/* Amounts */}
        <div className="flex justify-between mt-4">
          <div className="flex items-center space-x-3">
            <img src="/public/income.png" alt="Amount" className="w-6 h-6" />
            <span>Rs. 20000</span>
          </div>
          <div className="flex items-center space-x-3">
            <img src="/public/donate.png" alt="Donate" className="w-6 h-6" />
            <span>Rs. 100</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-3">
            <img src="/public/badge1.png" alt="Badge" className="w-11 h-11" />
            <img src="/public/badge2.png" alt="Badge" className="w-11 h-11" />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <img src="/public/idk.png" alt="Gallery" className="w-6 h-6" />
          <span>04</span>
        </div>
      </div>
    </div>
  );
};
