import React, { useState } from 'react';
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost";
// import pic from "../assets/userprofile.png";
import postimg from "../assets/forestfire.jpg";
import jaimin from "../assets/jaimin.png";
import sid from "../assets/sid.png";

const Posts = () => {
  const initialPosts = [
    {
      userId: {
        _id: "user101",
        firstName: "Jaimin",
        lastName: "Viramgama",
        profileUrl: jaimin,
        location: "Tirupati",
      },
      // 2024-10-06T12:00:00Z
      createdAt: "2024-10-07T12:55:00Z",
      description: "Breaking News: Rajasthan hit by a massive cyclone, resulting in formation of new island in middle of the thar dessert, especially the region of Neem ka thana is affected massively. 50 % of the local are now shifted to safer place. but harshit is still missing!! ",
      image: postimg,
      likes: ["user100", "user102"],
      location:"Tirupati",
      comments: [
        {
          _id: "comment1",
          userId: {
            _id: "user102",
            firstName: "Siddhant",
            lastName: "Chatse",
            profileUrl: sid,
          },
          createdAt: "2024-10-06T13:00:00Z",
          comment: "Great post!",
          
          likes: [],
          replies: [],
        },
      ],
    },
  ];

  const [posts, setPosts] = useState(initialPosts);

  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div style={{display:'flex',marginTop:'90px',marginBottom:'20px',justifyContent:'space-around',marginLeft:'2%',marginRight:'2%'}}>

      <div style={{ width: '100%', maxWidth: '100%' , marginLeft:'2%'}}>
        <AddPost addNewPost={addNewPost} style={{maxHeight:'100%'}} />
      </div>

        <div style={{display: 'flex', flexDirection: 'column',marginLeft:'3%'}}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      </div>
    </div>
  );
};

export default Posts;
