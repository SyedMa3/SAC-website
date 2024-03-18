const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Hackathon_team } = require("./hackathon_team.js");
const { User } = require("./user.js");

Hackathon_team_member = sequelize.define("Hackathon_team_member",{
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

Hackathon_team.hasMany(Hackathon_team_member, { foreignKey: "team_id" });
Hackathon_team_member.belongsTo(Hackathon_team, { foreignKey: "team_id" });

User.hasMany(Hackathon_team_member, { foreignKey: "user_id" });
Hackathon_team_member.belongsTo(User, { foreignKey: "user_id" });

module.exports = { Hackathon_team_member };
