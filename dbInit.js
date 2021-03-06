const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database/database.sqlite',
});

//Initialize other databases
require('./database/models/attachments/attachmentInit')()

const Users = require('./database/models/userdata/Users')(sequelize, Sequelize.DataTypes);

const UserItems = require('./database/models/userdata/UserItems')(sequelize, Sequelize.DataTypes);
const UserFoods = require('./database/models/userdata/UserFoods')(sequelize, Sequelize.DataTypes);
const UserEquipments = require('./database/models/userdata/UserEquipments')(sequelize, Sequelize.DataTypes);
const UserKeys = require('./database/models/userdata/UserKeys')(sequelize, Sequelize.DataTypes);
//const UserRooms = require('./database/models/UserRooms')(sequelize, Sequelize.DataTypes);

const EligibleRoles = require('./database/models/server/EligibleRoles')(sequelize, Sequelize.DataTypes);
const DisabledChannels = require('./database/models/server/DisabledChannels')(sequelize, Sequelize.DataTypes);
const CurrencyShop = require('./database/models/data/CurrencyShop')(sequelize, Sequelize.DataTypes);
const Equipments = require('./database/models/data/Equipments')(sequelize, Sequelize.DataTypes);
const Foods = require('./database/models/data/Foods')(sequelize, Sequelize.DataTypes);
const KeyItems = require('./database/models/data/KeyItems')(sequelize, Sequelize.DataTypes);
//const Room  = require('./database/models/Room')(sequelize, Sequelize.DataTypes);
const Shinx = require('./database/models/userdata/Shinx')(sequelize, Sequelize.DataTypes);

const syncDatabase = async () => {
	try {
		await Users.sync({ alter: true });

		await EligibleRoles.sync({ alter: true });
		await DisabledChannels.sync({ alter: true });

		await UserItems.sync({ alter: true });
		await UserFoods.sync({ alter: true });
		await UserEquipments.sync({ alter: true });
		await UserKeys.sync({ alter: true });
		//await UserRooms.sync({ alter: true });

		await Shinx.sync({ alter: true });
		await CurrencyShop.sync({ force: true });
		await Equipments.sync({ force: true });
		await Foods.sync({ force: true });
		await KeyItems.sync({ force: true });
		//await Room.sync({ force: true })

		const shop = [
			CurrencyShop.upsert({ name: 'Lottery Ticket', cost: 50, usage: 'allows you to participate in the weekly lottery.' }),

			Equipments.upsert({ name: 'Choice Band', cost: 1500, food: 0.5, sleep: -0.1 }),
			Equipments.upsert({ name: 'Focus Sash', cost: 1500, guard: true }),
			Equipments.upsert({ name: 'Leftovers', cost: 1500, regen: 0.2 }),
			Equipments.upsert({ name: 'Life Orb', cost: 1500, regen: -0.1, food: 0.3 }),
			Equipments.upsert({ name: 'Geass Orb', cost: 2500, geass: true }),

			Foods.upsert({ name: 'Fried Seedot', cost: 80, recovery: 0.2 }),
			Foods.upsert({ name: 'Sweet Pokéblock', cost: 150, recovery: 0.4 }),
			Foods.upsert({ name: 'Purple poffin', cost: 220, recovery: 0.6 }),
			Foods.upsert({ name: 'Chocolate dango', cost: 360, recovery: 1 }),

			KeyItems.upsert({ name: 'Shiny Charm', cost: 0 })

			//Room.upsert({ name: 'Chalice chamber', cost: 999999, slots: 5 })
		]
		await Promise.all(shop);
		console.log('Store updated');
		sequelize.close();
	} catch (e) {
		console.log(e)
	};
};

syncDatabase();
