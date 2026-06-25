"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onDone: () => void;
};

const Loading = ({ onDone }: Props) => {
  const [percent, setPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p = 0;
    const fast = setInterval(() => {
      p += Math.round(Math.random() * 7) + 2;
      if (p >= 100) {
        p = 100;
        setPercent(100);
        setLoaded(true);
        clearInterval(fast);
      } else {
        setPercent(p);
      }
    }, 60);
    return () => clearInterval(fast);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    const r = t.getBoundingClientRect();
    t.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    t.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  };

  const handleClick = () => {
    if (!loaded) return;
    setClicked(true);
    setTimeout(() => onDone(), 900);
  };

  return (
    <>
      <div className="loading-header">
        <a href="#" className="loader-title">
          <span className="dot" /> DS.SYS
        </a>
      </div>

      <div className="loading-screen">
        <div className="loading-marquee" aria-hidden>
          <div className="loading-marquee-track">
            <span>A Cybersecurity Analyst</span>
            <span>A Web App Pentester</span>
            <span>A Cybersecurity Analyst</span>
            <span>A Web App Pentester</span>
            <span>A Cybersecurity Analyst</span>
            <span>A Web App Pentester</span>
          </div>
        </div>

        <div
          ref={wrapRef}
          className={`loading-wrap ${clicked ? "loading-clicked" : ""}`}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <div className="loading-hover" />
          <button
            className={`loading-button ${loaded ? "loading-complete" : ""}`}
            type="button"
          >
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
                <div className="loading-box" />
              </div>
            </div>
            <div className="loading-content2">
              <span>Enter</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Loading;
