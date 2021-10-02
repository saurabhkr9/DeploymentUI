import React, { useState } from 'react';
import './LoginPage.scss'
import { Link } from 'carbon-components-react';
import login_banner from './resources/images/login_banner.png'
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm'
import { ConfirmModal } from '../../components/ModalBox';
export default function LoginPage(props) {
  

  const section = {
    about: {
      title: 'Do Deployment UI',
      body: 'This UI has been designed to provide Deployment team to keep track on the deployment process. It also provide an Indivisual team member to perform their tasks and update the status as Admin can handle the access of all team member, So the that Admin can track the overall deployment process very easily. This may support multiple client\'s delivary at a time, so we can rid-off the multiple documents and sheets.'
    },
    additional_links: {
      accessHub: 'https://ibm.idaccesshub.com/ECMv6/request/requestHome',
      help: 'https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html'
    },
    accessHubModal: {

      modalTitlePrimary: 'DO Deployment Ui AccessHub',
      primaryAction:'Request Access',
      modalTitleSecondary: 'This request will be submitted to the admin approval',
      modalBody: <div style={{ marginTop: '2rem' }}>
       <SignUpForm />
      </div>,
      modalAction: () => { console.log('submitted')}
    }
  }

  
  const [accessHubModal,showAccessHubModal]=useState(false)

  return (

    <div className="login-pg-container">
      <div className="banner-container"><img className="banner-css" alt="login float banner" src={login_banner} /></div>
      <div className="login-form-container">
            <LoginForm />
        <div className="signup-user-div">
          <Link href="" onClick={(e)=>{showAccessHubModal(true);e.preventDefault()}}>Need Access? Request Here</Link>
          <ConfirmModal open={accessHubModal} setOpen={showAccessHubModal} {...section.accessHubModal} />
        </div >
      </div >
      <div className="about-container">
        <span className="about-header">
          {section.about.title}
        </span>
        <hr style={{ width: '95%', justifyContent: 'center' }} />
        <span className="about-content">
          {section.about.body}
        </span>
      </div>
    </div >
  );
}
