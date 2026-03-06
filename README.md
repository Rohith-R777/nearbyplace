# nearbyplace

A tourism planner web application for discovering and booking nearby places in Karnataka, India.

## Project Status

The **main** branch currently contains only this README and a LICENSE file. A complete full-stack implementation is available in [PR #1](https://github.com/Rohith-R777/nearbyplace/pull/1) and is ready for review and merge.

### What's been built (in PR #1)

| Area | Technology | Status |
|------|-----------|--------|
| Frontend | React + Vite + Tailwind CSS | ✅ Complete |
| Backend | Node.js + Express.js | ✅ Complete |
| Database | SQLite (better-sqlite3) | ✅ Complete |
| Authentication | JWT (jsonwebtoken + bcryptjs) | ✅ Complete |

**Features implemented:**

- **Auth page** – Register and login with JWT-based authentication
- **Home / Dashboard** – Netflix-style horizontal scroll rows by category (Hill Stations, Palaces, Wildlife, Temples, Beaches)
- **Hero carousel** – Featured Karnataka destinations
- **Place detail page** – Gallery, highlights, reviews, and booking sidebar
- **Booking page** – Date picker, guest count, price breakdown, confirmation
- **My Bookings page** – View all bookings for the logged-in user
- **Search & Filter** – Filter places by name, category, and price range
- **16 real Karnataka tourist places** seeded into the database (Nandi Hills, Mysore Palace, Hampi, Jog Falls, Coorg, Gokarna, and more)

### Next steps

1. **Review and merge PR #1** to bring the full implementation into `main`.
2. After merging, follow the setup instructions below to run the app locally.

## Setup (after merging PR #1)

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

### Backend

```bash
cd server
npm install
cp .env.example .env   # then edit .env with your JWT secret
node seed.js            # seed the database with sample places
node server.js          # starts the API server on http://localhost:3001
```

### Frontend

```bash
cd client
npm install
npm run dev             # starts the dev server on http://localhost:5173
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
