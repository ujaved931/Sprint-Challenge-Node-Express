const cors = require('cors');
const express = require('express');




const port = 2222;
const server = express();
server.use(express.json());
server.use(cors());

// message at localhost:2222
const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
}

// importing routes

const actionRoutes = require('./actions/actionRoutes')
const projectRoutes = require('./projects/projectRoutes')


server.get('/', (req, res) => {
    res.send('Hello from express')

});

server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);



server.listen(port, ()=> console.log(`Server running on port ${port}`));