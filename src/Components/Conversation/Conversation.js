import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { host } from '../../Utils/Apiroutes.js';
import '../../Styles/Chat.css'

function Conversation({data,currentUserId,online}) {
    const [userData,setUserData] = useState([]);
    const followerId = data.members.find((id)=> id!==currentUserId)
    useEffect(()=>{
       console.log(followerId)
       const getUserData = async ()=>{
        try {
        const {data} = await axios.get(`${host}/api/getuser/${followerId}`)
          setUserData(data)
          console.log(data)
        } catch (error) {
            console.log(error)
        }
       }
       getUserData()
    },[followerId])

  return (
    <>
    <div className='follower conversation'>
        <div >
            {online && <div className='online-dot'></div>}
            <img src={userData?.AvatarImage ? `${host}/images/${userData.AvatarImage}` : "https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"} alt='' className='followerimage' style={{width:'50px', height:'50px',borderRadius:'50%'}}/>
                <div className='name' style={{display:'flex',flexDirection:"column"}}>
                    <span style={{fontSize:"1rem"}}>{userData?.username}</span>
                    <span style={{fontSize:"0.8rem"}}>{online? "online":"offline"}</span>
                </div>
        </div>
    </div>
    <hr style={{width:"100%", border:"1px solid greenyellow"}}/>
    </>
  );
}

export default Conversation