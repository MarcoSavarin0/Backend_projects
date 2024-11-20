import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import Admin from './routes/Admin.routes.js'
import PostsGet from './routes/PostsGet.routes.js'
const port = process.env.PORT || 3000;


let app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}))

app.use('/admin', Admin)
app.use('/posts', PostsGet)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});