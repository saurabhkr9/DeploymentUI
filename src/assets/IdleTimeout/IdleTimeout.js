
import SecureStore from "../../SecureStore";
import { useEffect } from "react";
import { ToasterApi } from "../../components/Toaster";
import { Auth } from "../ProtectedRoute";

const lastActiveTimestampKey='lastActiveTimestamp'


const IdleTimeout=({timeout,onTimeoutRedirect,children})=>{
useEffect(() => {
    let idleTimer=()=>{
        let lastActiveLog;
        let t;
        setInterval(function onScreenReponseEvent(){
         window.onmousemove = resetTimer; 
         window.onmousedown = resetTimer; 
         window.onclick = resetTimer;     
         window.onscroll = resetTimer;    
         window.onkeypress = resetTimer;} ,2000)

        function logout() {
            if("/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1)  !== onTimeoutRedirect){
                ToasterApi.warn("Logging off due to Inactivity!")
                setTimeout(function() {
                    Auth.logout(()=>{window.location.href = onTimeoutRedirect});
                }, 2500);
            }
        }
       function resetTimer() {
           try{
            lastActiveLog=new Date(JSON.parse(SecureStore.getItem(lastActiveTimestampKey)));
            if((new Date()-lastActiveLog)>timeout && SecureStore.getItem(lastActiveTimestampKey)!==null){logout()}
            SecureStore.setItem(lastActiveTimestampKey,JSON.stringify(new Date()));   
            clearTimeout(t);
            t = setTimeout(logout,timeout);  
            }catch(e){
             logout()
            }
        }
    }
    idleTimer()
})

    return (
        <>
       {children}
       </>
           );
    
}



export default IdleTimeout