import React, { useEffect } from 'react'
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "views/Login";
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Signup from "views/Signup";
import Dashboard from 'views/Dashboard';

const App = () => {
    let history = useHistory();
    return (
        <BackgroundColorWrapper>
            <BrowserRouter>
                <Switch>

                    <Route
                        exact
                        path="/"
                        render={props => localStorage.getItem('email') ? (<AdminLayout {...props} />) : (<Login {...props} />)}
                    />
                    <Route path="/signup">
                        <Signup />
                    </Route>

                    <Route path="/" render={(props) => <AdminLayout {...props} />} />


                    {/* <Redirect from="/" to="/login" /> */}
                </Switch>
            </BrowserRouter>
        </BackgroundColorWrapper>
    )
}

export default App