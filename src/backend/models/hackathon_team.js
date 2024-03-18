const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Hackathon } = require("./hackathon.js");
// const { Hackathon_team_member } = require("./Hackathon_team_member.js");

// Team Schema
Hackathon_team = sequelize.define("Hackathon_team", {
	hackathon_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "hackathon",
			key: "hackathon_id",
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
        fields: ["hackathon_id", "team_id"],
        primaryKey: true,
      },
    ],
  }
});

// Define hooks for updating timestamps
Hackathon_team.addHook('beforeCreate', (hackathon) => {
    hackathon.created_at = new Date();
    hackathon.updated_at = new Date();
});

Hackathon_team.addHook('beforeUpdate', (hackathon) => {
    hackathon.updated_at = new Date();
});

Hackathon.hasMany(Hackathon_team, {
	foreignKey: "hackathon_id",
});
Hackathon_team.belongsTo(Hackathon, {
	foreignKey: "hackathon_id",
});
//Hackathon_team_member.hasOne(Hackathon_team, {
//	foreignKey: "team_id",
//});
//Hackathon_team.belongsTo(Hackathon_team_member, {
//	foreignKey: "team_id",
//});

module.exports = { Hackathon_team };
