const express = require('express');
const router = express.Router();
const { addSale, getSales, getSaleById } = require('../controllers/saleController');

// @route   POST /api/sales
router.post('/', addSale);

// @route   GET /api/sales
router.get('/', getSales);

// @route   GET /api/sales/:id
router.get('/:id', getSaleById);

module.exports = router;
