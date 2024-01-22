import React, { useState } from 'react'

import { Button, Paper } from '@mui/material'
import SideBarcat from './SideBarcat'
import CaterningProfile from './CaterningProfile/CaterningProfile'
import UploadFood from './UploadFood.js/UploadFood'
import ViewFood from './ViewFood/ViewFood'
import RequestedFood from './RequestedFood/RequestedFood'




export default function CaterningHome() {
    const [larg, setlarg] = useState(false)

    // profile, all-caterning, requested food, post:- viewPost, UploadPost
    const [selection, setSelection] = useState("profile")
    return (
        <div className='ngohome' >

            <div className="start-page">

                <div className={larg === true ? "sidebar" : "sidebar-2"} >

                    <SideBarcat
                        setlarg={setlarg}
                        larg={larg}
                        setSelection={setSelection}
                    />
                </div>

                <Paper elevation={24} className="main-page" >
                    {
                        selection === 'profile' ? (
                            <CaterningProfile />

                        ) :  (selection === 'requestedfood') ? (
                            <RequestedFood />

                        ) : (selection === 'viewfood') ? (
                            <ViewFood />

                        ) : (selection ==='uploadfood') ? (

                            <UploadFood 
                            setSelection={setSelection}
                            />
                        ) : ""
                    }
                </Paper>
            </div>
        </div>
    )
}
