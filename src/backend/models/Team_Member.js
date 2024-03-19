const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Team } = require("./team.js");
const { User } = require("./user.js");

Team_Member = sequelize.define("Team_Member",{
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

Team.hasMany(Team_Member, { foreignKey: "team_id" });
Team_Member.belongsTo(Team, { foreignKey: "team_id" });

User.hasMany(Team_Member, { foreignKey: "user_id" });
Team_Member.belongsTo(User, { foreignKey: "id" });

module.exports = { Team_Member };
