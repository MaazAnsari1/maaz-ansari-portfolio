import React from "react";
import "./SkillSection.css";

const SkillSection = () => {
  return (
    <>
      <section className="skill-section">
        <div className="skill">
            <div className="skill-section-image"></div>
            <div className="skill-txt-wrap">
                <div className="skill-head">
                    <h1>my skills</h1>
                </div>
                <div className="skill-conatainer">
                    <img src="" alt="" />
                    <p>javascrip</p>
                </div>
                <div className="skill-conatainer">
                    <img src="" alt="" />
                    <p>javascrip</p>
                </div>
                <div className="skill-conatainer">
                    <img src="" alt="" />
                    <p>javascrip</p>
                </div>
                <div className="skill-conatainer">
                    <img src="" alt="" />
                    <p>javascrip</p>
                </div>

                <div className="skill-section-resume-download-btn-wrap">
                    <button className="skill-section-resume-download-btn">download resume</button>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default SkillSection;
