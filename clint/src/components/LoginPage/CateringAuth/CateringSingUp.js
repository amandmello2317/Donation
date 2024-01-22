import React, { useState } from 'react'
import './caterning.css'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import user_icon from '../../Assets/person.png'
import { Button, Paper } from '@mui/material'
import axios from 'axios'
import { port } from '../../../Gobal'
import { toast } from 'react-toastify';



export default function CateringSingUp({ action, setAction }) {

  const [cat, setCat] = useState()

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
    setCat({
      ...cat,
      [e.target.name]: e.target.value
    })
  }
  console.log(cat);

  const handleChangeImage = (e, index) => {
    // const image = [...ngo.img]
    // image[index] = e.target.files[0]
    setCat({
      ...cat,
      [e.target.name]: e.target.files[0]
    })
  }

  const handleSubmit = () => {

    if (cat?.password !== cat?.cpassword) {

      notifyA('enter the correct passowrd')
      console.log('enter the correct passowrd');

    } else {
      const val = new FormData()
      val.append("name", cat.name)
      val.append("email", cat.email)
      val.append("location", cat.location)
      val.append("state", cat.state)
      val.append("district", cat.district)
      val.append("certificate", cat.certificate)
      val.append("password", cat.password)
      val.append("cphoto", cat.cphoto)

      axios.post(`${port}/api/caterning/signup`, val)
        .then((res) => {
          console.log("Inserted" + res.data);
          console.log(res.data);
          setAction('Login')
          notifyB("account successfully created")


        }).catch((err) => {
          console.log('Error :' + err);
          notifyA(err)

        })

    }


  }



  return (
    <Paper elevation={3} className='container'>

      <div className="header">
        <div className="text">
          <h2>SignUp Caterning</h2>
          <hr style={{ background: '#3c009d', height: '5px', borderRadius: '9px', marginTop: '-10px' }} />
        </div>

      </div>
      <div className="inputs">

        <div className="input">
          <img src={user_icon} alt="" srcset="" />
          <input type="text" name="name" placeholder='name' onChange={handleChange} />
        </div>

        <div className="input">
          <img src={email_icon} alt="" srcset="" />
          <input type="email" name="email" placeholder='email' onChange={handleChange} />
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
          <input type="file" name="cphoto" placeholder='photo' onChange={(e) => handleChangeImage(e)} />
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
          <input type="password" name="cpassword" placeholder='comform password' onChange={handleChange} />
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
