const express = require('express');
const { getNotifications, markRead, sendNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Send notification to a user
router.post('/notify', authMiddleware, async (req, res) => {
    const { userId, message } = req.body;
    try {
      await sendNotification(userId, message);
      res.status(200).json({ success: true, message: 'Notification sent successfully.' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ success: false, error: 'Failed to send notification.' });
    }
  });


router.get('/', authMiddleware, getNotifications);

// Route to mark all unread notifications as read for the authenticated user
router.put('/mark-read', authMiddleware, markRead);

module.exports = router;
