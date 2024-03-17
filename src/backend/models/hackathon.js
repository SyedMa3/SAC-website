const { DataTypes } = require("sequelize");
const { sequelize } = require("./database.js");
const { Club } = require("./club.js");

// Hackathon Schema
Hackathon = sequelize.define("Hackathon", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
	hackathon_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
  link : {
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: {
      isURL: true
    }
  },
	club_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "club",
			key: "id",
		},
	},
	hackathon_start_date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
  hackathon_end_date{
		type: DataTypes.DATE,
		allowNull: false,
  },
});

Club.hasMany(Hackathon, {
	foreignKey: "club_id",
});
Hackathon.belongsTo(Club, {
	foreignKey: "club_id",
});

module.exports = Hackathon;
