const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('uaceem', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});


const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion avec la base de donnees etablie avec succes.');
    } catch (error) {
        console.error('Impossible de se conncter a la base de donnees:', error);
    }
}

connect()
module.exports = sequelize;