const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("tourist_activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        len: [1, 1],
        min: 1,
        max: 5,
      },
    },
    duration: {
      type: DataTypes.STRING,
    },
    season: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["Verano", "Otoño", "Invierno", "Primavera"]],
      },
    },
  });
};
