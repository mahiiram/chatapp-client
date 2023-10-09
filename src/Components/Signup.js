import React,{useState} from 'react';
import '../Styles/Signup.css';
import knitingale from '../Assets/knitingale.png';
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../Utils/Apiroutes.js';


function Signup() {
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
    const handleSubmit =async (e) => {
        e.preventDefault();
       if( handleValidation()){
        const {password,username,email} = values;
        const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
        });
        if(data.status===false){
            toast.error(data.msg,toastoption)
        }
        if(data.status===true){
            toast.success(data.msg,toastoption)
        }
        if(data.status===true){
            localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        }
         navigate('/profile')
       }
    }
    const handleValidation = () =>{
        const {password,confirmpassword,username,email} = values;
        if(password!==confirmpassword){
            toast.error("password and confirm password not matching",{toastoption})
              return false;
        }else if(username===""){
            toast.error('username is required',{toastoption})
            return false;
        }else if(email===""){
            toast.error('Email is required',{toastoption})
            return false; 
        }else if(password.length<8){
            toast.error('Password must have more than 6 letters',{toastoption})
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
                                                <input type="email" id="email" className="form-control form-control-md" name='email' placeholder='Email' onChange={(e)=>handleChange(e)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="password" className="form-control form-control-md" name='password' placeholder='Passsword' onChange={(e)=>handleChange(e)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="confirm-password" className="form-control form-control-md" name='confirmpassword' placeholder='Confirm passsword' onChange={(e)=>handleChange(e)} />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-success">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to={'/'}
                                                className="fw-bold text-body"><u>Login here</u></Link></p>

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

export default Signup