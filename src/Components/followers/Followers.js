import React, { useEffect, useState } from 'react';
import '../../Styles/Signup.css';
import knitingale from '../../Assets/knitingale.png';
import { Link } from "react-router-dom";
import { host } from '../../Utils/Apiroutes.js';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Followerscard from './Followerscard';

function Followers() {
  const [userData, setUserData] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [filteredUserData, setFilteredUserData] = useState([]);
  
  useEffect(() => {
    const getallUserData = async () => {
      const items = JSON.parse(localStorage.getItem("chat-app-user"));
        var currentuserid = items._id;
      try {
        const { data } = await axios.get(`${host}/api/getalluser/${currentuserid}`)
        setUserData(data.alluser)
      } catch (error) {
        console.log(error)
      }
    }
    getallUserData()
  }, [])

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Filter user data based on the search input
    const filteredData = userData.filter((user) =>
      user.username.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Update the state with the filtered data
    setFilteredUserData(inputValue ? filteredData : userData);
  };
    
  return (
    <section className="bg-image">

      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center mt-5">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <div className='d-flex justify-content-center align-items-center mb-3'>
                    <img style={{ width: '50px', height: '50px', marginBottom: '5px' }} src={knitingale} alt='logo' />
                    <h4 className='text-uppercase'>Nightingale</h4>
                  </div>
                  <div className='d-flex justify-content-center align-items-center mb-3'>
                    <input className="form-control me-2 mb-5" type="text" placeholder="Find your friends" aria-label="Search" value={searchInput}
                      onChange={handleSearchInputChange} />

                  </div>
                  <div>
                    {
                      filteredUserData.slice(0, 2).map((alluser) => (
                        <Followerscard key={alluser._id} alluser={alluser} />
                      ))
                    }
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link to='/chat'><span>chat</span><ArrowForwardIcon /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Followers