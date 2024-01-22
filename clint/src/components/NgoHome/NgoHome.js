import React, { useEffect, useState } from 'react'
import './ngohome.css'
import { Button, Paper } from '@mui/material'
import Sidebar from './Sidebar'
import NgoProfile from './NgoProfile/NgoProfile'
import AllCaterning from './AllCaterning/AllCaterning'
import RequestedFood from './RequestedFood/RequestedFood'
import ViewPost from './ViewPost/ViewPost'
import UploadPost from './UploadPost/UploadPost'
import { useNavigate } from 'react-router-dom'

export default function NgoHome() {

    const [selection, setSelection] = useState("profile")
    const navigate = useNavigate()
    
    const [larg, setlarg] = useState(false)
    // const aut1 = JSON.parse(localStorage.getItem('ngo_id'))

    //     if(!aut1){
    //         navigate("/login")
            
    // //     }

    //     useEffect(() => {
    //     const aut1 = JSON.parse(localStorage.getItem('ngo_id'));

    //     if (!aut1) {
    //         navigate('/login');
    //     }
    // }, [navigate]);
    // if (!localStorage.getItem('ngoid')) {
    //     return null; // Or render something indicating that the user is not authenticated
    // }
 
 




    // profile, all-caterning, requested food, post:- viewPost, UploadPost



    return (
      
            <div className='ngohome' >

                <div className="start-page">

                    <div className={larg === true ? "sidebar" : "sidebar-2"}>
                        <Sidebar
                            setlarg={setlarg}
                            larg={larg}
                            setSelection={setSelection}
                        />
                    </div>

                    <Paper elevation={24} className="main-page">
                        {
                            selection === 'profile' ? (
                                <NgoProfile />

                            ) : (selection === 'allcaterning') ? (

                                <AllCaterning />
                            ) : (selection === 'requestfood') ? (
                                <RequestedFood />

                            ) : (selection === 'viewpost') ? (
                                <ViewPost />

                            ) : (selection === 'uploadpost') ? (

                                <UploadPost />
                            )  : ""
                        }
                    </Paper>
                </div>
            </div>


    )
}
