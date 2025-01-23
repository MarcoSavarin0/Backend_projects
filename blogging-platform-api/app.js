import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import route from './routes/post.route.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/posts', route);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});