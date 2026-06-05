# Local MySQL setup for Glam Nail Bar

This guide will help you create a MySQL database in XAMPP and run a small Express API that the frontend can use for bookings, incomes, and expenses.

## 1. Create the database

1. Start XAMPP and ensure MySQL (MariaDB) is running.
2. Open phpMyAdmin (http://localhost/phpmyadmin) and run the SQL in `db/schema.sql` to create the `glam_nail_bar` database and tables.

OR from a terminal (if `mysql` is on PATH):

```sql
mysql -u root -p < db/schema.sql
```

## 2. Run the API server

1. Copy the example env and edit if needed:

```bash
cd server
copy .env.example .env   # Windows
# or
cp .env.example .env
```

2. Install dependencies and start the server:

```bash
cd server
npm install
npm run start
```

The API will run at `http://localhost:4000` by default. Endpoints:

- `GET /api/bookings` — list bookings
- `POST /api/bookings` — create booking (JSON body)
- `PUT /api/bookings/:id/status` — update booking status
- `GET /api/budget/incomes` — list incomes
- `POST /api/budget/incomes` — add income
- `GET /api/budget/expenses` — list expenses
- `POST /api/budget/expenses` — add expense
- `POST /api/auth/login` — admin login (body: `{ "password": "..." }`)

## 3. Connect the frontend

Update the frontend to call the API instead of localStorage. Example base URL: `http://localhost:4000/api`.

## Security notes

- This server is minimal and intended for local development. For production, add authentication, input validation, rate limiting, and TLS.
- Do not commit `.env` with secrets to source control.
