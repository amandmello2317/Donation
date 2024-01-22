import React, { useEffect, useState } from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import AdminSideBar from './AdminSideBar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { port } from '../../Gobal';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import { CardContent, Grid } from '@mui/material';







const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function Adming() {
    const navigate = useNavigate()

    const aut = JSON.parse(localStorage.getItem('admin_id'))
    if (!aut) {
        navigate("/admin-login")
    }

    const [data, setData] = useState()
    const [count, setCount] = useState(false)
    const [direct, setDirect] = useState('home')
    const [totalNGOs, setTotalNGOs] = useState(0);
    const [totalCats, setTotalNCats] = useState(0);
    const [cat, setCat] = useState()
    const [totalPendingNGOs, setTotalPendingNGOs] = useState(0);
    const [totalAcceptedNGOs, setTotalAcceptedNGOs] = useState(0);
    console.log(direct);



    useEffect(() => {
        // NGO
        axios.get(`${port}/api/ngo/allngo`)
            .then((res) => {
                console.log(res.data);
                setData(res.data)
                setTotalNGOs(res.data.length);


                const pendingNGOs = res.data.filter(ngo => ngo.request === 'pending');
                setTotalPendingNGOs(pendingNGOs.length);

                const acceptedNGOs = res.data.filter(ngo => ngo.request === 'accept');
                setTotalAcceptedNGOs(acceptedNGOs.length);

            }).catch((err) => {
                console.log("Error :" + err);
            })


        // Caterning
        axios.get(`${port}/api/caterning/allcaterning`)
            .then((res) => {
                console.log(res.data);
                setCat(res.data)
                setTotalNCats(res.data.length);
            }).catch((err) => {
                console.log("Error :" + err);
            })
    }, [count])
    console.log(data);
    console.log(cat);

    // ACCEPT FRIEND REQUEST
    const handleAccept = (id) => {
        axios.put(`${port}/api/ngo/acceptngo/${id}`)
            .then((res) => {
                console.log(res.data);
                alert("Accepted Request")
                setCount(!count)

            }).catch((err) => {
                console.log("Error: " + err);
            })

    }
    // CANCLE ACCEPTED FRIEND REQUEST
    const handleCancle = (id) => {
        axios.put(`${port}/api/ngo/canclengo/${id}`)
            .then((res) => {
                console.log(res.data);
                alert("Cancle Accept")
                setCount(!count)

            }).catch((err) => {
                console.log("Error: " + err);
            })
    }
    // Rejecting 
    const handleReject = (id) => {
        axios.put(`${port}/api/ngo/rejectngo/${id}`)
            .then((res) => {
                console.log(res.data);
                alert("Cancle Accept")
                setCount(!count)

            }).catch((err) => {
                console.log("Error: " + err);
            })
    }

    return (
        <div style={{ display: "flex", marginTop: 80, textAlign: "center" }}>
            <AdminSideBar
                setDirect={setDirect}
            />

            <>
                {direct == 'ngo' ? (

                    <div >
                        <div style={{ textAlign: "center", backgroundColor: "#dcd6d6", marginLeft: "10px", marginTop: 0, padding: 0 }}>

                            <h2>NGO</h2>
                        </div>
                        <Box sx={{ width: "75vw" }}>

                            <TableContainer component={Paper} sx={{ marginTop: 0, marginLeft: 2 }}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>

                                        <TableRow>
                                            <StyledTableCell>NGO NAME</StyledTableCell>
                                            <StyledTableCell align="center">NGO ADDRESS</StyledTableCell>
                                            <StyledTableCell align="center">EMAIL</StyledTableCell>
                                            <StyledTableCell align="center">LOCATION</StyledTableCell>
                                            <StyledTableCell align="center">STATUS</StyledTableCell>
                                            <StyledTableCell align="center">ACTION</StyledTableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.map((e) => (

                                            <StyledTableRow >
                                                <StyledTableCell component="th" scope="row">
                                                    {e.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{e.location}</StyledTableCell>
                                                <StyledTableCell align="center">{e.email}</StyledTableCell>
                                                <StyledTableCell align="center">{e.district}</StyledTableCell>

                                                {e.request == 'pending' ? (
                                                    <StyledTableCell align="center" sx={{ color: "blue", textTransform: "uppercase" }}>{e.request}</StyledTableCell>

                                                ) : (e.request == 'accept') ? (
                                                    <StyledTableCell align="center" sx={{ color: "green", textTransform: "uppercase" }}>{e.request}</StyledTableCell>

                                                ) : (
                                                    <StyledTableCell align="centert" sx={{ color: "red", textTransform: "uppercase" }}>{e.request}</StyledTableCell>

                                                )}
                                                <StyledTableCell align="center">


                                                    <Stack direction="row" spacing={1}>
                                                        {e.request == "accept" ? (
                                                            <Button fullWidth sx={{ mt: 2 }} onClick={() => handleCancle(e._id)}>Cancle </Button>

                                                        ) : (e.request == 'reject') ? (
                                                            <Button variant="contained" color="error" sx={{ margingRight: "10px" }} >Rejected</Button>

                                                        ) : (
                                                            <>
                                                                <Button variant="contained" color="success" sx={{ margingRight: "10px" }} onClick={() => handleAccept(e._id)}>Accept</Button>
                                                                <Button variant="outlined" color="error" onClick={() => handleReject(e._id)}>
                                                                    Reject
                                                                </Button>
                                                            </>

                                                        )}


                                                    </Stack>
                                                </StyledTableCell>
                                            </StyledTableRow>

                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>
                    </div>
                ) : (

                    // <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", marginTop: "50px" }}>

                    //     <Card sx={{ mr: 4 }}>
                    //         <Paper elevation={1} sx={{ height: "200px", width: "200px" }}>
                    //             <h1>TOTAL NGO</h1>
                    //             <h1 style={{color:"blue"}}>{totalNGOs}</h1>
                    //             <h4 style={{color:"orange"}}>REQUEST PENDING:- {totalPendingNGOs}</h4>
                    //             <h4 style={{color:"green"}}>REQUEST ACCEPTED:- {totalAcceptedNGOs}</h4>
                    //         </Paper>
                    //     </Card>
                    //     <Card>
                    //         <Paper elevation={1} sx={{ height: "200px", width: "200px" }}>
                    //             <h2>
                    //                 TOTAL CATERING

                    //             </h2>
                    //             <h1>{totalCats}</h1>
                    //         </Paper>
                    //     </Card>

                    // </Box>

                    <Box mt={8} mx="auto" maxWidth={1200}>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={6}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant="h5" color="primary" gutterBottom>
                                        TOTAL NGO
                                    </Typography>
                                    <Typography variant="h3" color="textPrimary">
                                        {totalNGOs}
                                    </Typography>
                                    <Typography variant="subtitle1" color="error">
                                        REQUEST PENDING: {totalPendingNGOs}
                                    </Typography>
                                    <Typography variant="subtitle1" color="green">
                                        REQUEST ACCEPTED: {totalAcceptedNGOs}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Card raised>
                                <CardContent>
                                    <Typography variant="h5" color="primary" gutterBottom>
                                        TOTAL CATERING
                                    </Typography>
                                    <Typography variant="h3" color="textPrimary">
                                        {totalCats}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Add more cards as needed */}
                    </Grid>
                </Box>

              


                )}
            </>
        </div >
    )
}
