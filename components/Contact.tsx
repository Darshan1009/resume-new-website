import { profile } from "@/lib/data";
import { ArrowOutIcon, CopyrightIcon } from "./Icons";

const Contact = () => {
  return (
    <section className="contact-section section-container" id="contact">
      <h3 className="contact-headline">Contact</h3>
      <div className="contact-flex">
        <div className="contact-box">
          <h4>Email</h4>
          <p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <h4>Phone</h4>
          <p>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
              {profile.phone}
            </a>
          </p>
          <h4>Location</h4>
          <p>{profile.location}</p>
        </div>
        <div className="contact-box">
          <h4>Social</h4>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="contact-social"
          >
            LinkedIn <ArrowOutIcon className="arrow" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="contact-social"
          >
            GitHub <ArrowOutIcon className="arrow" />
          </a>
          <h4 style={{ marginTop: 24 }}>Practice Labs</h4>
          <a
            href={profile.portswigger}
            target="_blank"
            rel="noreferrer"
            className="contact-social"
          >
            PortSwigger Dashboard <ArrowOutIcon className="arrow" />
          </a>
          <a
            href={profile.tryhackme}
            target="_blank"
            rel="noreferrer"
            className="contact-social"
          >
            TryHackMe <ArrowOutIcon className="arrow" />
          </a>
          <a
            href={profile.hackthebox}
            target="_blank"
            rel="noreferrer"
            className="contact-social"
          >
            HackTheBox <ArrowOutIcon className="arrow" />
          </a>
        </div>
        <div className="contact-box">
          <h2>
            Designed and built <br />
            by <span>{profile.name}</span>
          </h2>
          <h5>
            <CopyrightIcon /> 2026 — SECURE TERMINAL
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Contact;
