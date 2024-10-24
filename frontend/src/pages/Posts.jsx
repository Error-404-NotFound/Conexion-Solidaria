// import React, { useState } from 'react';
// import PostCard from "../components/body/PostCard";
// import AddPost from "../components/body/AddPost";
// // import pic from "../assets/userprofile.png";
// import postimg from "../assets/forestfire.jpg";
// import jaimin from "../assets/jaimin.png";
// import sid from "../assets/sid.png";

// const Posts = () => {
//   const initialPosts = [
//     {
//       author: {
//         _id: "user101",
//         username: "user101",
//         // firstName: "Jaimin",
//         // lastName: "Viramgama",
//         profileUrl: jaimin,
//         Location: "Tirupati",
//       },
//       // 2024-10-06T12:00:00Z
//       createdAt: "2024-10-07T12:55:00Z",
//       Description: "Breaking News: Rajasthan hit by a massive cyclone, resulting in formation of new island in middle of the thar dessert, especially the region of Neem ka thana is affected massively. 50 % of the local are now shifted to safer place. but harshit is still missing!! ",
//       Image: postimg,
//       likes: ["user100", "user102"],
//       Location: "Tirupati",
//       comments: [
//         //   {
//         //     _id: "comment1",
//         //     userId: {
//         //       _id: "user102",
//         //       firstName: "Siddhant",
//         //       lastName: "Chatse",
//         //       profileUrl: sid,
//         //     },
//         //     createdAt: "2024-10-06T13:00:00Z",
//         //     comment: "Great post!",

//         //     likes: [],
//         //     replies: [],
//         //   },
//       ],
//     },
//   ];

//   const [posts, setPosts] = useState(initialPosts);

//   const addNewPost = (newPost) => {
//     setPosts([newPost, ...posts]);
//   };

//   return (
//     <div style={{ display: 'flex', marginTop: '90px', marginBottom: '20px', justifyContent: 'space-around', marginLeft: '2%', marginRight: '2%' }}>

//       <div style={{ width: '100%', maxWidth: '100%', marginLeft: '2%' }}>
//         <AddPost addNewPost={addNewPost} style={{ maxHeight: '100%' }} />
//       </div>

//       <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
//         {posts.map((post, index) => (
//           <PostCard key={index} post={post} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Posts;


import React, { useState, useEffect } from 'react';
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost";
import api from '../services/api'; // Make sure to install axios if you haven't already




const Posts = () => {
  const [posts, setPosts] = useState([]); // Start with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addNewPost = (newPost) => {
    console.log("its ok");
    console.log(newPost);
    setPosts([newPost, ...posts]); // Add new post to the front of the list
  };

  const removePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId)); // Remove the post with the given ID
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("hah");
        const response = await api.get('/display-posts'); // Adjust to your actual endpoint
        setPosts(response.data); // Assuming the response is an array of posts
        console.log(response.data);
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchPosts();
  }, []); // Empty array means this runs once when the component mounts

  if (loading) return <div>Loading posts...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error handling

  return (
    <div style={{ display: 'flex', marginTop: '90px', marginBottom: '20px', justifyContent: 'space-around', marginLeft: '2%', marginRight: '2%' }}>
      <div style={{ width: '100%', maxWidth: '100%', marginLeft: '2%' }}>
        <AddPost addNewPost={addNewPost} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={removePost} /> // Use unique post._id as key
        ))}
      </div>
    </div>
  );
};

export default Posts;
