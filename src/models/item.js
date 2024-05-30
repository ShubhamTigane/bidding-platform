const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    current_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (item, options) => {
        item.current_price = item.starting_price;
      }
    },
    timestamps: false,
    tableName: 'items'
  });

  return Item;
};
