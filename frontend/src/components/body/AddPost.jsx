import React, { useState } from 'react';
import './AddPost.css'; // Import the CSS file

const AddPost = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tag, setTag] = useState('cloth');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const newPost = {
      description,
      image,
      tag,
      location,
      additionalInfo,
      createdAt: timestamp,
    };
    console.log('New Post:', newPost);

    // Clear the form fields
    setDescription('');
    setImage(null);
    setTag('cloth');
    setLocation('');
    setAdditionalInfo('');
  };

  return (
    <div className="add-post-container bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
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
            className="dark:text-black"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Post Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="dark:text-white"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Help Type:</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
            className="dark:text-black"
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
            className="dark:text-black"
          />
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">Additional Information:</label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="dark:text-black"
          />
        </div>

        <button type="submit" className="submit-button">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
