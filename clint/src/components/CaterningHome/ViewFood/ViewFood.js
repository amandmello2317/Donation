import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import img1 from '../../Assets/box6_image.jpg'
import { Badge, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MobileStepper from '@mui/material/MobileStepper';

import Typography from '@mui/material/Typography';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { port } from '../../../Gobal';



import Modal from '@mui/material/Modal';

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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewFood() {
  const theme = useTheme();
  const [data, setData] = useState()
  const [activeSteps, setActiveSteps] = useState([]);
  const [selectedPost, setSelectedPost] = useState()
  const [openDelete, setOpenDelete] = useState(false)


  const CaterningDetails = JSON.parse(localStorage.getItem('cat_id'))
  console.log(CaterningDetails.catid);
  const token = CaterningDetails.cat_token
  console.log(token);

  const id = CaterningDetails.catid

  useEffect(() => {
    axios.get(`${port}/api/foodpost/foodview/${id}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        setData(res.data)
        // Initialize active steps for each item to 0
        setActiveSteps(Array(res.data.length).fill(0));

      }).catch((err) => {
        console.log("Error :" + err);
      })
  }, [openDelete])




  const handleNext = (index) => {
    setActiveSteps(prevSteps => {
      const newSteps = [...prevSteps];
      newSteps[index] = newSteps[index] + 1;
      return newSteps;
    });
  };

  const handleBack = (index) => {
    setActiveSteps(prevSteps => {
      const newSteps = [...prevSteps];
      newSteps[index] = newSteps[index] - 1;
      return newSteps;
    });
  };

  const handleClose = () => {
    setOpenDelete(false)

  }



  // DELETE POST
  const handleDelete = (id) => {
    setOpenDelete(true)
    console.log(id);
    setSelectedPost(id)
  }

  const deletePost = (id) => {
    console.log(id);

    axios.delete(`${port}/api/foodpost/deletefoodpost/${id}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        setOpenDelete(false)

        // setcount((prev) => !prev)
      }).catch((err) => {
        console.log("Error :" + err);
      })
    console.log(id);
  }


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <div style={{textAlign:"center"}}>

          <h2>ALL POST</h2>
        </div>


        {data?.map((items, index) => (

          <Grid container spacing={1} style={{ margin: '10px 2px', border: '5px solid black', height: '100%', maxWidth: "100%", position: 'relative' }}>

            <Badge color="secondary" badgeContent={index + 1}>

            </Badge>

            <Badge className='btg' color="warning" badgeContent={items.catId.name} overlap="circular" style={{
              position: 'absolute',
              top: 0,
              left: '45%',
              // transform: 'translateX(-50%)',
              zIndex: 1,
              backgroundColor: 'white', // Adjust as needed
              padding: '4px 8px', // Adjust as needed
              borderRadius: '50%', // To make it circular
            }}>

            </Badge>

            <Grid item xs={12} md={3} >
              {/* Caterning image */}
              <img src={`${port}/api/image/${items.catId.cphoto}`} alt="" srcset="" style={{ objectFit: 'cover', height: '300px', width: '100%', borderRadius:"20px", border:"2px solid blue"}} />

            </Grid>

            {/* Food images */}
            <Grid item xs={12} md={5} sx={{margin:"10px"}}>
              <Box sx={{ flexGrow: 1 }}>



                <img
                  // src={images[activeStep].imgPath}
                  src={`${port}/api/image/${items.foodpostimg[activeSteps[index]]}`}
                  alt={`Food Image ${activeSteps[index] + 1}`}
                  style={{
                    height: 255,
                    display: 'block',
                    // maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                  }}
                />

                <MobileStepper
                  steps={items.foodpostimg.length}
                  position="static"
                  activeStep={activeSteps[index]}

                  nextButton={

                    <Button
                      size="small"
                      onClick={() => handleNext(index)}
                      disabled={activeSteps[index] === items.foodpostimg.length - 1}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>

                  }
                  backButton={

                    <Button
                      size="small"
                      onClick={() => handleBack(index)}
                      disabled={activeSteps[index] === 0}
                    >
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>

                  }
                />
              </Box>
            </Grid>

            {/* Caterning details */}
            <Grid item xs={12} md={3}>
              <Item style={{ width: '100%' }}>
                <h4>Name: {items.catId.name}</h4>
                {/* <h4>Address: New Caterning</h4> */}
                <h4>Food quandity:{items.quandity}</h4>
                <h4>location:{items.location}</h4>
                <h4>description:{items.description}</h4>
                <Button
                  fullWidth
                  onClick={() => handleDelete(items._id)}
                >
                  Delete
                </Button>
              </Item>
            </Grid>

          </Grid>


        ))}
      </Box>

      <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you Sure You want to delete The post?
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => deletePost(selectedPost)}>Yes</Button>
          <Button sx={{ mt: 2 }} onClick={() => setOpenDelete(false)}>Cancle</Button>
        </Box>
      </Modal>


    </div >
  )
}
