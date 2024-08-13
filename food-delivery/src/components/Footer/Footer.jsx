import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            
            <div className="footer-content-left">
            <h2>Our Montive</h2>

                <p>At <span>Feast&Fare</span>, our motive is simple yet profound: to connect you with your favorite meals effortlessly. We understand that in today's fast-paced world, time is a luxury, and we aim to save you that precious commodity by providing a seamless and enjoyable food ordering experience.</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privicy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>7006211031</li>
                    <li>ratheramir102@gmail.com</li>
                    <li>9541124497</li>
                    <li>pirfazil786@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Rights reserved</p>
    </div>
  )
}

export default Footer
