import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';
import { APIs } from '../../../utils';

import { Form, TextInput } from 'carbon-components-react';
import DropdownComponent from '../../../components/DropDown'
import {fetchAction, addNewAction, updateAction} from '../../../redux/actions/projectAction'
import { projectAction } from '../../../redux/reducers/project-slice';
import { dropDownAction } from '../../../redux/reducers/dropDown-slice';


export const UserAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;

    const { roles, profiles } = useSelector(state => state.dropDown)

    useEffect(() => {
        if(roles.length === 0) {
            dispatch(fetchAction(APIs.ROLES, dropDownAction.updateRoles, "Fetching Roles!"))
        }
        if(profiles.length === 0){
            dispatch(fetchAction(APIs.PROFILES, dropDownAction.updateProfiles, "Fetching Profiles!"))
        }
    },[dispatch,roles, profiles])
    
    const [userId, setUserId] =useState("");
    const [firstName, setFirstName] =useState("");
    const [lastName, setLastName] =useState("");
    const [userRole, setUserRole] =useState("");
    const [profile, setProfile] =useState("");
    const [primaryPhone, setPrimaryPhone] =useState("");
    const [secondaryPhone, setSecondaryPhone] =useState("");
    const [email, setEmail] =useState("");
    const [contactPreferences, setContactPreferences] =useState("");
    const [createdBy, setCreatedBy] =useState("");
    const [updatedBy, setUpdatedBy] =useState("");
    const [createDate, setCreateDate] =useState("");
    const [updateDate, setUpdateDate] =useState("");

    useEffect(() => {
        setUserId(selectedRow.user_id);
        setFirstName(selectedRow.first_name);
        setLastName(selectedRow.last_name);
        setPrimaryPhone(selectedRow.primary_phone);
        setSecondaryPhone(selectedRow.secondary_phone);
        setEmail(selectedRow.email);
        setContactPreferences(selectedRow.contact_preferences)
        setCreatedBy(selectedRow.created_by);
        setUpdatedBy(selectedRow.updated_by); 
        setCreateDate(selectedRow.create_date);
        setUpdateDate(selectedRow.updateDate);
    },[selectedRow])

    const section = {
        about: {
          title: 'DO Deployment UI',
          body: ''
        },
        additional_links: {
          accessHub: '',
          help: ''
        },
        accessHubModal: {
    
          modalTitlePrimary: selectedRow.id !== undefined ? `${selectedRow.first_name+" "+selectedRow.last_name}'s Information` : "Enter New User Information",
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="userId"
                  name="userId"
                  helperText="Please enter User Id"
                  placeholder="User Id"
                  defaultValue={selectedRow.user_id ?? ""}
                  onChange={(e)=>setUserId(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"host entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter First Name"
                  id="firstName"
                  name="firstName"
                  defaultValue={ selectedRow.first_name ?? ""}
                  placeholder="First Name"
                  onChange={(e)=>setFirstName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"First Name Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter lastName"
                  id="lastName"
                  name="lastName"
                  defaultValue={ selectedRow.last_name ?? ""}
                  placeholder="Last Name"
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"lastName Entered is Incorrect."}
              />
              </div>
          </div>
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <DropdownComponent
              id="userRoles"
              items={roles}
              helperText="Select a role"
              label="Role"
              textField="role_name"
              initialSelectedItem={roles.filter(role=>role.role_name === selectedRow.user_role) ?? null}
              onChange={(item)=>setUserRole(item.ID)}
              />
              </div>
              <div className="bx--col details-form-col">
              <DropdownComponent
              id="userProfile"
              items={profiles}
              helperText="Select a profile"
              label="Profile"
              textField="profile_name"
              initialSelectedItem={profiles.filter(profile=>profile.profile_name === selectedRow.profile) ?? null}
              onChange={(item)=>setProfile(item.ID)}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter primary phone"
                  id="primaryPhone"
                  name="primaryPhone"
                  defaultValue={selectedRow.primary_phone ?? ""}
                  placeholder="Primary Phone"
                  onChange={(e)=>setPrimaryPhone(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"primary no Entered is Incorrect."}
              />
              </div>
              </div>

              <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter secondry phone"
                  id="secondryPhone"
                  name="secondryPhone"
                  defaultValue={ selectedRow.secondary_phone ?? ""}
                  placeholder="Secondry Phone"
                  onChange={(e)=>setSecondaryPhone(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"secondry phone Entered is incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter user's email"
                  id="email"
                  name="email"
                  defaultValue={selectedRow.email ?? ""}
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Email Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter Contact Preferences"
                  id="contactPreferences"
                  name="contactPreferences"
                  defaultValue={selectedRow.contact_preferences ?? ""}
                  placeholder="Contact Preferences"
                  onChange={(e)=>setContactPreferences(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Contact Preferences Entered is Incorrect."}
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
                  invalidText={"profile Entered is Incorrect."}
              />
              </div>
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
          </Form>
          </div>,
          modalAction:  async () => {

                const role = await roles.filter(role=>role.role_name === selectedRow.user_role)
                const Userprofile = await profiles.filter(profile=>profile.profile_name === selectedRow.profile)

            const data = {
                "user_id": userId,
                "first_name": firstName,
                "last_name": lastName,
                "user_role": userRole === "" ? Number(role[0].ID) : Number(userRole) ,
                "profile": profile === "" ? Number(Userprofile[0].ID) : Number(profile),
                "primary_phone": Number(primaryPhone),
                "secondary_phone": Number(secondaryPhone),
                "email": email,
                "contact_preferences": contactPreferences,
                "created_by": createdBy,
                "updated_by": updatedBy,
                "create_date": selectedRow.create_date ?? new Date().toJSON().slice(0,25),
                "update_date": new Date().toJSON().slice(0,25)
              }
              if(userId === "" || firstName === "" || lastName === "" || (userRole ==="" && role[0].ID ==="" ) || 
                (profile === "" && Userprofile[0].ID === "")|| primaryPhone === ""  ||  email === "" || contactPreferences === ""){
                ToasterApi.error('fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateUsers ))
            }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewUser, 'User Data inserted to db successfully!' ))
              }
             setUserId(""); setFirstName(""); setLastName(""); setUserRole("");setProfile("");setPrimaryPhone("");
             setSecondaryPhone("");setEmail("");setContactPreferences("")
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
