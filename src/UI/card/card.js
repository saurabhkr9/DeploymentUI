import './card.scss';
const Card = (props) => {
     
    return <>
    <div className="cardContainer" onClick={props.onClick} >
             <div className="cardContent">
                  <span className="projectCardTitle">{props.title}</span>
                  <span className="projectCardOwner">Owner: {props.owner}</span>
                  <span className="projectCardEndDate">End Date: {props.endDate}</span>
             </div>
       </div>
</>
}

export default Card;