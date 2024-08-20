import React from 'react'
import '../css_file/dashboard.css'
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboardPage() {
     const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // X-axis labels
          datasets: [
               {
                    label: 'Sale', // Label for the dataset
                    data: [65, 59, 80, 81, 56, 55, 60], // Y-axis data points
                    fill: false, // No fill under the line
                    borderColor: '#452ce9', // Line color
                    tension: 0.4, // Line curve tension
               },
          ],
     };

     const options = {
          responsive: true,
          plugins: {
               legend: {
                    position: 'top', // Position of the legend
               },
               title: {
                    display: true,
                    text: 'Sale Line Chart', // Title of the chart
               },
          },
     };

     const data2 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
               {
                    label: 'Customer Dataset',
                    data: [50, 59, 100, 51, 56, 65, 40],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
                    borderColor: '#452ce9',         // Bar border color
                    borderWidth: 1,                               // Bar border width
               },
          ],
     };

     const options2 = {
          responsive: true,
          maintainAspectRatio: false,  // Allow the chart to adjust based on container size
     };

     return (
          <>
               <div className='dashboard-container'>
                    <div className='dashboard-nav'>
                         <ul>
                              <li><a href="#" className="logo">
                                   <i className='bx bxs-shopping-bag'></i>
                                   <span className="nav-item">Dream mall</span>
                              </a></li>
                              <li><a href="#">
                                   <i className="fas fa-home"></i>
                                   <span className="nav-item">Home</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-user"></i>
                                   <span className="nav-item">Users</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-clipboard-list"></i>
                                   <span className="nav-item">Products</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-solid fa-chart-line"></i>
                                   <span className="nav-item">Analysis</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-solid fa-truck-fast"></i>
                                   <span className="nav-item">Orders</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-cog"></i>
                                   <span className="nav-item">Settings</span>
                              </a></li>
                              <li><a href="">
                                   <i class="fas fa-solid fa-circle-info"></i>
                                   <span className="nav-item">Support</span>
                              </a></li>
                              <li><a href="">
                                   <i className="fas fa-plus"></i>
                                   <span className="nav-item">Add Product</span>
                              </a></li>
                              <li><a href="" className="logout">
                                   <i className="fas fa-sign-out-alt"></i>
                                   <span className="nav-item">Log out</span>
                              </a></li>
                         </ul>
                    </div>
                    <div className="main">
                         <div className="main-top">
                              <h2>Admin Dashboard</h2>
                              <input type="date" name="" id="" />
                         </div>
                         <div className="main-skills">
                              <div className="card">
                                   <i className="fas fa-users" ></i>
                                   <h3>Customers</h3>
                                   <p>1500</p>
                              </div>
                              <div className="card">
                                   <i class="fas fa-money-bill-wave"></i>
                                   <h3>Income</h3>
                                   <p>₹89,2000</p>
                              </div>
                              <div className="card">
                                   <i class="fa-solid fa-boxes-packing"></i>
                                   <h3>Product Sold</h3>
                                   <p>1,00,000</p>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="table">
                    <h2>Recent Orders</h2>
                    <strong><a href="">SEE ALL</a></strong>
                    <table>
                         <tr>
                              <th>Product Name</th>
                              <th>Order ID</th>
                              <th>Payment</th>
                              <th>Status</th>
                              <th> </th>
                         </tr>
                         <tr>
                              <td>Data 1</td>
                              <td>Data 2</td>
                         </tr>
                         <tr>
                              <td>Data 3</td>
                              <td>Data 4</td>
                         </tr>
                         <tr>
                              <td>Data 1</td>
                              <td>Data 2</td>
                         </tr>
                         <tr>
                              <td>Data 3</td>
                              <td>Data 4</td>
                         </tr>
                         <tr>
                              <td>Data 1</td>
                              <td>Data 2</td>
                         </tr>
                    </table>
               </div>
               <div className="recent-updates">
                    <p>Recent updates</p>
                    <div className="card">
                         <i class="fa-solid fa-bell"></i>
                         <span>New Orders</span>
                         <span style={{ 'margin-left': '110px' }}>+50</span>
                    </div><br />
                    <div className="card">
                         <i class="fa-solid fa-bell"></i>
                         <span>New Customers</span>
                         <span style={{ 'margin-left': '80px' }}>+15</span>
                    </div><br />
                    <div className="card">
                         <i class="fa-solid fa-bell"></i>
                         <span>Order Delivered</span>
                         <span style={{ 'margin-left': '80px' }}>+20</span>
                    </div>
               </div>
               <div className='graph'>
                    <Line data={data} options={options} />
                    <Bar className='bar' data={data2} options={options2} />
               </div>
          </>
     )
}
