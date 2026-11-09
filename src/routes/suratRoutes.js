const express = require('express');
const controller = require('../controllers/suratController');
const router = express.Router();

router.get('/nama/:nama', controller.getByNama);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;