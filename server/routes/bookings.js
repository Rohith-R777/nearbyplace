const express = require('express');
const db = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// POST / - create booking (protected)
router.post('/', auth, (req, res) => {
  const { place_id, booking_date, num_people, special_requests } = req.body;

  if (!place_id || !booking_date || !num_people) {
    return res.status(400).json({ message: 'place_id, booking_date and num_people are required' });
  }

  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(place_id);
  if (!place) {
    return res.status(404).json({ message: 'Place not found' });
  }

  const total_price = num_people * place.price;

  const result = db.prepare(
    `INSERT INTO bookings (user_id, place_id, booking_date, num_people, special_requests, total_price)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(req.user.id, place_id, booking_date, num_people, special_requests || null, total_price);

  const booking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(booking);
});

// GET /my - user's bookings (protected), joined with places
router.get('/my', auth, (req, res) => {
  const bookings = db.prepare(
    `SELECT b.*, p.name AS place_name, p.image_url AS place_image
     FROM bookings b
     JOIN places p ON b.place_id = p.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`
  ).all(req.user.id);

  res.json(bookings);
});

module.exports = router;
