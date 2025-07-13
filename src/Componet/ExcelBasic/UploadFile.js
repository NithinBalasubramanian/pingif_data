// src/components/FileUpload.jsx
import React, { useState } from 'react';
import axiosInstance from '../../Api/AxiosInstance';
import { FileUploader } from "react-drag-drop-files";
import styles from './style.module.css'


const fileTypes = ["xlsx", "xlx", "csv"];

const UploadFile = ({ setFileUrl }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (file) => {
    setFile(file[0]);
    console.log(file)
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
    <div className={styles.fileModule}>
      <FileUploader
        multiple={true}
        handleChange={handleFileChange}
        name="file"
        types={fileTypes}
        classes={"dropContainer"}
      />
      <button onClick={handleUpload} className={styles.uploadButton}>Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default UploadFile;
