import React from "react";
import PostCard from "../components/body/PostCard";


const id = [1,2,3,4]
function Posts(){

  return (
    <div>
      {id.map(id => <PostCard id={id} />)}
    </div>
  )
}

export default Posts;