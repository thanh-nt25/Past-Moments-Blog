import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import {GoogleLogin} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
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


    // function handleCredentialResponse(response) {
    //     console.log("Encoded JWT ID token: " + response.credential);
    // }

    // useEffect(() => {
    //     window.onload = () => {
    //         google.accounts.id.initialize({
    //             client_id: "217361591682-116gfjjh8j7uqbegc472dk1ds6aiifau.apps.googleusercontent.com",
    //             callback: handleCredentialResponse
    //         });
    //         google.accounts.id.renderButton(
    //             document.getElementById("buttonDiv"),
    //             { theme: "outline", size: "large" }  // customization attributes
    //         );
    
    //     }
    // }, []);

    // const login = useGoogleLogin({
    //     onSuccess: async (tokenResponse) => {
    //         // console.log(tokenResponse);

    //         // user infor
    //         const token = tokenResponse; // chi can dung cho viec thong bao dang nhap thanh cong
    //         const result = await axios
    //         .get('https://www.googleapis.com/oauth2/v3/userinfo', {
    //           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    //         })
    //         .then(res =>  res.data);

    //         try{
    //             dispatch({type: 'AUTH', data: { result, token }});

    //             history.push('/');
    //         } catch(error){
    //             console.log(error);
    //         }
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //         console.log('Sign In was unsuccess! Try again!');
    //     }
    // });
    
    const googleSuccess = async (credentialResponse) => {
        const result = jwt_decode(credentialResponse.credential); // => here is user profile
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

    // credential la day ma hoa thong tin nguoi dung, co the decode bang JWT
    //console.log("ID: " + responsePayload.sub);
    //  console.log('Full Name: ' + responsePayload.name);
    //  console.log('Given Name: ' + responsePayload.given_name);
    //  console.log('Family Name: ' + responsePayload.family_name);
    //  console.log("Image URL: " + responsePayload.picture);
    //  console.log("Email: " + responsePayload.email);
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
