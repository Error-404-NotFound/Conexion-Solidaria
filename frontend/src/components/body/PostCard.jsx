import React, { useState } from "react";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import "./PostCard.css"; // Import the CSS file
import pic from "../../assets/userprofile.png";
import postimg from "../../assets/forestfire.jpg";

const hardCodedPost = {
  userId: {
    _id: "user123",
    firstName: "John",
    lastName: "Doe",
    profileUrl: pic,
    location: "New York, USA",
  },
  createdAt: "2024-10-06T12:00:00Z",
  description:
    "This is a hardcoded post description. It can be a little longer than expected to demonstrate text truncation in the UI. Let's see how the text gets displayed in the post card.",
  image: postimg,
  likes: ["user123", "user456"],
  comments: [
    {
      _id: "comment1",
      userId: {
        _id: "user456",
        firstName: "Jane",
        lastName: "Smith",
        profileUrl: "https://via.placeholder.com/150",
      },
      createdAt: "2024-10-06T13:00:00Z",
      comment: "Great post!",
      likes: [],
      replies: [],
    },
  ],
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${seconds} seconds ago`;
};

const PostCard = () => {
  const userId = "user123"; // This should be replaced with the actual logged-in user's ID
  const [showAll, setShowAll] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(hardCodedPost.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(hardCodedPost.comments);

  const handleLike = () => {
    const currentUserId = userId; // This should be replaced with the actual logged-in user's ID
    if (likes.includes(currentUserId)) {
      setLikes(likes.filter((id) => id !== currentUserId)); // Unlike
    } else {
      setLikes([...likes, currentUserId]); // Like
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment) {
      const newCommentData = {
        _id: `comment${comments.length + 1}`,
        userId: {
          _id: userId,
          firstName: "John",
          lastName: "Doe",
          profileUrl: "https://via.placeholder.com/150",
        },
        createdAt: new Date().toISOString(),
        comment: newComment,
        likes: [],
        replies: [],
      };
      setComments([...comments, newCommentData]);
      setNewComment(""); // Clear input
    }
  };

  const handleDeletePost = () => {
    console.log("Post deleted");
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment._id !== commentId));
  };

  const handleDeleteReply = (commentId, replyId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply._id !== replyId),
          };
        }
        return comment;
      })
    );
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    const replyInput = e.target.elements.replyInput.value;
    const replyData = {
      _id: `reply${Math.random()}`, // Using random ID for simplicity
      userId: {
        _id: userId,
        firstName: "John",
        lastName: "Doe",
        profileUrl: "https://via.placeholder.com/150",
      },
      createdAt: new Date().toISOString(),
      comment: replyInput,
    };

    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, replies: [...comment.replies, replyData] };
      }
      return comment;
    });

    setComments(updatedComments);
    e.target.reset(); // Clear input
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <img
          src={hardCodedPost.userId.profileUrl}
          alt={hardCodedPost.userId.firstName}
          className="post-card-user-image"
        />
        <div className="post-card-user-info">
          <p className="post-card-user-name">{`${hardCodedPost.userId.firstName} ${hardCodedPost.userId.lastName}`}</p>
          <span className="post-card-location">{hardCodedPost.userId.location}</span>
        </div>
        <span className="post-card-timestamp">
          {new Date(hardCodedPost.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="post-card-body">
        <p>
          {showAll
            ? hardCodedPost.description
            : `${hardCodedPost.description.slice(0, 100)}...`}
          {hardCodedPost.description.length > 100 && (
            <span
              className="post-card-toggle-text"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? " Show Less" : " Show More"}
            </span>
          )}
        </p>
        {hardCodedPost.image && (
          <img
            src={hardCodedPost.image}
            alt="post"
            className="post-card-image"
            style={{width:'90%', justifyContent:'center',marginLeft:'5%'}}
          />
        )}
      </div>
      <div className="post-card-footer">
        <p className="post-card-likes" onClick={handleLike}>
          {likes.includes(userId) ? (
            <BiSolidLike size={20} color="blue" />
          ) : (
            <BiLike size={20} />
          )}
          {likes.length} Likes
        </p>
        <p
          className="post-card-comments"
          onClick={() => setShowComments(!showComments)}
        >
          <BiComment size={20} />
          {comments.length} Comments
        </p>
        <div
          className="post-card-delete"
          onClick={handleDeletePost}
        >
          <MdOutlineDeleteOutline size={20} />
          <span>Delete</span>
        </div>
      </div>

      {showComments && (
        <div className="post-card-comments-section">
          <form onSubmit={handleCommentSubmit} className="post-card-comment-form">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="post-card-comment-input"
              required
            />
            <button type="submit" className="post-card-submit-button">
              Submit
            </button>
          </form>
          {comments.map((comment) => (
            <div key={comment._id} className="post-card-comment">
              <div className="post-card-comment-header">
                <img
                  src={comment.userId.profileUrl}
                  alt={comment.userId.firstName}
                  className="post-card-comment-user-image"
                />
                <div className="post-card-comment-user-info">
                  <p className="post-card-comment-user-name">
                    {`${comment.userId.firstName} ${comment.userId.lastName} `}
                    <span className="post-card-comment-time" style={{ color: '#666', fontSize: '0.9em',fontWeight:'normal' }}>{timeAgo(comment.createdAt)} </span>
                  </p>
                </div>



              </div>
              <p className="post-card-comment-text" style={{paddingLeft:'5px'}}>{comment.comment}</p>
              <div className="post-card-comment-actions" style={{paddingLeft:'5px'}}>
                <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                  <input type="text" name="replyInput" placeholder="Reply..." required />
                  <button type="submit" className="post-card-reply-button">Reply</button>
                </form>
                {/* Show delete button only if the logged-in user is the comment author */}
                {comment.userId._id === userId && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="post-card-delete-comment-button"
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                )}
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div className="post-card-replies" style={{paddingLeft:'5px'}}>
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="post-card-reply">
                      <img
                        src={reply.userId.profileUrl}
                        alt={reply.userId.firstName}
                        className="post-card-reply-user-image"
                      />
                      <div>
                        <p className="post-card-reply-user-name">{`${reply.userId.firstName} ${reply.userId.lastName} `}
                        <span className="post-card-reply-comment-time" style={{ color: '#666', fontSize: '0.9em',fontWeight:'normal' }}>{timeAgo(reply.createdAt)} </span>
                        </p>
                        <p className="post-card-reply-text">{reply.comment}
                        
                        {reply.userId._id === userId && (
                          <button
                            onClick={() => handleDeleteReply(comment._id, reply._id)}
                            className="post-card-delete-reply-button"
                            style={{ backgroundColor: 'red', color: 'white' }}
                          >Delete
                          </button>
                        )}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
