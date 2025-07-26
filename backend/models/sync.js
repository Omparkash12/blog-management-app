const sequelize = require('../config/dbConfig');

// Function to sync the models with the database
const syncDB = async () => {
  try {
    console.log('Syncing models with the database...');
    await sequelize.sync({ force: false });
    console.log('Models synced successfully!');
  } catch (error) {
    console.error('Error syncing models:', error.message);
    throw error;
  }
};

module.exports = syncDB;

