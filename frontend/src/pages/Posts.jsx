import React from "react";
import PostCard from "../components/body/PostCard";
import AddPost from "../components/body/AddPost"


const id = [1,2,3,4]
function Posts(){

  return (
    <div style={{marginTop:'90px'}}>
      <AddPost></AddPost>
      {id.map(id => <PostCard id={id} />)}
    </div>
  )
}

export default Posts;