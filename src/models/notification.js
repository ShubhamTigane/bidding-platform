module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      message: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      is_read: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      },
      created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      }
    }, {
      timestamps: false,
      tableName: 'notifications'
    });
  
    return Notification;
  };
  