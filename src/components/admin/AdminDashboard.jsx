function AdminDashboard({
  bookingsThisMonth,
  clientCountThisMonth,
  revenueThisMonth,
  incomeThisMonth,
  netThisMonth,
  topServiceThisMonth,
  totalRevenueThisMonth,
  expenseThisMonth,
}) {
  return (
    <div className="admin-content">
      <div className="admin-stats-grid">
        <article className="stat-card">
          <p>Appointments this month</p>
          <strong>{bookingsThisMonth.length}</strong>
        </article>
        <article className="stat-card">
          <p>Clients this month</p>
          <strong>{clientCountThisMonth}</strong>
        </article>
        <article className="stat-card">
          <p>Booking revenue</p>
          <strong>${revenueThisMonth.toFixed(2)}</strong>
        </article>
        <article className="stat-card">
          <p>Other income</p>
          <strong>${incomeThisMonth.toFixed(2)}</strong>
        </article>
        <article className="stat-card">
          <p>Net profit</p>
          <strong>${netThisMonth.toFixed(2)}</strong>
        </article>
      </div>
      <section className="admin-card dashboard-summary">
        <h3>Monthly summary</h3>
        <ul className="dashboard-list">
          <li>
            <strong>{topServiceThisMonth}</strong>
            <span>Top service this month</span>
          </li>
          <li>
            <strong>${expenseThisMonth.toFixed(2)}</strong>
            <span>Expenses this month</span>
          </li>
          <li>
            <strong>${totalRevenueThisMonth.toFixed(2)}</strong>
            <span>Revenue this month</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AdminDashboard;
