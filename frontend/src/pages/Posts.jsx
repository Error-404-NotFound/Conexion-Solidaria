import React, { useState } from 'react';
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost";
import initialPosts from "../pages/postslist";
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddPostVisible, setIsAddPostVisible] = useState(false); // State to control visibility of AddPost

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...filteredPosts]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length === 0) {
      setFilteredPosts(posts);
      return;
    }

    const searchWords = query.split(' ').filter(word => word.trim() !== '');

    const filtered = posts.filter((post) => {
      const fullName = `${post.userId.firstName} ${post.userId.lastName}`.toLowerCase();
      const description = post.description.toLowerCase();

      return searchWords.some((word) =>
        fullName.includes(word) || description.includes(word)
      );
    });

    setFilteredPosts(filtered);
  };

  const toggleAddPostVisibility = () => {
    setIsAddPostVisible(!isAddPostVisible); // Toggle the visibility of the AddPost form
  };

  return (
    <div className="posts-container" >
      {/* Button to toggle Add Post visibility */}
      <button 
        className="toggle-add-post-btn"
        onClick={toggleAddPostVisibility}
      >
        {isAddPostVisible ? 'Go back' : 'Publish new Post'}
      </button>

      {/* Conditionally render Add Post Section */}
      {isAddPostVisible ? (
        <div className="add-post-section">
          <AddPost addNewPost={addNewPost} />
        </div>
      ) : (
        <>
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Posts List */}
          <div className="posts-list">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
