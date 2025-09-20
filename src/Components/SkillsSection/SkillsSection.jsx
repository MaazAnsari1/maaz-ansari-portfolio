import React, { useEffect, useRef} from "react";
import "./SkillsSection.css";

import ResumePDF from "../../asserts/doc/Maaz-Ansari-CV.pdf";

import ReactJSIcon from "../../asserts/img/Skills-Section/ReactJS.png";
import JavaScriptIcon from "../../asserts/img/Skills-Section/Javascript.png";
import HTMLIcon from "../../asserts/img/Skills-Section/HTML.png";
import CSSIcon from "../../asserts/img/Skills-Section/CSS.png";
import SASSIcon from "../../asserts/img/Skills-Section/SASS.png";
import BootstrapIcon from "../../asserts/img/Skills-Section/Bootstrap.png";
import VSCodeIcon from "../../asserts/img/Skills-Section/VS-Code.png";
import GitIcon from "../../asserts/img/Skills-Section/git.png";

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const elements = section.querySelectorAll(".skills-txt-wrap, .skill-icon");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      elements.forEach((el, index) => {
        const elTop = el.getBoundingClientRect().top;

        // Scroll down into section: animate in
        if (elTop < viewportHeight * 0.8 && currentScrollY > lastScrollY.current) {
          el.classList.add("show-element");
        }

        // Scroll up past section: reverse animation
        if (elTop > viewportHeight && currentScrollY < lastScrollY.current) {
          el.classList.remove("show-element");
        }
      });

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-txt-wrap">
        <h2>a problem is a chance for you do your best.</h2>
        <h1>Skills & Experience</h1>
        <p>
          The main area of expertise is Front End Development (client side of
          the web). HTML, CSS, JS, building small and medium web applications with React,
          custom plugins, features, animations, and coding interactive layout.
        </p>
        <p>
          Visit my{" "}
          <a
            href="https://www.linkedin.com/in/maaz-ansari-linked-in"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          for more details or download my{" "}
          <a href={ResumePDF} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          .
        </p>
      </div>

      <div className="skills-icons-wrap">
        <div className="skill-icon">
          <img src={ReactJSIcon} alt="ReactJS Icon" />
          <p>ReactJS</p>
        </div>
        <div className="skill-icon">
          <img src={JavaScriptIcon} alt="JavaScript Icon" />
          <p>JavaScript</p>
        </div>
        <div className="skill-icon">
          <img src={HTMLIcon} alt="HTML5 Icon" />
          <p>HTML5</p>
        </div>
        <div className="skill-icon">
          <img src={CSSIcon} alt="CSS3 Icon" />
          <p>CSS3</p>
        </div>
        <div className="skill-icon">
          <img src={SASSIcon} alt="SASS Icon" />
          <p>SASS</p>
        </div>
        <div className="skill-icon">
          <img src={BootstrapIcon} alt="Bootstrap Icon" />
          <p>Bootstrap</p>
        </div>
        <div className="skill-icon">
          <img src={VSCodeIcon} alt="VS Code Icon" />
          <p>Visual Studio Code</p>
        </div>
        <div className="skill-icon">
          <img src={GitIcon} alt="Git Icon" />
          <p>Git</p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;