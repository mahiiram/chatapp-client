import React, { useState } from 'react';
import '../../Styles/Signup.css';
import { host } from '../../Utils/Apiroutes.js';
import axios from 'axios';

function Followerscard({alluser}) {
    const [buttonname,setButtonname] = useState("add")
    
    const handlebutton = async (e) => {
        e.preventDefault();
        const items = JSON.parse(localStorage.getItem("chat-app-user"));
        var senderId = items._id;
        var receiverId = alluser._id
        console.log(senderId, receiverId);
      
        const members = {
              senderId,
              receiverId} ;
      
        try {
          const response = await axios.post(`${host}/chat/`, members);
          console.log("Response Data:", response.data);
          setButtonname('added');
        } catch (error) {
          console.error("Error:", error);
        }
      };
     
  return (
    <div className='conversation' >
                          <div>
                            <img src={alluser?.AvatarImage ? `${host}/images/${alluser.AvatarImage}` : "https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"} alt='' className='followerimage' style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                          </div>
                          <div className='name'>
                            <span style={{ fontSize: "1rem" }}>{alluser?.username}</span>
                          </div>
                          <div className='send-button button' style={{ width: '50px' }} onClick={handlebutton} >{buttonname}</div>
                        </div>
  )
}

export default Followerscard