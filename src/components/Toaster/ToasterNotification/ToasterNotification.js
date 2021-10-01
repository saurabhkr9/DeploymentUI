
import { ToastNotification } from "carbon-components-react"
import Fade from "../../../assets/Animations/FadeAnimation"
import './ToasterNotification.scss'
export default function ToasterNotification(props) {  
     let title
     let message=props.toast.message
     let kind=props.toast.type

    switch(props.type){
      case 'success': title = 'Success'; break;
      case 'info': title ='Information'; break;
      case 'error': title ='Error'; break;
      case 'warning':title ='Warning'; break;
      case 'warning-alt':title ='Warning Alert'; break;
      default :title = '';

    }
    
    return (  
      <Fade show={true}>
      
      <ToastNotification 
        kind={kind}
        caption="00:00:00 AM"
        iconDescription="Close"
        subtitle={<span>{message}</span>}
        title={title}
      />
      </Fade>
    );  
  }  


 