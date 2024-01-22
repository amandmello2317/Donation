import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import { port } from "../../../../src/Gobal"



export default function ViewPost() {

  const [data, setData] = useState()

  const ngodetails = JSON.parse(localStorage.getItem('ngo_id'))
  console.log(ngodetails.ngoid);
  const token = ngodetails.ngo_token

  const id = ngodetails.ngoid
  useEffect(() => {
    axios.get(`${port}/api/ngopost/postview/${id}`,{headers:{"auth-token": token}})
      .then((res) => {
        console.log(res.data);
        setData(res.data)

      }).catch((err) => {
        console.log("Error :" + err);
      })
  }, [])

  return (
    <>
      <Paper elevation={0} sx={{}}>
        <ImageList sx={{ width: '100%', height: '100%', gap: 16 }} cols={3} >
          {data?.map((item) =>
            item.ngopost.map((imageFilename, index) => (
              <ImageListItem key={index}>
                <img height="100%" width="100%"
                  src={`${port}/api/image/${imageFilename}`}
                  alt={imageFilename}
                  loading="lazy"
                />
              </ImageListItem>
            ))
          )}
        </ImageList>
      </Paper>
    </>







  );
}


