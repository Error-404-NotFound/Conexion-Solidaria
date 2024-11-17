import React, { useState, useEffect } from 'react';
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost";
import { FaTh } from 'react-icons/fa';
import api from '../services/api'; // Make sure to install axios if you haven't already
import './post.css';

const Posts = () => {
  const [posts, setPosts] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPostVisible, setIsAddPostVisible] = useState(false); // State to control visibility of AddPost
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isGridLayout, setIsGridLayout] = useState(true); // State to toggle grid/list view (default grid)

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the front of the list
    setFilteredPosts([newPost, ...posts]);
  };

  const removePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId)); // Remove the post with the given ID
    setFilteredPosts(posts.filter(post => post._id !== postId));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/display-posts'); // Adjust to your actual endpoint
        setPosts(response.data); // Assuming the response is an array of posts
        setFilteredPosts(response.data);
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchPosts();
  }, []); // Empty array means this runs once when the component mounts

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setFilteredPosts(posts);
      return;
    }

    const searchWords = query.split(' ').filter(word => word.trim() !== '');

    const filtered = posts.filter((post) => {
      const fullName = ${post.author.username}.toLowerCase();
      const description = post.Description.toLowerCase();

      return searchWords.some((word) =>
        fullName.includes(word) || description.includes(word)
      );
    });

    setFilteredPosts(filtered);
  };

  const toggleAddPostVisibility = () => {
    setIsAddPostVisible(!isAddPostVisible); // Toggle the visibility of the AddPost form
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout); // Toggle grid/list view
  };

  if (loading) return <div>Loading posts...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error handling

  return (
    <div>
      <div className="posts-container">
        {/* Controls Section */}
        <div className="controls-section">
          {/* Search Bar */}
          <div className="search-bar dark:text-gray-200">
            <label htmlFor="search" className="search-label">
              Search:
            </label>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Grid/List Toggle Button */}
          <button className="toggle-layout-btn" onClick={toggleLayout}>
            <FaTh size={20} />
            {isGridLayout ? 'List View' : 'Grid View'}
          </button>

          {/* Add Post Button */}
          <button className="toggle-add-post-btn" onClick={toggleAddPostVisibility}>
            {isAddPostVisible ? 'Go back' : 'Publish new Post'}
          </button>
        </div>

        {/* Conditionally render Add Post Section */}
        {isAddPostVisible ? (
          <div className="add-post-section">
            <AddPost addNewPost={addNewPost} />
          </div>
        ) : (
          <div className={posts-display ${isGridLayout ? 'grid-layout' : 'list-layout'}}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div className="post-card-container" key={post._id} >
                  <PostCard post={post} onDelete={removePost} isGridLayout={isGridLayout} />
                </div>
              ))
            ) : (
              <p className="no-posts-message">No posts found.</p>
            )}
          </div>


        )}
      </div>
    </div>
  );
};

export default Posts;
