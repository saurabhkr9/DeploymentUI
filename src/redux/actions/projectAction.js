import { projectAction } from '../reducers/project-slice';
import { ToasterApi } from '../../components/Toaster'

export const fetchProjectData = () => {
    return async (dispatch) => {
          // ToasterApi.info('Fetching data from firebase!')
        const retrieveProjectData = async () => {
            const response = await fetch('https://deploymentui-default-rtdb.firebaseio.com/projects/-Ml5jZPCjxlAZqpZAyQ8.json')
    
            if(!response.ok){
              throw new Error('Getting the project data failed.')
            }
            let data = response.json()
            return data;
        };
        try{
            const projectData = await retrieveProjectData();
            console.log(projectData);
            dispatch(projectAction.updateProject(projectData));
        }
      catch(e){
          ToasterApi.error('Fetching data from db Failed!')
        }
    }
}
