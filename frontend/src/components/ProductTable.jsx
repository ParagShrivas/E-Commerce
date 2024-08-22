import React, { useEffect, useState } from 'react';
import SideNav from './SideNav'
import DataTable from 'react-data-table-component'
import '../css_file/Product_table.css'

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filterSearch, setFilterSearch] = useState([])

    useEffect(() => {
        fetch('http://localhost:1500/products')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data); // Correctly set the products array
                    setFilterSearch(data)
                } else {
                    console.error('Expected an array but got:', data);
                    setProducts([]); // Ensure it's an array
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    const column = [
        {
            name: 'Photo',
            selector: (rows) => <img width={100} src={`http://localhost:1500/products/${rows.photoname}`} />,
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
                    <i class="fa-solid fa-pencil"></i>
                    <i class="fa-solid fa-trash"></i>
                </button>
            ),
            width: '130px'
        }
    ]

    useEffect(() => {
        const result = products.filter((product) => {
            return product.product_name.toLowerCase().match(search.toLowerCase())
        })
        setFilterSearch(result)
    }, [search])


    return (
        <div className='Product_Table_container'>
            <SideNav />
            <div className="Datatable">
                <h1>Product Table</h1><br />
                <DataTable
                    paginator
                    customStyles={{
                        headCells: {
                            style: {
                                fontSize: '18px', // Increase font size for header cells
                            },
                        },
                        cells: {
                            style: {
                                fontSize: '15px', // Increase font size for body cells
                            },
                        },
                    }}
                    columns={column}
                    data={filterSearch}
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    subHeader
                    subHeaderComponent={
                        <>
                            <p style={{ marginRight: '750px' }}>Manage Product</p>
                            <input className='search-filter'
                                type='text' placeholder='Search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </>
                    }
                />
            </div>
        </div>
    );
};

export default ProductTable;
