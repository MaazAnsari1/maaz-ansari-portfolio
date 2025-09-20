import React, { useEffect, useRef } from "react";
import "./ServicesSection.css";
import servicesData from "../../asserts/data/ServicesSectionData/ServicesSectionData.json";

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const serviceContainers = section.querySelectorAll(".service-container");
    const servicesTxt = section.querySelector(".services-txt");
    const elements = [servicesTxt, ...serviceContainers];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      elements.forEach((el) => {
        const elTop = el.getBoundingClientRect().top;

        // Scroll down into section: animate in
        if (elTop < viewportHeight * 0.8 && currentScrollY > lastScrollY.current) {
          el.classList.add("show");
        }

        // Scroll up past section: reverse animation
        if (elTop > viewportHeight && currentScrollY < lastScrollY.current) {
          el.classList.remove("show");
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
    <section className="services-section" ref={sectionRef}>
      <div className="services">
        <div className="services-txt">
          <h1>{servicesData.header.title}</h1>
          <p>{servicesData.header.description}</p>
        </div>

        <div className="services-content">
          {servicesData.items.map((service, index) => (
            <div className="service-container" key={index}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;