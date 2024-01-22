import React, { useState } from 'react'
import './NgoAuth.css'
import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import { Button, Paper } from '@mui/material'
import NgoSignUp from './NgoSingUp'
import axios from 'axios'
import { port } from '../../../Gobal'
import { useNavigate } from 'react-router-dom'
import WaitingPage from '../../../WaitingPage'

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NgoLogin({ log, setLog }) {

  const [action, setAction] = useState('Login')
  const [status, setStatus] = useState('');
  const [ngo, setNgo] = useState()
  const [error, setError] = useState()
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const handleClose = () => setOpen(false);

  const notifyA = (msg) => {
    toast.error(msg, {
      pauseOnHover: false
    })
  }
  const notifyC = (msg) => {
    toast.info(msg, {
      pauseOnHover: false
    })
  }

  const notifyB = (msg) => {
    toast.success(msg)
  }


  const handleChange = (e) => {
    setNgo({
      ...ngo,
      [e.target.name]: e.target.value
    })
  }
  console.log(ngo);

  const handleSubmit = () => {
    if (!ngo?.email || ngo?.email === "" || ngo?.email == "undefined") {
      setError('fill the details')
      notifyA("fill the details")
    } else if (!ngo?.password || ngo?.email === "" || ngo?.email == "undefined") {
      setError('fill the details')
      notifyA("fill the details")
    }

    else {




      axios.post(`${port}/api/ngo/login`, ngo)
        .then((res) => {
          console.log(res.data);
          if (res.data.success == true) {
            console.log(res.data);
            // if (res.data.ngo) {
            localStorage.setItem('ngo_id', JSON.stringify({ "ngoid": res.data.ngo._id, "ngo_token": res.data.token }))
            console.log('success');
            notifyB("Signed in Successful")
            navigate("/ngo-home")
            setLog(true)
            // }
            // else{
            //   localStorage.setItem('cat_id', JSON.stringify({ "catid": res.data.cat._id, "cat_token": res.data.token }))
            //   console.log('success');
            //   navigate("/caterning-home")
            //   setLog(true)

            // }

          } else if (res.data === "waiting") {
            console.log("waiting");
            notifyC("Your Request is waiting")
            setStatus("waiting")
            setOpen(true)


          } else if (res.data === "rejected") {
            console.log("rejected");
            notifyA("Your Request is Rejected")

            setStatus("rejected")
            setOpen(true)
          }
          else {
            console.log(res.data);
            console.log('Login fail');
            setError('Login Fail')
            notifyA(res.data)
          }
        })
        .catch((err) => {
          console.log(err);
          console.log('Error :' + err);
          notifyA("enter all the details")

        })
    }
  }



  return (
    <>

      {
        action === 'Login' ? (
          <Paper elevation={3} className='container'>
            <div className="header">
              <div className="text">
                <h2>LogIn NGO</h2>
                <hr style={{ background: '#3c009d', height: '5px', borderRadius: '9px', marginTop: '-10px' }} />
              </div>

            </div>
            <div className="inputs">

              <div className="input">
                <img src={email_icon} alt="" srcset="" />
                <input type="email" name="email" id="" placeholder='email' onChange={handleChange} />
              </div>

              <div className="input">
                <img src={password_icon} alt="" srcset="" />
                <input type="password" name="password" id="" placeholder='password' onChange={handleChange} />
              </div>
            </div>



            <div style={{ width: '300px', margin: '20px auto 0px auto' }}>
              <Button fullWidth onClick={() => handleSubmit()}>
                Submit
              </Button>

              <div className='forgot-password'>
                <p>Create a Account?<span className='reg-span' onClick={() => setAction('signup')}> Register</span></p>
              </div>
            </div>
          </Paper>
        ) : (

          <NgoSignUp
            action={action}
            setAction={setAction}
          />
        )
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WaitingPage
            status={status} />
        </Box>
      </Modal>
    </>

  )
}
