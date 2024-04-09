const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Team } = require("./team.js");
const { User } = require("./user.js");

TeamMember = sequelize.define("teamMember", {
  project_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "team",
      key: "project_id",
    },
  },
  team_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "team",
      key: "team_id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Team.hasMany(TeamMember, { foreignKey: "team_id" });
TeamMember.belongsTo(Team, { foreignKey: "team_id" });

Team.hasMany(TeamMember, { foreignKey: "project_id" });
TeamMember.belongsTo(Team, { foreignKey: "project_id" });

User.hasMany(TeamMember, { foreignKey: "user_id" });
TeamMember.belongsTo(User, { foreignKey: "id" });

module.exports = { TeamMember };
