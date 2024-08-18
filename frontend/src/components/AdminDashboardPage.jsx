import React from 'react'
import '../css_file/dashboard.css'

export default function AdminDashboardPage() {
     return (
          <div className='dashboard-container'>
               <div className='dashboard-nav'>
                    <ul>
                         <li><a href="#" class="logo">
                              <i className='bx bxs-shopping-bag'></i>
                              <span class="nav-item">Dream mall</span>
                         </a></li>
                         <li><a href="#">
                              <i class="fas fa-home"></i>
                              <span class="nav-item">Home</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-user"></i>
                              <span class="nav-item">Users</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-clipboard-list"></i>
                              <span class="nav-item">Products</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-solid fa-chart-line"></i>
                              <span class="nav-item">Analysis</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-solid fa-truck-fast"></i>
                              <span class="nav-item">Orders</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-cog"></i>
                              <span class="nav-item">Settings</span>
                         </a></li>
                         <li><a href="">
                              <i class="fas fa-plus"></i>
                              <span class="nav-item">Add Product</span>
                         </a></li>
                         <li><a href="" class="logout">
                              <i class="fas fa-sign-out-alt"></i>
                              <span class="nav-item">Log out</span>
                         </a></li>
                    </ul>
               </div>
               <div className="main">
                    <div class="main-top">
                         <h1>Admin Dashboard</h1>
                         <i class="fas fa-user-cog"></i>
                    </div>
                    <div class="main-skills">
                         <div class="card">
                              <i class="fas fa-users" ></i>
                              <h3>Customers</h3>
                              <p>1500</p>
                         </div>
                         <div class="card">
                              <h3>Income</h3>
                              <p></p>
                         </div>
                         <div class="card">
                              <h3>JavaScript</h3>
                              <p>Join Over 2 million Students.</p>
                         </div>
                    </div>
               </div>
          </div>
     )
}
