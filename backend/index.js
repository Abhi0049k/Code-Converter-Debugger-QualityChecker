const express = require('express');
const cors = require('cors');
const { codeRouter } = require('./routes/code.routes');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/code', codeRouter);

app.get('/', (req, res) => {
    res.status(200).send({ msg: 'Welcome to the backend of the code converter, debugger and quality checker application' });
})


app.listen(port, ()=>{
    console.log(`App running on port: ${port}`);
})