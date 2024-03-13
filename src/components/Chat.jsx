import React, { useEffect, useState } from 'react'
import socket from '../../socket'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [userConnected, setUserConnected] = useState('')
  const [userDisconnected, setUserDisconnected] = useState('')

  useEffect(() => {
    socket.on('user-connected', (name) => {
      setUserConnected(name)
    })

    socket.on('user-disconnected', (name) => {
      setUserDisconnected(name)
    })

    socket.on('client-chat', (msg) => {
      setMessage(msg)
    })

    return () => {
      socket.off('client-chat')
    }
  }, [])

  return (
    <div>
      {userConnected && (
        <p
          className='
              flex 
              justify-center 
              p-2 
              bg-secondary 
              font-semibold
              border-black
              border-b-1
            '
        >
          ✨ {userConnected} connected
        </p>
      )}
      {userDisconnected && (
        <p
          className='
              flex 
              justify-center 
              p-2 
              bg-danger 
              font-semibold
              border-black
              border-b-1
            '
        >
          💨 {userDisconnected} disconnected
        </p>
      )}
      {message && (
        <p
          className='
            flex 
            justify-start
            p-2 
            bg-primary-500
            font-semibold
            border-black
            border-b-1
          '
        >
          ✉️ {message.name} : {message.message}
        </p>
      )}
    </div>
  )
}

export default Chat
