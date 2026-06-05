function BookingForm({
  formData,
  onChange,
  onSubmit,
  formStatus,
  formMessage,
  minDate,
  serviceOptions,
}) {
  return (
    <form className="booking-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Jane Doe"
          value={formData.fullName}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={onChange}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="service">Service</label>
        <select id="service" name="service" value={formData.service} onChange={onChange} required>
          <option value="">Select service</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row form-row-split">
        <div>
          <label htmlFor="date">Preferred Date</label>
          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            value={formData.date}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Preferred Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={formData.time}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <label htmlFor="notes">Notes or Design Ideas</label>
        <textarea
          id="notes"
          name="notes"
          rows="4"
          placeholder="Describe your ideal nails or special event."
          value={formData.notes}
          onChange={onChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="designLink">Design / Moodboard Link</label>
        <input
          id="designLink"
          name="designLink"
          type="url"
          placeholder="https://example.com/inspiration"
          value={formData.designLink}
          onChange={onChange}
        />
      </div>
      <div className="form-row">
        <label htmlFor="moodboardImageName">Upload Reference Image</label>
        <input
          id="moodboardImageName"
          name="moodboardImageName"
          type="file"
          accept="image/*"
          onChange={onChange}
        />
        {formData.moodboardImageName && (
          <p className="file-note">Selected file: {formData.moodboardImageName}</p>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Booking
      </button>
      <p className={`form-message ${formStatus}`}>{formMessage}</p>
    </form>
  );
}

export default BookingForm;
