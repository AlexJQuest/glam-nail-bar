function AdminBookings({ bookings, sortedBookings, servicePrices, onBookingStatusChange }) {
  return (
    <div className="admin-content">
      <section className="admin-card">
        <h3>Confirmed bookings & upcoming dates</h3>
        {bookings.length === 0 ? (
          <div className="admin-empty">
            <p>No bookings have been submitted yet.</p>
          </div>
        ) : (
          <div className="booking-table-wrap">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Revenue</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {sortedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="booking-client-meta">
                        <div>{booking.fullName}</div>
                        {booking.designLink && (
                          <div className="booking-meta-note">
                            <a href={booking.designLink} target="_blank" rel="noreferrer">
                              View design link
                            </a>
                          </div>
                        )}
                        {booking.moodboardImageName && (
                          <div className="booking-meta-note">Ref image: {booking.moodboardImageName}</div>
                        )}
                      </div>
                    </td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.status}</td>
                    <td>{servicePrices[booking.service] ? `$${servicePrices[booking.service].toFixed(2)}` : '$0.00'}</td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(event) => onBookingStatusChange(booking.id, event.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminBookings;
