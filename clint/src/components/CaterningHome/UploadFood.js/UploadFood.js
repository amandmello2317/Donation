import { Paper, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { port } from '../../../Gobal';
import axios from 'axios';




const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function UploadFood({setSelection}) {
  const [selectedImages, setSelectedImages] = useState([])
  const [finalImages, setFinalImages] = useState([])
  const [UpdatedImages, setUpdatedImages] = useState([])
  const [post, setPost] = useState([])
  const [Count, setCount] = useState(true)
  const [details, setDetails] = useState([])

  const CaterningDetails = JSON.parse(localStorage.getItem('cat_id'))
  console.log(CaterningDetails.catid);
  const token = CaterningDetails.cat_token
  console.log(token);

  const id = CaterningDetails.catid



  useEffect(() => {
    console.log(selectedImages);
    const filenames = selectedImages.map((image) => image.filename);
    setPost(filenames);
  }, [selectedImages, finalImages])
  console.log(selectedImages);
  console.log(post, 10);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  }
  console.log(details);


  const onSelectFile = (e) => {

    const selectedFiles = e.target.files
    console.log(selectedFiles, 50);

    const selectedFilesArray = Array.from(selectedFiles)
    console.log(selectedFilesArray);
    setFinalImages(selectedFilesArray)

    const imagesArray = selectedFilesArray.map((file) => ({
      imgurl: URL.createObjectURL(file),
      
      filename: file.name,

    }));
    console.log({ imagesArray });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
    console.log(e.target.files, 1000);
    setCount(!Count)
    // setFinalImages()
    console.log(selectedImages);

  }

  const deleteImage = (img, index) => {
    // console.log(finalImages)
    console.log(img, 'img')
    // console.log(index,'img')
    let filtered = selectedImages.filter((e) => e !== img)

    console.log(filtered)
    setSelectedImages(filtered)

    let filteredFinal = finalImages.filter((e) => e.name != img.filename)
    console.log(filteredFinal)
    setFinalImages(filteredFinal)
    setCount(!Count)
  }


  useEffect(() => {
    setUpdatedImages(finalImages)

  }, [Count])

  const handleSubmit = () => {
    console.log(UpdatedImages)
    console.log(post[0], 10);

    const formData = new FormData();
    
    formData.append("foodtype", details.foodtype)
    formData.append("location", details.location)
    formData.append("quandity", details.quandity)
    formData.append("description", details.description)

    UpdatedImages.map((item)=>{
      formData.append('foodpost', item);
    })
  
    axios.post(`${port}/api/foodpost/foodpostinsert/${id}`, formData, {headers:{"auth-token": token}})
      .then((res) => {
        console.log("Inserted Info :" + res.data);
        setSelection("viewfood")
      })
      .catch((err) => {
        console.log("Error :" + err.response);
      })
  }


  return (
    <div>
      <Paper elevation={10} sx={{ width: '60%', margin: "10px auto", marginBottom: "10px", paddingBottom: "30px", height: "auto" }}>
        <div className="header">
          <h2>Food Details</h2>
        </div>
        <div className="details" style={{ margin: "10px 6px" }} >
          <Grid container spacing={2}>
            <Grid xs={6} md={6}>
              <TextField fullWidth
                placeholder='Food Type eg:-Veg NonVeg'
                label="Food type"
                name='foodtype'
                onChange={(e) => handleChange(e)}

              />
            </Grid>
            <Grid xs={6} md={6}>
              <TextField fullWidth
                placeholder='location'
                label='location'
                name='location'
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid xs={6} md={8}>
              <TextField
                sx={{ margin: 'auto 50px' }}
                id="filled-textarea"
                label="Quandity"
                placeholder="Quandity"
                multiline
                fullWidth
                name='quandity'
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid xs={6} md={8}>
              <TextField
                sx={{ margin: 'auto 50px' }}
                id="filled-textarea"
                label="Description"
                placeholder="Description"
                multiline
                fullWidth
                name='description'
                onChange={(e) => handleChange(e)}
              />
            </Grid>


          </Grid>
          <Grid container spacing={2}>
            <Grid xs={6} md={8} sx={{ margin: "auto", marginRight: "10px" }}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} onChange={onSelectFile} name='foodpost'>
                Upload file
                <VisuallyHiddenInput type="file" multiple />
              </Button>
            </Grid>
          </Grid>
        </div>
        {selectedImages.length > 0 && (selectedImages.length > 10 ? (<p> You cannot upload more than 10 images <br /> <span> please delete<b> {selectedImages.length - 10} of them{" "} </b></span>
        </p>
        ) : (
          <button
            className='upload-btn'
            onClick={() => handleSubmit()}
          >
            Uploaded {selectedImages.length} Images
            {selectedImages.length === 1 ? "" : "s"}

          </button>
        ))}


        <div className="upload-images">
          {selectedImages && selectedImages.map((img, index) => {
            return (
              <div className='view-images'>
                <img style={{ padding: 0, margin: 0 }} src={img.imgurl} alt="" height="200" width="200" />
                <button onClick={() => deleteImage(img, index)}>
                  delete image
                </button>
                <p>{index + 1}</p>
              </div>
            )
          })}
        </div>
      </Paper >
    </div >
  )
}
