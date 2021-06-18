const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_max: {
      type: DataTypes.INTEGER
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span_max: {
      type: DataTypes.INTEGER
    },
    life_span_min: {
      type: DataTypes.INTEGER
    },
    image_url: {
      type: DataTypes.STRING
    },
    image_id: {
      type: DataTypes.STRING
    }
  }, {tableName: 'breeds'});
};