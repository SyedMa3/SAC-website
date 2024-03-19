const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Project } = require("./project.js");

// Team Schema
Team = sequelize.define("Team", {
	project_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "project",
			key: "project_id",
		},
	},
	team_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["project_id", "team_id"],
        primaryKey: true,
      },
    ],
  }
});

// Define hooks for updating timestamps
Team.addHook('beforeCreate', (team) => {
    hackathon.created_at = new Date();
    hackathon.updated_at = new Date();
});

Team.addHook('beforeUpdate', (hackathon) => {
    hackathon.updated_at = new Date();
});

Project.hasMany(Team, {
	foreignKey: "project_id",
});
Team.belongsTo(Project, {
	foreignKey: "project_id",
});

Team_Member.hasOne(Team, {
	foreignKey: "team_id",
});
Team.belongsTo(Team_Member, {
	foreignKey: "team_id",
});

module.exports = { Team };
