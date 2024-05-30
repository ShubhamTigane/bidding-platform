module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      username: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false 
      },
      role: { 
        type: DataTypes.STRING, 
        defaultValue: "user" 
      },
      created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  return User;
};
