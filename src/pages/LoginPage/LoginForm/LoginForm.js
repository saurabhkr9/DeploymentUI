import React, { useState, useEffect } from 'react';
import './LoginForm.scss'
import { useDispatch } from 'react-redux';
import { Form, Button, TextInput, Link,Loading } from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import { useHistory } from 'react-router';
import { FetchRequest } from '../../../assets/ApiInterceptor';
import { HttpStatus } from '../../../utils';
import { ToasterApi } from '../../../components/Toaster';
import { Auth } from '../../../assets/ProtectedRoute';
import { uiAction } from '../../../redux/reducers/ui-slice'

export default function LoginPage() {
let history=useHistory()
let dispatch = useDispatch();
const form={
         links:{
             forgot_id:"https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html",
             forgot_password:"https://w3.ibm.com/profile/update/password/en-us/index.html",
             loginSuccess:"/home"
         },
         regex:{
            username:"([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([.])([a-zA-Z]+)",
            password:"(.*).{8,}"
         }
    }

const [isValidPassword,setValidPassword]=useState(true)
const [isValidUsername,setValidUsername]=useState(true)
const [isLoading,setLoading]=useState(false) 
const [username,setUserName]=useState()
const [password,setPassword]=useState()



const onUsernameChange=(e)=>{
   setUserName(e.target.value) 
   setValidUsername(Boolean(e.target.value.match(form.regex.username)))

}
const onPasswordChange=(e)=>{
    setPassword(e.target.value)
   setValidPassword(Boolean(e.target.value.match(form.regex.password)))
}

const formActionSubmit=(e)=>{
 
    
if(isValidUsername && isValidPassword){
     setLoading(true)
     FetchRequest.Post('/accounts:signInWithPassword?key='+process.env.REACT_APP_FIREBASE_WEB_API_KEY,{email:username,password:password,returnSecureToken:true})
    .then(response=>({body:response.text(),status:response.status}))
    .then(response=>{
      if(response.status===HttpStatus.OK.status){
          response.body.then(body=>{Auth.login(()=>history.push('/home'),body.idToken);
          dispatch(uiAction.setIsAuthenticated(true));
        })
          ToasterApi.success('Successfully Authenticated')
      }
      else{
         response.body.then(error=>{
             ToasterApi.info(error.message)
            })
      }
      setLoading(false)
    })
    .catch((e)=>{
        console.log(e);
        ToasterApi.error(e.message);setLoading(false);
    })
   }
}

useEffect(() => {
    if(Auth.isAuthenticated()) {
      ToasterApi.success('User is already Authenticated!')
      history.push('/home');
    }
  },[history])

    return (
        <div id="login-form-div">
        <Form  method="none" id="login" onSubmit={(e)=>{e.preventDefault();formActionSubmit(e);}} >
            <div className="form-element-container">
            <h1 className="login-form-header-h1">Sign in with your <span className="w3-h1">w3<b className="bold-blue1">id</b></span></h1>
            <hr className="login-form-hr" />
            </div>
            <div className="form-element-container">
            <TextInput
                id="username"
                name="username"
                defaultValue={username}
                helperText="Please enter username"
                placeholder="Your IBM email address"
                onChange={onUsernameChange}
                required
                invalid={!isValidUsername}
                invalidText={"Username entered is not valid"}
            />
            </div>
            <div className="form-element-container">
            <TextInput.PasswordInput
                helperText="Please enter password"
                hidePasswordLabel="Hide password"
                id="password"
                name="password"
                defaultValue={password}
                placeholder="Your IBM Account Password"
                showPasswordLabel="Show password"
                onChange={onPasswordChange}
                required
                invalid={!isValidPassword}
                invalidText={"Password Entered is in Incorrect format"}
            />
            <div className="forgot-items"><Link size='sm' target="blank" href={form.links.forgot_password}>Forgot Password?</Link></div>
            </div>
            <div className="form-element-container">
                <span style={{pointerEvents:isLoading?'none':'all'}}><Button renderIcon={isLoading?null:ArrowRight32} kind="primary" tabIndex={0} type="submit" >
                {isLoading?'Logging...':'Continue'}{isLoading?<Loading style={{marginLeft:'8px'}} small withOverlay={false}/>:null}
                </Button></span>
            </div>
        </Form>
        </div>
        
    )

}