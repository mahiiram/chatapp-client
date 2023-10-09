import React,{useEffect, useState} from 'react';
import '../Styles/Signup.css';
import knitingale from '../Assets/knitingale.png';
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { host } from '../Utils/Apiroutes.js';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



function Setimage() {
    const navigate = useNavigate()
    const [image,setImage] = useState([])
    const [file,setFile] = useState();
    const items = JSON.parse(localStorage.getItem("chat-app-user"));
    var id = items._id;
    const handleSubmit = (e) =>{
        const formdata = new FormData();
        formdata.append('file',file)
         axios.put(`${host}/api/${id}`,formdata)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{  
      setInterval(()=>{
        axios.get(`${host}/api/getuser/${id}`)
        .then(res=>setImage(res.data.AvatarImage))
        .catch(err=>console.log(err))
        },1000)   
    },[id])
    useEffect(()=>{
        if(!localStorage.getItem('chat-app-user')){
           navigate('/')
        }
    },[])
    return (
            <section className="bg-image">  
                
                <div className="mask d-flex align-items-center h-100">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center mt-5">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: "15px" }}>
                                    <div className="card-body p-5">
                                        <div className='d-flex justify-content-center align-items-center mb-3'>
                                            <img style={{width:'50px', height:'50px',marginBottom:'5px'}} src={knitingale} alt='logo'/>
                                          <h4 className='text-uppercase'>Nightingale</h4>
                                        </div>
                                            <div className="form-outline mb-4">
                                                <input type="file" id="name" onChange={e=>setFile(e.target.files[0])} className="form-control form-control-md" name='AvatarImage' placeholder='Set Profile'/>
                                            </div>
                                           
                                            <div className="d-flex justify-content-center">
                                                <button onClick={handleSubmit}
                                                    className="btn btn-success">upload</button>
                                            </div>
                                            {/* <img className='row d-flex justify-content-center align-items-center ' src={`${host}/images/`+image} alt='profile'/> */}
                                            <div className="d-flex justify-content-center mb-3 imgdivsetimage">
                                            <img src={`${host}/images/`+image} alt="..."></img>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <Link to='/follower'><span>Next</span><ArrowForwardIcon/></Link>    
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

export default Setimage