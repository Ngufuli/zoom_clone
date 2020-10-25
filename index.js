const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const cors = require('cors');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);
app.use(cors());

let date = new Date().getDate();

// //connect flash
// app.use(flash())

// //Global variables
// app.use((req, res, next) => {
//     res.locals.joined_at = req.flash('joined_at');
//     res.locals.left_at = req.flash('left_at');
// })

app.use(expressLayout)
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('index', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId, date) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', `${userId} at ${date}`);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)

    //login  message
    socket.on('login',(login) =>{
        io.to(rootId).emit('createLog', login)
    })
    console.log(`${date}`)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', `${userId} disconnected at ${date}`)
    })
  })
})



const PORT = process.env.PORT || 4321;
server.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} `)
})
