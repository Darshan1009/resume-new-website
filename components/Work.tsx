import { projects } from "@/lib/data";

const Work = () => {
  return (
    <section className="work-section section-container" id="work">
      <h2 className="work-title">
        My <span>Work</span>
      </h2>
      <div className="work-grid">
        {projects.map((p, i) => (
          <article
            key={p.name}
            className={`work-card${p.featured ? " featured" : ""}`}
          >
            <div className="work-card-top">
              <span className="work-num">0{i + 1}</span>
              <div className="work-card-meta">
                <span className="work-period">{p.period}</span>
                {p.featured && <span className="featured-tag">FEATURED</span>}
              </div>
            </div>
            <h3>{p.name}</h3>
            <div className="work-repo">{p.repo}</div>
            <p>{p.desc}</p>
            <div className="work-stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
