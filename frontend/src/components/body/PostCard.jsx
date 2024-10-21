import React, { useState } from "react";
import "./PostCard.css";
import aniket from "../../assets/aniket.png";

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

const PostCard = ({ post }) => {
  const userId = "user100"; // This should be replaced with the actual logged-in user's ID
  const [showAll, setShowAll] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);

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
          firstName: "Aniket",
          lastName: "Johri",
          profileUrl: aniket,
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
        firstName: "Aniket",
        lastName: "Johri",
        profileUrl: aniket,
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
    <div className="post-card" >
      <div className="post-card-header">
        <img
          src={post.userId.profileUrl}
          alt={`${post.userId.firstName} ${post.userId.lastName}`}
          className="post-card-user-image"
        />
        <div className="post-card-user-info">
          <p className="post-card-user-name">{`${post.userId.firstName} ${post.userId.lastName}`}</p>
          <p className="post-card-location">{post.location}</p>
        </div>
        <span className="post-card-timestamp">{timeAgo(post.createdAt)}</span>
      </div>
      {/* <button className="delete-post-button" onClick={handleDeletePost}>
          Delete
        </button> */}

      <div className="post-card-body">
        <div className="post-card-description">
          {showAll
            ? post.description
            : `${post.description.slice(0, 100)}...`}
          {post.description.length > 100 && (
            <span
              className="post-card-toggle-text"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? " Show Less" : " Show More"}
            </span>
          )}
        </div>

        {post.image && (
          <img src={post.image} alt="Post" className="post-card-image" />
        )}
      </div>
      <div className="post-card-footer">
        <p className="post-card-likes" onClick={handleLike}>
          {likes.includes(userId) ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#0000ff" d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M5 9v12H1V9zm4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21zm0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03z" /></svg>
          )}
          {likes.length} Likes
        </p>
        <p
          className="post-card-comments"
          onClick={() => setShowComments(!showComments)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M12 23a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L16.08 17H21V7H7v10zM3 15H1V3a2 2 0 0 1 2-2h16v2H3z" /></svg>
          {comments.length} Comments
        </p>
        <div
          className="post-card-delete"
          onClick={handleDeletePost}
        >

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
              width="50%"
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
                    <span className="post-card-comment-time" style={{ color: '#666', fontSize: '0.9em', fontWeight: 'normal' }}>{timeAgo(comment.createdAt)} </span>
                  </p>
                </div>



              </div>
              <p className="post-card-comment-text" style={{ paddingLeft: '5px' }}>{comment.comment}</p>
              <div className="post-card-comment-actions" style={{ paddingLeft: '5px' }}>
                <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                  <input type="text" name="replyInput" style={{ paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px' }} placeholder="Reply..." required />
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
                <div className="post-card-replies" style={{ paddingLeft: '5px' }}>
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="post-card-reply">
                      <img
                        src={reply.userId.profileUrl}
                        alt={reply.userId.firstName}
                        className="post-card-reply-user-image"
                      />
                      <div>
                        <p className="post-card-reply-user-name">{`${reply.userId.firstName} ${reply.userId.lastName} `}
                          <span className="post-card-reply-comment-time" style={{ color: '#666', fontSize: '0.9em', fontWeight: 'normal' }}>{timeAgo(reply.createdAt)} </span>
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
