import React, { useState } from 'react'
import './NgoAuth.css'

import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import user_icon from '../../Assets/person.png'
import { Button, Paper } from '@mui/material'
import axios from 'axios'
import { port } from '../../../Gobal'
import { toast } from 'react-toastify';


export default function NgoSignUp({ action, setAction }) {
  const [ngo, setNgo] = useState()
  const [error, setError] = useState()

  // ALL THE TOASTIFY
  const notifyA = (msg) => {
    toast.error(msg, {
      pauseOnHover: false
    })
  }

  const notifyB = (msg) => {
    toast.success(msg)
  }

  const notifyC = (msg) => {
    toast.info(msg, {
      pauseOnHover: false
    })
  }

  const handleChange = (e) => {
    setNgo({
      ...ngo,
      [e.target.name]: e.target.value
    })
  }


  console.log(ngo);

  const handleChangeImage = (e, index) => {
    // const image = [...ngo.img]
    // image[index] = e.target.files[0]
    setNgo({
      ...ngo,
      [e.target.name]: e.target.files[0]
    })
  }

  console.log(ngo);


  const handleSubmit = () => {
    console.log(ngo)
    if (!ngo?.name || ngo?.name === "" || ngo?.name === "undefined") {
      alert("Please fill the name input");
    } else if (!ngo?.email || ngo?.email === "" || ngo?.email === "undefined") {
      alert("Please fill the email input");
    } else if (!ngo?.location || ngo?.location === "" || ngo?.location === "undefined") {
      alert("Please fill the location input");
    } else if (!ngo?.state || ngo?.state === "" || ngo?.state === "undefined") {
      alert("Please fill the state input");
    } else if (!ngo?.district || ngo?.district === "" || ngo?.district === "undefined") {
      alert("Please fill the district input");
    } else if (!ngo?.nphoto || ngo?.nphoto === "" || ngo?.nphoto === "undefined") {
      alert("Please fill the photo input");
    } else if (!ngo?.certificate || ngo?.certificate === "" || ngo?.certificate === "undefined") {
      alert("Please fill the certificate input");
    } else if (!ngo?.password || ngo?.password === "" || ngo?.password === "undefined") {
      alert("Please fill the Password");
    } else if (!ngo?.cpassword || ngo?.cpassword === "" || ngo?.cpassword === "undefined") {
      alert("Please fill the Conform Password");
    }
    else {  
      if (ngo?.password !== ngo?.cpassword) {
        setError('fill the details')
        notifyA('enter the correct passowrd')
        console.log('enter the correct passowrd');

      } else {

        const val = new FormData()
        val.append("name", ngo.name)
        val.append("email", ngo.email)
        val.append("location", ngo.location)
        val.append("state", ngo.state)
        val.append("district", ngo.district)
        val.append("certificate", ngo.certificate)
        val.append("password", ngo.password)
        val.append("cpassword", ngo.cpassword)
        val.append("nphoto", ngo.nphoto)

        axios.post(`${port}/api/ngo/signup`, val)
          .then((res) => {
            console.log(res.data.error);
            if(res.data.error){
              notifyA(res.data.error)
              
            }else{
              notifyB(res.data.success)
            }
            setAction('Login')
            
          }).catch((err) => {
            console.log('Error :' + err);
            notifyA("some error occe")
          })

      }
    }



  }


  return (
    <Paper elevation={3} className='container'>

      <div className="header">
        <div className="text">
          <h2>SignUp NGO</h2>
          <hr style={{ background: '#3c009d', height: '5px', borderRadius: '9px', marginTop: '-10px' }} />
        </div>

      </div>
      <div className="inputs">

        <div className="input">
          <img src={user_icon} alt="" srcset="" />
          <input type="text" name="name" id="" placeholder='name' onChange={handleChange} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" srcset="" />
          <input type="email" name="email" id="" placeholder='email' onChange={handleChange} />
        </div>

        <div className="input">
          <img src={user_icon} alt="" srcset="" />
          <input type="text" name="location" placeholder='Location' onChange={handleChange} />
        </div>

        <div className="input">
          <img src={user_icon} alt="" srcset="" />
          <input type="text" name="state" placeholder='state' onChange={handleChange} />
        </div>

        <div className="input">
          <img src={user_icon} alt="" srcset="" />
          <input type="text" name="district" placeholder='district' onChange={handleChange} />
        </div>

        <div className="input">
          <label htmlFor="certificate">Photo</label>
          <input type="file" name="nphoto" placeholder='photo' onChange={(e) => handleChangeImage(e)} />
        </div>

        <div className="input">
          <label htmlFor="certificate">certificate</label>
          <input type="file" name="certificate" placeholder='certificate' onChange={(e) => handleChangeImage(e)} />
        </div>


        <div className="input">
          <img src={password_icon} alt="" srcset="" />
          <input type="password" name="password" id="" placeholder='password' onChange={handleChange} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" srcset="" />
          <input type="password" name="cpassword" id="" placeholder='comform password' onChange={handleChange} />
        </div>


      </div>



      <div style={{ width: '300px', margin: '20px auto 0px auto' }}>
        <Button fullWidth onClick={() => handleSubmit()}>
          Submit
        </Button>

      </div>
      <div className='forgot-password'>
        <p>Already Have a account?<span className='reg-span' onClick={() => setAction('Login')}>Login</span></p>
      </div>

    </Paper>

  )
}
