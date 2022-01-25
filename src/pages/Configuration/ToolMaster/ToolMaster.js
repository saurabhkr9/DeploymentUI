import './ToolMaster.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {ToolMasterAction} from './ToolMasterAction';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';


var isInitial = true;
const headerData = [
    {
      key: 'product',
      header: 'Product',
    },
    {
      key: 'tool_name',
      header: 'Tool Name',
    },
    {
      key: 'tool_desc',
      header: 'Tool Discription',
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
  
  
  const ToolMaster =(props) => {
    let dispatch = useDispatch();
    const { toolMaster } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})
    console.log(toolMaster)
    
    const url = APIs.TOOL_MASTER;
    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateToolMaster));
            isInitial = false;
        }
        dispatch(projectAction.updateToolMaster(toolMaster))
      },[dispatch, toolMaster, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateToolMaster ));
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

          <ToolMasterAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate }
          url= {url}
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>All Tools Master:</h3>
        </div>
        </div>

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
           <MyDatatable 
           rows={toolMaster} 
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

export default ToolMaster;