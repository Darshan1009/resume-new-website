"use client";

import { useEffect, useRef } from "react";

const WhatIDo = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (!isTouch) return;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.classList.remove("what-noTouch");
      const onClick = () => {
        card.classList.toggle("what-content-active");
        card.classList.remove("what-sibling");
        const parent = card.parentElement;
        if (!parent) return;
        Array.from(parent.children).forEach((sib) => {
          if (sib !== card) {
            sib.classList.remove("what-content-active");
            sib.classList.toggle("what-sibling");
          }
        });
      };
      card.addEventListener("click", onClick);
    });
  }, []);

  const setRef = (el: HTMLDivElement | null, i: number) => {
    cardsRef.current[i] = el;
  };

  return (
    <section className="whatIDO" id="whatido">
      <div className="what-box">
        <h2 className="what-headline-h2">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(194,164,255,0.6)" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="rgba(194,164,255,0.6)" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(194,164,255,0.6)" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(194,164,255,0.6)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>DEFEND</h3>
              <h4>SOC & Threat Detection</h4>
              <p>
                Triage SIEM alerts, hunt threats with EDR/XDR, refine detection
                logic, and own incident response — from first alert to post-mortem.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Securonix</div>
                <div className="what-tags">Sentinel</div>
                <div className="what-tags">Splunk</div>
                <div className="what-tags">CrowdStrike</div>
                <div className="what-tags">Sigma</div>
                <div className="what-tags">KQL</div>
                <div className="what-tags">Sysmon</div>
                <div className="what-tags">Wireshark</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(194,164,255,0.6)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>ATTACK</h3>
              <h4>Web App Pentesting & VAPT</h4>
              <p>
                Recon, exploit, and report. PortSwigger labs + real targets.
                OWASP Top 10 & API Top 10 with clear remediation advice.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Burp Suite</div>
                <div className="what-tags">OWASP ZAP</div>
                <div className="what-tags">sqlmap</div>
                <div className="what-tags">Nmap</div>
                <div className="what-tags">Nuclei</div>
                <div className="what-tags">Metasploit</div>
                <div className="what-tags">Python</div>
                <div className="what-tags">Postman</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
