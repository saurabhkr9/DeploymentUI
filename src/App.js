import React,{ useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage';
import {Toaster} from './components/Toaster'
import './App.scss';
import {Route, Switch} from 'react-router-dom'
import Fade from './assets/Animations/FadeAnimation';
import { ProtectedRoute } from './assets/ProtectedRoute';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import IdleTimeout from './assets/IdleTimeout';
import {fetchTaskData, sendTaskData } from './redux/actions/taskActions'


let isInitial = true;

  const App = (props) => {

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task.tasks)

   useEffect(()=>{
    if(isInitial){
      dispatch(fetchTaskData());
      isInitial = false;
      return;
    }
    // dispatch(sendTaskData(tasks));
  },[tasks, dispatch])
        
        return (
          <div id='app-container' className='app-container-css'>
          <div className="toaster-container">
                 <Toaster />
          </div>
          <IdleTimeout timeout={process.env.REACT_APP_IDLE_TIMEOUT} onTimeoutRedirect="/logout">
          <div id="app-root" className="active">
            <Fade show={true}>
                <Switch basename={props.basename}>
                    <Route exact path="/login" component={LoginPage} />  
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="*" component={PageNotFound} />  
                </Switch>
            </Fade>  
          </div>
          </IdleTimeout>
          
          </div>
        )
     }

     export default App;