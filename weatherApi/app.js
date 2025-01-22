import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import route from './routes/route.js';
import { rateLimit } from 'express-rate-limit'

const port = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 20, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

let app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(limiter)
app.get('/', route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});