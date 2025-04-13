import React,{useEffect} from 'react'
import '../css_file/logos.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function Logo() {
     useEffect(() => {
          AOS.init({
               duration:1000
          })
     }, [])

     return (
          <div className="brand-logos-container" data-aos="zoom-out">
               <h1>Top Brands</h1><br />
               <img src="img/brand/1.png" alt="Brand Logo 1" className="brand-logos" />
               <img src="img/brand/2.png" alt="Brand Logo 2" className="brand-logos" />
               <img src="img/brand/3.png" alt="Brand Logo 3" className="brand-logos" />
               <img src="img/brand/4.png" alt="Brand Logo 4" className="brand-logos" />
               <img src="img/brand/5.png" alt="Brand Logo 5" className="brand-logos" />
               <img src="img/brand/6.png" alt="Brand Logo 6" className="brand-logos" />
               <img src="img/brand/7.png" alt="Brand Logo 7" className="brand-logos" />
               <img src="img/brand/8.png" alt="Brand Logo 8" className="brand-logos" />
               <img src="img/brand/9.png" alt="Brand Logo 9" className="brand-logos" />
               <img src="img/brand/10.png" alt="Brand Logo 10" className="brand-logos" />
               <img src="img/brand/11.png" alt="Brand Logo 11" className="brand-logos" />
          </div>
     )
}
