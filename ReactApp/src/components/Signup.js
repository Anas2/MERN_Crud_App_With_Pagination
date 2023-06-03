import React, { useState } from 'react';
import { Button, TextField, Typography } from "@mui/material";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
// import CRSelect from './CRSelect';

function Signup(props) {

    const [model, setModel] = useState();
  

    const registerUsers = () =>{
        
    }

    // const type = [
    //     'User',
    //     'Transpoter'
    // ]

    return (
        <>
            <Box
                sx={{ height: "100vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Box>
                    <Typography variant="h3">Sign up</Typography>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, fName: e.target.value })}
                            variant="standard"
                            label="First name"
                        />
                    </Box>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, lName: e.target.value })}
                            variant="standard"
                            label="Last name"
                        />
                    </Box>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, email: e.target.value })}
                            variant="standard"
                            label="Email"
                            type='email'
                        />
                    </Box>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, phone: e.target.value })}
                            variant="standard"
                            label="Phone"
                        />
                    </Box>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, password: e.target.value })}
                            variant="standard"
                            label="Password"
                            type="password"
                        />
                    </Box>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, cpassword: e.target.value })}
                            variant="standard"
                            label="Confirm Password"
                            type="password"
                        />
                    </Box>
                    {/* <Box className="p-2">
                        <CRSelect label="Type" variant="standard" func={(e) => setModel({ ...model, type: e.target.value })} arr={type} />
                    </Box> */}
                    <br/>
                    <Box className="p-2">
                        <Button onClick={registerUsers} variant="contained">
                            Sign up
                        </Button>
                        <Link to='/'>
                            <Button variant="contained" className='ms-2'>
                                Login
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Signup;