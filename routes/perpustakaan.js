
const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/kelolabuku/tambah', (req, res) => {
  db.query('SELECT * FROM buku', (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving books');
    }
    res.render('kelolabuku', { title: 'Kelola Buku', buku: results });
  });
});

router.get('/kelolabuku/tambah', (req, res) => {
  res.render('kelolabuku', { title: 'Tambah Buku', buku: [], tambah: true });
});

router.post('/kelolabuku/tambah', (req, res) => {
  const { namabuku, jenisbuku } = req.body;
  if (!namabuku || !jenisbuku) {
    return res.status(400).send('Semua field harus diisi');
  }
  db.query('INSERT INTO buku (namabuku, jenisbuku) VALUES (?, ?)', [namabuku, jenisbuku], (err, results) => {
    if (err) return res.status(500).send('Error adding book');
    res.redirect('/perpustakaan');
  });
});

router.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM buku WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) return res.status(404).send('Buku tidak ditemukan');
    res.render('kelolabuku', { title: 'Edit Buku', buku: results, edit: true });
  });
});

router.post('/edit/:id', (req, res) => {
  const { namabuku, jenisbuku } = req.body;
  db.query('UPDATE buku SET namabuku = ?, jenisbuku = ? WHERE id = ?', [namabuku, jenisbuku, req.params.id], (err, results) => {
    if (err) return res.status(500).send('Error updating book');
    res.redirect('/perpustakaan');
  });
});

router.post('/delete/:id', (req, res) => {
  db.query('DELETE FROM buku WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send('Error deleting book');
    res.redirect('/perpustakaan');
  });
});

module.exports = router;
