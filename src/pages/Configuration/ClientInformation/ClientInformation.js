import './ClientInformation.scss';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteITSMTools} from '../../../redux/actions/projectAction'

import MyDatatable  from '../../../components/DataTable';
import {ClientInfoAction} from './ClientInfoActions';
import { ToasterApi } from '../../../components/Toaster';


var isInitial = true;
const headerData = [
    {
      key: 'client_code',
      header: 'Client Code',
    },
    {
      key: 'client_name',
      header: 'Client Name',
    },
    {
      key: 'descr',
      header: 'Discription',
    },
    {
      key: 'field',
      header: 'Field 1',
    },
    {
      key: 'field2',
      header: 'Field 2',
    },
    {
        key: 'field3',
        header: 'Field ',
      },
      {
        key: 'field4',
        header: 'Field 4',
      },
  ];

const ClientInformation = (props) => {

  let dispatch = useDispatch();
  const { Clients } = useSelector(state => state.project)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})
  const url = "http://localhost:3001/itsm-tools"

  useEffect(()=>{
      if(isInitial){
          dispatch(fetchAction(url, projectAction.updateClients));
          isInitial = false;
      }
      dispatch(projectAction.updateClients())
    },[dispatch, Clients])

    const deleteSelectedRows = (selectedRows) => {
      if(selectedRows.length < 1){
        ToasterApi.error('Please selecte at least one row!');
        return;
      }
       dispatch(deleteITSMTools(selectedRows));
    }

    const updateSelectedRow = (selectedRow) => {
      const selectedCells = selectedRow[0].cells;
      let obj = {};
      obj.id = selectedRow[0].id;
      selectedCells.forEach(row => {
           obj[row.info["header"]] = row.value
      })
      console.log(obj)
      setSelectedRowstoUpdate(obj);
      setOpenModal(true);
    }


    return(
      <div className="bx--grid">       

      <ClientInfoAction 
      openModal={openModal} 
      setClose={setOpenModal} 
      selectedRow={ selectedRowstoUpdate }
      />

    <div className="bx--row details-form-row">
    <div className="bx--col details-form-col">
     <h3>All Clients Information:</h3>
    </div>
    </div>

    <div className="bx--row details-form-row">
    <div className="bx--col details-form-col">
       <MyDatatable 
       rows={Clients} 
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

export default ClientInformation;