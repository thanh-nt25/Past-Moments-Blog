import React, { useState, useEffect } from 'react';
import { Container,  Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


import { getPosts } from '../../actions/posts';
import  Pagination  from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();  
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const classes = useStyles();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            // search post
        }
    }

    return (
        <Grow in>
        <Container maxWidth="xl"> 
            {/*justyfied the container*/}
            <Grid  container  justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                    <TextField name="search" variant="outlined" label="Search Moments" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                </AppBar>
                    <Form currentId ={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6}>
                        <Pagination />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    
    );
};



export default Home;