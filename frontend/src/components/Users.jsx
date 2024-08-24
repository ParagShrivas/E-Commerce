import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Dash_Alert from './Dash_Alert'
import DataTable from 'react-data-table-component';
import '../css_file/Product_table.css';
import '../css_file/confirm.css';

export default function Users() {
     const [users, setUsers] = useState([])
     const [search, setSearch] = useState('');
     const [filterSearch, setFilterSearch] = useState([]);
     const [showConfirm, setShowConfirm] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);

     useEffect(() => {
          fetch('http://localhost:1500/users')
               .then((response) => response.json())
               .then((data) => {
                    if (Array.isArray(data)) {
                         setUsers(data);
                         setFilterSearch(data);
                    } else {
                         console.error('Expected an array but got:', data);
                         setUsers([]);
                    }
               })
               .catch((error) => console.error('Error fetching products:', error));
     }, []);

     const handleDeleteClick = (user) => {
          setSelectedUser(user);
          setShowConfirm(true);
     };

     const handleConfirmDelete = async () => {
          try {
               const response = await fetch(`http://localhost:1500/users/delete/${selectedUser.product_id}`, {
                    method: 'post',
               });

               if (response.ok) {
                    showAlert('User Deleted successfully!');
                    setShowConfirm(false);
                    // Refresh the user list or remove the deleted user from state
                    setUsers(users.filter(user => user.user_id !== selectedUser.user_id));
               } else {
                    showAlert('Failed to delete the user');
               }
          } catch (error) {
               console.error('Error deleting user:', error);
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

     const columns = [
          {
               name: '',
               cell: () => (<i class="fa-regular fa-user"></i>),
               width: '50px'
          },
          {
               name: "First Name",
               selector: (rows) => rows.fname,
               width: '200px',
               sortable: true
          },
          {
               name: "Last Name",
               selector: (rows) => rows.lname,
               width: '200px',
               sortable: true
          },
          {
               name: "Email",
               selector: (rows) => rows.email,
               width: '300px',
               sortable: true
          },
          {
               name: '',
               cell: (rows) => (
                    <button className='manage-btn'>
                         <i style={{ color: 'red', borderColor: 'red' }}
                              className="fa-regular fa-trash-can" onClick={() => handleDeleteClick(rows)}></i>
                    </button>
               ),
               width: '130px'
          }
     ]

     useEffect(() => {
          const result = users.filter((user) => {
               return user.fname.toLowerCase().match(search.toLowerCase())
                    || user.lname.toLowerCase().match(search.toLowerCase()) ||
                    user.email.toLowerCase().match(search.toLowerCase());
          });
          setFilterSearch(result);
     }, [search, users]);


     return (
          <>
               <div className="Product_Table_container">
                    <SideNav />
                    <Dash_Alert alert={alert} />
                    {showConfirm && selectedUser && (
                         <div className="overlay">
                              <div className="confirm-popup">
                                   <h4>Confirm
                                        <i className="fa-solid fa-xmark" style={{ marginLeft: '250px', cursor: 'pointer' }} onClick={() => { handleDeleteClick(false) }}></i>
                                   </h4>
                                   <p>
                                        <i className="fa-solid fa-triangle-exclamation"></i>
                                        Are you sure you want to delete `{selectedUser.fname}` `{selectedUser.lname}`?
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
                    <div className="Datatable" style={{ width: '60em' }}>
                         <h1>Users Data</h1><br />
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
                              fixedHeader
                              fixedHeaderScrollHeight='500px'
                              selectableRows
                              selectableRowsHighlight
                              highlightOnHover
                              subHeader
                              subHeaderComponent={
                                   <input className='search-filter'
                                        type='text' placeholder='🔍 Search'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                   />
                              }
                         />
                    </div>
               </div>
          </>
     )
}
