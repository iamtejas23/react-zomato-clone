import React from 'react';
import './Footer.css';
import india from '../../assets/india.png';
import glob from '../../assets/globe.svg';
import { IoIosArrowDown } from 'react-icons/io';

const Footer = () => {
  return (
    <div>
       
        <footer>
  <div className="footsec">
    <div className="classsec">
    <h2>Fomato</h2>
    <div className="demo">
        <div className='ping'>  <img src={india} alt="des" />  India <IoIosArrowDown /> </div>
        <div className='ping'> <img src={glob} alt="blog" /> English <IoIosArrowDown /> </div>
    </div>
    </div>
  <div class="container-foot">
    
    <div class="footer-column">
      <h3>About Zomato</h3>
      <ul>
        <li><a href="/">Blog</a></li>
        <li><a href="/">Who We Are</a></li>
        <li><a href="/">Work With Us</a></li>
        <li><a href="/">Investor Relations</a></li>
        <li><a href="/">Report Fraud</a></li>
        <li><a href="/">Press Kit</a></li>
        <li><a href="/">Contact Us</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Zomaverse</h3>
      <ul>
        <li><a href="/">Zomato</a></li>
        <li><a href="/">Blinkit</a></li>
        <li><a href="/">Feeding India</a></li>
        <li><a href="/">Hyperpure</a></li>
        <li><a href="/">Zomaland</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>For Restaurants</h3>
      <ul>
        <li><a href="/">Partner With Us</a></li>
        <li><a href="/">Apps For You</a></li>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Learn More</h3>
      <ul>
        <li><a href="/">Privacy</a></li>
        <li><a href="/">Security</a></li>
        <li><a href="/">Terms</a></li>
        <li><a href="/">Sitemap</a></li>
      </ul>
    </div>
        <div class="footer-column">
            <h3>Social Links</h3>
            <ul>
                <li><a href="/">Facebook</a></li>
                <li><a href="/">Twitter</a></li>
                <li><a href="/">Instagram</a></li>
            </ul>
           
        </div>
    </div>
  </div>
</footer>
    
    </div>
  )
}

export default Footer;