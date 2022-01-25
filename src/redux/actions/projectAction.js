import { ToasterApi } from '../../components/Toaster'

export const fetchAction = (url, callbackAction, infoMessage='Fetching data for table!') => {
return async (dispatch) => {

      ToasterApi.info(infoMessage)
  
      const retrieveData = async () => {
        const response = await fetch(url)

        if(!response.ok){
          throw new Error(response.error.message)
        }
        let data = response.json()
        return data;
    };
    try{
        const Data = await retrieveData();
        dispatch(callbackAction(Data))
    }
  catch(e){
      ToasterApi.error('Fetching data from db got Fail!\n'+ e.message)
    }
}
}


export const addNewAction = (toolData, url, callbackAction, successMessage) => {
return async (dispatch) => {

  ToasterApi.info('Sending toolData to db!')
  
  const addNewAction = async () => {
        const response = await fetch(url,{
                     method:'POST',
                     headers:{'content-type': 'application/json'},
                     body: JSON.stringify(toolData)
                  })

        if(!response.ok){
          console.log(response)
          throw new Error(response.error.message)
        }
        let data = response.json()
        return data;
    };
    try{
        const newData = await addNewAction();
        dispatch(callbackAction(newData));
        ToasterApi.success(successMessage)
    }
  catch(e){
      ToasterApi.error('Adding new data into db got Fail! \n'+ e.message)
    }
}
}

export const deleteAction = (rowsData, url, callbackAction) => {
return async (dispatch) => {
  
  ToasterApi.info('Deleting data from db!')

    const deleteAction = async (rows) => {
          let id = rows[0].id;

          const response = await fetch(url+`/${id}`,{
                       method:'DELETE',
                       headers:{'content-type': 'application/json'}
                    })

                    if(!response.ok){
                      throw new Error(response.error.message)
                    }
                    return response
    };
    try{
        const response = await deleteAction(rowsData);
        dispatch(fetchAction(url, callbackAction));
        ToasterApi.success('Deleted selected rows from DB successfully!'+response);
    }
  catch(e){
      ToasterApi.error('Deleting data from DB Failed!\n '+ e.message)
    }
}
}

export const updateAction = (toolData, id, url, callbackAction) => {
return async (dispatch) => {
  
  ToasterApi.info('Updating data!')

    const updateAction = async (toolData, id) => {

        const response = await fetch(url+`/${id}`,{
                       method:'PATCH',
                       headers:{'content-type': 'application/json'},
                       body : JSON.stringify(toolData)
                    })

        console.log(response)

        if(!response.ok) {
           throw new Error(response.error.message)
          }
          return response
    };
    try{
      console.log(toolData)
        const response = await updateAction(toolData, id);
        dispatch(fetchAction(url, callbackAction));
        ToasterApi.success('Updated row successfully!',response);
    }
  catch(e){
      ToasterApi.error('Updating data got Failed!\n'+ e.message)
    }
}
}