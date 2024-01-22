import React, { useState } from 'react'
import './caterning.css'

import email_icon from '../../Assets/email.png'
import password_icon from '../../Assets/password.png'
import { Button, Paper } from '@mui/material'
import CateringSingUp from './CateringSingUp'
import axios from 'axios'
import { port } from '../../../Gobal'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



export default function CateringLogin({ log, setLog }) {
    const [action, setAction] = useState('Login')
    const [cat, setCat] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    // ALL THE TOASTIFY
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
        setCat({
            ...cat,
            [e.target.name]: e.target.value
        })
    }
    console.log(cat);

    const handleSubmit = () => {
        if (!cat?.email && cat?.password) {
            setError('fill the details')
            notifyA("fill the details")


        }

        axios.post(`${port}/api/caterning/login`, cat)
            .then((res) => {
                if (res.data.success == true) {
                    console.log(res.data);
                    localStorage.setItem('cat_id', JSON.stringify({ "catid": res.data.user._id, "cat_token": res.data.token }))
                    // localStorage.setItem('cat_id', JSON.stringify(res.data.user._id))
                    console.log('success');
                    notifyB("Signed in Successful")

                    navigate('/caterning-home')
                    setLog(true)
                } else {
                    console.log('Login fail');
                    setError('Login Fail')
                    notifyA(res.data)

                }
            })
            .catch((err) => {
                console.log('Error :' + err);
                notifyA(err)

            })
    }

    return (
        <>
            {action === 'Login' ? (
                <Paper elevation={3} className='container'>
                    <div className="header">
                        <div className="text">
                            <h2>LogIn Caterning</h2>
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
                        <Button fullWidth onClick={() => { handleSubmit() }}>
                            Submit
                        </Button>

                        <div className='forgot-password'>
                            <p>Create a Account?<span className='reg-span' onClick={() => setAction('signup')}> Register</span></p>
                        </div>
                    </div>
                </Paper>

            ) : (
                <CateringSingUp

                    action={action}
                    setAction={setAction}
                />
            )}

        </>

    )
}
