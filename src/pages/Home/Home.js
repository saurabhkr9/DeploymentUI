import { useSelector } from 'react-redux';
import Card from '../../UI/card';
import './Home.scss';
export default function HomePage() {  

  const tasks = useSelector(state => state.task.tasks)
  console.log("home" + tasks);
  const taskCards = tasks.map(task => (<div className="bx--col taskCard">
  <Card key={task.title} title={task.title} description={task.des} />
  </div>))

    return (

    <div className="bx--grid bx--grid--full-width home-page">
    <div className="bx--row">
      <div className="bx--col-lg-16">
        <h1 className="home-banner__title">Welcome to Deployment</h1>
      </div>
    </div>
    <div className="bx--row">
      {taskCards}
    </div>
    <div className="bx--col">
    {/* <Card title="Create Task"  /> */}
   </div>
    <div className="bx--row">
      
    </div>
  </div>
       
    );
  
  }
  