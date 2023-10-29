import React  from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile')); // phai nghien cuu ca browser

    return (
    <GoogleOAuthProvider clientId="217361591682-116gfjjh8j7uqbegc472dk1ds6aiifau.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxidth = "xl">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
            </Container>
        </BrowserRouter>
     </GoogleOAuthProvider>

    );
};

export default App;