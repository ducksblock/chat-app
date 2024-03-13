# Real-time Chat App
Built using Vite + React, NextUI, Node.js, and Socket.io

## How to Run
1. Install dependencies
```
npm i
yarn
```

2. Run the server
```
npm run start
yarn start
```
The server will start listening for connections on http://localhost:3000.

3. Run the client
```
npm run dev
yarn dev
```
The server will start listening for connections on http://localhost:5173.


## Application Architecture

The application consists of two main components: the server and the client.

### Server

- Built with Node.js and uses `socket.io` for managing WebSocket connections.
- Listens for incoming connections and handles events such as user connection/disconnection and chat messages.
- When a chat message is received from a client, it broadcasts this message to all other connected clients, excluding the sender.

### Client

- Built with Vite + React and NextUI for creating a dynamic and responsive user interface.
- Connects to the server using `socket.io-client`.
- Provides a simple interface where users can join the chat, send messages, and view messages from others in real-time.
- Provides information on user connection and disconnection.
