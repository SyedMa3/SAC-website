const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Team } = require("./team.js");
const { User } = require("./user.js");

TeamMember = sequelize.define("teamMember",{
    project_id: {
      type: DataTypes.INTEGER,
    },
    team_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["team_id", "user_id"],
        primaryKey: true,
      },
    ],
  }
);

Team.hasMany(TeamMember, { foreignKey: "team_id" });
TeamMember.belongsTo(Team, { foreignKey: "team_id" });

Team.hasMany(TeamMember, { foreignKey: "project_id" });
TeamMember.belongsTo(Team, { foreignKey: "project_id" });

User.hasMany(TeamMember, { foreignKey: "user_id" });
TeamMember.belongsTo(User, { foreignKey: "id" });

module.exports = { TeamMember };
