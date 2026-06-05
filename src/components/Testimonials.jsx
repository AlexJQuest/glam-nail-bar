function Testimonials({ testimonials }) {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Testimonials</p>
          <h2>Clients love their nails.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.author}>
              <p>{testimonial.quote}</p>
              <strong>— {testimonial.author}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
