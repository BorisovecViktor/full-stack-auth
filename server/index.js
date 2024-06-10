require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 4200;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
      await mongoose.connect(process.env.DB_URL)
      app.listen(PORT, () => console.log(`server started on PORT = ${PORT}`))
      app.get('/', (req, res) => res.status(200).json({message: 'hello'}))
  } catch (e) {
      console.log(e);
  }
}

start()