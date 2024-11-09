import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-8 mt-16">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Us Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">About Us</h3>
                    <p className="text-gray-400">
                        Conexion-Solidaria is a community-driven platform that connects those in need with those who can help. We believe in the power of collective action to create a better world for everyone.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>
                            <a href="#home" className="hover:text-teal-300 transition duration-300">Home</a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-teal-300 transition duration-300">About</a>
                        </li>
                        <li>
                            <a href="#donate" className="hover:text-teal-300 transition duration-300">Donate</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-teal-300 transition duration-300">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social Media Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Contact</h3>
                    <p className="text-gray-400">Reach us via email or through our social media channels:</p>
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M22 12.073C22 18.458 18.428 23 14 23c-3.314 0-6-2.685-6-6 0-2.226 1.165-4.167 2.904-5.266-.354-.906-.904-1.671-1.548-2.379C8.767 8.331 8 10.031 8 12c0 4.418 3.582 8 8 8 3.627 0 6.68-2.53 7.26-5.826-.637-3.449-2.37-5.757-5.207-7.632-.525-.364-1.07-.736-1.643-1.112-.029-.057-.059-.115-.09-.173-.095-.127-.195-.256-.3-.387-.117-.133-.244-.258-.377-.381.414-.697.706-1.486.853-2.265.122-.532.024-1.034-.188-1.495-.44-1.61-1.79-3.394-4.214-4.276-2.091-.806-3.638-.142-4.255 1.234-.285.494-.4 1.05-.353 1.613-.374.366-.686.759-.968 1.183-.19-.008-.379-.021-.574-.021-5.5 0-10 4.5-10 10s4.5 10 10 10c5.5 0 10-4.5 10-10 0-.742-.075-1.467-.2-2.173-.107-.54-.208-1.071-.308-1.588z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M22 5.924c-.812.358-1.68.601-2.59.71.93-.56 1.642-1.448 1.975-2.51-.87.515-1.83.892-2.86 1.092C17.335 2.844 16.135 2 14.768 2c-2.837 0-5.134 2.647-4.52 5.347-3.635-.184-6.872-1.919-9.034-4.56-.374.644-.585 1.385-.585 2.174 0 1.5.79 2.821 1.98 3.595-1.01-.033-1.97-.31-2.798-.774-.00005.027-.0001.054-.0001.08 0 2.089 1.48 3.843 3.459 4.246-.582.16-1.193.255-1.81.255-.444 0-.876-.041-1.301-.115.876 2.826 3.424 4.877 6.47 4.934-2.358 1.858-5.316 2.96-8.567 2.96-1.18 0-2.34-.069-3.492-.195 3.773 2.416 8.262 3.627 13.069 3.627 15.645 0 24.244-13.006 24.244-24.249 0-.367-.01-.736-.029-1.104-.001-.008-.007-.018-.01-.026z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M12 2.163c3.001 0 3.417.011 4.616.067 1.134.054 2.176.24 3.132 1.195.957.957 1.14 2.028 1.195 3.131.057 1.2.067 1.616.067 4.616 0 3.001-.011 3.417-.067 4.616-.054 1.103-.24 2.176-1.195 3.131-.957.956-2.028 1.14-3.131 1.195-1.199.057-1.616.067-4.616.067-3.001 0-3.417-.011-4.616-.067-1.103-.054-2.176-.24-3.131-1.195-.957-.956-1.14-2.029-1.195-3.131-.057-1.2-.067-1.616-.067-4.616 0-3.001.011-3.417.067-4.616.054-1.103.24-2.175 1.195-3.131.957-.955 2.029-1.141 3.131-1.195 1.199-.056 1.615-.067 4.616-.067zm0 1.819c-3.144 0-3.516.01-4.748.067-1.085.054-1.711.269-2.322.88-.611.611-.826 1.236-.88 2.322-.057 1.233-.067 1.605-.067 4.749s.01 3.516.067 4.749c.054 1.085.269 1.711.88 2.322.611.611 1.236.826 2.322.88 1.233.057 1.605.067 4.748.067 3.144 0 3.516-.01 4.748-.067 1.085-.054 1.711-.269 2.322-.88.611-.611.826-1.237.88-2.322.057-1.233.067-1.605.067-4.749s-.01-3.516-.067-4.749c-.054-1.085-.269-1.711-.88-2.322-.611-.611-1.236-.826-2.322-.88-1.232-.057-1.604-.067-4.748-.067zm0 3.6c.649 0 1.179.52 1.179 1.17s-.52 1.17-1.179 1.17c-.649 0-1.17-.52-1.17-1.17s.521-1.17 1.17-1.17zm0 1.81c-.354 0-.638.285-.638.64s.285.64.638.64c.355 0 .639-.285.639-.64s-.285-.64-.639-.64z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/*             
            <div className="mt-8 text-center">
                <h4 className="text-xl font-semibold">Stay Connected</h4>
                <p className="text-gray-400">Sign up for our newsletter to get the latest updates and news.</p>
                <form className="mt-4 flex justify-center">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-3 text-black rounded-l-lg w-72"
                        required
                    />
                    <button className="bg-teal-500 text-white p-3 rounded-r-lg hover:bg-teal-600 transition duration-300">
                        Subscribe
                    </button>
                </form>
            </div> */}
        </footer>
    );
};

