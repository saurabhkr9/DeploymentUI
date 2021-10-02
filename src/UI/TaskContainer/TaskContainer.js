import './TaskContainer.scss';
import TaskCard from '../TaskCard'
const TaskContainer = (props) => {


    return (
    <div class="bx--grid bx--grid--full-width TaskContainer">
    <div class="bx--row TaskContainer-Row">
        <div class="bx--col TaskContainer-Col">
        <div class="bx--row">
        <div class="bx--col">
        <h2>{props.title}</h2>
        </div>
        </div>
        <div class="bx--row">
        <div class="bx--col">
        <TaskCard key="1"  title="Task1" owner="saurabh" status="todo" startDate="2015-2-01" endDate="2015-02-02"/>
        </div>
        </div>
         </div>
  </div>
</div>)
};

export default TaskContainer;