import React from 'react'
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import Login from "views/Login";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";
import Signup from "views/Signup";
import { useHistory } from "react-router-dom";
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
                        render={props => <Login {...props} />}
                    />
                    {/* <Route
                        exact
                        path="/admin"
                        render={props => <AdminLayout {...props} />}
                    /> */}
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/" render={(props) => <AdminLayout {...props} />} />

                    {/* <Route path="/rtl" render={(props) => <RTLLayout {...props} />} /> */}
                    {/* <Redirect from="/" to="/login" /> */}
                </Switch>
            </BrowserRouter>
        </BackgroundColorWrapper>
    )
}

export default App