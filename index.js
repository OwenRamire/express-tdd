const app = require('./src/app');
const sequelize = require('./src/config/database');

sequelize.sync();
console.log(`env: ${process.env.NODE_ENV}`);

app.listen(8080, () => {
  console.log('Application running in port 8080');
});
