import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import jwt_decode from 'jwt-decode';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword(!showPassword);


    // const isSignup = true;
    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isSignup) {
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => setFormData({ ...formData , [e.target.name]: e.target.value });

    const googleSuccess = async (credentialResponse) => {
        const result = jwt_decode(credentialResponse.credential); 
        console.log(result);
        const token = credentialResponse.credential;
            try{
                dispatch({type: 'AUTH', data: { result, token }});

                history.push('/');
            } catch(error){
                console.log(error);
            }

    };
    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try again!');
    };

  return (
    
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }                        
                    </Grid>
                    {/*Button Sign in/up */}
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    {/*basic sign in*/}
                    <GoogleLogin 
                        onSuccess={googleSuccess}
                        onError={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    {/* <Button className={classes.googleButton} color="primary" fullWidth onClick={() => login()}  startIcon={<Icon />} variant="contained">
                        Google Sign In
                    </Button>  */}
                    <div id="buttonDiv"></div>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
  )
}

export default Auth
