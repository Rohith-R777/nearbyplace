const express = require('express');
const db = require('../config/database');

const router = express.Router();

// GET / - all places with optional filters
router.get('/', (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;

  let query = 'SELECT * FROM places WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ? OR city LIKE ? OR district LIKE ?)';
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  if (minPrice !== undefined) {
    query += ' AND price >= ?';
    params.push(Number(minPrice));
  }

  if (maxPrice !== undefined) {
    query += ' AND price <= ?';
    params.push(Number(maxPrice));
  }

  query += ' ORDER BY rating DESC';

  const places = db.prepare(query).all(...params);
  res.json(places);
});

// GET /category/:category
router.get('/category/:category', (req, res) => {
  const places = db
    .prepare('SELECT * FROM places WHERE category = ? ORDER BY rating DESC')
    .all(req.params.category);
  res.json(places);
});

// GET /:id
router.get('/:id', (req, res) => {
  const place = db.prepare('SELECT * FROM places WHERE id = ?').get(req.params.id);
  if (!place) {
    return res.status(404).json({ message: 'Place not found' });
  }
  res.json(place);
});

module.exports = router;
