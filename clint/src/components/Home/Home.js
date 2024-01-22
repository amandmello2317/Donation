import React, { useEffect } from 'react'

import './home.css'
import { Box, Grid } from '@mui/material'

import { useNavigate } from 'react-router-dom';



export default function Home() {
    const navigate = useNavigate()
    

    const ngo = JSON.parse(localStorage.getItem('ngo_id'))
    const caterning = JSON.parse(localStorage.getItem('cat_id'))
    const adm = JSON.parse(localStorage.getItem('admin_id'))
    
    useEffect(() => {
        if (ngo || caterning || adm) {
          navigate(ngo ? "/ngo-home" : (caterning) ? "/caterning-home" : "admin");
        }
      }, [navigate, ngo, caterning, adm]);

    


    // {ngo ? ( navigate("/ngo-home")) : caterning ? ( navigate("/caterning-home") ) : (navigate("/home")) }


    return (
        <div>
            <div className='container1' >
                <div className="first-part" style={{ display: 'flex', textAlign: 'center' }}>
                    <div className='part-name' style={{ margin: '100px auto', height: '10px', width: '400px', lineHeight: 1, }}>
                        <h1 style={{ color: 'white', fontSize: '6rem', fontFamily: 'Revelstoke Bold Grunge", sans-serif' }}> CATERING <span style={{ fontSize: '3rem' }}>FOOD FOR NGO</span></h1>
                    </div>
                </div>

                <div className="second-part" style={{ marginTop: '50px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: 'rgb(209, 40, 18)' }}>BRINGING THE BBQ</h2>

                        <h1>STRAIGHT TO YOU</h1>
                        <div style={{ width: '70%', textAlign: 'center', margin: 'auto', lineHeight: 1.5 }}>

                            <p>We've been catering events for more than 20 years and bringing our best to every single one. No matter what you're planning, we've got the BBQ for you, with a friendly team focused on making your event flawless and fun.</p>
                        </div>
                    </div>

                    <div className='images-partsecond'>

                    </div>
                </div>
                {/* 
          
                {/* <div className="third-part"> */}
                <Box sx={{ flexGrow: 1, mt: 10, mb: 5 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={4}>
                            <div className="img-p1">

                            </div>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <div className='img-p2'>

                            </div>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <div className='img-p3'>
                                <div style={{ margin: '50px auto', textAlign: 'center' }}>

                                    <h2 style={{ color: 'white' }}>DONATE FOR FOOD </h2>
                                    <p style={{ color: 'red' }}> DONT NOT WASTE FOOD </p>

                                    <div style={{ marginTop: '100px' }}>
                                        <button className='join-us' onClick={() => navigate('/login')}> <span>JOIN US</span></button>
                                    </div>
                                </div>


                            </div>


                        </Grid>

                    </Grid>
                </Box>
                {/* </div> */}

                <div className="footer">
                    <div className="contact-details">
                        <div>
                            <p>yod@gmail.com</p>
                        </div>
                        <div>
                            <p>8888888888</p>
                        </div>
                        <div>
                            <p>derabial Mangalore</p>
                        </div>
                    </div>

                    <div className="copy-right">
                        <div>
                            <h5>Copyright © Aman 2023 All Rights Reserved</h5>
                        </div>
                    </div>


                </div>
            </div>

        </div >
    )
}
