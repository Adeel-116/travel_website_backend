require('dotenv').config();
const app = require('./src/middlewares/middlewares');
const { mongoDB } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  await mongoDB();
  app.listen(PORT, () => {
    console.log(`✅ Server is running on PORT ${PORT}`);
  });
}

startServer();
