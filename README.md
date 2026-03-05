# 🗺️ NearbyPlace — Karnataka Tourism Website

A full-stack tourism booking platform for Karnataka, India. Inspired by **EasyMyTrip.com** with a **Netflix-style dark theme** and horizontal scrolling cards.

## ✨ Features

- 🔐 **JWT Authentication** — Register & Login with secure token-based auth
- 🏠 **Netflix-style Home** — Horizontal scrolling rows by category (Hill Stations, Palaces, Wildlife, Temples, Beaches)
- 🗺️ **16 Karnataka Destinations** — Real info, Unsplash images, ratings, prices
- 📄 **Place Detail Pages** — Gallery, highlights, reviews, booking info
- 🎫 **Booking System** — Select date, people count, get confirmation
- 📋 **My Bookings** — View all your bookings
- 🔍 **Search & Filter** — By name, category, price range
- 📱 **Responsive** — Works on mobile, tablet, desktop
- 🌙 **Dark Theme** — Netflix-inspired dark UI with amber accents

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | SQLite (better-sqlite3) |
| Auth | JWT (jsonwebtoken + bcryptjs) |
| HTTP Client | Axios |
| Routing | React Router v6 |

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+ installed

### 1. Clone the repository
```bash
git clone https://github.com/Rohith-R777/nearbyplace.git
cd nearbyplace
```

### 2. Setup the Backend
```bash
cd server
npm install
```

### 3. Create environment file
Create `server/.env`:
```env
JWT_SECRET=karnataka_tourism_secret_key_2024
PORT=5000
```

### 4. Seed the database
```bash
npm run seed
```

### 5. Start the backend server
```bash
npm start
```
The server will run at **http://localhost:5000**

### 6. Setup the Frontend (new terminal)
```bash
cd client
npm install
```

### 7. Start the frontend
```bash
npm run dev
```
The app will open at **http://localhost:5173**

## 📍 Tourist Places Included

| # | Place | Category | Rating |
|---|-------|----------|--------|
| 1 | Nandi Hills | Hill Stations & Nature | ⭐ 4.5 |
| 2 | Mysore Palace | Palaces & Heritage | ⭐ 4.7 |
| 3 | Mysore Zoo | Wildlife & Parks | ⭐ 4.4 |
| 4 | Chamundeshwari Temple | Temples & Spiritual | ⭐ 4.5 |
| 5 | Virupaksha Temple (Hampi) | Temples & Spiritual | ⭐ 4.8 |
| 6 | Jog Falls | Beaches & Waterfalls | ⭐ 4.6 |
| 7 | Coorg (Madikeri) | Hill Stations & Nature | ⭐ 4.7 |
| 8 | Gokarna Beach | Beaches & Waterfalls | ⭐ 4.5 |
| 9 | Bannerghatta National Park | Wildlife & Parks | ⭐ 4.3 |
| 10 | Lalbagh Botanical Garden | Hill Stations & Nature | ⭐ 4.4 |
| 11 | Badami Cave Temples | Palaces & Heritage | ⭐ 4.5 |
| 12 | Murudeshwar Temple | Temples & Spiritual | ⭐ 4.6 |
| 13 | Sringeri Sharada Peetham | Temples & Spiritual | ⭐ 4.7 |
| 14 | Kabini Wildlife Sanctuary | Wildlife & Parks | ⭐ 4.6 |
| 15 | Talakadu | Temples & Spiritual | ⭐ 4.3 |
| 16 | Adiyogi Shiva Statue | Temples & Spiritual | ⭐ 4.6 |

## 🔑 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/me` | ✓ | Get current user |
| GET | `/api/places` | No | All places (search/filter) |
| GET | `/api/places/:id` | No | Single place details |
| GET | `/api/places/category/:cat` | No | Places by category |
| POST | `/api/bookings` | ✓ | Create booking |
| GET | `/api/bookings/my` | ✓ | User's bookings |

## 📁 Project Structure

```
nearbyplace/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # Navbar, PlaceCard, StarRating, HeroCarousel, ScrollRow
│   │   ├── context/           # AuthContext (JWT management)
│   │   └── pages/             # Auth, Home, PlaceDetail, Booking, MyBookings
│   └── package.json
├── server/                    # Express backend
│   ├── config/database.js     # SQLite setup
│   ├── middleware/auth.js     # JWT verification
│   ├── routes/                # auth, places, bookings
│   ├── seed.js                # Seed 16 Karnataka places
│   └── server.js
└── README.md
```

## 🎨 Design

- **Dark theme**: `#0f0f0f` base, `#1a1a1a` cards
- **Accent colors**: Amber `#f59e0b` / Orange `#ea580c`
- **Typography**: Inter + Poppins (Google Fonts)
- **Animations**: Card hover zoom, carousel transitions, smooth scrolling

