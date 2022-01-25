
import SecureStore from "../../SecureStore";

const isAuthenticatedKey='isAuthenticated'
const jwtBearerTokenKey='jwt'
const isAppAdminKey='isAdmin'
// const loggedInUserKey='loggedInUser'
// const loggedInUserNameKey='loggedInUserName'
// const jobResponsibilityKey='jobresponsib'
// const rolesKey='roles'
// const expireKey='tokenExpireTs'
// const cnumKey='cnum';

class Auth {
    constructor() {
      this.isAuthenticated=()=>{return SecureStore.getItem(isAuthenticatedKey)}
      this.jwtBearerToken=()=>{return SecureStore.getItem(jwtBearerTokenKey);}
      // this.isAdmin=()=>{return SecureStore.getItem(isAppAdminKey);}
    }
    initClaimsFromBearer=(token)=>{
      // const parseJwt = (token) => {
      //   try {
      //     return JSON.parse(atob(token.split('.')[1]));
      //   } catch (e) {
      //     console.log("UNABLE TO PARSE BEARER TOKEN")
      //   }
      // }
      
        // const payload=parseJwt(token)
        SecureStore.setItem(isAuthenticatedKey, true);
        SecureStore.setItem(jwtBearerTokenKey,token);
    }
    login(cb,token) {
      this.initClaimsFromBearer(token);
      cb();
    }
    logout() {
      SecureStore.setItem(isAuthenticatedKey, false);
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