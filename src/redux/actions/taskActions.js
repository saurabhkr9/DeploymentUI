import { taskAction } from '../reducers/task-slice';
import { ToasterApi } from '../../components/Toaster'

export const fetchTaskData = () => {
    return async (dispatch) => {
          // ToasterApi.info('Fetching data from firebase!')
        const retrieveTaskData = async () => {
            const response = await fetch('https://deploymentui-default-rtdb.firebaseio.com/task.json')
    
            if(!response.ok){
              throw new Error('Getting the task data failed.')
            }
            let data = response.json()
            return data;
        };
        try{
            const taskData = await retrieveTaskData();
            console.log(taskData);
            dispatch(taskAction.updateTask(taskData));
        }
      catch(e){
          ToasterApi.error('Fetching data from db Failed!')
        }


    }
}

export const sendTaskData = (task) => {
    return async (dispatch) => {
        ToasterApi.info('Sending data to db!')

    const sentToCart = async () => {
          const response = await fetch('https://deploymentui-default-rtdb.firebaseio.com/task.json',{
             method:'PATCH',
             headers:{'content-type': 'application/json'},
             body: JSON.stringify(task)
          })
  
          if(!response.ok){
            throw new Error('Sending to task failed.')
          }
          
      }
  
    try{
          await sentToCart();
          ToasterApi.success('Sending data to db success!')
      }
    catch(e){
        ToasterApi.error('Sending data to db Failed!')
      }
    }
}