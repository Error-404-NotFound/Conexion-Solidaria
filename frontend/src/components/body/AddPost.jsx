import React, { useState, useRef } from 'react';
import './AddPost.css'; // Import the CSS file
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const AddPost = ({ addNewPost }) => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);  // Store the actual image file
  const [imagePreview, setImagePreview] = useState(null);  // Store the image preview URL
  const [tag, setTag] = useState('cloth');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state for form submission

  const imageInputRef = useRef(null); // Create a reference for the image input

  // Handle the image change event (both preview and actual file)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);  // Store the actual file
      setImagePreview(URL.createObjectURL(file));  // Store the preview URL
    }
  };

  // Handle form submission
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('tag', tag);
    formData.append('location', location);
    formData.append('additionalInfo', additionalInfo);
    formData.append('userId', user._id); // Send logged-in user ID
    if (image) {
      formData.append('image', image); // Append the image file
    }

    setLoading(true); // Set loading to true when the request is in progress

    try {
      const response = await api.post('/add-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure the correct content type is set
        },
      });

      addNewPost(response.data.post); // Add the new post to the UI
      console.log(response.data.post);
      // Reset form state
      setDescription('');
      setImage(null);
      setImagePreview(null);  // Clear the preview
      setTag('cloth');
      setLocation('');
      setAdditionalInfo('');
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Reset loading state after the request is done
    }
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
            ref={imageInputRef} // Attach the ref here
            required
            className="dark:text-white"
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Post'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
