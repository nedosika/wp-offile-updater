import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {NavLink, useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Copyright from "../../components/Copyright";

import {useMutation} from "@apollo/client";
import {SIGN_IN} from "../../apollo/mutations";

export default function SignIn() {
    const [signIn, {loading}] = useMutation(SIGN_IN, {
        refetchQueries: ['refreshToken']
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        signIn({
            variables: {
                email: data.get("email"),
                password: data.get("password")
            }
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="client/src/pages/SignIn/SignIn#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <NavLink to="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}