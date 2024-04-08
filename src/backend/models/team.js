const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Project } = require("./project.js");
const { teamMember } = require("./teamMember.js");
const { User } = require("./user.js");

// Team Schema
Team = sequelize.define("Team", {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: "project",
      key: "project_id",
    },
  },
  team_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team_lead_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
  // {
  //   indexes: [
  //     {
  //       unique: true,
  //       fields: ["project_id", "team_id"],
  //       primaryKey: true,
  //     },
  //   ],
  // },
});

// Define hooks for updating timestamps
// Team.addHook("beforeCreate", (team) => {
//   hackathon.created_at = new Date();
//   hackathon.updated_at = new Date();
// });
//
// Team.addHook("beforeUpdate", (hackathon) => {
//   hackathon.updated_at = new Date();
// });

Team.belongsTo(Project, {
  foreignKey: "project_id",
});

Team.belongsTo(User, {
  foreignKey: "team_lead_id",
});

Team.belongsTo(teamMember, {
  foreignKey: "team_id",
});

Team.belongsTo(teamMember, {
  foreignKey: "project_id",
});

module.exports = { Team };
