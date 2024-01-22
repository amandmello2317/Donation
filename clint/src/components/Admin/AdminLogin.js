import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { port } from "../../Gobal";
import { useNavigate } from "react-router-dom";



export default function AdminLogin({setLog}) {


    const [admin, setAdmin] = useState()

  const navigate = useNavigate()


    
  const notifyA = (msg) => {
    toast.error(msg, {
      pauseOnHover: false
    })
  }
  const notifyC = (msg) => {
    toast.info(msg, {
      pauseOnHover: false
    })
  }

  const notifyB = (msg) => {
    toast.success(msg)
  }

    const handleChange = (e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        if (!admin?.email && admin?.password) {
            notifyA("fill the details")
        }


        axios.post(`${port}/api/admin/adminlogin`, admin)
            .then((res) => {
                console.log(res.data);
                if (res.data.Adminsuccess == true) {
                    console.log(res.data);
                    // if (res.data.ngo) {
                    localStorage.setItem('admin_id', JSON.stringify({ "adminid": res.data.admin._id, "admin_token": res.data.token }))
                    console.log('success');
                    notifyB("Signed in Successful")
                    navigate("/admin")
                    setLog(true)
   
                 } else {
                    console.log(res.data);
                    console.log('Login fail');
                    notifyA(res.data)
                }
            })
            .catch((err) => {
                console.log('Error :' + err);
                notifyA(err)

            })

    }



    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 18,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Admin Login
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}

                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => handleSubmit()}
                    >
                        Login
                    </Button>

                </Box>
            </Box>
        </Container>
    );
}