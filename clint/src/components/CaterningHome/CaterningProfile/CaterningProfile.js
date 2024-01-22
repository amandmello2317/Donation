import React, { useState } from 'react'

import { Paper } from '@mui/material'
import CaterningForm from './CaterningForm';
import { port } from '../../../Gobal';



export default function CaterningProfile() {
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
            <CaterningForm
            setProfileImg={setProfileImg}
            />
        </Paper>
    </div>
  )
}
