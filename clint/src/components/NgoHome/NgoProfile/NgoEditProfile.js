import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material';

import axios from 'axios';

import { port } from '../../../Gobal';

const paperStyle = { padding: 20, width: 280 }


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
   
};



export default function NgoEditProfile({selectProfile, setOpen, token}) {

    const [data, setData] = useState(selectProfile)
    console.log(data._id);
    const id = data._id

    console.log(id);


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
    console.log(data);

    const handleSubmit = () => {
        axios.put(`${port}/api/ngo/ngoupdate/${id}`, data, {headers:{"auth-token": token}})
        .then((res) => {
            setOpen(false)
            console.log(res.data);
        }).catch((err) => {
            console.log("Error :" + err);
        })
    }

    return (
        <div>
            <Box sx={style}>
                <Grid align='center'>
                    <Paper elevation={10} style={paperStyle}>
                        <h2>FORM</h2>


                        <TextField
                            label="Ngo Name"
                            sx={{ mt: 2 }}
                            onChange={handleChange}
                            name='name'
                            value={data.name}
                        />
                        <TextField
                            label="Ngo Email"
                            sx={{ mt: 2 }}
                            onChange={handleChange}
                            name='email'
                            value={data.email}
                        />
                        <TextField
                            label="Location"
                            sx={{ mt: 2 }}
                            onChange={handleChange}
                            name='location'
                            value={data.location}
                        />
                        <TextField
                            label="state"
                            sx={{ mt: 2 }}
                            onChange={handleChange}
                            name='state'
                            value={data.state}
                        />
                        <TextField
                            label="district"
                            sx={{ mt: 2 }}
                            onChange={handleChange}
                            name='district'
                            value={data.district}
                        />

    
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mt: 2 }}
                            onClick={() => handleSubmit()}
                            fullWidth
                        >
                            Submit
                        </Button>
                        {/* 
                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    component={Link} to="/"

                >
                    <BackspaceIcon />
                </Button> */}



                    </Paper>
                </Grid>
            </Box>
        </div>
    )
}
