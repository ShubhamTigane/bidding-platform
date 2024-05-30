const { Notification } = require('../models');

const sendNotification = async (userId, message) => {
  try {
    const notification = await Notification.create({
      user_id: userId,
      message,
      is_read: false,
    });
    
    return notification;
  } catch (error) { 
    console.error('Error sending notification:', error);
  }
};
 

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { user_id: req.user.id, is_read: false } });
    res.json(notifications);

  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

const markRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

module.exports = { getNotifications, markRead, sendNotification };
