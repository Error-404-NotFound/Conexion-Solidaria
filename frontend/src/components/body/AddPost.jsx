import React, { useState, useRef } from 'react';
import './AddPost.css'; // Import the CSS file
import aniket from "../../assets/aniket.png";

const AddPost = ({ addNewPost }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState('cloth');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const imageInputRef = useRef(null); // Create a reference for the image input

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const newPost = {
      userId: {
        _id: "user100",
        firstName: "Aniket",
        lastName: "Johri",
        profileUrl: aniket,
        location: "Tirupati",
      },
      createdAt: timestamp,
      description,
      image,
      tag,
      location,
      additionalInfo,
      likes: [],
      comments: [],
    };
    addNewPost(newPost);

    // Clear the form fields
    setDescription('');
    setImage(null);
    setTag('cloth');
    setLocation('');
    setAdditionalInfo('');

    // Clear the image input field using the ref
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  return (
    <div className="add-post-container">
      <div className="add-post-heading">
        <h2>Add New Post</h2>
      </div>

      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="description">Post Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your post..."
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Post Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef} // Attach the ref here
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Help Type:</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="form-input"
          >
            <option value="cloth">Cloth</option>
            <option value="shelter">Shelter</option>
            <option value="food">Food</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
