const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM buku', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving books');
    }
    res.json(results);
  });
});

// router.get('/perpustakaan/tambah', (req, res) => {
//   res.render('kelolabuku', { title: 'Tambah Buku', buku: [], tambah: true });
// });

router.post('/', (req, res) => {
  const { namabuku, jenisbuku } = req.body;
  if (!namabuku || !jenisbuku) {
    return res.status(400).send('Semua field harus diisi');
  }
  db.query('INSERT INTO buku (namabuku, jenisbuku) VALUES (?, ?)', [namabuku, jenisbuku], (err, results) => {
    if (err) return res.status(500).send('Error adding book');
    const newBook = { id: results.insertId, namabuku, jenisbuku };
    res.status(201).json(newBook);
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM buku WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Error retrieving book');
    if (results.length === 0) return res.status(404).send('Buku tidak ditemukan');
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { namabuku, jenisbuku } = req.body;
  db.query('UPDATE buku SET namabuku = ?, jenisbuku = ? WHERE id = ?', [namabuku, jenisbuku, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Error updating book');
    if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
    res.json({ id: parseInt(req.params.id, 10), namabuku, jenisbuku });
  });
});

router.delete('/:id', (req, res) => {
  db.query('DELETE FROM buku WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Error deleting book');
    if (results.affectedRows === 0) return res.status(404).send('Buku tidak ditemukan');
    res.status(204).send(); // 204 No Content
  });
});
module.exports = router;
