import React, { useState } from 'react'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { SendIcon } from '../assets/icons/SendIcon'
import socket from '../../socket'

const TextInput = () => {
  const [username, setUsername] = useState('')
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [isUsernameSet, setIsUsernameSet] = useState(false)

  const handleInput = () => {
    const name = prompt('Enter your username')
    if (name) {
      setUsername(name)
      setIsUsernameSet(true)
      socket.emit('client-username', name)
    }
  }

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('client-chat', { name: username, message: input })
      setInput('')
      setMessage(input)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <div>
        {message && (
          <p
            className='
              flex 
              justify-end
              p-2 
              bg-primary-300 
              font-semibold
            '
          >
            {message} : You ✉️
          </p>
        )}
      </div>
      <div
        className='
        flex 
        flex-col
        justify-end
        items-center
        h-1/2
        p-4
      '
      >
        {isUsernameSet ? null : (
          <Button
            color='danger'
            className='font-semibold text-md'
            onPress={handleInput}
          >
            Join chatroom
          </Button>
        )}
        <div
          className={`flex items-center w-1/3 gap-2 ${
            isUsernameSet ? 'block' : 'hidden'
          }`}
        >
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={handleKeyPress}
            type='text'
            placeholder='Enter your message'
          />
          <Button isIconOnly color='primary' onPress={sendMessage}>
            <SendIcon />
          </Button>
        </div>
      </div>
      <div>
        {username && (
          <p
            className='
              fixed 
              bottom-0
              p-2
              bg-success-300 
              font-semibold
              flex
              justify-center
              w-full
            '
          >
            ⚡ You joined
          </p>
        )}
      </div>
      <p
        className='
              fixed 
              bottom-12
              p-2
              text-zinc-500
              text-sm
              font-medium
              flex
              justify-center
              w-full
            '
      >
        Chat app by @ducksblock
      </p>
    </>
  )
}

export default TextInput
