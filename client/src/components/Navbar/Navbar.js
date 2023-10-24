import React, { useState, useEffect } from  'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import Moments from '../../images/memories.png';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    // const user = null;

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        history.push('/auth');

        setUser(null);
    };

    useEffect(() => {
        // check token exist
        const token = user?.token;

        if(token){
            const decodeToken = decode(token);

            if(decodeToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"> Moments </Typography> */}
        <Link to='/' className={classes.brandContainer}>
            <img src={memoriesText} alt="logo" height="45px" />
            <img className={classes.image} src = {Moments} alt = "Past moments" height="60px" />
        </Link>
        
    <Toolbar className={classes.toolbar}>
        {user?.result ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
    </Toolbar>
    </AppBar>

    );
};

export default Navbar;