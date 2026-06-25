import { arsenal } from "@/lib/data";

const Arsenal = () => {
  return (
    <section className="arsenal-section section-container" id="arsenal">
      <h2 className="arsenal-title">
        The <span>Arsenal</span>
      </h2>
      <div className="arsenal-grid">
        {arsenal.map((group) => (
          <div className="arsenal-card" key={group.group}>
            <h4>{group.group}</h4>
            <div className="arsenal-list">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Arsenal;
