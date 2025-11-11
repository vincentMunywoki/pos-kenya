const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');

router.get('/:customerId', loyaltyController.getPoints);
router.post('/:customerId/redeem', loyaltyController.redeemPoints);

module.exports = router;
