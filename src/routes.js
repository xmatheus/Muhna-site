import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/main';

import ForgotPassword from './pages/forgot_password';

import AuthDashBoard from './pages/dashboard/authDashboard';
import Dashboard from './pages/dashboard/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={() => <Main />}></Route>
            <Route
                exact
                path="/forgot_password"
                component={() => <ForgotPassword />}
            ></Route>
            <AuthDashBoard
                path="/dashboard"
                component={() => <Dashboard />}
            ></AuthDashBoard>
            <Route path="*" component={() => <h1>Page not found</h1>}></Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;
