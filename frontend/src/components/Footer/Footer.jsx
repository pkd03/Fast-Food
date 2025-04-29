import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='tomatologofooter' src={assets.logo} alt="" />
            <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Trang trủ</li>
              <li>Giới thiệu</li>
              <li>Vận chuyển</li>
              <li>Chính sách</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Thông tin liên lạc</h2>
            <ul>
              <li>+84-012345678</li>
              <li>contact@fastfood.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 © FastFood.com - All rights reserved.</p>
    </div>
  )
}

export default Footer