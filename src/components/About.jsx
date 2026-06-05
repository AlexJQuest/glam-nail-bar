function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About</p>
          <h2>Experienced nail technician with a luxury touch.</h2>
          <p>
            With years of professional training and a passion for polished details, I create looks that last and feel beautiful.
            The studio is centered on comfort, safety, and custom nail art for every client.
          </p>
          <div className="about-stats">
            <div>
              <strong>8+</strong>
              <span>Years experience</span>
            </div>
            <div>
              <strong>1500+</strong>
              <span>Clients served</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Sanitation compliance</span>
            </div>
          </div>
        </div>
        <div className="about-card">
          <h3>What you can expect</h3>
          <ul>
            <li>Consultation and design planning</li>
            <li>Premium polish, acrylic, and gel formulas</li>
            <li>Meticulous sanitation and care</li>
            <li>Beautiful results on time</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
