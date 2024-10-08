import React, { useState } from 'react';
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost";

import initialPosts from "../pages/postslist";
const Posts = () => {
  // const initialPosts = [
  //   {
  //     userId: {
  //       _id: "user101",
  //       firstName: "Jaimin",
  //       lastName: "Viramgama",
  //       profileUrl: jaimin,
  //       location: "Tirupati",
  //     },
  //     createdAt: "2024-10-07T12:55:00Z",
  //     description: "Breaking News: Rajasthan hit by a massive cyclone...",
  //     image: postimg,
  //     likes: ["user100", "user102"],
  //     location: "Tirupati",
  //     comments: [
  //       {
  //         _id: "comment1",
  //         userId: {
  //           _id: "user102",
  //           firstName: "Siddhant",
  //           lastName: "Chatse",
  //           profileUrl: sid,
  //         },
  //         createdAt: "2024-10-06T13:00:00Z",
  //         comment: "Great post!",
  //         likes: [],
  //         replies: [],
  //       },
  //     ],
  //   },
  // ];

  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...filteredPosts]);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if(query.length==0) return true;

    const searchWords = query.split(' ').filter(word => word.trim() !== ''); // Split by spaces and filter out empty words

    const filtered = posts.filter((post) => {
      const fullName = `${post.userId.firstName} ${post.userId.lastName}`.toLowerCase();
      const description = post.description.toLowerCase();

      // Check if any word in the query is present in either the name or description
      
      return searchWords.some((word) => 
        fullName.includes(word) || description.includes(word)
      );
    });

    setFilteredPosts(filtered);
  };

  return (
    <div style={{ display: 'flex', marginTop: '90px', marginBottom: '20px', justifyContent: 'space-around', marginLeft: '2%', marginRight: '2%' }}>
      
      <div style={{ width: '100%', maxWidth: '100%', marginLeft: '2%' }}>
        <AddPost addNewPost={addNewPost} style={{ maxHeight: '100%' }} />
      </div>

      <div style={{ width: '100%', maxWidth: '100%', marginLeft: '2%', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
        {filteredPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
