const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Water', cost: 10, use:'You drank the water. You are no longer thirsty.' }),
		CurrencyShop.upsert({ name: 'Juice', cost: 20, use:'You drank the juice. You can feel the vitamins.'}),
		CurrencyShop.upsert({ name: 'Pokéball', cost: 50, use:'You used the pokeball. Gotta catch\'em all!'}),
		CurrencyShop.upsert({ name: 'Chocolate', cost: 75, use:'You ate the chocolate. So tasty.'}),
		CurrencyShop.upsert({ name: 'Keysss', cost: 200, use:'You used the keys. KEEEEYS. KEEEYS.' }),
		CurrencyShop.upsert({ name: 'Shinx shirt', cost: 500, use:'You put on the shinx shirt. Cute!' }),
		CurrencyShop.upsert({ name: 'Gilgamesh nudes', cost: 750, use:'You look at the Gilgamesh nudes. Now you kinda horny' }),
		CurrencyShop.upsert({ name: 'Konohana figure', cost: 1000, use:'You look at the konohana figure. Please upload a .pkm file'}),
		CurrencyShop.upsert({ name: 'Gold dango', cost: 1200, use:'Dango dango dango dango dango daikazoku!' }),
		CurrencyShop.upsert({ name: 'Geass', cost: 1500, use:'I, lelouch vi Britannia, command you!' }),
		CurrencyShop.upsert({ name: 'C.C. figure', cost: 2000, use:'You look at C.C. boo..eyes, i meant eyes. She kinda pretty.'}),
		CurrencyShop.upsert({ name: 'Skaidus poster', cost: 2500, use:'You look at Skaidus di...eyes, i meant eyes. He kinda hot.'}),
		CurrencyShop.upsert({ name: 'Skinnix dakimakura', cost: 5000, use:'You sleep on Skinnix dakimakura. What? You are a dango now!'}),
		CurrencyShop.upsert({ name: 'Yoomking crown replica', cost: 10000, use: 'You put on the crown. Now mankind shall obey you. All hail the yoomking!'}),
	];
	await Promise.all(shop);
	console.log('Store updated');
	sequelize.close();
}).catch(console.error);