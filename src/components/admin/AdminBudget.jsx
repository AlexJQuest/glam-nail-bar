function AdminBudget({
  incomes,
  expenses,
  incomeForm,
  expenseForm,
  minDate,
  onIncomeChange,
  onExpenseChange,
  onAddIncome,
  onAddExpense,
}) {
  return (
    <div className="admin-content">
      <div className="admin-finance-grid">
        <section className="admin-card">
          <h3>Record income</h3>
          <form className="admin-form" onSubmit={onAddIncome}>
            <div className="form-row">
              <label htmlFor="incomeSource">Income source</label>
              <input
                id="incomeSource"
                type="text"
                value={incomeForm.source}
                onChange={(event) => onIncomeChange('source', event.target.value)}
                placeholder="Service upsell, retail sales, gift card"
              />
            </div>
            <div className="form-row">
              <label htmlFor="incomeAmount">Amount</label>
              <input
                id="incomeAmount"
                type="number"
                min="0"
                step="0.01"
                value={incomeForm.amount}
                onChange={(event) => onIncomeChange('amount', event.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-row">
              <label htmlFor="incomeDate">Date</label>
              <input
                id="incomeDate"
                type="date"
                min={minDate}
                value={incomeForm.date}
                onChange={(event) => onIncomeChange('date', event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Income
            </button>
          </form>
        </section>

        <section className="admin-card">
          <h3>Record expense</h3>
          <form className="admin-form" onSubmit={onAddExpense}>
            <div className="form-row">
              <label htmlFor="expenseCategory">Expense category</label>
              <input
                id="expenseCategory"
                type="text"
                value={expenseForm.category}
                onChange={(event) => onExpenseChange('category', event.target.value)}
                placeholder="Supplies, rent, utilities"
              />
            </div>
            <div className="form-row">
              <label htmlFor="expenseAmount">Amount</label>
              <input
                id="expenseAmount"
                type="number"
                min="0"
                step="0.01"
                value={expenseForm.amount}
                onChange={(event) => onExpenseChange('amount', event.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-row">
              <label htmlFor="expenseDate">Date</label>
              <input
                id="expenseDate"
                type="date"
                min={minDate}
                value={expenseForm.date}
                onChange={(event) => onExpenseChange('date', event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Expense
            </button>
          </form>
        </section>
      </div>

      <div className="admin-tables-grid">
        <section className="admin-card">
          <h3>Income items</h3>
          {incomes.length === 0 ? (
            <p className="muted-text">No additional income recorded yet.</p>
          ) : (
            <div className="booking-table-wrap">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {incomes.map((item) => (
                    <tr key={item.id}>
                      <td>{item.source}</td>
                      <td>${Number(item.amount).toFixed(2)}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-card">
          <h3>Expense items</h3>
          {expenses.length === 0 ? (
            <p className="muted-text">No expenses recorded yet.</p>
          ) : (
            <div className="booking-table-wrap">
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <td>${Number(item.amount).toFixed(2)}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminBudget;
