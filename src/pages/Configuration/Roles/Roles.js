import './Roles.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import { Link } from 'carbon-components-react';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {RolesAction} from './RolesAction';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';
import ConfirmModal from '../../../components/ModalBox';



var isInitial = true;
const headerData = [
    {
      key: 'role_name',
      header: 'Roles Name',
    },
    {
      key: 'accessesLink',
      header: 'Access',
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

const accessHeaderData = [
  {
    key: 'ibmcloud',
    header: 'IBM Cloud'
  }
]
  
  const Roles =(props) => {

    const url = APIs.ROLES;
    let dispatch = useDispatch();
    
    const { Roles } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})
    
    const [openFeatureModal, setOpenFeatureModal] = useState(false);
    const [accessRow, setAccessRow] = useState([]);

    

    var rowData = Roles.map(item => ({
      ...item,
      accessesLink : <Link onClick={(e)=>{openFeaturedModal(item.ID);e.preventDefault()}} href="">View Accesses</Link>     
     })
    )

    const openFeaturedModal = (id) => {
      const accessRowData = Roles.filter(item => item.ID === id)
      const obj = {...accessRowData[0].access}
      obj.ID = Math.random();
      setAccessRow([obj]);
      setOpenFeatureModal(true)
     }

    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateRoles));
            isInitial = false;
        }
        dispatch(projectAction.updateRoles(Roles))
      },[dispatch, Roles, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateRoles));
      }

      const updateSelectedRow = (selectedRow) => {
        console.log(selectedRow)

        const selectedCells = selectedRow[0].cells;
        let obj = {};
        obj.id = selectedRow[0].id;
        selectedCells.forEach(row => {
             obj[row.info["header"]] = row.value
        })
        const selectedModule = Roles.filter(item=>item.ID === Number(obj.id))
        obj.access = selectedModule[0].access;
        setSelectedRowstoUpdate(obj);
        setOpenModal(true);
      }

      const section = {
        accessHubModal: {
    
          modalTitlePrimary: "" ,
          primaryAction:'Okay',
          modalTitleSecondary: '',
          modalBody:  <div id="bx--grid">
          <MyDatatable 
           rows={accessRow} 
           headerData={accessHeaderData} 
           noSelection
           noAddButton
           noPaging
           noFilter
           />
          </div>,
          modalAction:  async () => {
             setOpenFeatureModal(false)
            }
        }
      }

    return (
       <div className="bx--grid">       

          <RolesAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate }
          url= {url}
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>All Roles Information:</h3>
        </div>
        </div>

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
           <MyDatatable 
           rows={rowData} 
           headerData={headerData} 
           addNew={()=>{setOpenModal(true);setSelectedRowstoUpdate({});}} 
           deleteSelectedRows={(rows)=>deleteSelectedRows(rows)}
           updateSelectedRow={(row)=>updateSelectedRow(row)}
           />
        </div>
        </div>

        <div className="">
          <ConfirmModal 
          open={openFeatureModal}
          setOpen={()=>{setOpenFeatureModal(false)}}
          {...section.accessHubModal} 
          size="lg"
          />
        </div>
        </div>
        
    )

}

export default Roles;