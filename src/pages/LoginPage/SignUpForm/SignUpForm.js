import React, { useState } from 'react';
import './SignUpForm.scss'
import { Form, TextInput} from 'carbon-components-react';
// import { ArrowRight32 } from '@carbon/icons-react';
import { useHistory } from 'react-router';
import { FetchRequest } from '../../../assets/ApiInterceptor';
import { HttpStatus } from '../../../utils';
import { ToasterApi } from '../../../components/Toaster';

export default function SignUpPage() {
let history=useHistory()

const form={
         links:{
             forgot_id:"https://www.ibm.com/ibmid/myibm/help/us/helpdesk.html",
             forgot_password:"https://w3.ibm.com/profile/update/password/en-us/index.html",
             loginSuccess:"/landing"
         },
         regex:{
             username:"([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([.])([a-zA-Z]+)",
            password:"(.*).{8,}"

         }
    }

const [isValidPassword,setValidPassword]=useState(true)
const [isValidUsername,setValidUsername]=useState(true)
const [isLoading,setLoading]=useState(false) 
const [username,setUserName]=useState("")
const [password,setPassword]=useState("")
const [isRememberChecked,setRememberCheck]=useState(false)


const rememberMeOnChange=(e)=>{
    setRememberCheck(!isRememberChecked)
}

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
     FetchRequest.Post('/accounts:signUp?key='+process.env.REACT_APP_FIREBASE_WEB_API_KEY,{email:username,password:password})
    .then(response=>({body:response.text(),status:response.status}))
    .then(response=>{
      if(response.status===HttpStatus.OK.status){
          ToasterApi.success('Successfully Registered the User')
          response.body.then(history.push("/login"))
      }
      else{
         response.body.then(message=>{ToasterApi.error(message)})
      }
      setLoading(false)
    })
    .catch((e)=>{ToasterApi.error(String(e));setLoading(false);})
    
   }
}

    return (
        <div id="login-form-div">
        <Form  method="none" id="login" onSubmit={(e)=>{e.preventDefault();formActionSubmit(e);}} >
            <div className="form-element-container-1">
            <h1 className="login-form-header-h1">Sign up with your <span className="w3-h1">w3<b className="bold-blue1">id</b></span></h1>
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
                invalidText={"Password Entered must be 8 char long"}
            />
            </div>
            
        </Form>
        </div>
        
    )

}