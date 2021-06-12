import React, { lazy, Suspense, useState, useEffect} from 'react';
import Header from '../components/Header'
import Progress from '../components/Progress';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})

const history = createBrowserHistory();

const MarketingLazy = lazy(() => import('../components/MarketingApp'))
const AuthLazy = lazy(() => import('../components/AuthApp'))
const DashboardLazy = lazy(() => import('../components/DashboardApp'))

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if(isSignedIn){
            history.push('/dashboard');
        }
    }, [isSignedIn])
    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn = {() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/dashboard'>
                                { !isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        </StylesProvider>
    )
}