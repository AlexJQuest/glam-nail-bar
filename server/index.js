import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import pool from './db.js';
import createBookingRoutes from './routes/bookings.js';
import createBudgetRoutes from './routes/budget.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (allowedOrigins.length) {
  app.use(
    cors({
      origin(origin, callback) {
        // allow non-browser tools (no origin) and allowedOrigins
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS origin denied'));
      },
    })
  );
} else {
  app.use(cors());
}

app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));

app.use('/api/bookings', createBookingRoutes(pool));
app.use('/api/budget', createBudgetRoutes(pool));

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'glamOwnerSecret2026';
  if (password === adminPassword) return res.json({ ok: true });
  return res.status(401).json({ ok: false });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
