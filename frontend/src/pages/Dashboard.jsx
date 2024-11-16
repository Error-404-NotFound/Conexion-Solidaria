import React from 'react';
import { useAuth } from "../context/AuthContext";


export const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 dark:bg-gray-700 text-white p-6 space-y-8">
                <h2 className="text-3xl font-bold">Hi {user.username}</h2>
                <nav className="space-y-4">
                    <ul>
                        <li><a href="/" className="text-lg hover:text-gray-400">Home</a></li>
                        <li><a href="/posts" className="text-lg hover:text-gray-400">Posts</a></li>
                        <li><a href="/DonationPage" className="text-lg hover:text-gray-400">Donation</a></li>
                        <li><a href="/profile" className="text-lg hover:text-gray-400">Profile</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-800">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,245</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Active Projects</h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">78</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Pending Requests</h3>
                        <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">22</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
                    <div className="bg-white dark:bg-gray-700 p-6 mt-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Activity Log</h3>
                        <ul className="space-y-4 mt-4">
                            <li className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>User John Doe added a new project</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                            </li>
                            <li className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Project "X" was marked as completed</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</span>
                            </li>
                            <li className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>User Jane Smith requested assistance</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">1 day ago</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
