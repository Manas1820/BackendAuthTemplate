const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

//Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes Middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);



// Connect to database
mongoose.connect(process.env.LINK_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("MongoDB Connected")
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ... `));