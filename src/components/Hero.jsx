function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Nail Art & Beauty</p>
          <h1>Luxury nails designed for every occasion.</h1>
          <p>
            Book your appointment with a professional nail technician. Customized manicures, pedicures, nail extensions,
            and bridal packages made to shine.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#booking">Book Now</a>
            <a className="btn btn-secondary" href="#gallery">View Gallery</a>
          </div>
          <ul className="hero-features">
            <li>Premium nail products</li>
            <li>Safe, hygienic studio</li>
            <li>Flexible scheduling</li>
          </ul>
        </div>
        <div className="hero-image-card">
          <img src="https://images.unsplash.com/photo-1516569423137-59e749d99836?auto=format&fit=crop&w=900&q=80" alt="Nail art studio" />
          <div className="hero-info">
            <p className="hero-info-title">Signature Service</p>
            <p>Custom nail art, gel polish, and wellness-focused care for a flawless finish.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
