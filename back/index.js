const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decodeIDToken = require('./authenticateToken');
const projectsRouter = require('./controllers/projects');
const polesRouter = require('./controllers/poles');
const tasksRouter = require('./controllers/tasks');

const app = express();

app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require("http").Server(app);
const socketio = require("socket.io");


// socket.io
io = socketio(server , {
    cors: {
      origin: '*',
    }});
// now all request have access to io
app.use(function (req, res, next) {
  req.io = io;
  next();
});

mongoose.connect(
    'mongodb+srv://admin:Rex4ever@cluster0.hcjcf.mongodb.net/projectManagment?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));


app.use('/projects', projectsRouter);
app.use('/poles', polesRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
    res.send('Hello ynov toulouse');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
});
