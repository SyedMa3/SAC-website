const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Base_profile } = require("./base_profile.js");
const { Team } = require("./team.js");
const { TeamMember } = require("./teamMember.js");
const { Project } = require("./project.js");

User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  base_profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  joining_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  program: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roll_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM({
      values: ["Admin", "Secretary", "Club Head", "Student"],
    }),
    defaultValue: "Student",
    allowNull: false,
  },
});

Base_profile.hasOne(User, { foreignKey: "base_profile_id" });
User.belongsTo(Base_profile, { foreignKey: "base_profile_id" });

Team.hasOne(User, { foreignKey: "id" });
User.belongsTo(Team, { foreignKey: "team_lead_id" });

TeamMember.hasOne(User, { foreignKey: "id" });
User.belongsTo(TeamMember, { foreignKey: "user_id" });

module.exports = { User };
