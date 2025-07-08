const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authenticateToken = require('../middlewares/authenticateToken');

// Tüm notları getir
router.get('/', authenticateToken, noteController.getNotes);
// Yeni not oluştur
router.post('/', authenticateToken, noteController.addNote);
// Notu güncelle
router.put('/:noteId', authenticateToken, noteController.editNote);
// Notu sil
router.delete('/:noteId', authenticateToken, noteController.deleteNote);
// Notu pinle/pin kaldır
router.patch('/:noteId/pin', authenticateToken, noteController.editNotePinned);

module.exports = router; 