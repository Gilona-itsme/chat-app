const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

app.use('*', (req, res) => {
  res.send('Websocket server');
});

let users = {};

io.on('connection', client => {
  users[client.id] = 'Anonim';
  broadcast('users', users);

  //   socket.on('user/joinChat', userName => {
  //     console.log(`Пользователь ${userName} присоединился к чату`);

  client.on('change:name', name => {
    users[client.id] = name;
    broadcast('users', users);
  });
  client.on('message', message => {
    broadcast('message', message);
  });
  client.on('disconnect', () => {
    delete users[client.id];
    broadcast('users', users);
  });

  function broadcast(event, data) {
    client.emit(event, data);
    client.broadcast.emit(event, data);
  }
  //     socket.emit(
  //       'user/joinChatSuccess',
  //       `${userName} - вы присоединились к чату`,
  //     );

  //     socket.emit('user/connected', chatHistory);

  //     socket.broadcast.emit('userJoined', `${userName} присоединился к чату`);
  //   });

  //   socket.on('newMessage', message => {
  //     console.log(`Получено сообщение: ${message}`);

  //     const entry = {
  //       author: users[socket.id],
  //       message,
  //       timestamp: Date.now(),
  //     };

  //     chatHistory.push(entry);
  //     io.emit('newMessage', entry);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Пользователь отключился от сервера');
  //   });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port *:${PORT}`));
