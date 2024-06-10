require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware');

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: ['https://auth-frontend-ashen.vercel.app'],
  methods: ["GET", "POST"]
}));
app.use('/', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
  } catch (e) {
      console.log(e);
  }
}

start()