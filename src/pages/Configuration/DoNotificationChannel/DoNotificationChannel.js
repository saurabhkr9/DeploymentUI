import './DoNotificationChannel.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {NotificationChannelAction} from './NotificationChannelAction';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';


var isInitial = true;
const headerData = [
    {
      key: 'channel_name',
      header: 'Channel Name',
    },
    {
      key: 'group_name',
      header: 'Group Name',
    },
    {
      key: 'created_by',
      header: 'Created By',
    },
    {
      key: 'updated_by',
      header: 'Updated By',
    },
    {
      key: 'create_date',
      header: 'Create Date',
    },
    {
      key: 'update_date',
      header: 'Update Date',
    },
  ];
  
  
  const DoNotificationChannel =(props) => {
    let dispatch = useDispatch();
    const { NotificationChannels } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})
    const url = APIs.DO_NOTIFICATION_CHANNEL;
    useEffect(()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateNotificationChannel));
            isInitial = false;
        }
        dispatch(projectAction.updateNotificationChannel(NotificationChannels))
      },[dispatch, NotificationChannels, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateNotificationChannel));
      }

      const updateSelectedRow = (selectedRow) => {
        const selectedCells = selectedRow[0].cells;
        let obj = {};
        obj.id = selectedRow[0].ID;
        selectedCells.forEach(row => {
             obj[row.info["header"]] = row.value
        })
        console.log(obj)
        setSelectedRowstoUpdate(obj);
        setOpenModal(true);
      }

    return (
       <div className="bx--grid">       

          <NotificationChannelAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate }
          url={ url }
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>All Notifications Channels</h3>
        </div>
        </div>

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
           <MyDatatable 
           rows={NotificationChannels} 
           headerData={headerData} 
           addNew={()=>{setOpenModal(true);setSelectedRowstoUpdate({});}} 
           deleteSelectedRows={(rows)=>deleteSelectedRows(rows)}
           updateSelectedRow={(row)=>updateSelectedRow(row)}
           />
        </div>
        </div>

        </div>
        
    )

}

export default DoNotificationChannel;