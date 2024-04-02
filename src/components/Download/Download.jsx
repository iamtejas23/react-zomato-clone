import React from 'react';
import './Download.css';
import app from '../../assets/app.avif';
import android from '../../assets/android.webp';
import apple from '../../assets/apple.webp';

const Download = () => {
  return (
    <div className='down-app'>
        <div className="app-im">
            <img src={app} alt="download" />
        </div>
        <div className="app-text">
            <h2>Get the Fomato app</h2>
            <p>We will send you a link, open it on your phone to download the app</p>
            <div className='rad-app'>
                <input className='rad' type="radio" />
                <label>Email</label>
                <input className='rad' type="radio" />
                <label>Phone</label>
            </div>
            <div className="app-input">
                <input type="text" placeholder="Enter your phone number" />
                <button>Send Link</button>
                </div>
            <div className="app-btn">
                <p>Download app from</p>
                <div className='down-img'>
                <img src={android} alt="phone" />
                <img src={apple} alt="" />
                </div>
                </div>
                </div>
    </div>
  )
}

export default Download;