import React from "react";
import "./HeroSection.css";
import ProfileTypewriter from "../ProfileTypewriter/ProfileTypewriter";

const HeroSection = () => {
  return (
    <>
      <section className="hero-section">

        <div className="hero">

          <div className="hero-content">
            <h1>Hello</h1>
            
            <div className="hero-txt">
              <span className="hero-profile-vl"></span>
              <div className="profile-txt">
                <p>I am Maaz Ansari,</p>
              </div>
            </div>

            <div className="writing-profile-txt">
              <ProfileTypewriter />
            </div>
          </div>
          
          <div className="profile-image-container"></div>
        </div>

        <div className="social-media-links-section-wrap">
        </div>

      </section>
    </>
  );
}

export default HeroSection;
