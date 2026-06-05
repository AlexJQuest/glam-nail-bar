import express from 'express';
const router = express.Router();

export default function createBookingRoutes(pool) {
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM bookings ORDER BY createdAt DESC');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  router.post('/', async (req, res) => {
    const { fullName, email, phone, service, date, time, notes, designLink, moodboardImageName } = req.body;
    if (!fullName || !email || !phone || !service || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const [result] = await pool.execute(
        `INSERT INTO bookings (fullName, email, phone, service, date, time, notes, designLink, moodboardImageName)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fullName, email, phone, service, date, time, notes || '', designLink || '', moodboardImageName || '']
      );

      const insertId = result.insertId;
      const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [insertId]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await pool.execute('UPDATE bookings SET status = ? WHERE id = ?', [status || 'Pending', id]);
      const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update booking' });
    }
  });

  return router;
}
