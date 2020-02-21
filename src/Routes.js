import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Authenticator from './containers/HOC/Authenticator';

import { history } from './redux/store';
import {
    Admin,
    Home,
    Login,
    NotFound,
    States,
    Lgas,
    Areas,
    Streets,
    Incidences
} from './views';

const Routes = () => {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Authenticator(Admin)} />
                <Route exact path="/states" component={Authenticator(States)} />
                <Route exact path="/lgas" component={Authenticator(Lgas)} />
                <Route exact path="/areas" component={Authenticator(Areas)} />
                <Route
                    exact
                    path="/streets"
                    component={Authenticator(Streets)}
                />
                <Route
                    exact
                    path="/incidents"
                    component={Authenticator(Incidences)}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </ConnectedRouter>
    );
};

export default Routes;
