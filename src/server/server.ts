import * as express from 'express';
import routes from './routes/index';

import * as passport from 'passport';

import './middlewares/passport-strategies'; // File runs as import --

const app = express();

app.use(express.static('public'));
app.use(passport.initialize());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\n\n ❤️ Server listening on port: ${port} ❤️ \n\n`));