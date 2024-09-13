import React from 'react'
import '../css_file/product.css'

export default function product() {
     return (
          <div>
               <main>
                    {/*- CATEGORY*/}
                    <div className="category">
                         <div className="home-container">
                              <div className="category-item-container has-scrollbar">
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/dress.svg" alt="dress & frock" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Dress &amp; frock</h3>
                                                  <p className="category-item-amount">(53)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/coat.svg" alt="winter wear" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Winter wear</h3>
                                                  <p className="category-item-amount">(58)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/glasses.svg" alt="glasses & lens" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Glasses &amp; lens</h3>
                                                  <p className="category-item-amount">(68)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/shorts.svg" alt="shorts & jeans" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Shorts &amp; jeans</h3>
                                                  <p className="category-item-amount">(84)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/tee.svg" alt="t-shirts" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">T-shirts</h3>
                                                  <p className="category-item-amount">(35)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/jacket.svg" alt="jacket" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Jacket</h3>
                                                  <p className="category-item-amount">(16)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/watch.svg" alt="watch" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Watch</h3>
                                                  <p className="category-item-amount">(27)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                                   <div className="category-item">
                                        <div className="category-img-box">
                                             <img src="./images/icons/hat.svg" alt="hat & caps" width={30} />
                                        </div>
                                        <div className="category-content-box">
                                             <div className="category-content-flex">
                                                  <h3 className="category-item-title">Hat &amp; caps</h3>
                                                  <p className="category-item-amount">(39)</p>
                                             </div>
                                             <a href="#" className="category-btn">Show all</a>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    {/*
      - PRODUCT
    */}
                    <div className="blog">
                         <div className="home-container">
                              <div className="blog-container has-scrollbar">
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-1.jpg" alt="Clothes Retail KPIs 2021 Guide for Clothes Executives" width={300} className="blog-banner" />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Fashion</a>
                                             <a href="#">
                                                  <h3 className="blog-title">Clothes Retail KPIs 2021 Guide for Clothes Executives.</h3>
                                             </a>
                                             <p className="blog-meta">
                                                  By <cite>Mr Admin</cite> / <time dateTime="2022-04-06">Apr 06, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-2.jpg" alt="Curbside fashion Trends: How to Win the Pickup Battle." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Clothes</a>
                                             <h3>
                                                  <a href="#" className="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Robin</cite> / <time dateTime="2022-01-18">Jan 18, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-3.jpg" alt="EBT vendors: Claim Your Share of SNAP Online Revenue." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Shoes</a>
                                             <h3>
                                                  <a href="#" className="blog-title">EBT vendors: Claim Your Share of SNAP Online Revenue.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Selsa</cite> / <time dateTime="2022-02-10">Feb 10, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                                   <div className="blog-card">
                                        <a href="#">
                                             <img src="./images/blog-4.jpg" alt="Curbside fashion Trends: How to Win the Pickup Battle." className="blog-banner" width={300} />
                                        </a>
                                        <div className="blog-content">
                                             <a href="#" className="blog-category">Electronics</a>
                                             <h3>
                                                  <a href="#" className="blog-title">Curbside fashion Trends: How to Win the Pickup Battle.</a>
                                             </h3>
                                             <p className="blog-meta">
                                                  By <cite>Mr Pawar</cite> / <time dateTime="2022-03-15">Mar 15, 2022</time>
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
          </div>
     )
}
