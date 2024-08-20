import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
     const [file, setFile] = useState(null);
     const [imageSrc, setImageSrc] = useState('');
     const [message, setMessage] = useState('');

     const handleFileChange = (event) => {
          setFile(event.target.files[0]);
     };

     const handleSubmit = async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append('image', file);

          try {
               const response = await axios.post('http://localhost:1500/upload', formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data'
                    }
               });

               if (response.status === 200) {
                    setMessage('Image uploaded successfully');

                    // Create a URL for the uploaded image to display it
                    setImageSrc(`http://localhost:1500/upload/image/${file.name}`);
               } else {
                    setMessage('Failed to upload image');
               }
          } catch (error) {
               console.error('Error uploading image:', error);
               setMessage('Failed to upload image');
          }
     };

     return (
          <div>
               <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">Upload</button>
               </form>
               {message && <p>{message}</p>}
               {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%' }} />}
          </div>
     );
}

export default ImageUpload;
