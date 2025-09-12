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
  const overlayRef = useRef(null);

  // ✅ Toggle menu with animation
  const handleMenuToggle = () => {
    if (menuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 300); // match CSS transition duration
    } else {
      setMenuOpen(true);
    }
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        overlayRef.current &&
        !overlayRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        handleMenuToggle();
      }
    };

    const handleScroll = () => {
      if (menuOpen) handleMenuToggle();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  return (
    <header>
      <nav className="navbar">
        <NavLink to="/" className="logo">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <div className="nav-right">
          {/* ✅ Chat Button with React hover events */}
          <button
            ref={chatButtonRef}
            className="chat-button animate-out"
            onMouseEnter={(e) => {
              e.currentTarget.classList.remove("animate-out");
              e.currentTarget.classList.add("animate-in");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove("animate-in");
              e.currentTarget.classList.add("animate-out");
            }}
          >
            <span className="chat-btn-txt">Chat with Maaz</span>
            <div className="icon-wrapper">
              <FontAwesomeIcon className="faMessage-icon" icon={faMessage} />
            </div>
          </button>

          {/* ✅ Menu Toggle */}
          <button
            className={`menu-toggle ${menuOpen ? "menu-open" : "menu-closed"}`}
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

      {/* ✅ Overlay */}
      {(menuOpen || isClosing) && (
        <div
          ref={overlayRef}
          className={`menu-overlay ${isClosing ? "slide-out" : "slide-in"}`}
        >
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