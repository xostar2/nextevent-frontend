import React, { useContext } from 'react'
import '../styles/AboutUs.css'
import BackgroundImage from '../components/BackgroundImage'
import { AppContext } from '../context/UserContext';
const AboutUs = () => {
    const {vendordetails} = useContext(AppContext);
    console.log("this is vendordetails in about us",vendordetails);
  return (
    <>
        
           <div className="about-us-container">
           
            <div className="about-us-content">
                <h1 className="about-us-title">Welcome to Our World</h1>
                <p className="about-us-description">
                    At <span className="brand-name">Infinite Creations</span>, we believe in the magic of pixels, the rhythm of code, and the symphony of design. Our journey began with a single keystroke, and now we're crafting digital dreams that dance across screens.
                </p>
                <p className="about-us-description">
                    Meet our team of <span className="team-role">dreamweavers</span>, <span className="team-role">code whisperers</span>, and <span className="team-role">pixel sorcerers</span>. We're not just developers; we're storytellers who weave narratives through lines of code. Our passion fuels our creativity, and our creativity fuels your digital experiences.
                </p>
                <p className="about-us-description">
                    Whether it's a sleek website, a mesmerizing app, or an enchanting UI, we infuse every project with a touch of <span className="digital-stardust">digital stardust</span>. Our mission? To turn ideas into pixels, and pixels into unforgettable moments.
                </p>
                <p className="about-us-description">
                    Join us on this cosmic journey. Let's create something extraordinary together!
                </p>
            </div>
        </div>
    
    </>
  )
}

export default AboutUs
