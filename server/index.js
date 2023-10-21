import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

// use express middleware to connect to application
// route in posts routes begin with 'posts'

// limit size of picture
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 
// "mongodb+srv://thanhnguyenqwe65:Mq0qdc1225LhnmdM@cluster0.gplvy5p.mongodb.net/?retryWrites=true&w=majority";
"mongodb+srv://thanhnguyenqwe65:Mq0qdc1225LhnmdM@cluster0.gplvy5p.mongodb.net/?retryWrites=true&w=majority";
// post to heroku
// heroku se tu dong tao bien PORT 
const PORT = process.env.PORT || 5000;

// connect to database
mongoose.connect(CONNECTION_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message) );


