import AdminLogin from './admin/AdminLogin';
import AdminTabs from './admin/AdminTabs';
import AdminBookings from './admin/AdminBookings';
import AdminDashboard from './admin/AdminDashboard';
import AdminBudget from './admin/AdminBudget';

function AdminPage({
  adminAuth,
  adminTab,
  adminPassword,
  formStatus,
  formMessage,
  bookings,
  sortedBookings,
  servicePrices,
  incomes,
  expenses,
  incomeForm,
  expenseForm,
  minDate,
  handleAdminLogin,
  handleLogout,
  handlePasswordChange,
  handleBookingStatusChange,
  setAdminTab,
  handleIncomeChange,
  handleExpenseChange,
  handleAddIncome,
  handleAddExpense,
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
    <div className="admin-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="brand">
            Glam Nails Studio
          </a>
          <nav className="site-nav admin-nav">
            <a href="#home">Return Home</a>
            {adminAuth ? (
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            ) : null}
          </nav>
        </div>
      </header>

      <main className="section admin-page">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Owner Portal</p>
            <h2>Secure bookings dashboard</h2>
          </div>
          {!adminAuth ? (
            <AdminLogin
              adminPassword={adminPassword}
              onPasswordChange={(event) => handlePasswordChange(event.target.value)}
              onSubmit={handleAdminLogin}
              formStatus={formStatus}
              formMessage={formMessage}
            />
          ) : (
            <div className="admin-dashboard">
              <AdminTabs activeTab={adminTab} setActiveTab={setAdminTab} />
              {adminTab === 'bookings' && (
                <AdminBookings
                  bookings={bookings}
                  sortedBookings={sortedBookings}
                  servicePrices={servicePrices}
                  onBookingStatusChange={handleBookingStatusChange}
                />
              )}
              {adminTab === 'dashboard' && (
                <AdminDashboard
                  bookingsThisMonth={bookingsThisMonth}
                  clientCountThisMonth={clientCountThisMonth}
                  revenueThisMonth={revenueThisMonth}
                  incomeThisMonth={incomeThisMonth}
                  netThisMonth={netThisMonth}
                  topServiceThisMonth={topServiceThisMonth}
                  totalRevenueThisMonth={totalRevenueThisMonth}
                  expenseThisMonth={expenseThisMonth}
                />
              )}
              {adminTab === 'budget' && (
                <AdminBudget
                  incomes={incomes}
                  expenses={expenses}
                  incomeForm={incomeForm}
                  expenseForm={expenseForm}
                  minDate={minDate}
                  onIncomeChange={handleIncomeChange}
                  onExpenseChange={handleExpenseChange}
                  onAddIncome={handleAddIncome}
                  onAddExpense={handleAddExpense}
                />
              )}
              <p className={`form-message ${formStatus}`}>{formMessage}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
