const db = require('../config/connection');
const { User, Customer } = require('../models');
const userSeeds = require('./userSeeds.json');
const customerSeeds = require('./customerSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});

    await Customer.deleteMany({});

    await User.create(userSeeds);

    await Customer.create(customerSeeds);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
