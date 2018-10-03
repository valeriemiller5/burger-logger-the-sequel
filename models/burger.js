module.exports = function(sequelize, DataType) {
  var Burger = sequelize.define("Burger", {
    id: {
      autoIncrement: true,
      type: DataType.INTEGER,
      primaryKey: true
    },
    burger_name: {
      type: DataType.STRING,
      allowNull: false, 
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    timestamps: true,
    createdAt: true
  });

  return Burger;
};