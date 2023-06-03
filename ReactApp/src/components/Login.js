import React, { useState } from 'react';
import { Button, TextField, Typography } from "@mui/material";
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';


function Login(props) {

    const [model, setModel] = useState();

    const signIn = ()=>{}

    return (
        <>
            <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Box>
                    <Typography variant="h3">Login</Typography>
                    <Box className="p-2">
                        <TextField
                            onChange={(e) => setModel({ ...model, email: e.target.value })}
                            variant="standard"
                            label="Email"
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
                        <Button onClick={signIn} variant="contained">
                            Login
                        </Button>
                        <Link to='../sign-up'>
                            <Button variant="contained" className='ms-2'>
                          Sign up
                        </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Login;