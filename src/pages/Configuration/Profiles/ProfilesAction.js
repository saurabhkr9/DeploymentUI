import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput, Checkbox } from 'carbon-components-react';
import {addNewAction, updateAction} from '../../../redux/actions/projectAction'
import { projectAction } from '../../../redux/reducers/project-slice';


export const ProfilesAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    
    const [profileName, setProfileName] =useState("");
    const [department, setDepartment] =useState("");
    const [IBMCloude, setIBMCloude] = useState(false);
    const [createdBy, setCreatedBy] =useState("");
    const [updatedBy, setUpdatedBy] =useState("");
    const [createDate, setCreateDate] =useState(new Date());
    const [updateDate, setUpdateDate] =useState(new Date());

    useEffect(() => {
        setProfileName(selectedRow.profile_name);
        setDepartment(selectedRow.department);
        setCreatedBy(selectedRow.created_by); 
        setUpdatedBy(selectedRow.updated_by); 
        setCreateDate(selectedRow.create_date);
        setUpdateDate(selectedRow.updateDate);
    },[selectedRow])

    const section = {
        accessHubModal: {
    
          modalTitlePrimary: 'Profile\'s Information',
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="profileName"
                  name="profileName"
                  helperText="Please enter tool Code"
                  placeholder="Profile Name"
                  defaultValue={selectedRow.profile_name ?? ""}
                  onChange={(e)=>setProfileName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"profile name entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter Menu Name"
                  id="department"
                  name="department"
                  defaultValue={ selectedRow.department ?? ""}
                  placeholder="Department"
                  onChange={(e)=>setDepartment(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"department Entered is Incorrect."}
              />
              </div>
          </div>
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter created by"
                  id="createdBy"
                  name="createdBy"
                  defaultValue={selectedRow.created_by ?? ""}
                  placeholder="Created By"
                  onChange={(e)=>setCreatedBy(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"status Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter updated by"
                  id="updatedBy"
                  name="updatedBy"
                  defaultValue={selectedRow.updated_by ?? ""}
                  placeholder="Updated By"
                  onChange={(e)=>setUpdatedBy(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Updated By Entered is Incorrect."}
              />
              </div>
              </div>
              <div className="bx--row details-form-row">
              {selectedRow.id !== undefined && <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter created date"
                  id="createDate"
                  name="createDate"
                  defaultValue={selectedRow.create_date.replace(/[A-Z]/g," ") ?? new Date().toJSON().slice(0,25).replace(/[A-Z]/g," ")}
                  placeholder="Created Date"
                  onChange={(e)=>setCreateDate(e.target.value)}
                  disabled={true}
                  invalid={false}
                  invalidText={"Create Date Entered is incorrect."}
              />
              </div>}
              <div className="bx--col details-form-col">
              {selectedRow.id !== undefined && <TextInput
                  helperText="Please enter update date"
                  id="updateDate"
                  name="updateDate"
                  defaultValue={selectedRow.update_date.replace(/[A-Z]/g," ") ?? new Date().toJSON().slice(0,25).replace(/[A-Z]/g," ")}
                  placeholder="Update Date"
                  onChange={(e)=>setUpdateDate(e.target.value)}
                  disabled={true}
                  invalid={false}
                  invalidText={"update date Entered is Incorrect."}
              />}
              </div>
              </div>

              <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
                <span className="subHeading-for-Accesses">Accesses</span>
              </div>
              </div>

              <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <Checkbox
                id="ibmcloude"
                defaultChecked={selectedRow.access !== undefined && selectedRow.access.ibmcloud === "Yes" ? true : false }
                onChange={(value)=>{setIBMCloude(value);}}
                labelText="IBM Cloud" />
              </div>
              </div>

          </Form>
          </div>,
          modalAction:  async () => {
            const data = {
                "profile_name": profileName,
                "department": department,
                "access":{
                    "ibmcloud": IBMCloude ? "Yes" : "No"
                },
                "created_by": createdBy,
                "updated_by": updatedBy,
                "create_date": selectedRow.create_date ?? new Date().toJSON().slice(0,25),
                "update_date": new Date().toJSON().slice(0,25)
              }
              if(profileName === "" || department === "" ){
                ToasterApi.error('All fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateProfiles ))
            }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewProfile, 'Profile Data inserted to db successfully!' ))
              }
             setProfileName(""); setDepartment("");
            }
        }
      }
      
    return (
        <div className="">
          <ConfirmModal 
          open={props.openModal}
          setOpen={()=>{props.setClose(false)}}
          {...section.accessHubModal} 
          size="lg"
          />
        </div>
    )
}
