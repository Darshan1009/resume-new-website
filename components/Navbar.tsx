"use client";

import { useState } from "react";
import HoverLinks from "./HoverLinks";
import ResumeButton from "./ResumeButton";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div className="header">
        <a href="#landing" className="navbar-title" onClick={(e) => handleScroll(e, "#landing")}>
          <span className="dot" /> DS.SYS
        </a>
        <div className="navbar-actions">
          <ul>
            <li>
              <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
                <HoverLinks text="ABOUT" />
              </a>
            </li>
            <li>
              <a href="#career" onClick={(e) => handleScroll(e, "#career")}>
                <HoverLinks text="CAREER" />
              </a>
            </li>
            <li>
              <a href="#work" onClick={(e) => handleScroll(e, "#work")}>
                <HoverLinks text="WORK" />
              </a>
            </li>
            <li>
              <a href="#arsenal" onClick={(e) => handleScroll(e, "#arsenal")}>
                <HoverLinks text="SKILLS" />
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                <HoverLinks text="CONTACT" />
              </a>
            </li>
          </ul>
          <button
            className={`mobile-menu-btn${mobileMenuOpen ? " is-open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <ResumeButton variant="navbar" />
        </div>
      </div>
      <div
        id="mobile-navigation"
        className={`mobile-nav-menu${mobileMenuOpen ? " is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <a href="#about" onClick={(e) => handleScroll(e, "#about")}>
          ABOUT
        </a>
        <a href="#career" onClick={(e) => handleScroll(e, "#career")}>
          CAREER
        </a>
        <a href="#work" onClick={(e) => handleScroll(e, "#work")}>
          WORK
        </a>
        <a href="#arsenal" onClick={(e) => handleScroll(e, "#arsenal")}>
          SKILLS
        </a>
        <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
          CONTACT
        </a>
      </div>

      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="landing-circle3" />
      <div className="grid-overlay" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
