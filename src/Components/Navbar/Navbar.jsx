import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../asserts/logo/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const chatButtonRef = useRef(null);

  const handleMenuToggle = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setMenuOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const overlay = document.querySelector(".menu-overlay");
      const toggleButton = document.querySelector(".menu-toggle");

      if (
        menuOpen &&
        overlay &&
        !overlay.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        handleMenuToggle();
      }
    };

    const handleScroll = () => {
      if (menuOpen) {
        handleMenuToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);


  useEffect(() => {
    const chatButton = chatButtonRef.current;
    if (!chatButton) return;

    const handleMouseEnter = () => {
      chatButton.classList.remove("animate-out");
      chatButton.classList.add("animate-in");
    };

    const handleMouseLeave = () => {
      chatButton.classList.remove("animate-in");
      chatButton.classList.add("animate-out");
    };

    chatButton.addEventListener("mouseenter", handleMouseEnter);
    chatButton.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      chatButton.removeEventListener("mouseenter", handleMouseEnter);
      chatButton.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <div className="nav-right">
          <button ref={chatButtonRef} className="chat-button">
            <span className="chat-btn-txt">Chat with Maaz</span>
            <div className="icon-wrapper">
              <FontAwesomeIcon className="faMessage-icon" icon={faMessage} />
            </div>
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "menu-open" : "menu-closed"}`}
            data-open={menuOpen}
            onClick={handleMenuToggle}
          >
            <div className="menu-toggle-text-wrapper">
              <span className="menu-toggle-txt menu">MENU</span>
              <span className="menu-toggle-txt close">CLOSE</span>
            </div>
            <div className="dot-wrapper">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </button>
        </div>
      </nav>

      {(menuOpen || isClosing) && (
        <div className={`menu-overlay ${isClosing ? "slide-out" : "slide-in"}`}>
          <div className="menu-links">
            <NavLink
              to="/"
              className={location.pathname === "/" ? "disabled" : ""}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faArrowRight} className="menu-arrow" />
              Home
            </NavLink>
            <NavLink
              to="/work"
              className={location.pathname === "/work" ? "disabled" : ""}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faArrowRight} className="menu-arrow" />
              Work
            </NavLink>
            <NavLink
              to="/contact"
              className={location.pathname === "/contact" ? "disabled" : ""}
              onClick={handleMenuToggle}
            >
              <FontAwesomeIcon icon={faArrowRight} className="menu-arrow" />
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;