import  React from 'react'
import { useHistory } from 'react-router';
import {useSelector, useDispatch} from 'react-redux'
import { Accordion, AccordionItem } from 'carbon-components-react';
import {uiAction} from '../../../redux/reducers/ui-slice';
import Card from '../../../UI/card'
import './WelcomeContent.scss';

const WelcomeContent = () => {
    let history=useHistory()
    const tasks = useSelector(state => state.task.tasks)
    const dispatch = useDispatch();

    const handleCardClick = (title) => {
        dispatch(uiAction.changeTitle("Welcome to "+title));
        history.push("/dashboard")
    }

    const taskCards = tasks.map(task => (<div className="bx--col taskCard">
    <Card key={task.title} title={task.title} description={task.des} onClick={()=>handleCardClick(task.title)} />
    </div>))
  
      return (
      <Accordion align="start">
      <AccordionItem open={true} title="Tasks Due Soon" className="AccordionItem">
          <p>No tasks due in the next five days</p>
          </AccordionItem>
      <AccordionItem title="Recent Projects" className="AccordionItem">
          {taskCards}
          <div className="bx--col taskCard">
        <Card key="1"  title="New +" />
            </div>
      </AccordionItem>
     </Accordion>
    );
}

    
  export default WelcomeContent;