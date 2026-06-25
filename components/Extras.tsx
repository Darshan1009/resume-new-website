import { education, certifications, achievements, hobbies } from "@/lib/data";

const Extras = () => {
  return (
    <section className="extras-section section-container" id="extras">
      <div className="extras-grid">
        <div className="extras-block">
          <h3>Education</h3>
          {education.map((e) => (
            <div className="extras-item" key={e.degree}>
              <div className="period">{e.period}</div>
              <h4>{e.degree}</h4>
              <p>{e.org}</p>
            </div>
          ))}
        </div>

        <div className="extras-block">
          <h3>Certifications</h3>
          {certifications.map((c) => (
            <div className="extras-item" key={c.name}>
              <h4>{c.name}</h4>
              <p>
                {c.issuer} — {c.note}
              </p>
            </div>
          ))}
        </div>

        <div className="extras-block">
          <h3>Achievements</h3>
          <ul className="extras-list">
            {achievements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="extras-block">
          <h3>Hobbies</h3>
          <div className="hobby-tags">
            {hobbies.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Extras;
