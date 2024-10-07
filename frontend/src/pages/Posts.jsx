import React from "react";
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost"


const id = [1,2,3,4]
function Posts(){

  return (
    <div style={{marginTop:'90px'}} className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <AddPost></AddPost>
      {id.map(id => <PostCard id={id} />)}
    </div>
  )
}

export default Posts;