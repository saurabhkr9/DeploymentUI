import React from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../components/Banner';
import TaskContainer from '../../UI/TaskContainer'
import './Dashboard.scss';
const Dashboard = () => {

    const tasks = useSelector(state=> state.task.tasks)

    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inprogressTasks = tasks.filter(task => task.status ==='inprogress');
    const pendingTasks = tasks.filter(task => task.status ==='pending');
    const doneTasks = tasks.filter(task => task.status ==='done');


    return(
        <div className="bx--grid bx--grid--full-width">
        <div>
            <Banner />
        </div>
        <div class="bx--row taskContainerRow">
        <div class="bx--col taskContainerCol">
        <TaskContainer title="TO DO" tasks={todoTasks} />
        </div>
         <div class="bx--col taskContainerCol">
          <TaskContainer title="In Progress" tasks={inprogressTasks} />
         </div>
        <div class="bx--col taskContainerCol">
        <TaskContainer title="Pending" tasks={pendingTasks} />
        </div>
        <div class="bx--col taskContainerCol">
        <TaskContainer title="Done" tasks={doneTasks} />
        </div>
        </div>
        <div>
            
        </div>
        </div>
        
    )
}

export default Dashboard;