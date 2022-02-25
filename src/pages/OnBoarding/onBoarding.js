import React from 'react';
import './onBoarding.scss';
import Customer from './onBoardingForms/Customer';
import CustomerRequirment from './onBoardingForms/CustomerReq';
import Team from './onBoardingForms/Team';
const OnBoarding = (props) => {

    return(
        <div className="bx--grid bx--grid--full-width">
        <div className="bx--row customerContainer">
        <Customer />
        </div>
        <div className="bx--row teamContainer">
        <Team />
        </div>
        <div className="bx--row cusReqContainer">
        <CustomerRequirment />
        </div>
        </div>
    )
}

export default OnBoarding;