import React, { useEffect, useState } from 'react'
import './upload.css'
import { port } from "../../../../src/Gobal"
import axios from 'axios';

export default function UploadPost() {

  const [selectedImages, setSelectedImages] = useState([])
  const [finalImages, setFinalImages] = useState([])
  const [UpdatedImages, setUpdatedImages] = useState([])
  const [post, setPost] = useState([])
  const [Count, setCount] = useState(true)



  const ngodetails = JSON.parse(localStorage.getItem('ngo_id'))
  console.log(ngodetails.ngoid);

  const id = ngodetails.ngoid
  const token = ngodetails.ngo_token
console.log(token);


  useEffect(() => {
    console.log(selectedImages);
    const filenames = selectedImages.map((image) => image.filename);
    setPost(filenames);
  }, [selectedImages,finalImages])
  console.log(selectedImages);
  console.log(post, 10);


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
    console.log(e.target.files,1000);
    setCount(!Count)
  }

const deleteImage = (img,index)=>{
  // console.log(finalImages)
  console.log(img,'img')
  // console.log(index,'img')
  let filtered=selectedImages.filter((e) => e !== img)
  
  console.log(filtered)
  setSelectedImages(filtered)

  let filteredFinal=finalImages.filter((e) => e.name != img.filename)
  console.log(filteredFinal)
  setFinalImages(filteredFinal)
  setCount(!Count)
}

useEffect(()=>{
  setUpdatedImages(finalImages)
  alert(123)
},[Count])

  const handleSubmit = () => {
    console.log(UpdatedImages)
    console.log(post[0], 10);

    const formData = new FormData();
    UpdatedImages.map((item)=>{
      formData.append('ngopost', item);
    })
  
    axios.post(`${port}/api/ngopost/ngopostinsert/${id}`, formData, {headers:{"auth-token": token}})
      .then((res) => {
        console.log("Inserted Info :" + res.data);
        alert("Uploaded")
        // navigate("/view")
      })
      .catch((err) => {
        console.log("Error :" + err.response);
      })
  }

  return (
    <section className='section'>
      <label className='label'> +  Add Imagse
        <br />
        <span>up to 10 images</span>
        <input className='inputFile' type="file" name='ngopost' onChange={onSelectFile} multiple />

      </label>

      <br />

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
            <div key={index} className='view-images'>
              <img style={{ padding: 0, margin: 0 }} src={img.imgurl} alt="" height="200" width="200" />
              <button onClick={()=>deleteImage(img,index)}>
                delete image
              </button>
              <p>{index + 1}</p>
            </div>
          )
        })}
      </div>

    </section>
  )
}
