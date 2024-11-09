import React, { useState } from "react";
import "./PostCard.css";
import userprofile from "../../assets/userprofile.png";
import api from "../../services/api"
import { useAuth } from "../../context/AuthContext";
import Posts from "../../pages/Posts";

const timeAgo = (date) => {
  const now = new Date();
  const parsedDate = new Date(date);
  // console.log(date);
  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date:', date);
    return 'Invalid date';
  }

  const seconds = Math.floor((now - parsedDate) / 1000);
  let interval = Math.floor(seconds / 31536000); // Years

  if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 2592000); // 30 days
  if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;
  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;

  return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
};


const PostCard = ({ post, onDelete }) => {
  const { posts } = Posts();
  const { user } = useAuth();
  const userId = user.username; // This should be replaced with the actual logged-in user's ID
  const [showAll, setShowAll] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.Likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);


  const handleLike = async () => {
    const currentUserId = userId;
    const isLiked = likes.includes(currentUserId);

    try {
      if (isLiked) {
        // Unlike the post
        await api.delete(`/posts/${post._id}/likes`, { data: { userId: currentUserId } });

        setLikes(likes.filter((id) => id !== currentUserId));
      } else {
        // Like the post
        await api.post(`/posts/${post._id}/likes`, { userId: currentUserId });
        setLikes([...likes, currentUserId]);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };



  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${post._id}`);
      console.log("Post deleted");
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };



  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/posts/${post._id}/comments/${commentId}`);
      setComments(comments.filter((comment) => comment._id !== commentId));
      console.log("Comment deleted");
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    try {
      await api.delete(`/comments/${commentId}/replies/${replyId}`);

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
    } catch (error) {
      console.error('Error deleting reply:', error);
    }
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment) {
      const newCommentData = {
        author: {
          _id: user._id,
          username: userId,
        },
        createdAt: new Date().toISOString(),
        comment: newComment,
        likes: [],
        replies: [],
      };

      try {
        const response = await api.post(`/posts/${post._id}/comments`, newCommentData);
        setComments([...comments, response.data.comment]);
        setNewComment("");
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };


  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyInput = e.target.elements.replyInput.value;

    if (!replyInput) {
      return;
    }

    const replyData = {
      author: {
        _id: user._id,
        username: userId,
      },
      createdAt: new Date().toISOString(),
      reply: replyInput,
    };

    try {
      const response = await api.post(`/comments/${commentId}/replies`, replyData);
      console.log("Here");
      const newReply = response.data.reply;
      const updatedComments = comments.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });

      setComments(updatedComments);
      e.target.reset();
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };


  const getImageSrc = () => {
    if (post.Image) {
      const { data, contentType } = post.Image;

      const binaryString = String.fromCharCode(...data.data);

      const base64String = window.btoa(binaryString);

      return `data:${contentType};base64,${base64String}`;
    }
    return null;
  };


  return (
    <div className="post-card" >
      <div className="post-card-header">
        <img
          src={userprofile}
          alt={`${post.author.username}`}
          className="post-card-user-image"
        />
        <div className="post-card-user-info">
          <p className="post-card-user-name">{`${post.author.username} `}</p>
          <p className="post-card-location">{post.Location}</p>
        </div>
        <span className="post-card-timestamp">{timeAgo(post.createdAt)}</span>
      </div>
      {/* <button className="delete-post-button" onClick={handleDeletePost}>
          Delete
        </button> */}

      <div className="post-card-body">
        <div className="post-card-description">
          {showAll
            ? post.Description
            : `${post.Description.slice(0, 100)}...`}
          {post.Description.length > 100 && (
            <span
              className="post-card-toggle-text"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? " Show Less" : " Show More"}
            </span>
          )}
        </div>

        {post.Image && (
          <img src={post.Image.url} alt="Post" className="post-card-image" />
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
        {post.author.username === userId && (
          <div
            className="post-card-delete"
            onClick={handleDeletePost}
          >
            Delete
          </div>
        )};
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
                  src={userprofile}
                  alt={comment.author.username}
                  className="post-card-comment-user-image"
                />
                <div className="post-card-comment-user-info">
                  <p className="post-card-comment-user-name">
                    {`${comment.author.username} `}
                    <span className="post-card-comment-time" style={{ color: '#666', fontSize: '0.9em', fontWeight: 'normal' }}>{timeAgo(comment.createdAt)} </span>
                  </p>
                </div>



              </div>
              <p className="post-card-comment-text" style={{ paddingLeft: '5px' }}>{comment.comment}</p>
              <div className="post-card-comment-actions" style={{ paddingLeft: '5px' }}>
                <form onSubmit={(e) => { handleReplySubmit(e, comment._id) }}>
                  <input type="text" name="replyInput" style={{ paddingLeft: '5px', paddingTop: '2px', paddingBottom: '2px' }} placeholder="Reply..." required />
                  <button type="submit" className="post-card-reply-button">Reply</button>
                </form>
                {/* Show delete button only if the logged-in user is the comment author */}
                {comment.author.username === userId && (
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
                        src={userprofile}
                        alt={reply.author.username}
                        className="post-card-reply-user-image"
                      />
                      <div>
                        <p className="post-card-reply-user-name">{`${reply.author.username} `}
                          <span className="post-card-reply-comment-time" style={{ color: '#666', fontSize: '0.9em', fontWeight: 'normal' }}>{timeAgo(reply.createdAt)} </span>
                        </p>
                        <p className="post-card-reply-text">{reply.reply}

                          {reply.author._id === user._id && (
                            <button
                              onClick={() => { handleDeleteReply(comment._id, reply._id) }}
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
