import './ITSMTools.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {ITSMToolAction} from './ITSMToolAction';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';



var isInitial = true;
const headerData = [
    {
      key: 'tool_code',
      header: 'Tool Code',
    },
    {
      key: 'tool_name',
      header: 'Tool Name',
    },
    {
      key: 'descr',
      header: 'Discription',
    },
    {
      key: 'version',
      header: 'Version No',
    },
    {
      key: 'status',
      header: 'Status',
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
  
  
  const ITSMTools =(props) => {
    let dispatch = useDispatch();
    const { itsmTools } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})
    console.log(itsmTools)
    
    const url = APIs.ITSM_TOOLS;
    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateITSMTools));
            isInitial = false;
        }
        dispatch(projectAction.updateITSMTools(itsmTools))
      },[dispatch, itsmTools, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateITSMTools ));
      }

      const updateSelectedRow = (selectedRow) => {
        console.log(selectedRow)

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

    return (
       <div className="bx--grid">       

          <ITSMToolAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate }
          url= {url}
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>All Tools Information:</h3>
        </div>
        </div>

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
           <MyDatatable 
           rows={itsmTools} 
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

export default ITSMTools;