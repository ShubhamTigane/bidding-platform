// const { Item, Bid } = require('../models');
// const { validationResult } = require('express-validator');

// const getBidsForItem = async (req, res) => {
//   const { itemId } = req.params;
//   try {
//     const bids = await Bid.findAll({ where: { item_id: itemId }, order: [['created_at', 'DESC']] });
//     res.json(bids);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error.' });
//   }
// };

// const placeBid = async (req, res) => {
//   const { itemId } = req.params;
//   const { bid_amount } = req.body;

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//   try {
//     const item = await Item.findByPk(itemId);
//     if (!item) return res.status(404).json({ error: 'Item not found.' });

//     // Check if the new bid is higher than the current price
//     if (bid_amount <= item.current_price) {
//       return res.status(400).json({ error: 'Bid amount must be higher than the current price.' });
//     }

//     const newBid = await Bid.create({
//       item_id: itemId,
//       user_id: req.user.id,
//       bid_amount,
//     });

//     // Update the item's current price
//     await item.update({ current_price: bid_amount });
//     console.log(bid_amount);
//     res.status(201).json(newBid);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error.' });
//     console.log(error);
//   }
// };

// module.exports = {
//   getBidsForItem,
//   placeBid,
// };
// controllers/bidController.js
const { Item, Bid } = require('../models');
const { validationResult } = require('express-validator');
const { sendNotification } = require('./notificationController');

const getBidsForItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const bids = await Bid.findAll({ where: { item_id: itemId }, order: [['created_at', 'DESC']] });
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

const placeBid = async (req, res) => {
  const { itemId } = req.params;
  const { bid_amount } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found.' });

    // Check if the new bid is higher than the current price
    if (bid_amount <= item.current_price) {
      return res.status(400).json({ error: 'Bid amount must be higher than the current price.' });
    }

    const newBid = await Bid.create({
      item_id: itemId,
      user_id: req.user.id,
      bid_amount,
    });

    // Notify the item owner about the new bid
    await sendNotification(item.user_id, `Your item "${item.name}" has received a new bid of ${bid_amount}.`);

    // Notify the previous highest bidder about being outbid
    const previousHighestBid = await Bid.findOne({
      where: { item_id: itemId },
      order: [['bid_amount', 'DESC']],
    });
    if (previousHighestBid && previousHighestBid.user_id !== req.user.id) {
      await sendNotification(previousHighestBid.user_id, `You have been outbid on item "${item.name}". The new highest bid is ${bid_amount}.`);
    }

    // Update the item's current price
    await item.update({ current_price: bid_amount });

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = {
  getBidsForItem,
  placeBid,
};
