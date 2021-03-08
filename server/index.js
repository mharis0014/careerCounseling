const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var path = require('path');
const app = express();
const PORT = 3000;
const { mongoUrl } = require("./keys");
//const io = require("socket.io")();
const { v1: uuid } = require("uuid");
const messageHandler = require("./handlers/message.handler");

var server = require('http').createServer(app);
var io = require('socket.io')(server);

require("./models/User");
require("./models/Counselor");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
app.use(bodyParser.json());
app.use(authRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("Error on index.js line 31 server side", err);
});

app.get("/", requireToken, (req, res) => {
//  console.log(user_id)
 //res.send({ email: req.user.email });
 // res.send({ email: req.user.password });
});

const users = {};
const toFromMessages = {};

io.on("connection", socket => {
  console.log("a user connected!");

  console.log(socket.id);
  users[socket.id] = { userId:  uuid() };
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUsersOnline() });
  });
  socket.on("action", action => {
    switch (action.type) {
      case "server/join":
        console.log("Got join event", action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline()
        });
        socket.emit("action", { type: "self_user", data: users[socket.id] });
        break;
      case "server/private_message":
        const conversationId = action.data.conversationId;
        const from = users[socket.id].userId;
        const userValues = Object.values(users);
        const socketIds = Object.keys(users);
        for (let i = 0; i < userValues.length; i++) {
          if (userValues[i].userId === conversationId) {
            const socketId = socketIds[i];
            console.log("Socket ID : ", socketId);
            io.to(socketId).emit("action", {
              type: "private_message",
              data: {
                ...action.data,
                conversationId: from
              }
            });
            break;
          }
        }
        break;
    }
  });
});

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter((u) => u.username !== undefined);
  return onlyWithUsernames;
}


server.listen(3000);

// app.listen(PORT, () => {
//   console.log("server running " + PORT);
//  // io.listen(3000);
// });

 //io.listen(3000);
 