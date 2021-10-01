import './card.scss';
const Card = (props) => {

    return <div className="cardContainer">
             <div className="cardContent">
             <h1>{props.title}</h1>
              <h3>{props.description}</h3>
        </div>
  </div>
}

export default Card;