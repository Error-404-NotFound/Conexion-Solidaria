import imag from '../assets/home/a.jpeg'
import imbg from '../assets/home/b.jpg'
import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "./TextScroll.css"; // Import custom CSS for animation

export const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-4">
        <div className="text-lg font-bold dark:text-white">Logo</div>
        <button className="text-gray-500 dark:text-gray-300 focus:outline-none">
          {// Hamburger Icon }
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>
      */}

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {/* Placeholder Text */}
          <div className="text-gray-400 dark:text-gray-500">
            lorem ipsum lorem ipsum
          </div>

          {/* Section Heading and Description */}
          <div>
            <h2 className="text-gray-500 dark:text-gray-400 uppercase text-sm font-semibold mb-2 mt-60">
              Empowering Skills, Shaping Futures
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              We help you bridge skill gaps and unlock new career opportunities
              with personalized learning and job recommendations.
            </p>

            {/* Call to Action Button */}
            <button className="bg-black text-white dark:bg-gray-700 dark:text-gray-100 py-3 px-6 rounded-md flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-200">
              <span>Take Test</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column - Design Placeholder */}
        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <div className="w-96 h-96 bg-gray-200 dark:bg-gray-700 rounded-md flex justify-center items-center shadow-lg">
            <img src={imag} alt="Design Image" className="w-full h-full object-cover rounded-md" />
          </div>
        </div>
      </main>

      {/* Scroll to Explore 
      <footer className="text-center mt-12">
        <button className="text-gray-600 dark:text-gray-400">
          <span>Scroll to explore</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mx-auto mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </footer>
      */}

      {/* Text Scroll Animation */}
      <TextScroll />

      {/* Info Section */}
      <InfoSection />

      {/* Why Us Section */}
      <WhyUS />

      {/* Infosys Stats */}
      <InfosysStats />

    </div>
  )
}


export const InfoSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-8 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Left: Image Placeholder */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-center mb-8 md:mb-0">
        <img
          src={imbg} // Replace with your image URL or component
          alt="3D Spring Design"
          className="w-96 h-96 object-contain rounded-md"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
          InfosysDevOps is a team of professionals with over <span className="text-gray-400 dark:text-gray-500">8+ years</span> demonstrated competence in IT,
          <span className="text-gray-400 dark:text-gray-500"> focuses</span> on delivering integrated, reliable, resilient and cost-effective solutions and
          <span className="text-gray-400 dark:text-gray-500"> regards</span> it as a privilege to ensure 100% customer satisfaction.
        </h2>

        {/* Button */}
        <button className="mt-8 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white rounded-full py-2 px-6 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <span className="mr-2">Our Services</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const WhyUS = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-8 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Left: Text Content */}
      <div className="w-full md:w-1/2">
        <p className="text-base md:text-base font-bold mb-4 leading-tight pr-40">
          InfosysDevOps is a team of professionals with over <span className="text-gray-400 dark:text-gray-500">8+ years</span> demonstrated competence in IT,
          <span className="text-gray-400 dark:text-gray-500"> focuses</span> on delivering integrated, reliable, resilient and cost-effective solutions and
          <span className="text-gray-400 dark:text-gray-500"> regards</span> it as a privilege to ensure 100% customer satisfaction.
        </p>

        {/* Button */}
        <button className="mt-8 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white rounded-full py-2 px-6 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <span className="mr-2">Let's Talk</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Right : Why Us Header */}
      <div className="w-full md:w-1/2">
        <p className="text-xl md:text-base font-bold mb-4 leading-tight">
          YOUR PARTNER
        </p>

        <p className="text-8xl md:text-8xl font-bold mb-4 leading-tight">
          Why <span className="text-gray-400 dark:text-gray-500">Choose</span> Us?
        </p>
      </div>

      {/* Right: Text Content */}
    </div>
  );
};


const StatsItem = ({ value, label, isVisible, index }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const duration = 1.5; // total duration in seconds

  useEffect(() => {
    if (isVisible) {
      const endValue = label.includes('Rating') ? parseFloat(value) : parseInt(value); // Handle rating separately
      const totalFrames = 60 * duration; // Total frames for the duration at 60fps
      const increment = endValue / totalFrames; // Common increment for all stats

      let currentValue = 0;
      let frameCount = 0;

      const incrementValue = () => {
        if (frameCount < totalFrames) {
          frameCount++;
          currentValue += increment;
          setDisplayValue(label.includes('Rating') ? parseFloat(currentValue.toFixed(2)) : Math.floor(currentValue)); // Round down for non-ratings
          requestAnimationFrame(incrementValue); // Smooth updates
        } else {
          setDisplayValue(endValue); // Ensure we set the final value
        }
      };

      incrementValue();
    }
  }, [isVisible, value, label]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex flex-col md:flex-col items-center justify-center space-x-2 pt-8 pb-8 ${index !== 0 ? 'md:border-l-4 md:border-gray-300 dark:border-gray-700 md:pl-6' : ''}`}
    >
      <h2 className="text-5xl font-bold text-gray-900 dark:text-white">{label.includes('Rating') ? displayValue.toFixed(2) : displayValue + "+"}
        {label.includes('Rating') && <span className="text-yellow-500 text-2xl justify-center">  ★</span>}</h2>
      <p className="text-gray-500 dark:text-gray-400 text-lg">{label}</p>
    </motion.div>
  );
};


const InfosysStats = () => {
  const stats = [
    { value: '43+', label: 'Years in Market' },
    { value: '80+', label: 'Certified Experts In Team' },
    { value: '525+', label: 'Successfully Completed Projects' },
    { value: '4.9', label: 'Rating on Clutch', star: true },
    { value: '5.0', label: 'Rating on Clutch', star: true },
  ];

  // Using Intersection Observer
  const { ref, inView } = useInView({ threshold: 0.1 }); // Trigger when 10% is visible

  return (
    <div ref={ref} className="flex flex-col md:flex-row justify-around items-center text-center py-10 bg-white dark:bg-gray-900 space-y-4 md:space-y-0">
      {/* Title */}
      <div className="mb-6 md:mb-0">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">Infosys by <br></br> numbers</p>
      </div>

      {/* Stats */}
      {stats.map((stat, index) => (
        <StatsItem key={index} value={stat.value} label={stat.label} isVisible={inView} index={index} />
      ))}
    </div>
  );
};


const TextScroll = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;

    // Function to change animation after the first iteration
    const handleAnimationIteration = () => {
      textElement.style.animation = "scrollRest 27s linear infinite"; // Update for subsequent animations
    };

    // Add event listener to detect when the animation iteration ends
    textElement.addEventListener("animationiteration", handleAnimationIteration);

    // Cleanup event listener when component unmounts
    return () => {
      textElement.removeEventListener("animationiteration", handleAnimationIteration);
    };
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div ref={textRef} className="scrolling-text text-9xl font-bold inline-block">
        <span className="text-black dark:text-white">At Every Turn Innovation — </span>
        <span className="text-gray-300 dark:text-gray-600">At Every Turn Innovation — </span>
      </div>
    </div>
  );
};