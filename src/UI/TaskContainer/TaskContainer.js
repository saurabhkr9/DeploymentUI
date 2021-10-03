import React, {useState} from 'react'
import './TaskContainer.scss';
import TaskCard from '../TaskCard'
import TaskForm from '../TaskForm'
import ConfirmModal from '../../components/ModalBox'
const TaskContainer = (props) => {

  const [accessHubModal,showAccessHubModal]=useState(false);
  const [oneTask, setOneTask] = useState([]);

  const Modal = {
    modalTitlePrimary: oneTask.title,
    primaryAction:'Done',
    modalTitleSecondary: oneTask.status,
    modalBody: <div style={{ marginTop: '2rem' }}>
     <TaskForm task={oneTask} />
    </div>,
    modalAction: () => { console.log('submitted')}
  }

  const Tasks = props.tasks.map((task) =>(<div class="bx--col">
  <TaskCard key={task.id} 
   title={task.title}
    owner={task.owner}
     status={task.status}
      startDate={task.startDate}
       endDate={task.endDate}
       onClick={()=>openTaskHandler(task)}
       />
  </div>)
  )

  const openTaskHandler = (task) => { 
    setOneTask(task);
    showAccessHubModal(true);
  }

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
        {Tasks}
        </div>
         </div>
  </div>
  <div>
  <ConfirmModal open={accessHubModal} setOpen={showAccessHubModal} {...Modal} />
  </div>
</div>)
};

export default TaskContainer;