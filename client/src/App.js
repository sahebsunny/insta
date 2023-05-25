import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('platform', platform);

    // replace 'http://localhost:4000' with your server's URL
    await axios.post('http://localhost:4000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="time" onChange={(e) => setTime(e.target.value)} />
      <select onChange={(e) => setPlatform(e.target.value)}>
        <option value="">Select a platform</option>
        <option value="Facebook">Facebook</option>
        <option value="Instagram">Instagram</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
