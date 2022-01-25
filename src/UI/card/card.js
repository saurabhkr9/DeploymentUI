import './card.scss';
const Card = (props) => {
     
    return <>
    <div className="cardContainer" onClick={props.onClick} >
             <div className="cardContent">
                  {props.title && <span className="projectCardTitle">{props.title}</span>}
                  {props.owner && <span className="projectCardOwner">Owner: {props.owner}</span>}
                  {props.endDate && <span className="projectCardEndDate">End Date: {props.endDate}</span>}
                  {props.children}
             </div>
       </div>
      
</>
}

export default Card;