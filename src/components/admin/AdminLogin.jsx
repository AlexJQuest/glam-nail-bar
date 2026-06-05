function AdminLogin({ adminPassword, onPasswordChange, onSubmit, formStatus, formMessage }) {
  return (
    <div className="admin-login-card">
      <p className="muted-text">Enter the secret owner password to view and manage booking requests.</p>
      <form className="admin-form" onSubmit={onSubmit}>
        <div className="form-row">
          <label htmlFor="ownerPassword">Secret Password</label>
          <input
            id="ownerPassword"
            type="password"
            value={adminPassword}
            onChange={onPasswordChange}
            placeholder="Enter owner password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Access Bookings
        </button>
        <p className={`form-message ${formStatus}`}>{formMessage}</p>
      </form>
    </div>
  );
}

export default AdminLogin;
