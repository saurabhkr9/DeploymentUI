import  React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import {useSelector, useDispatch} from 'react-redux'
import { Accordion, AccordionItem } from 'carbon-components-react';
import {uiAction} from '../../../redux/reducers/ui-slice';
import { projectAction } from '../../../redux/reducers/project-slice';
import Card from '../../../UI/card'
import {fetchProjectData} from '../../../redux/actions/projectAction'
import {fetchTaskData} from '../../../redux/actions/taskActions';
import './WelcomeContent.scss';

let isInitial = true;

const WelcomeContent = (props) => {
    let history=useHistory()
    const dispatch = useDispatch();

    const {totalProjects, projects} = useSelector(state => state.project)
    const itemTitle = "Current Projects: "+totalProjects 

   useEffect(()=>{
    if(isInitial){
      dispatch(fetchProjectData());
      isInitial = false;
      return;
    }
    dispatch(projectAction.updateProject({totalProjects, projects}))
  },[projects, totalProjects, dispatch])

    const handleCardClick = (title) => {
        dispatch(uiAction.changeTitle("Welcome to "+title));
        dispatch(fetchTaskData(title));
        history.push("/dashboard")
    }

    const projectCards = projects.map(project => (<div className="bx--col taskCard">
    <Card key={project.id} title={project.title} owner={project.owner} endDate={project.endDate} onClick={()=>handleCardClick(project.title)} />
    </div>))
  
      return (
      <Accordion align="start">
      <AccordionItem open={true} title="Tasks Due Soon" className="AccordionItem">
          <p>No tasks due in the next five days</p>
          </AccordionItem>
      <AccordionItem title={itemTitle} className="AccordionItem">
          {projectCards}
      </AccordionItem>
     </Accordion>
    );
}

    
  export default WelcomeContent;