import React  from 'react';
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Moments from './images/memories.png';

const App = () => {
    return(
        // center everything
        <Container maxidth = "lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center"> Past Moments </Typography>
                <img src = {Moments} alt = "Past moments" height="60" />
            </AppBar>
        </Container>
    );
}

export default App;