import './ManageUser.scss';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MyDatatable  from '../../../components/DataTable';
import {projectAction} from '../../../redux/reducers/project-slice';
import {dropDownAction} from '../../../redux/reducers/dropDown-slice';
import {fetchAction, deleteAction} from '../../../redux/actions/projectAction'
import {UserAction} from './UserAction';
import { ToasterApi } from '../../../components/Toaster';
import {uiAction} from '../../../redux/reducers/ui-slice'
import { APIs } from '../../../utils';



var isInitial = true;
const headerData = [
    {
      key: 'user_id',
      header: 'User Id',
    },
    {
      key: 'first_name',
      header: 'First Name',
    },
    {
      key: 'last_name',
      header: 'Last Name',
    },
    {
      key: 'user_role',
      header: 'User Role',
    },
    {
      key: 'profile',
      header: 'Profile',
    },
    {
      key: 'primary_phone',
      header: 'Primary Phone',
    },
    {
      key: 'secondary_phone',
      header: 'Secondary Phone',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'contact_preferences',
      header: 'Contact Preferences',
    },
    {
      key: 'created_by',
      header: 'Created By',
    },
    // {
    //   key: 'updated_by',
    //   header: 'Updated By',
    // },
    {
      key: 'create_date',
      header: 'Create Date',
    },
    {
      key: 'update_date',
      header: 'Update Date',
    },
  ];
  
  
  const ManageUser =(props) => {
    let dispatch = useDispatch();
    const { Users } = useSelector(state => state.project)
    const [openModal, setOpenModal] = useState(false)
    const [rowData , setRowdata] = useState([])
    const [selectedRowstoUpdate, setSelectedRowstoUpdate] = useState({})

    const url = APIs.USERS;

    const { roles, profiles} = useSelector(state => state.dropDown)

   

    useEffect(()=>{
      dispatch(uiAction.changeTitle("Manage Users!"));

      if(roles.length === 0) {
        dispatch(fetchAction(APIs.ROLES, dropDownAction.updateRoles, "Fetching Roles!"))
      }

      if(profiles.length === 0){
        dispatch(fetchAction(APIs.PROFILES, dropDownAction.updateProfiles, "Fetching Profiles!"))
      }
    },[ dispatch,roles, profiles])

    useEffect( ()=>{
        if(isInitial){
            dispatch(fetchAction(url,projectAction.updateUsers));
            isInitial = false;
        }
        
        dispatch(projectAction.updateUsers(Users))

        if(roles.length !== 0 && profiles.length !== 0){
          const rowData = Users.map(user => {
            const userRole = roles.filter(role => role.ID === user.user_role);
            const userProfile = profiles.filter(profile => profile.ID === user.profile);
            const updatedUser = {...user, user_role:userRole[0].role_name,profile:userProfile[0].profile_name};
            return updatedUser
          })
          setRowdata(rowData)
        }
      },[dispatch, Users, roles, profiles, url])

      const deleteSelectedRows = (selectedRows) => {
        if(selectedRows.length < 1){
          ToasterApi.error('Please selecte at least one row!');
          return;
        }
         dispatch(deleteAction(selectedRows, url, projectAction.updateUsers ));
      }

      const updateSelectedRow = (selectedRow) => {
        const selectedCells = selectedRow[0].cells;
        let obj = {};
        obj.id = selectedRow[0].id;
        selectedCells.forEach(row => {
             obj[row.info["header"]] = row.value
        })
        setSelectedRowstoUpdate(obj);
        setOpenModal(true);
      }

    return (
       <div className="bx--grid">       

          <UserAction 
          openModal={openModal} 
          setClose={setOpenModal} 
          selectedRow={ selectedRowstoUpdate }
          url= {url}
          />

        <div className="bx--row details-form-row">
        <div className="bx--col details-form-col">
         <h3>All User's Information:</h3>
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

        </div>
        
    )

}

export default ManageUser;