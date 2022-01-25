import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput } from 'carbon-components-react';
import {addNewAction, updateAction} from '../../../redux/actions/projectAction';
import { projectAction } from '../../../redux/reducers/project-slice';


export const NotificationChannelAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    const [channelName, setChannelName] =useState("");
    const [groupName, setGroupName] =useState("");
    const [createdBy, setCreatedBy] =useState("");
    const [createDate, setCreateDate] =useState(new Date());
    const [updateDate, setUpdateDate] =useState(new Date());

    useEffect(() => {
        setChannelName(selectedRow.channel_name);
        setGroupName(selectedRow.group_name);
        setCreatedBy(selectedRow.created_by); 
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
    
          modalTitlePrimary: 'DO Notification Channel',
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="channelName"
                  name="channelName"
                  helperText="Please enter channel Name"
                  placeholder="Channel Name"
                  defaultValue={selectedRow.channel_name ?? ""}
                  onChange={(e)=>setChannelName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"channel name entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter group name"
                  id="groupName"
                  name="groupName"
                  defaultValue={selectedRow.group_name ?? ""}
                  placeholder="Group Name"
                  onChange={(e)=>setGroupName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Group Name Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter createdBy"
                  id="createdBy"
                  name="createdBy"
                  defaultValue={selectedRow.created_by ?? ""}
                  placeholder="Created By"
                  onChange={(e)=>setCreatedBy(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Created By Entered is Incorrect."}
              />
              </div>
          </div>
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter create date"
                  id="createDate"
                  name="createDate"
                  defaultValue={selectedRow.create_date.replace(/[A-Z]/g," ") ?? new Date().toJSON().slice(0,25).replace(/[A-Z]/g," ")}
                  placeholder="Create Date"
                  onChange={(e)=>setCreateDate(e.target.value)}
                  disabled={selectedRow.create_date !== undefined}
                  invalid={false}
                  invalidText={"create date Entered is incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter updated date"
                  id="updateDate"
                  name="updateDate"
                  defaultValue={selectedRow.update_date.replace(/[A-Z]/g," ") ?? new Date().toJSON().slice(0,25).replace(/[A-Z]/g," ")}
                  placeholder="Update Date"
                  onChange={(e)=>setUpdateDate(e.target.value)}
                  disabled={selectedRow.update_date !== undefined }
                  invalid={false}
                  invalidText={"update Date Entered is Incorrect."}
              />
              </div>
              </div>
          </Form>
          </div>,
          modalAction:  async () => {
            const data = {
                "channel_name": channelName,
                "group_name": groupName,
                "created_by": createdBy,
                "create_date": createDate,
                "update_date": updateDate
              }
              if(channelName === "" || groupName === "" || createdBy === "" || createDate ==="" || updateDate === ""){
                ToasterApi.error('All fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateNotificationChannel))
            }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewNotificationChannel, 'DO Notofication Channel Added successfully.'))
              }
             setChannelName(""); setGroupName(""); setCreatedBy(""); setCreateDate("");setUpdateDate("");
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
