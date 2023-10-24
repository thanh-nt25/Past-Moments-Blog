import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

// auth
// const {
//     OAuth2Client,
//   } = require('google-auth-library');

// use express middleware to connect to application
// route in posts routes begin with 'posts'

// limit size of picture
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// auth


// post to heroku
// heroku se tu dong tao bien PORT 
const PORT = process.env.PORT || 5000;

// connect to database
mongoose.connect(process.env.CONNECTION_URL,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
    .catch((error) => console.log(error.message) );

