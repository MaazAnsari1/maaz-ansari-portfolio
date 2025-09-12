import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const nameRef = useRef(null);
  const menuWrapRef = useRef(null);
  const goUpBtnRef = useRef(null);
  const menuLinksRef = useRef([]);

  // Scroll animation for Name
  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        nameEl.classList.toggle("animate-in", entry.isIntersecting);
        nameEl.classList.toggle("animate-out", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(nameEl);
    return () => observer.disconnect();
  }, []);

  // Scroll animation for Menu Wrap
  useEffect(() => {
    const wrapEl = menuWrapRef.current;
    if (!wrapEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        wrapEl.classList.toggle("animate-in", entry.isIntersecting);
        wrapEl.classList.toggle("animate-out", !entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(wrapEl);
    return () => observer.disconnect();
  }, []);

  // Hover animation for "Go Up" button
  useEffect(() => {
    const btn = goUpBtnRef.current;
    if (!btn) return;

    const handleEnter = () => {
      btn.classList.add("animate-in");
      btn.classList.remove("animate-out");
    };

    const handleLeave = () => {
      btn.classList.remove("animate-in");
      btn.classList.add("animate-out");
    };

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Hover animation for menu links
  useEffect(() => {
    const links = menuLinksRef.current;

    links.forEach((link) => {
      if (!link) return; // ✅ Prevent error on null

      const handleEnter = () => {
        link.classList.add("animate-in");
        link.classList.remove("animate-out");
      };

      const handleLeave = () => {
        link.classList.remove("animate-in");
        link.classList.add("animate-out");
      };

      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);

      // Attach cleanup safely
      link._cleanup = () => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      links.forEach((link) => {
        if (link && link._cleanup) {
          link._cleanup();
        }
      });
    };
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Work", path: "/work" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="footer-wrap">
      <div className="footer">
        <div className="footer-name-wrap animate-out" ref={nameRef}>
          <h1 className="footer-first-name">maaz</h1>
          <p className="footer-last-name">ansari</p>
        </div>

        <div className="footer-container">
          <div className="footer-img-wrap" />
          <div className="footer-txt-wrap">
            <h1 className="copyright-txt">
              <FontAwesomeIcon className="copyright-icon" icon={faCopyright} />
              Maaz Ansari
            </h1>
            <p className="footer-profile-txt">A Software Developer.</p>
          </div>
        </div>

        <div className="footer-socialMedia-wrap">
          <ul>
            <li>
              <a href="www.linkedin.com/in/maaz-ansari-linked-in">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/MaazAnsari1">GitHub</a>
            </li>
            <li>
              <a href="https://www.instagram.com/hey.mazzu?igsh=MXdsZzFwNTU4M2xweQ==">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://x.com/MaazAnsari6692?t=HPHN4cijsOz24FYmhxSPIg&s=08">
                X
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-menu-wrap animate-out" ref={menuWrapRef}>
        <div className="footer-menu">
          {menuItems.map((item, index) => {
            const isDisabled = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`footer-menu-link ${
                  isDisabled ? "disabled-link" : ""
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}
                ref={(el) => (menuLinksRef.current[index] = el)}
              >
                {item.label}
                <span className="footer-rightArrowIcon-wrap">
                  <FontAwesomeIcon
                    className="faArrowRight"
                    icon={faArrowRight}
                  />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="goUp-btn-wrap">
          <Link
            to="/"
            className="footer-goUp-btn animate-out"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
            ref={goUpBtnRef}
          >
            Go Up
            <span className="footer-upAttrowIcon-wrap">
              <FontAwesomeIcon className="faArrowUp" icon={faArrowUp} />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
