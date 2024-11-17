import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Dashboard } from "../pages/Dashboard";
import { DonationPage } from "../pages/DonationPage";
import UnityGame from "../pages/UnityGame";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Posts from "../pages/Posts";
import ProtectedRoute from '../components/body/ProtectedRoute';
import { ProfileCard } from "../pages/Profile";
// import PostCard from "../components/body/PostCard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/posts",
                element: (
                    <ProtectedRoute>
                        <Posts />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfileCard />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/DonationPage",
                element: <DonationPage />,
            },
            {
                path: "/game",
                element: <UnityGame />,
            }

        ],
    },
]);