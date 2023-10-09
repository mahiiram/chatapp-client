import React,{useEffect, useState} from 'react';
import '../Styles/Signup.css';
import knitingale from '../Assets/knitingale.png';
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute} from '../Utils/Apiroutes.js';


function Login() {
     const navigate = useNavigate()
     const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:""
     })
     const toastoption = {
        position:'top-center',
        autoClose :8000,
        pauseOnHover:true,
        draggable:true,
        theme:'dark'
     }
      useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate('/chat')
        }
      })


    const handleSubmit =async (e) => {
        e.preventDefault();
       if( handleValidation()){
        const {password,username} = values;
        const {data} = await axios.post(loginRoute,{
            username,
            password
        });
        if(data.status===false){
            toast.error(data.msg,toastoption)
        }
        if(data.status===true){
            localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        }
         navigate('/chat')
       }
    }
    const handleValidation = () =>{
        const {password,username} = values;
        if(password===""){
            toast.error("password required",{toastoption})
              return false;
        }else if(username===""){
            toast.error('username is required',{toastoption})
            return false;
        }
        return true;
    }
    const handleChange = (e) =>{
          setValues({...values,[e.target.name] : e.target.value})
    }
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

                                        <form onSubmit={(e)=>handleSubmit(e)}>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="name" className="form-control form-control-md" name='username' placeholder='Username' onChange={(e)=>handleChange(e)} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" className="form-control form-control-md" name='password' placeholder='Passsword' onChange={(e)=>handleChange(e)} />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-success">Login</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to={'/signup'}
                                                   className="fw-bold text-body"><u>Signup</u></Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </section>            
    )
}

export default Login;