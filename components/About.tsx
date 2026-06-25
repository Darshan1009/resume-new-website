import { profile } from "@/lib/data";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-me">
        <h3>About Me</h3>
        <p>
          Cybersecurity enthusiast with practical experience in{" "}
          <span>SOC operations</span>, <span>SIEM monitoring</span>, and{" "}
          <span>vulnerability assessment</span>. Skilled in log analysis,
          threat detection, and incident response using tools like{" "}
          <span>CrowdStrike</span>, <span>Securonix</span>,{" "}
          <span>Wireshark</span>, and <span>Burp Suite</span>. Active
          practitioner of web-app pentesting on PortSwigger labs and
          real-world scenarios.
        </p>
      </div>
    </section>
  );
};

export default About;
