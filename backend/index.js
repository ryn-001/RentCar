require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {connectDatabase} = require("./config/connectDB");
const Router = require("./routes/index.routes");

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use("/api",Router);

connectDatabase(app);