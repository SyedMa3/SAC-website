const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { User } = require("./user.js");
const { Club } = require("./club.js");
const { Hackathon } = require("./hackathon.js");

// Project Schema
Project = sequelize.define("Project", {
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  club_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "club",
      key: "id",
    },
  },
  is_hackathon: {
    type: DataTypes.BOOL,
    allowNull: false,
  },
  hackathon_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  project_lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  project_start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Project.belongsTo(Hackathon, {
  foreignKey: "hackathon_id",
});

Project.belongsTo(User, {
  foreignKey: "project_lead_id",
});

Project.belongsTo(Club, {
  foreignKey: "club_id",
});

module.exports = Project;
