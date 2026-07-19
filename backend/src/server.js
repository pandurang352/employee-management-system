const app = require('./app');
const connectDB = require('./config/db');
const { PORT, NODE_ENV } = require('./config/env');

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`EMS API running in ${NODE_ENV} mode on port ${PORT}`);
  });
};

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1);
});

startServer();
