import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './Configuration.scss';
import { useLocation, useHistory } from 'react-router';
import {useDispatch} from 'react-redux';
import {uiAction} from '../../redux/reducers/ui-slice';
import { Tile, Link } from 'carbon-components-react';
import { CalendarTools20  ,NotificationFilled20, Product20,Tools20, TableOfContents20, UserActivity20,UserRole20  } from '@carbon/icons-react';
   
// import Banner from '../../components/Banner';
// import APIDetails from './APIDetails';
// import BusinessRule from './BusinessRule';
// import ClassifiersList from './ClassifiersList';
// import ClientInformation from './ClientInformation';
// import ElasticDetails from './ElasticDetails';
// import KafkaServiceDetails from './KafkaServiceDetails';
// import NLCInstancDetails from './NLCInstancDetails';
// import PushScript from './PushScript';
// import SnowDetails from './SnowDetails';
import ITSMTools from './ITSMTools';
import DoNotificationChannel from './DoNotificationChannel';
import ProjectModules from './ProjectModules';
import ToolMaster from './ToolMaster';
import Profiles from './Profiles';
import Menu from './Menu';
import Roles from './Roles';
// import WebhookDetails from './WebhookDetails';
// import ProgressIndicator from '../../components/ProgressIndicator';
const Configuration = (props) => {

  const { path } = useRouteMatch();

    let location = useLocation();
    let dispatch = useDispatch();
    let history = useHistory();
    
    if(location.pathname === '/config') {
      dispatch(uiAction.changeTitle("Configure the Master Data "));
    }

    return (
    <div className="bx--grid bx--grid--full-width">
      {
       location.pathname === '/config' &&
        <div className="bx--row configuration-page">
          <div className="bx--col info-container">
            <span className="config-title">Configuration Items</span>
            <p className="config-para">
              Here goes the discription of this page.
            </p>
          </div>

          <div className="bx--col config-tile">
            <Tile>
              <Link className="config-links"
                onClick={(e)=>{history.push(`${path}/itsmTools`);e.preventDefault()}}
                href=""><CalendarTools20 />  &nbsp; &nbsp; 
             ITSM Tools
              </Link> 
             <br />
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/do-notification-channels`);e.preventDefault()}}
             href="" ><NotificationFilled20 />  &nbsp; &nbsp; DO Notification Channels</Link>
             <br />
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/project-modules`);e.preventDefault()}}
             href="" ><Product20 />  &nbsp; &nbsp; Project Modules</Link>
             <br />
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/tool-master`);e.preventDefault()}}
              href="" ><Tools20 />  &nbsp; &nbsp; Tool Master</Link>
            </Tile>
             </div>
             <div className="bx--col config-tile">
            <Tile>
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/menu`);e.preventDefault()}}
             href="" ><TableOfContents20 />  &nbsp; &nbsp; Menu</Link>
             <br />
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/profiles`);e.preventDefault()}}
             href="" ><UserActivity20 />  &nbsp; &nbsp; Profiles</Link>
             <br />
             <Link className="config-links"
             onClick={(e)=>{history.push(`${path}/roles`);e.preventDefault()}}
             href=""
                    ><UserRole20 />  &nbsp; &nbsp; Roles </Link>
            </Tile>
      </div>
      </div>
      
      }

      <div className="bx--grid">
       <div className="bx--row">
       <Switch>
        <Route exact path={`${path}/config`}>
        {/* <ClientInformation /> */}
        </Route>
        <Route exact path={`${path}/itsmTools`}>
        <ITSMTools />
        </Route>
        <Route exact path={`${path}/do-notification-channels`}>
        <DoNotificationChannel />
        </Route>
        <Route exact path={`${path}/project-modules`}>
          <ProjectModules />
        </Route>
        <Route exact path={`${path}/tool-master`}>
          <ToolMaster />
        </Route>
        <Route exact path={`${path}/menu`}>
          <Menu />
        </Route>
        <Route exact path={`${path}/profiles`}>
          <Profiles />
        </Route>
        <Route exact path={`${path}/roles`}>
          <Roles />
        </Route>
      </Switch>
       
       </div>
      </div>
    </div>
    )
}

export default Configuration;