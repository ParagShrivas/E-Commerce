import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Dash_Alert from './Dash_Alert';
import '../css_file/Product_table.css';
import '../css_file/confirm.css';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSearch, setFilterSearch] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showManageProduct, setShowManageProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedManageProduct, setSelectedManageProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:1500/products')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                    setFilterSearch(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setProducts([]);
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setShowConfirm(true);
    };

    const handleManageClick = (product) => {
        setSelectedManageProduct(product);
        setShowManageProduct(true);
    };

    // Alert
    const [alert, setAlert] = useState(null);

    const showAlert = (message) => {
        setAlert({ msg: message });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:1500/products/delete/${selectedProduct.product_id}`, {
                method: 'post',
            });

            if (response.ok) {
                showAlert('Product Deleted successfully!');
                setShowConfirm(false);
                // Refresh the product list or remove the deleted product from state
                setProducts(products.filter(product => product.product_id !== selectedProduct.product_id));
            } else {
                showAlert('Failed to delete the product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            name: 'Photo',
            selector: (rows) => <img width={100} src={`http://localhost:1500/products/${rows.photoname}`} alt={rows.product_name} />,
            width: '200px'
        },
        {
            name: 'Product Name',
            selector: (rows) => rows.product_name.slice(0, 25) + '...',
            width: '200px'
        },
        {
            name: 'Description',
            selector: (rows) => rows.description.slice(0, 100),
            width: '200px'
        },
        {
            name: 'Price',
            selector: (rows) => '₹ ' + rows.price,
            width: '200px'
        },
        {
            name: 'Category',
            selector: (rows) => rows.category,
            width: '200px'
        },
        {
            name: '',
            cell: (rows) => (
                <button className='manage-btn'>
                    <i className="fa-solid fa-pencil" onClick={() => handleManageClick(rows)}></i>
                    <i style={{ color: 'red', borderColor: 'red' }}
                        className="fa-regular fa-trash-can" onClick={() => handleDeleteClick(rows)}></i>
                </button>
            ),
            width: '130px'
        }
    ];

    useEffect(() => {
        const result = products.filter((product) => {
            return product.product_name.toLowerCase().match(search.toLowerCase());
        });
        setFilterSearch(result);
    }, [search, products]);

    // Update Product State
    const [product_name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    const [category, setCategory] = useState('');

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size < 2000000) {
            setPhoto(file);
            const fileUrl = URL.createObjectURL(file);
            setPhotoURL(fileUrl);
        } else {
            showAlert('Image size more than 2MB');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_id', selectedManageProduct.product_id);
        formData.append('product_name', product_name || selectedManageProduct.product_name);
        formData.append('description', description || selectedManageProduct.description);
        formData.append('price', price || selectedManageProduct.price);
        formData.append('quantity', quantity || selectedManageProduct.quantity);
        formData.append('category', category || selectedManageProduct.category);
        formData.append('photo', photo || selectedManageProduct.photoname);

        try {
            const response = await fetch('http://localhost:1500/products/update', {
                method: 'POST',
                body: formData,
            });

            const res = await response.json();
            if (response.ok) {
                showAlert(res.message);
                setShowManageProduct(false);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                showAlert(res.message);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className='Product_Table_container'>
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

            {/* manage */}
            {showManageProduct && selectedManageProduct && (
                <div className="overlay">
                    <div className="manage_product">
                        <h3 style={{ color: '#3b3837' }}>Product Details
                            <i className="fa-solid fa-xmark" style={{ marginLeft: '220px', cursor: 'pointer' }} onClick={() => { handleManageClick(false) }}></i>
                        </h3>
                        <img src={photoURL ? photoURL : `http://localhost:1500/products/${selectedManageProduct.photoname}`} alt="" width={'200px'} height={'200px'} />
                        <p>Image size must be less than 2MB</p>
                        <input id='file' type="file" onChange={handlePhotoChange} hidden />
                        <button className="select-image" onClick={() => document.getElementById('file').click()}>
                            Select Image
                        </button>
                        Product Name
                        <input className='manage-input' type="text" value={product_name ? product_name : selectedManageProduct.product_name}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        Description
                        <textarea className='manage-input' type="box"
                            value={description ? description : selectedManageProduct.description}
                            onChange={(e) => setDescription(e.target.value)} />
                        Category
                        <select name="" id="" className='manage-input'
                            value={category ? category : selectedManageProduct.category}
                            onChange={(e) => setCategory(e.target.value)}>

                            <option value="" >Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="beauty">Beauty</option>
                            <option value="sports">Sports</option>
                            <option value="toys">Toys</option>
                        </select>

                        Price
                        <input className='manage-input' type="number" style={{ width: '40%' }}
                            value={price ? price : selectedManageProduct.price}
                            onChange={(e) => setPrice(e.target.value)} />

                        Quantity
                        <input className='manage-input' type="number" style={{ width: '40%' }}
                            value={quantity ? quantity : selectedManageProduct.quantity}
                            onChange={(e) => setQuantity(e.target.value)} />


                        <span>
                            <button className="con-btn" style={{
                                backgroundColor: 'transparent',
                                color: '#635df9'
                            }}
                                onClick={() => { handleManageClick(false) }}>
                                <i className="fa-solid fa-xmark" style={{ padding: '5px' }}></i>
                                Cancel
                            </button>
                            <button className="con-btn" onClick={handleSave}>
                                <i className="fa-solid fa-check" style={{ padding: '5px' }}></i>
                                Save
                            </button>
                        </span>
                    </div>
                </div>
            )}
            <SideNav />
            <div className="Datatable">
                <Dash_Alert alert={alert} />
                <h1>Product Table</h1><br />
                <DataTable
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
                    columns={columns}
                    data={filterSearch}
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <>
                            <input className='search-filter'
                                type='text' placeholder='🔍 Search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className='add-btn' onClick={() => { navigate('/dashboard/add_product') }}>
                                <i className="fa-solid fa-plus"></i>
                                Add New
                            </button>
                            <button className='delete-btn' onClick={() => showAlert('delete Button')}>
                                <i className="fa-regular fa-trash-can"></i>
                                Delete
                            </button>
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default ProductTable;
