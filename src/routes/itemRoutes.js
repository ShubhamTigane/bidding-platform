const express = require('express');
const { check } = require('express-validator');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.post('/', [
  authMiddleware,
  check('name').notEmpty().withMessage('Name is required.'),
  check('description').notEmpty().withMessage('Description is required.'),
  check('starting_price').isDecimal().withMessage('Starting price must be a decimal.'),
  check('end_time').isISO8601().toDate().withMessage('End time must be a valid date.')
], createItem);

router.put('/:id', [
  authMiddleware,
  check('name').optional().notEmpty().withMessage('Name cannot be empty.'),
  check('description').optional().notEmpty().withMessage('Description cannot be empty.'),
  check('starting_price').optional().isDecimal().withMessage('Starting price must be a decimal.'),
  check('end_time').optional().isISO8601().toDate().withMessage('End time must be a valid date.')
], updateItem);

router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;
