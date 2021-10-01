
import auth from "../ProtectedRoute/auth"


const serviceProxyUrl=process.env.REACT_APP_SERVICE_PROXY
console.log(serviceProxyUrl);

const globalHeaders={
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

const globalAuthHeaders={
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'authorization':'Bearer '+auth.getJwt()
  }  


const Post =async (url,body)=>{
    return await fetch(serviceProxyUrl + url, {
    method: 'POST',
    headers: globalHeaders,
    body: JSON.stringify(body)
    })
   
}

const AuthPost =async (url,body)=>{
  return await fetch(serviceProxyUrl + url, {
  method: 'POST',
  headers: globalAuthHeaders,
  body: JSON.stringify(body)
  })
 
}

const AuthDelete =async (url,body)=>{
  return await fetch(serviceProxyUrl + url, {
  method: 'DELETE',
  headers: globalAuthHeaders,
  body: JSON.stringify(body)
  })
 
}

const Get = async (url,params)=>{
    return await fetch(serviceProxyUrl + url+"?"+new URLSearchParams(params), {
    method: 'GET',
    headers: globalHeaders
  })}

const AuthGet  = async (url,params)=>{
  return await fetch(serviceProxyUrl + url+"?"+new URLSearchParams(params), {
  method: 'GET',
  headers: globalAuthHeaders
})}



const FetchRequest={
    Post,Get,AuthPost,AuthGet,AuthDelete
} 


export default FetchRequest