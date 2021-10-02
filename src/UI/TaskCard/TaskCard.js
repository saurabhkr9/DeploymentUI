import './TaskCard.scss';
export const TaskCard = (props) => {
    return <>
    <div className="taskCardContainer" onClick={props.onClick} >
             <div className="taskCardContent">
             <div class="bx--row taskCard">
             <span className="taskCardTitle">{props.title}</span>
                  <span className="taskCardOwner">Owner: {props.owner}</span>
                  <span className="taskCardStatus">Status: {props.status}</span>
             </div>
             <div class="bx--row taskCard">
             <span className="taskCardStartDate">Start Date: {props.startDate}</span>
                  <span className="taskCardEndDate">End Date: {props.endDate}</span>
             </div> 
             </div>
       </div>
</>
}