 import * as express from 'express';
 import * as morgan from 'morgan';
 import * as cors from 'cors';
 import * as helmet from 'helmet';
 import logger from './assets/logger';
 import { environment } from './environments/environment';
 import onBoardAdminRouter from './app/routes/admin-route';
 import {access} from '../../../libs/shared/access';

const app = express();

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(
  helmet.referrerPolicy({
    policy: 'same-origin',
  })
);
app.use(
  morgan('dev', {
    stream: logger.stream,
  })
);
app.use(express.json({ limit: '5mb' }));
app.use(
  express.urlencoded({
    extended: false,
  })
);


require('../../../libs/shared/db')
//Add Enable Cors
access(app);


app.get('/kilowott/api/v1', (req, res) => {
  res.send({ message: 'Welcome to kilowott-services!' });
});

app.use('/kilowott/api/v1', onBoardAdminRouter);


const port = environment.port || 3333;
const server = app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}/kilowott/api/v1`);
});
server.on('error', console.error);
