import React from 'react';
import Banner from '../../components/Banner';
import TaskContainer from '../../UI/TaskContainer'
import './Dashboard.scss';
const Dashboard = () => {


    return(
        <div className="bx--grid bx--grid--full-width">
        <div>
            <Banner />
        </div>
        <div class="bx--row taskContainerRow">
        <div class="bx--col taskContainerCol">
        <TaskContainer title="TO DO" />
        </div>
    <div class="bx--col taskContainerCol">
    <TaskContainer title="In Progress" />
    </div>
    <div class="bx--col taskContainerCol">
    <TaskContainer title="Pending" />
    </div>
    <div class="bx--col taskContainerCol">
    <TaskContainer title="Done" />
    </div>
        </div>
        </div>
        
    )
}

export default Dashboard;