import React from 'react'
import '../css_file/dashboard.css'

export default function SideNav() {
     return (
          <div className='dashboard-container'>
               <div className='dashboard-nav'>
                    <ul>
                         <li><a href="#" className="Brand-Logo">
                              <i className='bx bxs-shopping-bag'></i>
                              <span className="nav-item">Dream mall</span>
                         </a></li>
                         <li><a href="/dashboard">
                              <i className="fas fa-home"></i>
                              <span className="nav-item">Home</span>
                         </a></li>
                         <li><a href="/dashboard/users">
                              <i className="fas fa-user"></i>
                              <span className="nav-item">Users</span>
                         </a></li>
                         <li><a href="/dashboard/products">
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
                              <i className="fas fa-solid fa-circle-info"></i>
                              <span className="nav-item">Support</span>
                         </a></li>
                         <li><a href="/dashboard/add_product">
                              <i className="fas fa-plus"></i>
                              <span className="nav-item">Add Product</span>
                         </a></li>
                         <li><a href="" className="logout">
                              <i className="fas fa-sign-out-alt"></i>
                              <span className="nav-item">Log out</span>
                         </a></li>
                    </ul>
               </div>
          </div>
     )
}
