const { Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // Nunca será igual a los id de la API
        primaryKey: true,
      },
      // Para la referencia de API Pokemons "ATRAPADOS":
      realId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      // Para filtrado de pokemones "ATRAPADOS":
      caught: {
        type: DataTypes.BOOLEAN,
      },
      // Los puntos de experiencia son importantes para un entrenador Pokemon
      experience: {
        type: DataTypes.INTEGER,
      },
      health: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'pokemons',
      timestamps: false,
    }
  );
};
