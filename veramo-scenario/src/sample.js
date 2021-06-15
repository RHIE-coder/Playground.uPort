const express = require("express");
const app = express();
const paths = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const port = 3000;

app.use('/static', express.static(paths.join(__dirname, 'public')));
app.use('/uploads', express.static(paths.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(expressSession({
  secret:"my secret key",
  resave: true,
  saveUninitialized: true
}));

app.all('*', (req,res)=>{
  res.status(404).send("<h1>페이지 없음</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})