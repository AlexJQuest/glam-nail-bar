function Services({ services }) {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Services</p>
          <h2>Everything you need for gorgeous nails.</h2>
          <p>Choose from a full range of nail services tailored to your style and lifestyle.</p>
        </div>
        <div className="cards-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
