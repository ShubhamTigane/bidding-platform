
const { sendNotification } = require('../controllers/notificationController');

const setupWebSocket = (server) => {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('bid', async (data) => {
      const { itemId, userId, bid_amount } = data;

      // Notify the item owner about the new bid
      const item = await Item.findByPk(itemId);
      if (item) {
        await sendNotification(item.user_id, `Your item "${item.name}" has received a new bid of ${bid_amount}.`);
      }

      // Notify the previous highest bidder about being outbid
      const previousHighestBid = await Bid.findOne({
        where: { item_id: itemId },
        order: [['bid_amount', 'DESC']],
      });
      if (previousHighestBid && previousHighestBid.user_id !== userId) {
        await sendNotification(previousHighestBid.user_id, `You have been outbid on item "${item.name}". The new highest bid is ${bid_amount}.`);
      }

      io.emit('update', { itemId, bid_amount });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = setupWebSocket;
