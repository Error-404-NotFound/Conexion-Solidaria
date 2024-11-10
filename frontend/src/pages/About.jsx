import React from 'react';

export const About = () => {
  return (
    <div className="about-container p-6 max-w-2xl mx-auto my-10 bg-white dark:bg-gray-900 rounded shadow-lg transition-all duration-300 pt-7 mt-20">
      <h2 className="text-3xl font-bold mb-4 text-center text-indigo-600 dark:text-indigo-400">About Conexion-Solidaria</h2>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
        <span className="font-semibold">Conexion-Solidaria</span> is a platform built to bridge communities by connecting those in need with those willing to help.
        Whether it’s providing food, clothing, shelter, or even a simple act of kindness, we believe that together, we can make a
        lasting impact in our communities. This app empowers individuals, volunteers, and organizations to come together, creating
        a network of support that transcends borders.
      </p>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            To foster a compassionate community where help is accessible to everyone, regardless of their circumstances.
            We aim to create a positive difference by enabling people to share resources, time, and care for a better tomorrow.
          </p>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">How We Work</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Through <span className="font-semibold">Conexion-Solidaria</span>, users can post and respond to requests for assistance based on needs such as food,
            clothing, shelter, and companionship. Our easy-to-use platform ensures that acts of kindness can happen at the click
            of a button, whether you’re offering help or seeking it.
          </p>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Join Us</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Be part of a compassionate network committed to making a difference. Together, let’s build a more connected, supportive
            world where everyone has someone to turn to when they need it most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;