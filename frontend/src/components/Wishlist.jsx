import React, { useEffect, useState } from 'react';
import '../css_file/wishlist.css';
import DataTable from 'react-data-table-component';
import Dash_Alert from './Dash_Alert';
import Navbar from './Navbar';
import CheckAuth from './CheckAuth';

export default function Wishlist() {
     CheckAuth();
     const [products, setProducts] = useState([]);
     const [search, setSearch] = useState('');
     const [filterSearch, setFilterSearch] = useState([]);
     const [showConfirm, setShowConfirm] = useState(false);
     const [selectedProduct, setSelectedProduct] = useState(null);
     const [alert, setAlert] = useState(null);
     const email = localStorage.getItem('email')

     useEffect(() => {
          const fetchProducts = async () => {
               try {
                    const response = await fetch(`http://localhost:1500/wishlist/${email}`);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                         setProducts(data);
                         setFilterSearch(data);
                    } else {
                         console.error('Expected an array but got:', data);
                    }
               } catch (error) {
                    console.error('Error fetching products:', error);
               }
          };

          fetchProducts();
     }, []);

     const handleDeleteClick = (product) => {
          setSelectedProduct(product);
          setShowConfirm(true);
     };

     const showAlert = (message) => {
          setAlert({ msg: message });
          setTimeout(() => setAlert(null), 3000);
     };

     const handleConfirmDelete = async () => {
          if (!selectedProduct) return;

          try {
               const response = await fetch(`http://localhost:1500/wishlist/delete/${email}/${selectedProduct.product_id}`, {
                    method: 'POST',
               });

               if (response.ok) {
                    showAlert('Product deleted successfully!');
                    setProducts(prev => prev.filter(product => product.product_id !== selectedProduct.product_id));
               } else {
                    const errorData = await response.json();
                    showAlert(`Failed to delete the product: ${errorData.message || 'Unknown error'}`);
               }
          } catch (error) {
               console.error('Error deleting product:', error);
               showAlert('An error occurred while deleting the product.');
          } finally {
               setShowConfirm(false);
          }
     };


     const columns = [
          {
               name: 'Photo',
               selector: (row) => <img width={100} src={`http://localhost:1500/products/${row.photoname}`} alt={row.product_name} />,
               width: '130px'
          },
          {
               name: 'Product Name',
               selector: (row) => row.product_name.slice(0, 25) + '...',
               width: '200px',
               sortable: true
          },
          {
               name: 'Description',
               selector: (row) => row.description.slice(0, 100),
               width: '300px'
          },
          {
               name: 'Price',
               selector: (row) => `₹ ${row.price}`,
               width: '100px',
               sortable: true
          },
          {
               name: 'Added Date',
               selector: (row) => `${row.added_date.slice(0, 10)}`,
               width: '170px',
               sortable: true
          },
          {
               name: '',
               cell: (row) => (
                    <div>
                         <button className='manage-btn' onClick={() => handleDeleteClick(row)}>
                              <i style={{ color: 'red' }} className="fa-regular fa-trash-can"></i>
                         </button>
                    </div>
               ),
          }
     ];

     useEffect(() => {
          const result = products.filter(product => product.product_name.toLowerCase().includes(search.toLowerCase()));
          setFilterSearch(result);
     }, [search, products]);


     return (
          <><Navbar />
               <div className='wishlist'>
                    <Dash_Alert alert={alert} />
                    <DataTable className='DataTable'
                         title="Wishlist ❤️"
                         columns={columns}
                         data={filterSearch}
                         highlightOnHover
                         pagination
                         customStyles={{
                              headCells: {
                                   style: {
                                        fontSize: '18px',
                                   },
                              },
                              cells: {
                                   style: {
                                        fontSize: '15px',
                                   },
                              },
                         }}
                         subHeader
                         subHeaderComponent={
                              <input className='search-filter'
                                   type='text' placeholder='Search 🔍'
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                              />
                         }
                    />
                    {showConfirm && selectedProduct && (
                         <div className="overlay">
                              <div className="confirm-popup">
                                   <h4>Confirm
                                        <i className="fa-solid fa-xmark" style={{ marginLeft: '250px', cursor: 'pointer' }} onClick={() => { handleDeleteClick(false) }}></i>
                                   </h4>
                                   <img src={`http://localhost:1500/products/${selectedProduct.photoname}`} alt="" width={'200px'} height={'200px'} />
                                   <p>
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                        Are you sure you want to delete `{selectedProduct.product_name.slice(0, 25) + '...'}`?
                                   </p>
                                   <button className="con-btn" onClick={handleConfirmDelete}>
                                        Yes
                                   </button>
                                   <button style={{ backgroundColor: 'transparent', color: '#000', borderColor: 'blue' }}
                                        className="con-btn" onClick={() => setShowConfirm(false)}>
                                        No
                                   </button>
                              </div>
                         </div>
                    )}
               </div>
          </>
     );
}
