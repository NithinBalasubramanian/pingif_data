// src/components/FileUpload.jsx
import React, { useState } from 'react';
import axiosInstance from '../../Api/AxiosInstance';

const UploadFile = ({ setFileUrl }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setFileUrl("");

    const formData = new FormData();
    formData.append('file', file); // 'file' is the field name expected by backend

    try {
      const response = await axiosInstance.post('/uploadFileApiAndFetchData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Upload successful!');
      setFileUrl(response.data.file_url ?? '');
      console.log(response.data);
    } catch (error) {
      setMessage('Upload failed!');
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default UploadFile;
