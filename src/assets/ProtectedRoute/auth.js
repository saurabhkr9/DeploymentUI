
import SecureStore from "../../SecureStore";

const isAuthenticatedKey='isAuthenticated'
const jwtBearerTokenKey='jwt'
const isAppAdminKey='isAdmin'
const loggedInUserKey='loggedInUser'
const loggedInUserNameKey='loggedInUserName'
const jobResponsibilityKey='jobresponsib'
const rolesKey='roles'
const expireKey='tokenExpireTs'
const cnumKey='cnum';

class Auth {
    constructor() {
      this.isAuthenticated=()=>{return SecureStore.getItem(isAuthenticatedKey)===true?true:false;}
      this.jwtBearerToken=()=>{return SecureStore.getItem(jwtBearerTokenKey);}
      this.isAdmin=()=>{return SecureStore.getItem(isAppAdminKey)===true?true:false }
    }
    initClaimsFromBearer=(token)=>{
      const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
          console.log("UNABLE TO PARSE BEARER TOKEN")
        }
      }
      
        const payload=parseJwt(token)
        SecureStore.setItem(isAuthenticatedKey, true);
        SecureStore.setItem(loggedInUserKey, payload.sub);
        SecureStore.setItem(loggedInUserNameKey, payload.USERNAME);
        SecureStore.setItem(jobResponsibilityKey, payload.JOBRESPONSIB);
        SecureStore.setItem(rolesKey, payload.ROLES);
        SecureStore.setItem(expireKey,payload.exp)
        SecureStore.setItem(jwtBearerTokenKey,token);
        SecureStore.setItem(cnumKey,payload.CNUM);
        SecureStore.setItem(isAppAdminKey,payload.ISADMIN);
    }
    login(cb,token) {
      this.initClaimsFromBearer(token)
      cb()
    }
    logout(cb) {
      SecureStore.setItem(isAuthenticatedKey, false);
      cb()
    }
    isAuthenticated() {
      return this.isAuthenticated();
    }
    setAuthenticated(bool){
      SecureStore.setItem(isAuthenticatedKey,bool)
    }
    getJwt(){
      return this.jwtBearerToken()
    }
    setJwt(bearerToken){
      SecureStore.setItem(jwtBearerTokenKey,bearerToken);
    }
    isAdmin(){
      return this.isAdmin()
    }
    setAdmin(){
      SecureStore.setItem(isAppAdminKey,true)
    }
    removeAdmin(){
      SecureStore.setItem(isAppAdminKey,false)
    }
    

  }
  
  export default new Auth();