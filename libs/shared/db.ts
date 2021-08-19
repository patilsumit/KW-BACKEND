import * as mongoose from 'mongoose';
import Config from './dotenv';

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false
};

const DBURL = Config.DBURL;
mongoose
  .connect(DBURL || process.env.DBURL_LOCAL, clientOption)
  .then(() => {
    console.log(`Connected to database!`);
  })
  .catch((err) => {
    console.log(`Connection failed!`, err);
  });
process.on("unhandledRejection", (error, p) => {});
