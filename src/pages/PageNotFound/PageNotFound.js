import './PageNotFound.scss'

import { JumpLink32 } from '@carbon/icons-react';
import { ProtectedLink } from '../../assets/ProtectedRoute';
export default function PageNotFound(props) {  
 
  
const jumplinks=[
   
    {
     title:'Go to Home',
     url:'/landing'
    },
    {
      title:'Visit Client Tagging',
      url:'/landing'
    },
    {
      title:'Visit Tagging Upload',
      url:'/landing'
    },
    {
      title:'Visit Tagging Download',
      url:'/landing'
    }

  ]

const JumpLinks=()=>{
  return (
    jumplinks.map(link=>(
      <p style={{'margin-left': '5rem'}}>
      <JumpLink32 />
      <ProtectedLink url={link.url}>
            <span className="jumplinks-txt">{link.title}</span>
      </ProtectedLink>
      </p>))
 )
}

return (


<div className="pnf-container">
<div className="four-zero-four">
   <span className="pnf-modal-header-primary">
        Something’s gone wrong...
   </span>
    <br />
    <span className="pnf-modal-header-secondary">
           Sorry, we can’t find the page you are looking for. Maybe some of these most visited links will help you?
    </span>
    <br />
    <div style={{'margin-top': '2rem'}}>
    <JumpLinks />
    </div>
    <div className="four-oh-four-txt">
      404
     </div> 
</div>
</div>
  
)


}