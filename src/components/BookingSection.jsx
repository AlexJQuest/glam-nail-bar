import BookingForm from './BookingForm';

function BookingSection({
  formData,
  onChange,
  onSubmit,
  formStatus,
  formMessage,
  minDate,
  serviceOptions,
}) {
  return (
    <section className="section booking" id="booking">
      <div className="container booking-grid">
        <div className="booking-copy">
          <p className="eyebrow">Booking</p>
          <h2>Reserve your appointment today.</h2>
          <p>
            Fill out the form to request your preferred service and time. We will confirm your booking by phone or email.
          </p>
          <ul className="booking-benefits">
            <li>Flexible morning and evening appointments</li>
            <li>Private studio with premium sanitation</li>
            <li>Custom design consultation included</li>
          </ul>
        </div>
        <BookingForm
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          formStatus={formStatus}
          formMessage={formMessage}
          minDate={minDate}
          serviceOptions={serviceOptions}
        />
      </div>
    </section>
  );
}

export default BookingSection;
