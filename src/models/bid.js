module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define(
    "Bid",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      item_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      bid_amount: { 
        type: DataTypes.DECIMAL, 
        allowNull: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
    },
    {
      timestamps: false,
      tableName: "bids",
    }
  );

  return Bid;
};
