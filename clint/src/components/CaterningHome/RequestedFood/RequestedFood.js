import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Badge, Button, CircularProgress, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import axios from 'axios';
import { port } from '../../../Gobal';


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

export default function RequestedFood() {
  const theme = useTheme();
  const [Count, setCount] = useState(true)

  const [data, setData] = useState()
  const [activeSteps, setActiveSteps] = useState([]);
  const [selectedPost, setSelectedPost] = useState()
  const [openDelete, setOpenDelete] = useState(false)

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);


  const CaterningDetails = JSON.parse(localStorage.getItem('cat_id'))
  console.log(CaterningDetails.catid);
  const token = CaterningDetails.cat_token

  const id = CaterningDetails.catid

  useEffect(() => {
    axios.get(`${port}/api/foodrequest/viewrequest/${id}`,{headers:{"auth-token": token}})
      .then((res) => {

        console.log(res.data);
        setData(res.data)
        // Initialize active steps for each item to 0
        setActiveSteps(Array(res.data.length).fill(0));


      }).catch((err) => {
        console.log("Error :" + err);

      })
  }, [openDelete, Count])


  // ACCEPT FRIEND REQUEST
  const handleAccept = (id) => {
    axios.put(`${port}/api/foodrequest/acceptfoood/${id}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        alert("Accepted Request")
        setCount(!Count)

      }).catch((err) => {
        console.log("Error: " + err);
      })

  }

  // CANCLE ACCEPTED FRIEND REQUEST
  const handleCancle = (id) => {
    console.log("hiii");
    axios.put(`${port}/api/foodrequest/cancleacceptfoood/${id}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        alert("Cancle Accept")
        setCount(!Count)

      }).catch((err) => {
        console.log("Error: " + err);
      })
  }

  // REJECT THE FRIEND REQUEST AND DELETE IT
  const handleReject = (id) => {
    console.log(id);

    axios.delete(`${port}/api/foodrequest/rejectrequest/${id}`, {headers:{"auth-token": token}})
      .then((res) => {
        alert("reject")
        console.log(res.data);

        setCount(!Count)
      }).catch((err) => {
        console.log("Error :" + err);
      })
    console.log(id);
  }
  if (!data) {
    // If data is still loading, display a loading indicator
    return <CircularProgress />;
  }


  return (

    <div>
      <Box sx={{ flexGrow: 1 }}>
        <div style={{ textAlign: "center" }}>

          <h2>ALL REQUESTES</h2>
        </div>

        {data?.map((items, index) => (

          <Grid container spacing={1} style={{ margin: '10px 2px', border: '5px solid black', height: '100%', maxWidth: "100%", position: 'relative' }}>

            <Badge color="secondary" badgeContent={index + 1}>

            </Badge>

            <Badge className='btg' color="warning" badgeContent={items.ngoId ? items.ngoId.name : 'N/A'} overlap="circular" style={{
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



            {/* Food images */}
            {/* <Grid item xs={12} md={3} sx={{ margin: "10px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <img
                  // src={images[activeStep].imgPath}
                  src={`${port}/api/image/${items.foodpostId.foodpostimg[activeSteps[index]]}`}
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
                  steps={items.foodpostId.foodpostimg.length}
                  position="static"
                  activeStep={activeSteps[index]}

                  nextButton={

                    <Button
                      size="small"
                      onClick={() => handleNext(index)}
                      disabled={activeSteps[index] === items.foodpostId.foodpostimg.length - 1}

                    >
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
            </Grid> */}

            {/* Caterning details */}
            <Grid item xs={12} md={3}>
              <Item style={{ width: '100%' }}>
                <h4>FOOD DETAILS</h4>

                <h4>Food quandity:{items.foodpostId ? items.foodpostId.quandity : 'N/A'}</h4>
                <h4>location:{items.foodpostId ?items.foodpostId.location : 'N/A'}</h4>
                <h4>description:{items.foodpostId ? items.foodpostId.description : 'N/A'}</h4>
              </Item>
            </Grid>

            <Grid item xs={12} md={3} mr={1} ml={3}>

              {/* Caterning image */}

              <img src={`${port}/api/image/${items.ngoId ? items.ngoId.nphoto : 'N/A'}`} alt="" srcset="" style={{ objectFit: 'cover', height: '300px', width: '100%', borderRadius: "20px", border: "2px solid blue" }} />

            </Grid>

            <Grid item xs={12} md={2}>
              <Item style={{ width: '100%' }}>
                <h4>NGO DETAILS</h4>
                {/* <h4>Name: {items.catId.name}</h4> */}
                {/* <h4>Address: New Caterning</h4> */}
                <h4>NGO name: {items.ngoId ? items.ngoId.name : 'N/A'}</h4>
                <h4>email:{items.ngoId ? items.ngoId.email : 'N/A'}</h4>
                <h4>location:{items.ngoId ? items.ngoId.location : 'N/A'}</h4>
              </Item>
            </Grid>

            <Grid item xs={12} md={3} ml={4} sx={{ justifyContent: 'center', textAlign: "center", margin: "auto", height: "100px" }}>
              <div elevation={10} sx={{ height: '150px', display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", margin: "auto" }}>

                {items.request == "accept" ? (

                  <Button fullWidth sx={{ mt: 2 }} onClick={() => handleCancle(items._id)}>Cancle </Button>

                ) : (

                  <>
                    <Button fullWidth onClick={() => handleAccept(items._id)}>ACCEEPT</Button>

                    <Button
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handleReject(items._id)}
                    >
                      REJECT
                    </Button>

                  </>

                )}

       

              </div>
            </Grid>

          </Grid>
        ))}
      </Box>
     
    </div >
  )
}
