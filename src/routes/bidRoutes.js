const express = require('express');
const { getBidsForItem, placeBid } = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

const router = express.Router();

// Retrieve all bids for a specific item
router.get('/:itemId/bids', getBidsForItem);

// Place a new bid on a specific item (Authenticated users)
router.post(
  '/:itemId/bids',
  authMiddleware,
  [check('bid_amount').isFloat({ gt: 0 }).withMessage('Bid amount must be a positive number.')],
  placeBid
);

module.exports = router;
