import express from 'express';
const router = express.Router();

export default function createBudgetRoutes(pool) {
  // incomes
  router.get('/incomes', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM incomes ORDER BY date DESC, createdAt DESC');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch incomes' });
    }
  });

  router.post('/incomes', async (req, res) => {
    const { source, amount, date } = req.body;
    if (!source || !amount || !date) return res.status(400).json({ error: 'Missing fields' });
    try {
      const [result] = await pool.execute('INSERT INTO incomes (source, amount, date) VALUES (?, ?, ?)', [source, amount, date]);
      const [rows] = await pool.query('SELECT * FROM incomes WHERE id = ?', [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add income' });
    }
  });

  // expenses
  router.get('/expenses', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM expenses ORDER BY date DESC, createdAt DESC');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  });

  router.post('/expenses', async (req, res) => {
    const { category, amount, date } = req.body;
    if (!category || !amount || !date) return res.status(400).json({ error: 'Missing fields' });
    try {
      const [result] = await pool.execute('INSERT INTO expenses (category, amount, date) VALUES (?, ?, ?)', [category, amount, date]);
      const [rows] = await pool.query('SELECT * FROM expenses WHERE id = ?', [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add expense' });
    }
  });

  return router;
}
