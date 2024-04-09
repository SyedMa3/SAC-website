const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Club } = require("./club.js");

// Hackathon Schema
Hackathon = sequelize.define("Hackathon", {
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  club_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "club",
      key: "id",
    },
  },
  hackathon_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hackathon_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hackathon_end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Hackathon.belongsTo(Club, {
  foreignKey: "club_id",
});

module.exports = Hackathon;
