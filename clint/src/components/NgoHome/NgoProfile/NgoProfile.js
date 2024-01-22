import React, { useState } from 'react'
import './ngoprofile.css'
import { Paper } from '@mui/material'
import NgoForm from './NgoForm'
import { port } from '../../../Gobal'


export default function NgoProfile() {
  const [profileimg, setProfileImg] = useState()
  console.log(profileimg);
  return (
    <div>
        <div className="profile-pic">
            <div className='background-img'>

            </div>
            <div className='profile-img'>
            <img src={`${port}/api/image/${profileimg}`} alt="" srcset="" height="100%" width="100%" style={{borderRadius:"100%"}}/>

            </div>
        </div>

        <Paper elevation={12} className="ngoDetails">
            <NgoForm 
            setProfileImg={setProfileImg}
            />
        </Paper>
    </div>
  )
}
