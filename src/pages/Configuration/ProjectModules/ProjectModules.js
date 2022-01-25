import './ProjectModules.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import {projectAction} from '../../../redux/reducers/project-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {ProjectModulesAction} from './ProjectModulesAction';
import { ToasterApi } from '../../../components/Toaster';
import { Link } from 'carbon-components-react';
import ConfirmModal from '../../../components/ModalBox';
import { APIs } from '../../../utils';



var isInitial = true;
const headerData = [
    {
      key: 'product',
      header: 'Product',
    },
    {
      key: 'module_name',
      header: 'Module Name',
    },
    {
      key: 'featuresLink',
      header: 'Features',
    },
    {
      key: 'created_by',
      header: 'Created By',
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

  const featureHeaderData = [
    {
      key: 'type',
      header: 'Type',
    },
    {
      key: 'nestedlement',
      header: 'Nested Element',
    },
    {
      key: 'incident_sys_id',
      header: 'Incident Sys Id',
    },
    {
      key: 'incident_id',
      header: 'Incident Id',
    },
    {
      key: 'incident_url',
      header: 'Incident Url',
    },
    {
      key: 'incident_status',
      header: 'Incident Status',
    },
  ];
  
  
  const ProjectModules =(props) => {
    let dispatch = useDispatch();
    const { ProjectModules } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false);
    const [openFeatureModal, setOpenFeatureModal] = useState(false);
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({});
    const [featureRow, setFeatureRow] = useState([]);
    const url = APIs.PRODUCT_MODULE;

    var rowData = ProjectModules.map(item => ({
      ...item,
      featuresLink : <Link onClick={(e)=>{openFeaturedModal(item.ID);e.preventDefault()}} href="">View Features</Link>     
     })
    )

     const openFeaturedModal = (id) => {
      const featureRowData = ProjectModules.filter(item => item.ID === id)
      const obj = {...featureRowData[0].features}
      obj.ID = Math.random();
      setFeatureRow([obj]);
      setOpenFeatureModal(true)
     }

    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateProjectModules));
            isInitial = false;
        }
        dispatch(projectAction.updateProjectModules(ProjectModules))
      },[dispatch, ProjectModules, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateProjectModules));
      }

      const updateSelectedRow = (selectedRow) => {

        const selectedCells = selectedRow[0].cells;
        let obj = {};
        obj.id = selectedRow[0].id;
        selectedCells.forEach(row => {
             obj[row.info["header"]] = row.value
        })
        const selectedModule = ProjectModules.filter(item=>item.ID === Number(obj.id))
        obj.features = selectedModule[0].features;
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
           rows={featureRow} 
           headerData={featureHeaderData} 
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

          <ProjectModulesAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate ?? null }
          url={ url }
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>Product Modules Information:</h3>
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

export default ProjectModules;