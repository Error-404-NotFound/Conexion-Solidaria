import imag from '../assets/home/a.jpeg'
import imbg from '../assets/home/b.jpg'
import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import "./TextScroll.css"; // Import custom CSS for animation
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS

const img3 = "https://images.unsplash.com/photo-1608342381036-15657da6bf58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img1 = imbg;
const img4 = "https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&w=600";
const img2 = "https://images.unsplash.com/photo-1518398046578-8cca57782e17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";



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

      <div className="text-gray-400 dark:text-gray-500 flex-1 pt-14 space-y-8 pl-16">
        Welcome to Conexion-Solidaria
      </div>
      {/* Full-width image slider */}
      <FullWidthImageSlider />

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-between pl-8 md:p-16">
        {/* Left Column */}
        <div className="flex-1 space-y-8">


          {/* Section Heading and Description */}
          <div>
            <h2 className="text-gray-500 dark:text-gray-400 uppercase text-sm font-semibold mb-2 mt-60">
              Connecting Those in Need with Those Who Can Help
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              At Conexion-Solidaria, we believe that everyone has the ability to make a difference. Our platform allows users to post requests for help or offer assistance to those in need. Whether it’s food, clothing, shelter, or simply companionship, Conexion-Solidaria bridges the gap between those seeking help and those willing to provide it. Join us in creating a community where compassion thrives.
            </p>

            {/* Call to Action Button */}
            <button className="bg-black text-white dark:bg-gray-700 dark:text-gray-100 py-3 px-6 rounded-md flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-200">
              <span>Donate</span>
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

export const FullWidthImageSlider = () => {
  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // change the speed to control slide transition
    arrows: false,
  };

  return (
    <div className="relative w-full pt-4" >
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Slide 4"
            className="w-full h-96 object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

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
          At Conexion-Solidaria, we believe that every act of kindness matters. Our platform focuses on <span className="text-gray-400 dark:text-gray-500">bringing communities together</span> and offering a space where <span className="text-gray-400 dark:text-gray-500">help can be provided locally</span>. Whether you’re an individual or an organization, you can <span className="text-gray-400 dark:text-gray-500">make a real difference</span> by connecting with those around you.
        </h2>

        {/* Button */}
        <button className="mt-8 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white rounded-full py-2 px-6 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <span className="mr-2">Explore Features</span>
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
          The platform is designed to be <span className="text-gray-400 dark:text-gray-500">user-friendly</span>, allowing anyone to <span className="text-gray-400 dark:text-gray-500">post help requests</span> or offer assistance in a few easy steps. With <span className="text-gray-400 dark:text-gray-500">categorized tags</span> like food, clothing, and shelter, users can easily find relevant posts based on their interests and location, creating a more <span className="text-gray-400 dark:text-gray-500">targeted approach</span> to community help.
        </p>

        {/* Button */}
        <button className="mt-8 bg-white dark:bg-gray-800 text-black dark:text-white border-2 border-black dark:border-white rounded-full py-2 px-6 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <span className="mr-2"> Get Involved</span>
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
          YOUR TRUSTED COMMUNITY

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
    { value: '10,000+', label: 'People Reached' },
    { value: '1500+', label: 'Volunteers Joined' },
    { value: '3000+', label: 'Successfull Requests Completed' },
    { value: '4.8', label: 'Average User Rating', star: true },
    { value: '50+', label: 'Community Partnerships', star: true },
  ];

  // Using Intersection Observer
  const { ref, inView } = useInView({ threshold: 0.1 }); // Trigger when 10% is visible

  return (
    <div ref={ref} className="flex flex-col md:flex-row justify-around items-center text-center py-10 bg-white dark:bg-gray-900 space-y-4 md:space-y-0">
      {/* Title */}
      <div className="mb-6 md:mb-0">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">Conexion-Solidaria by <br></br> numbers</p>
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
        <span className="text-black dark:text-white">Uniting communities through compassion, connecting those in need with caring hearts — </span>
        <span className="text-gray-300 dark:text-gray-600">Transforming lives one act of kindness at a time — </span>
      </div>
    </div>
  );
};