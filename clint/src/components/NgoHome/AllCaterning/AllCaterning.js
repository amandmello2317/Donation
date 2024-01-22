import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Badge, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { port } from '../../../Gobal';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AllCaterning() {
  const theme = useTheme();
  const [data, setData] = useState()
  const [activeSteps, setActiveSteps] = useState([]);
  const [count, setCount] = useState(false)

  const ngodetails = JSON.parse(localStorage.getItem('ngo_id'))
  console.log(ngodetails.ngoid);
  const ngoid = ngodetails.ngoid
  console.log(ngoid);
  const token = ngodetails.ngo_token
  console.log(token);


  useEffect(() => {
    axios.get(`${port}/api/foodpost/foodviewall`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        setData(res.data)
    
        // Initialize active steps for each item to 0
        setActiveSteps(Array(res.data.length).fill(0));

      }).catch((err) => {
        console.log("Error :" + err);
      })
  }, [count])





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
    const ngoId = ngoid
    console.log(ngoId);
    const foodpostId = postId
    console.log(foodpostId);

    axios.post(`${port}/api/foodrequest/requestfood/${ngoId}/${foodpostId}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log("Inserted Info :" + res.data);
        // setSelection("viewfood")
        // alert('Reqest send')
      })
      .catch((err) => {
        console.log("Error :" + err.response);
      })

    axios.put(`${port}/api/foodpost/createrequest/${foodpostId}/${ngoId}`, {headers:{"auth-token": token}})
      .then((res) => {
        console.log("Inserted Info :" + res.data);
        // setSelection("viewfood")
        alert('Reqest send')
        setCount(!count)
      })
      .catch((err) => {
        console.log("Error :" + err.response);
      })


  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>

        <div style={{ textAlign: "center" }}>
          <h2 style={{color:"violet "}}>FOOD AVAILABLE  </h2>
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
              <img src={`${port}/api/image/${items.catId.cphoto}`} alt="" srcset="" style={{ objectFit: 'cover', height: '300px', width: '100%', borderRadius: "20px", border: "2px solid blue" }} />
              {/* Caterning image */}

            </Grid>

            {/* Food images */}
            <Grid item xs={12} md={5}>
              <Box sx={{ flexGrow: 1 }}>
                <img
                  // src={images[activeStep].imgPath}
                  src={`${port}/api/image/${items.foodpostimg[activeSteps[index]]}`}
                  alt={`Food Image ${activeSteps[index] + 1}`}
                  style={{
                    height: 255,
                    display: 'block',
                    maxWidth: 400,
                    overflow: 'hidden',
                    width: '100%',
                    borderRadius:"20px",
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
            <Grid item xs={12} md={3} >
              <Item style={{ width: '100%' }}>
                <h4>Name: {items.catId.name}</h4>
                {/* <h4>Address: New Caterning</h4> */}
                <h4>Food quandity:{items.quandity}</h4>
                <h4>location:{items.location}</h4>
                <h4>description:{items.description}</h4>
                {/* <h4>{items.requests}</h4> */}

                {items.requests.includes(ngoid) ? (
                    <Button fullWidth>Request sent</Button>

                  ) : (
                    <Button fullWidth onClick={() => handleRequest(items._id)}>Request</Button>

                  )
                
                } 


              </Item>
            </Grid>

          </Grid>


        ))}
      </Box>

    </div>
  )
}
