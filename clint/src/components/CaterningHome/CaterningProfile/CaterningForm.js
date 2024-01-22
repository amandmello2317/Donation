
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Paper } from '@mui/material';
import { port } from '../../../Gobal';
import Modal from '@mui/material/Modal';

import axios from 'axios';
import CaterningEdit from './CaterningEdit';

const paperStyle = { padding: 20, width: 280, margin: '20px auto' }

const formstyle = {
    height: "300px",
    width: "300px",
    backgroundColor: "black",
    marginBottom: "10px"
}

export default function CaterningForm({setProfileImg}) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([])
    const [selectProfile, setSelectProfile] = useState([])

    const handleClose = () => setOpen(false);

    const handleEdit = async(id) => {
        setOpen(true)
        console.log(id);
        await setSelectProfile(id)
        console.log(selectProfile);
    }

    const ngodetails = JSON.parse(localStorage.getItem('cat_id'))
    console.log(ngodetails.cat_token);
    const token = ngodetails.cat_token
    console.log(token);
    console.log(ngodetails.catid);
    const id = ngodetails.catid
    console.log(id);

    useEffect(() => {
        axios.get(`${port}/api/caterning/caterningprofile/${id}`,{headers:{"auth-token": token}} )
            .then((res) => {
                console.log(res.data);
                setData(res.data)
                
                setProfileImg(res.data.caterning.cphoto)
            }).catch((err) => {
                console.log("Error :" + err);
            })
    }, [open])

    console.log(data);  

    return (
        <div>

            <Grid align='center' style={{ width: '30%', margin: 'auto', paddingBottom: '10px' }}>
            {Object.keys(data).length > 0 ? (
                        <>
                <Paper elevation={10} style={paperStyle}>
                    <h2>Profile</h2>
                  

                            <TextField
                                label="Ngo Name"
                                sx={{ mt: 2 }}
                              
                                name='name'
                                value={data.caterning.name}
                            />
                            <TextField
                                label="Ngo Email"
                                sx={{ mt: 2 }}
                             

                                value={data.caterning.email}
                            />
                            <TextField
                                label="Location"
                                sx={{ mt: 2 }}
                              
                                value={data.caterning.location}
                            />
                            <TextField
                                label="state"
                                sx={{ mt: 2 }}
                            
                                name='number'
                                value={data.caterning.state}
                            />
                            <TextField
                                label="district"
                                sx={{ mt: 2 }}
                            
                                name='district'
                                value={data.caterning.district}
                            />
                         

                            <Button
                                variant="contained"
                                color="success"
                                sx={{ mt: 2 }}
                                onClick={() => handleEdit(data.caterning)}
                                fullWidth
                            >
                                Edit
                            </Button>


                        </Paper>

                    <div style={formstyle} className='certificate'>
                        <img src={`${port}/api/image/${data.caterning.certificate}`} alt="" srcset="" height="100%" width="100%" />
                    </div>
                </>
                ) : (
                <p>Loading...</p>
                                      )}


            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <CaterningEdit 
                    selectProfile={selectProfile}
                    setOpen={setOpen}
                    token={token}
                />
            </Modal>


        </div>
    )
}
