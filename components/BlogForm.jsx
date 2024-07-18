import React, { useState } from 'react';

const BlogForm = ({ onAddBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    time: '', // Initially empty since it will be set dynamically
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time in YYYY-MM-DD HH:MM format
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    try {
      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          time: currentTime, // Set current date and time
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add blog entry');
      }

      // Parse the response to get the updated blogs array
      const updatedBlogs = await response.json();

      // Pass the updated blogs array to the parent component or function
      onAddBlog(updatedBlogs);

      // Clear form fields after submission
      setFormData({
        title: '',
        imageUrl: '',
        description: '',
        time: '', // Reset time to empty for the next entry
      });

      // Optionally, handle success feedback or redirection
      alert('Blog added successfully!');
    } catch (error) {
      console.error('Error adding blog entry:', error.message);
      alert('Failed to add blog. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', marginTop: 20, padding: 20, textAlign: 'center', border: '1px solid #ccc', borderRadius: 8, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2>Add a Blog Entry</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={styles.inputGroup}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="imageUrl" style={styles.label}>Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            style={styles.input}
          />
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Image Preview" style={styles.imagePreview} />
          )}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            style={styles.textarea}
          />
        </div>
        {/* 'time' input is not needed since it's now dynamically set */}
        <button type="submit" style={styles.button}>Add Blog</button>
      </form>
    </div>
  );
};

// Styles for input elements
const styles = {
  inputGroup: {
    marginBottom: 20,
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: '1rem',
    minHeight: 100,
  },
  imagePreview: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: 10,
    borderRadius: 4,
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
};

export default BlogForm;
