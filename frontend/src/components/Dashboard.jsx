// import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation

export default function Dashboard() {
     // const [users, setUsers] = useState([]);
     const location = useLocation(); // Access the location object
     const message = location.state?.message || ''; // Get the message from state

     // useEffect(() => {
     //      // Function to fetch data from the backend
     //      const fetchUsers = async () => {
     //           try {
     //                const response = await fetch('http://localhost:1500/login/users');
     //                const data = await response.json();
     //                setUsers(data); // Set the fetched data as users
     //           } catch (error) {
     //                console.error('Error fetching users:', error);
     //           }
     //      };

     //      fetchUsers();
     // }, []);

     return (
          // <div>
          //      <h1>Users List</h1>
          //      <ul>
          //           {users.map(users => (
          //                <li key={users.id}>
          //                     {users.fname} {users.lname} - {users.email}
          //                </li>
          //           ))}
          //      </ul>
               <p>Message: {message}</p> 
          // </div>
     );
}
