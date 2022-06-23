const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const {carClass} = require('./player.js');
const app = express();
const clientPath = `${__dirname}/../client`;

console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketio(server);

var clients = {};

//5 pokoi wyscigowych iles ludzi moze wejsc
//dolaczy jeden, spawnuje sie mapka i czeka na drugiego zeby sie zaczal wyscig
//czas timer, kolizja z otoczeniem i dodakowo, checkpointy zeby przejechac cala droge
//jakis wynik na koniec

//1 pokoj socjalny
//tu jakies graficzki
//tutaj chat

//sprobowac zoptymalizowac ten multiplayer
//

//na razie niepotrzebny, ale dzieki czemus takiemu
//mozna by ustawic maksymalny limit graczy
var clients_counter = 0;

io.on('connection', (sock) => {
  
  clients_counter+=1;
  sock.emit('message', 'You are connected');
  //przesylamy id klienta do niego
  sock.emit('id', sock.id);

  //zapisujemy klienta na serwerze po id i tworzymy mu instancje serwerowa +  
  var player = new carClass(); 
  var xd = 0; 
  clients[sock.id] = player; 
  clients[sock.id].sock = sock;
  
  //wysylamy info do kazdego innego oprocz nas, ze dolaczylismy
  //a do siebie wysylamy info o kazdym juz istniejacym
  for (var id in clients) {
    if(id != sock.id){
      clients[id].emit('newPlayer', sock.id);
      sock.emit('newPlayer', id);
    }
  }

  //odbierz info o ruchu danego gracza
  sock.on('PlayerInfo', ({x, y, a}) => {
    var myId = sock.id;
    //wyslij do do kazdego oprocz tego gracza
    for ( var id in clients) {
      if(id != sock.id){
        clients[id].emit('enemyPlayerInfo', ({x, y, a, myId}));
      }
    }
  })

  sock.on('PlayerInputInfo', ({forward, reverse, right, left}) => {
    var myId = sock.id;
    //wyslij do do kazdego oprocz tego gracza
    //serwer kalkuluje pozycje gracza po inputach
    console.log(forward,reverse,right,left)
    clients[sock.id].setPressedKeys(forward,reverse, right, left)
    clients[sock.id].calculateNextCarPosition()
    console.log(clients[sock.id].licznik)
    clients[sock.id].licznik++
    playerinfo = clients[sock.id].getPlayerInfo();
    console.log(playerinfo)
    sock.emit('message', 'You are connected');
    // for ( var id in clients) {
    //   if(id != sock.id){
    //     clients[id].emit('enemyPlayerInfo', ({x, y, a, myId}));
    //   }
    // }
  })

  sock.on('playerMessage', (message) => {
    console.log(sock.id);
    var id = sock.id;
    io.emit('playerMessage', ({message, id}));
  })

  //wysylay info do klientow wszystkich kogo wyjebalo
  //i go na klientach usuwamy, na serwerze tez usuwamy goscia
  sock.on('disconnect', function() {
    io.emit('enemyDisconnected', sock.id);
    delete clients[sock.id];
    clients_counter-=1;
  })

  //io emit wysyła do wszystkich klientów podłączonych
  sock.on('message', (text) => io.emit('message',text));
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(7171, "0.0.0.0"); 

var framesPerSecond = 60;

setInterval(function() {
  Object.entries(clients).forEach(([sockID, clientPlayer]) => {
    clientPlayer.calculateNextCarPosition()
   // console.log(value.x)
  });

  }, 1000 / framesPerSecond); 
