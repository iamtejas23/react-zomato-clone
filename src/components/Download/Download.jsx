import React, { useState } from 'react';
import { FiSmartphone, FiMail, FiSend } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import app from '../../assets/app.avif';
import android from '../../assets/android.webp';
import apple from '../../assets/apple.webp';
import './Download.css';

const Download = () => {
  const { addToast } = useApp();
  const [method, setMethod] = useState('phone');
  const [inputVal, setInputVal] = useState('');

  const handleSend = () => {
    if (!inputVal.trim()) {
      addToast('Please enter a valid email or phone number', 'warning');
      return;
    }
    addToast('Link sent! Check your device 📱', 'success');
    setInputVal('');
  };

  return (
    <section className="download section" aria-label="Download the app">
      <div className="download__inner">
        <div className="download__visual" aria-hidden="true">
          <img src={app} alt="" className="download__phone" />
        </div>

        <div className="download__content">
          <div className="download__eyebrow">📱 Mobile App</div>
          <h2 className="download__title">Get the Fomato app</h2>
          <p className="download__subtitle">
            We'll send you a link — open it on your phone to download instantly
          </p>

          <div className="download__method-toggle" role="group" aria-label="Send method">
            <label className={`download__method${method === 'email' ? ' download__method--active' : ''}`}>
              <input
                type="radio"
                name="method"
                value="email"
                checked={method === 'email'}
                onChange={() => { setMethod('email'); setInputVal(''); }}
                aria-label="Send by email"
              />
              <FiMail size={15} aria-hidden="true" />
              Email
            </label>
            <label className={`download__method${method === 'phone' ? ' download__method--active' : ''}`}>
              <input
                type="radio"
                name="method"
                value="phone"
                checked={method === 'phone'}
                onChange={() => { setMethod('phone'); setInputVal(''); }}
                aria-label="Send by phone"
              />
              <FiSmartphone size={15} aria-hidden="true" />
              Phone
            </label>
          </div>

          <div className="download__input-row">
            <input
              className="download__input"
              type={method === 'email' ? 'email' : 'tel'}
              placeholder={method === 'email' ? 'Enter your email address' : 'Enter your phone number'}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              aria-label={method === 'email' ? 'Email address' : 'Phone number'}
            />
            <button className="download__send-btn" onClick={handleSend} aria-label="Send download link">
              <FiSend size={16} aria-hidden="true" />
              Send Link
            </button>
          </div>

          <div className="download__stores">
            <p className="download__stores-label">Or download directly</p>
            <div className="download__store-badges">
              <button
                className="download__store-btn"
                onClick={() => addToast('Redirecting to Google Play…', 'info')}
                aria-label="Download on Google Play"
              >
                <img src={android} alt="Google Play Store" className="download__store-img" />
              </button>
              <button
                className="download__store-btn"
                onClick={() => addToast('Redirecting to App Store…', 'info')}
                aria-label="Download on App Store"
              >
                <img src={apple} alt="Apple App Store" className="download__store-img" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
