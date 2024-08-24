import React, { useState } from 'react';
import SideNav from './SideNav';
import '../css_file/add_product.css';
import Dash_Alert from './Dash_Alert';

const ProductForm = () => {
     const [product_name, setProductName] = useState('');
     const [description, setDescription] = useState('');
     const [price, setPrice] = useState('');
     const [quantity, setQuantity] = useState('');
     const [photo, setPhoto] = useState(null);
     const [category, setCategory] = useState('');
     const [imagePreview, setImagePreview] = useState(null);

     const handlePhotoChange = (e) => {
          const file = e.target.files[0];
          if (file && file.size < 2000000) {
               setPhoto(file);

               const reader = new FileReader();
               reader.onload = () => {
                    setImagePreview(reader.result);
               };
               reader.readAsDataURL(file);
          } else {
               alert('Image size more than 2MB');
          }
     };

     // Alert
     const [alert, setAlert] = useState(null);

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => {
               setAlert(null);
          }, 5000);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append('product_name', product_name);
          formData.append('description', description);
          formData.append('price', price);
          formData.append('quantity', quantity);
          formData.append('category', category);
          formData.append('photo', photo);

          try {
               const response = await fetch('http://localhost:1500/products/add_product', {
                    method: 'POST',
                    body: formData,
               });

               const res = await response.json();
               if (response.ok) {
                    showAlert(res.message);
                    setTimeout(() => {
                         window.location.reload();
                    }, 1000);
               } else {
                    showAlert(res.message);
               }
          } catch (error) {
               console.error('Error adding product:', error);
          }
     };

     return (
          <>
               <SideNav />
               <div className="product-container">
                    <Dash_Alert alert={alert} />
                    <div className="form">
                         <div className="photo-container">
                              <input
                                   type="file"
                                   id="file"
                                   accept="image/*"
                                   onChange={handlePhotoChange}
                                   hidden
                                   required
                              />
                              <div className={`img-area ${imagePreview ? 'active' : ''}`} data-img={photo ? photo.name : ''}>
                                   {imagePreview ? (
                                        <img src={imagePreview} alt="Selected" />
                                   ) : (
                                        <>
                                             <i className='bx bxs-cloud-upload icon'></i>
                                             <h3>Upload Image</h3>
                                             <p>Image size must be less than <span>2MB</span></p>
                                        </>
                                   )}
                              </div>
                              <button className="select-image" onClick={() => document.getElementById('file').click()}>
                                   Select Image
                              </button>
                         </div>
                         <div className="product-form">
                              <span className="circle one"></span>
                              <span className="circle two"></span>

                              <form onSubmit={handleSubmit} autoComplete="off">
                                   <h3 className="title">Add Product</h3>

                                   <div className="input-container">
                                        <input
                                             type="text"
                                             name="product_name"
                                             className="input"
                                             value={product_name}
                                             onChange={(e) => setProductName(e.target.value)}
                                        />
                                        <label>Product Name</label>
                                        <span>Product Name</span>
                                   </div>

                                   <div className="input-container">
                                        <input
                                             type="number"
                                             name="price"
                                             className="input"
                                             value={price}
                                             onChange={(e) => setPrice(e.target.value)}

                                        />
                                        <label>Price</label>
                                        <span>Price</span>
                                   </div>

                                   <div className="input-container">
                                        <input
                                             type="number"
                                             name="price"
                                             className="input"
                                             value={quantity}
                                             onChange={(e) => setQuantity(e.target.value)}

                                        />
                                        <label>Quantity</label>
                                        <span>Quantity</span>
                                   </div>

                                   <div className="input-container">
                                        <select
                                             name="category"
                                             className="input"
                                             value={category}
                                             onChange={(e) => setCategory(e.target.value)}

                                        >
                                             <option style={{ backgroundColor: '#000' }} value="" disabled>Select Category</option>
                                             <option style={{ backgroundColor: '#000' }} value="electronics">Electronics</option>
                                             <option style={{ backgroundColor: '#000' }} value="fashion">Fashion</option>
                                             <option style={{ backgroundColor: '#000' }} value="home">Home</option>
                                             <option style={{ backgroundColor: '#000' }} value="beauty">Beauty</option>
                                             <option style={{ backgroundColor: '#000' }} value="sports">Sports</option>
                                             <option style={{ backgroundColor: '#000' }} value="toys">Toys</option>
                                        </select>
                                        <label>Category</label>
                                        <span>Category</span>
                                   </div>

                                   <div className="input-container textarea">
                                        <textarea
                                             name="description"
                                             className="input"
                                             value={description}
                                             onChange={(e) => setDescription(e.target.value)}

                                        ></textarea>
                                        <label>Description</label>
                                        <span>Description</span>
                                   </div>

                                   <button type="submit" className="btn">Add</button>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default ProductForm;
