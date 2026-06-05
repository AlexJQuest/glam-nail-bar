function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container split-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Questions? Ready to book?</h2>
          <p>Send a message or use the booking form to reserve your appointment. We&apos;re here to help.</p>
          <ul className="contact-list">
            <li>Phone: (555) 123-4567</li>
            <li>Email: hello@glamnails.com</li>
            <li>Studio: 123 Beauty Lane</li>
          </ul>
        </div>
        <div className="contact-card">
          <h3>Studio hours</h3>
          <p>Mon-Fri 10am - 7pm</p>
          <p>Sat 10am - 5pm</p>
          <p>Sun Closed</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
