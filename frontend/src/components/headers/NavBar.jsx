import { createTheme, Switch, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Posts', path: '/posts' },
    { name: 'Donation', path: '/DonationPage' },
];

const theme = createTheme({
    palette: {
        primary: { main: '#ff4500' },
        secondary: { main: '#00b894' },
    },
});

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isHome, setIsHome] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const [scrollPosition, setScrollPosition] = React.useState(0);
    const [isFixed, setIsFixed] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [navBg, setNavBg] = React.useState('bg-gradient-to-r from-[#15151580] to-[#33333380]');
    const [navbarHeight, setNavbarHeight] = React.useState('h-20'); // Start with a larger navbar height (e.g., h-20)
    const { user, logout } = useAuth();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        if (scrollPosition > 50) {
            setNavBg('bg-white shadow-md dark:bg-gray-900');
            setNavbarHeight('h-16'); // Shrink navbar height after scrolling
        } else {
            setNavBg(`${isHome ? 'bg-transparent' : 'bg-white dark:bg-gray-900'}`);
            setNavbarHeight('h-20'); // Reset navbar height when at top
        }
    }, [scrollPosition, isHome]);

    const handleLogout = () => {
        console.log('Logging out');
        logout();
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${navBg} ${isFixed ? "fixed" : "sticky"} top-0 transition-all duration-300 ease-in-out w-full z-50 shadow-lg border-b border-gray-200 dark:border-gray-700 ${navbarHeight}`}
        >
            <div className="lg:w-[95%] mx-auto sm:px-2 lg:px-3 ">
                <div className="px-3 py-2 flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <h1 className="text-xl inline-flex gap-3 items-center font-bold text-black dark:text-white">
                            Conexion-Solidaria
                            <img src="../../../public/yoga-logo.png" alt="" className="w-6 h-6" />
                        </h1>
                        <p className="font-semibold text-[9px] tracking-[1px] text-black dark:text-gray-200">
                            Connecting Communities
                        </p>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            onClick={toggleMobileMenu}
                            className="text-gray-600 hover:text-primary dark:text-gray-200 focus:outline-none"
                        >
                            <FaBars className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className={`${isMobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center md:items-center md:static absolute inset-x-0 top-12 bg-white dark:bg-gray-900 p-4 md:p-0 md:bg-transparent`}>
                        <ul className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `font-semibold text-base ${isActive ? 'text-secondary' : 'text-gray-900 dark:text-gray-200'} hover:text-primary dark:hover:text-secondary transition-colors duration-200`
                                        }
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            {!user && isLogin ? (
                                <li>
                                    <NavLink
                                        to="/register"
                                        className="font-semibold text-base text-gray-900 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            ) : !user ? (
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="font-semibold text-base text-gray-900 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            className="font-semibold text-base text-gray-900 dark:text-gray-200 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <li key="/profile">
                                            <NavLink
                                                to="/profile"
                                                className="font-semibold text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                                            >
                                                <img src={user?.photoURL || '../src/assets/home/girl.jpg'} alt={user?.displayName} className="w-6 h-6 rounded-full" />
                                            </NavLink>
                                        </li>
                                        {/* <img src={user?.photoURL || '../src/assets/home/girl.jpg'} alt={user?.displayName} className="w-6 h-6 rounded-full" /> */}
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="font-semibold px-2 py-1 bg-primary text-white rounded-md hover:bg-secondary transition duration-200">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                            {/* {user &&
                                (<li key="/profile">
                                    <NavLink
                                        to="/profile"
                                        className="font-semibold text-base text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors duration-200"
                                    >
                                        <img src={user?.photoURL || '../src/assets/home/girl.jpg'} alt={user?.displayName} className="w-6 h-6 rounded-full" />
                                    </NavLink>
                                </li>)
                            } */}
                            {/* Dark Mode Toggle */}
                            <li>
                                <IconButton onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-500 dark:text-gray-400">
                                    {isDarkMode ? <FaMoon /> : <FaSun />}
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};
