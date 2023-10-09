import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { host } from '../../Utils/Apiroutes.js';
import { format } from "timeago.js";
import '../../Styles/Chatbox.css';
import InputEmoji from 'react-input-emoji';
import SendIcon from '@mui/icons-material/Send';


function Chatbox({ chat, currentUser, setSendMessage, receiveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('');
  const scroll = useRef();
  const imageRef = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage])

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await axios.get(`${host}/api/getuser/${userId}`)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) getUserData()
  }, [chat, currentUser])

  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const { data } = await axios.get(`${host}/message/${chat._id}`)
        console.log(data)
        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchmessages()

  }, [chat])

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    // send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUser );    
    setSendMessage({ ...message, receiverId })

    // send message to database
    try {
      const { data } = await axios.post(`${host}/message`, message)
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  
  }
  
  return (
    <>
      <div className='ChatBox-container'>
        {chat ? (
          <>
            <div className='chat-header'>
              <div className='follower'>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px',marginTop:'10px' }}>
                  <img src={userData?.AvatarImage ? `${host}/images/${userData.AvatarImage}` : "https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"} alt='' className='followerimage' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <div className='name' style={{ display: 'flex', flexDirection: "column" }}>
                    <span style={{ fontSize: "1rem" }}>{userData?.username}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='chat-body'>
              {messages.map((message, index) => (
                <>
                  <div className={message.senderId === currentUser ? "message own" : "message"} key={index}>
                    <span >{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className='chat-sender'>
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className='send-button button' onClick={handleSend}><SendIcon /></div>
            </div>
          </>
        ) : (
          <span className='chatbox-empty-message'>
            Tap on a chat to start a conversation
          </span>
        )}


      </div>
    </>
  )
}

export default Chatbox