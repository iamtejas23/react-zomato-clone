import React from 'react';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <div>
        <div className="navbar">
            <div className='menulinks'>
                <a className='navlinks' href="/"> Get The app</a>
            </div>
            <div className='menulinks'>
                <a className='navlinks' href="/"> Add restuarant</a>
                <a className='navlinks' href="/"> Log in</a>
                <a className='navlinks' href="/"> Sign up</a>

            </div>

            </div>
    </div>
  )
}

export default Navbar;