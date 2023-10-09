import React, { useEffect, useRef, useState } from 'react';
import '../Styles/Chat.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { host } from '../Utils/Apiroutes.js';
import knitingale from '../Assets/knitingale.png';
import Conversation from './Conversation/Conversation';
import Chatbox from './ChatBox/Chatbox';
import { io } from 'socket.io-client';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function Chat() {
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [chats, setChats] = useState([])
  const [currentchat, setCurrentchat] = useState(null)
  const [onlineUser, setOnlineUser] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const items = JSON.parse(localStorage.getItem("chat-app-user"));
  var id = items._id;
  const socket = useRef()
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const getdata = async () => {
      const data = await axios.get(`${host}/api/getuser/${id}`)
      setUser(data.data)
    }
    getdata()
  }, [id])
  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])
  useEffect(() => {
    socket.current = io('https://nightingale-chatapp-socket.onrender.com/');
    socket.current.emit("new-user-add", id);
    socket.current.on('get-users', (users) => {
      setOnlineUser(users)
      console.log(onlineUser)
    })
  }, [user])

  //receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data)
    })
  }, [])
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await axios.get(`${host}/chat/${id}`)
        setChats(data.data)
        console.log(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user]);


  

  const handleOut = () => {
    localStorage.removeItem("chat-app-user")
    navigate('/')
  }

  const checkonlinestatus = (chat) => {
    const chatmember = chat.members.find((member) => member !== user._id)
    const online = onlineUser.find((user) => user.userId === chatmember)
    return online ? true : false
  }

  return (
    <div className="Chat">
      <div className='Left-side-chat'>
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <img style={{ width: '50px', height: '50px', marginBottom: '5px' }} src={knitingale} alt='logo' />
          <h4 className='text-uppercase'>Nightingale</h4>
        </div>
        <div className='Chat-container'>
          <div className='Chat-list'>
            {chats.map((chat, index) => (
              <div onClick={() => setCurrentchat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkonlinestatus(chat)} key={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='Right-side-chat'>
        <div className='d-flex justify-content-end align-items-center mb-3'>
          <div className='m-2'><Link to='/follower'><h3><PeopleAltIcon/>friends</h3></Link></div>
          <Link to='/profile'>
            <img src={`${host}/images/` + user.AvatarImage} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="..." />
          </Link>
          <h5 style={{ marginLeft: '5px' }}>{user.username}</h5>
          <button class="button-30" role="button" onClick={handleOut}>Logout</button>
        </div>
        <div className='Right-Chat-container'>
          <Chatbox chat={currentchat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
        </div>
      </div>
    </div>
  )
}
export default Chat