const io = require('socket.io')({
    cors: {
        origin:"*"
    }
});

io.on("connection", client => {
    console.log("New client connected");
    client.emit("open")

    client.emit("init", {data:'hello world'});


    client.on("disconnect",() => {
        console.log("Goodbye client")
    })
})



io.listen(8082);