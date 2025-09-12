import React, { useEffect, useRef } from "react";
import "./ServicesSection.css";
import servicesData from "../../asserts/data/ServicesSectionData/ServicesSectionData.json";

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const serviceContainers = section.querySelectorAll(".service-container");
    const servicesTxt = section.querySelector(".services-txt");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate text
            if (entry.target.classList.contains("services-txt")) {
              entry.target.classList.add("show");
            }
            // Animate each service container
            if (entry.target.classList.contains("service-container")) {
              entry.target.classList.add("show");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe both text + service boxes
    observer.observe(servicesTxt);
    serviceContainers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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