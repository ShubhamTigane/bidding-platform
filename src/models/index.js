const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

// Connect to the database using the Sequelize constructor
const sequelize = new Sequelize({
  dialect: config.dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  database: config.database,
});

// Create or use the bidding_platform database
sequelize.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`)
  .then(() => {
    console.log(`Database "${config.database}" connected or created.`);
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

// Define the models and associations
const db = {
  Sequelize,
  sequelize,
  User: require('./user')(sequelize, Sequelize),
  Item: require('./item')(sequelize, Sequelize),
  Bid: require('./bid')(sequelize, Sequelize),
  Notification: require('./notification')(sequelize, Sequelize),
};

// Define associations
db.User.hasMany(db.Bid, { foreignKey: 'user_id' });
db.Item.hasMany(db.Bid, { foreignKey: 'item_id' });
db.User.hasMany(db.Notification, { foreignKey: 'user_id' });

db.Bid.belongsTo(db.User, { foreignKey: 'user_id' });
db.Bid.belongsTo(db.Item, { foreignKey: 'item_id' });
db.Notification.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
 