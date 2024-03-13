const http = require('http')
const { Server } = require('socket.io')

const port = 3000
const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})
const users = {}

io.on('connection', (socket) => {
  console.log('Socket connection established!')

  socket.on('client-username', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })

  socket.on('client-chat', ({ message, name }) => {
    socket.broadcast.emit('client-chat', {
      message: message,
      name: name || users[socket.id],
    })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

httpServer.listen(port, () => {
  console.log(`Socket server running at http://localhost:${port}/`)
})
