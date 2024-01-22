import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Badge, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { port } from '../../../Gobal';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RequestedFood() {
  const theme = useTheme();
  const [data, setData] = useState()
  const [activeSteps, setActiveSteps] = useState([]);

  const ngodetails = JSON.parse(localStorage.getItem('ngo_id'))
  console.log(ngodetails.ngoid);
  const ngoid = ngodetails.ngoid
  console.log(ngoid);
  const token = ngodetails.ngo_token


  useEffect(() => {
    axios.get(`${port}/api/foodrequest/ngoviewrequest/${ngoid}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        setData(res.data)
        // Initialize active steps for each item to 0
        setActiveSteps(Array(res.data.length).fill(0));

      }).catch((err) => {
        console.log("Error :" + err);
      })
  }, [])




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

  const handleRequest = (postId) => {
    // const ngoId = ngoid
    // console.log(ngoId);
    // const foodpostId = postId
    // console.log(foodpostId);

    // axios.post(`${port}/api/foodrequest/requestfood/${ngoId}/${foodpostId}`)
    //   .then((res) => {
    //     console.log("Inserted Info :" + res.data);
    //     // setSelection("viewfood")
    //     alert('Reqest send')
    //   })
    //   .catch((err) => {
    //     console.log("Error :" + err.response);
    //   })


  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>

        <div style={{ textAlign: "center" }}>
          <h2 style={{color:"red"}}>All REQUEST </h2>
        </div>


        {data?.map((items, index) => (



          <Grid container spacing={2} style={{ margin: '10px 2px', border: '5px solid black', height: '100%', maxWidth: "100%", position: 'relative' }}>

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

            {/* Food images */}
            {/* <Grid item xs={12} md={5}>
              <Box sx={{ flexGrow: 1 }}>
                <img
                  // src={images[activeStep].imgPath}
                  src={`${port}/api/image/${items.foodpostId.foodpostimg[activeSteps[index]]}`}
                  alt={`Food Image ${activeSteps[index] + 1}`}
                  style={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
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
                      disabled={activeSteps[index] === items.foodpostId.foodpostimg.length - 1}>
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
            <Grid item xs={12} md={4} >
              <Item elevation={0} style={{ width: '100%', minHeight:"210px" }}>
                <h2>Caterning Details</h2>
                <h4>Name: {items.catId.name}</h4>
                {/* <h4>Address: New Caterning</h4> */}
                <h4>Food email:{items.catId.email}</h4>
                <h4>location:{items.catId.location}</h4>


              </Item>
            </Grid>
            <Grid item xs={12} md={4} >
              <Item elevation={0} style={{ width: '100%',minHeight:"210px"  }}>
                <h3>FOOD DETAILS</h3>
                <h4>foodtype: {items.foodpostId ? items.foodpostId.foodtype : 'N/A'}</h4>
                {/* <h4>Address: New Caterning</h4> */}
                <h4>Food quandity:{items.foodpostId ? items.foodpostId.quandity : 'N/A'}</h4>
                <h4>location:{items.foodpostId ? items.foodpostId.location : 'N/A'}</h4>
                <h4>description:{items.foodpostId ? items.foodpostId.description: 'N/A'}</h4>

              </Item>
            </Grid>

            <Grid item xs={12} md={2} sx={{ margin: "auto" }}  >
              <Item elevation={0}>

                {items.request == 'accept' ? (
                  <Button variant="contained" color="success">
                    Accepted
                  </Button>
                ) : (
                  <Button variant="contained" color="error">
                    Pending
                  </Button>
                )}

              </Item>
            </Grid>

          </Grid>


        ))}
      </Box>

    </div>
  )
}
