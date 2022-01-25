import './Profiles.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import { Link } from 'carbon-components-react';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {ProfilesAction} from './ProfilesAction';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';
import ConfirmModal from '../../../components/ModalBox';



var isInitial = true;
const headerData = [
    {
      key: 'profile_name',
      header: 'Profile Name',
    },
    {
      key: 'department',
      header: 'Department',
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
  
  const Profiles =(props) => {

    const url = APIs.PROFILES;
    let dispatch = useDispatch();

    const { Profiles } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})

    const [openFeatureModal, setOpenFeatureModal] = useState(false);
    const [accessRow, setAccessRow] = useState([]);

    

    var rowData = Profiles.map(item => ({
      ...item,
      accessesLink : <Link onClick={(e)=>{openFeaturedModal(item.ID);e.preventDefault()}} href="">View Accesses</Link>     
     })
    )

    const openFeaturedModal = (id) => {
      const accessRowData = Profiles.filter(item => item.ID === id)
      const obj = {...accessRowData[0].access}
      obj.ID = Math.random();
      setAccessRow([obj]);
      setOpenFeatureModal(true)
     }


    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateProfiles));
            isInitial = false;
        }
        dispatch(projectAction.updateProfiles(Profiles))
      },[dispatch, Profiles, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateProfiles ));
      }

      const updateSelectedRow = (selectedRow) => {

        const selectedCells = selectedRow[0].cells;
        let obj = {};
        obj.id = selectedRow[0].id;
        selectedCells.forEach(row => {
             obj[row.info["header"]] = row.value
        })
        const selectedModule = Profiles.filter(item=>item.ID === Number(obj.id))
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

          <ProfilesAction 
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

export default Profiles;