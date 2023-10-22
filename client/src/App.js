import React  from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => (
    <GoogleOAuthProvider clientId="217361591682-116gfjjh8j7uqbegc472dk1ds6aiifau.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxidth = "lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    </GoogleOAuthProvider>
)

export default App;