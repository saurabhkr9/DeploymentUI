import React from 'react';
import LoginPage from './pages/LoginPage';
import './App.scss';
import {Route, Switch} from 'react-router-dom'
import Fade from './assets/Animations/FadeAnimation';
import { ProtectedRoute } from './assets/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Configuration from './pages/Configuration';
import DataQualityCheck from './pages/DataQualityCheck';
import OnBoarding from './pages/OnBoarding'
import IdleTimeout from './assets/IdleTimeout';

  const App = (props) => {

        return (
          <div id='app-container' className='app-container-css'>
         
          <IdleTimeout timeout={process.env.REACT_APP_IDLE_TIMEOUT} onTimeoutRedirect="/login">
          <div id="app-root" className="active">
            <Fade show={true}>
                <Switch basename={props.basename}>
                    <Route exact path="/login" component={LoginPage} />  
                    <ProtectedRoute exact path="/home" component={HomePage} />
                    <ProtectedRoute path="/config" component={Configuration} />
                    <ProtectedRoute path="/onBoarding" component={OnBoarding} />
                    <ProtectedRoute path="/dataQualityCheck" component={DataQualityCheck} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/admin" component={Admin} />
                    <Route exact path="*" component={PageNotFound} />  
                </Switch>
            </Fade>  
          </div>
          </IdleTimeout>
          
          </div>
        )
     }

     export default App;