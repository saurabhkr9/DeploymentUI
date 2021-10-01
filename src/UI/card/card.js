import './card.scss';
const Card = (props) => {
     
    return <>
    <div className="cardContainer" onClick={props.onClick} >
             <div className="cardContent">
                  <h2>{props.title}</h2>
             </div>
       </div>
       {/* <h3>{props.description}</h3> */}
</>
}

export default Card;