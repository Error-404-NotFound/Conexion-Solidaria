import { createTheme, Switch, tabScrollButtonClasses } from '@mui/material';
import React, { useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, THEME_ID } from '@mui/material/styles';
import { set } from 'react-hook-form';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Posts', path: '/posts' },
];

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff0000',
        },
        secondary: {
            main: '#00ff00',
        },
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
    const [navBg, setNavBg] = React.useState('bg-[#15151580]');
    const [user, setUser] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('bg-white backdrop-filter backdrop-blur-x1 bg-opacity-0 dark:text-white text-black');
            }
            else {
                setNavBg('bg-white dark:bg-black dark:text-white text-black');
            }
        }
        else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-white dark:bg-black dark:text-white text-black'}`);
        }
    }, [scrollPosition]);

    const handleLogout = () => {
        console.log('Logging out');
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${isHome ? navBg : "bg-white dark:bg-black backdrop-blur-2x1"} ${isFixed ? "static" : "fixed"} top-0 transition-colors duration-500 ease-in-out w-full z-10`}>
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex items-center justify-between'>
                    {/* logo */}
                    <div >
                        <h1 className='text-2x1 inline-flex gap-3 items-center font-bold  text-black dark:text-white'>Conexion-Solidaria<img src="../../../public/yoga-logo.png" alt="" className='w-8 h-8' /></h1>
                        <p className='font-bold text-[13px] tracking-[1.5px]  text-black dark:text-white'>Connecting Communities</p>
                    </div>


                    {/* mobile menu icons */}
                    <div className='md:hidden flex items-center'>
                        <button type="button" onClick={toggleMobileMenu} className='text-grey hover:text-white focus:outline-none'>
                            <FaBars className='h-6 w-6 hover:text-primary' />

                        </button>
                    </div>

                    {/* navigation links */}

                    <div className='hidden md:block text-black dark:text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {
                                    navLinks.map((link) => (
                                        <li key={link.route}>
                                            <NavLink
                                                to={link.path}
                                                className={({ isActive }) =>
                                                    `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                                        'text-black dark:text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                                }>{link.name}</NavLink>
                                        </li>
                                    ))
                                }

                                {/* based on users */}
                                {
                                    user ? null : isLogin ?
                                        <li>
                                            <NavLink
                                                to="/register"
                                                className={({ isActive }) =>
                                                    `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                                        'text-black dark:text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                                }
                                            >Register</NavLink>
                                        </li>
                                        : <li>
                                            <NavLink
                                                to="/login"
                                                className={({ isActive }) =>
                                                    `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                                        'text-black dark:text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                                }
                                            >Login</NavLink>
                                        </li>
                                }

                                {
                                    user && <li>
                                        <NavLink
                                            to="/dashboard"
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-secondary' : `${navBg.includes('bg-transparent') ?
                                                    'text-white' : 'text-black dark:text-white'}`} hover:text-secondary duration-300`
                                            }>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                }

                                {
                                    user && <li>
                                        <img src={user?.photoURL || '../src/assets/home/girl.jpg'} alt={user?.displayName} className='w-8 h-8 rounded-full' />
                                    </li>
                                }

                                {
                                    user && <li>
                                        <NavLink onClick={handleLogout}
                                            className={'font-bold px-3 py-2 bg-secondary text-white rounded-x1'}
                                        >Logout</NavLink>
                                    </li>
                                }

                                {/* color toggle */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center item-center'>
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px]'>Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </motion.nav>
    )
}
