//This is node server which will handle socket io connection.
const io = require('socket.io')(8000 ,{
    cors:{
        origin:'*'
    }
});

const users={};
io.on('connection',socket =>{
    socket.on('new-user-joined',username =>{
        // console.log("new user",username);
        users[socket.id]=username;
        socket.broadcast.emit('user-joined',username)/* emit(bhejna) the event to all except who has joined*/
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message ,username:users[socket.id]});
    });
    socket.on('disconnect',message =>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });

});