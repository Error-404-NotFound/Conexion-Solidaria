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
                            <a href="/" className="hover:text-teal-300 transition duration-300">Home</a>
                        </li>
                        <li>
                            <a href="about" className="hover:text-teal-300 transition duration-300">About</a>
                        </li>
                        <li>
                            <a href="#donate" className="hover:text-teal-300 transition duration-300">Donate</a>
                        </li>
                        <li>
                            <a href="contact" className="hover:text-teal-300 transition duration-300">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact & Social Media Section */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Contact</h3>
                    <p className="text-gray-400">Reach us via email or through our social media channels:</p>
                    <div className="flex space-x-6 items-center"> {/* Added items-center to align items properly */}
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                                <g>
                                    <path d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z" style={{ fill: '#1877f2', fillRule: 'nonzero' }} />
                                    <path d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z" style={{ fill: '#fff', fillRule: 'nonzero' }} />
                                </g>
                            </svg>
                        </a>

                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                                <path d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104" style={{ fill: '#1da1f2', fillRule: 'nonzero' }} />
                            </svg>
                        </a>


                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-300 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
                                <g id="_x37__stroke">
                                    <g id="Instagram_1_">
                                        <rect clipRule="evenodd" fill="none" fillRule="evenodd" height="128" width="128" />
                                        <radialGradient cx="19.1111" cy="128.4444" gradientUnits="userSpaceOnUse" id="Instagram_2_" r="163.5519">
                                            <stop offset="0" style={{ stopColor: "#FFB140" }} />
                                            <stop offset="0.2559" style={{ stopColor: "#FF5445" }} />
                                            <stop offset="0.599" style={{ stopColor: "#FC2B82" }} />
                                            <stop offset="1" style={{ stopColor: "#8E40B7" }} />
                                        </radialGradient>
                                        <path clipRule="evenodd" d="M105.843,29.837c0,4.242-3.439,7.68-7.68,7.68c-4.241,0-7.68-3.438-7.68-7.68c0-4.242,3.439-7.68,7.68-7.68C102.405,22.157,105.843,25.595,105.843,29.837z M64,85.333c-11.782,0-21.333-9.551-21.333-21.333c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333C85.333,75.782,75.782,85.333,64,85.333z M64,31.135c-18.151,0-32.865,14.714-32.865,32.865c0,18.151,14.714,32.865,32.865,32.865c18.151,0,32.865-14.714,32.865-32.865C96.865,45.849,82.151,31.135,64,31.135z M64,11.532c17.089,0,19.113,0.065,25.861,0.373c6.24,0.285,9.629,1.327,11.884,2.204c2.987,1.161,5.119,2.548,7.359,4.788c2.24,2.239,3.627,4.371,4.788,7.359c0.876,2.255,1.919,5.644,2.204,11.884c0.308,6.749,0.373,8.773,0.373,25.862c0,17.089-0.065,19.113-0.373,25.861c-0.285,6.24-1.327,9.629-2.204,11.884c-1.161,2.987-2.548,5.119-4.788,7.359c-2.239,2.24-4.371,3.627-7.359,4.788c-2.255,0.876-5.644,1.919-11.884,2.204c-6.748,0.308-8.772,0.373-25.861,0.373c-17.09,0-19.114-0.065-25.862-0.373c-6.24-0.285-9.629-1.327-11.884-2.204c-2.987-1.161-5.119-2.548-7.359-4.788c-2.239-2.239-3.627-4.371-4.788-7.359c-0.876-2.255-1.919-5.644-2.204-11.884c-0.308-6.749-0.373-8.773-0.373-25.861c0-17.089,0.065-19.113,0.373-25.862c0.285-6.24,1.327-9.629,2.204-11.884c1.161-2.987,2.548-5.119,4.788-7.359c2.239-2.24,4.371-3.627,7.359-4.788c2.255-0.876,5.644-1.919,11.884-2.204C44.887,11.597,46.911,11.532,64,11.532z M64,0C46.619,0,44.439,0.074,37.613,0.385C30.801,0.696,26.148,1.778,22.078,3.36c-4.209,1.635-7.778,3.824-11.336,7.382C7.184,14.3,4.995,17.869,3.36,22.078c-1.582,4.071-2.664,8.723-2.975,15.535C0.074,44.439,0,46.619,0,64c0,17.381,0.074,19.561,0.385,26.387c0.311,6.812,1.393,11.464,2.975,15.535c1.635,4.209,3.824,7.778,7.382,11.336c3.558,3.558,7.127,5.746,11.336,7.382c4.071,1.582,8.723,2.664,15.535,2.975C44.439,127.926,46.619,128,64,128c17.381,0,19.561-0.074,26.387-0.385c6.812-0.311,11.464-1.393,15.535-2.975c4.209-1.636,7.778-3.824,11.336-7.382c3.558-3.558,5.746-7.127,7.382-11.336c1.582-4.071,2.664-8.723,2.975-15.535C127.926,83.561,128,81.381,128,64c0-17.381-0.074-19.561-0.385-26.387c-0.311-6.812-1.393-11.464-2.975-15.535c-1.636-4.209-3.824-7.778-7.382-11.336c-3.558-3.558-7.127-5.746-11.336-7.382c-4.071-1.582-8.723-2.664-15.535-2.975C83.561,0.074,81.381,0,64,0z" fill="url(#Instagram_2_)" fillRule="evenodd" />
                                    </g>
                                </g>
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

