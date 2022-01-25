import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput } from 'carbon-components-react';
import {addNewAction, updateAction} from '../../../redux/actions/projectAction'
import { projectAction } from '../../../redux/reducers/project-slice';


export const ITSMToolAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    
    const [toolCode, setToolCode] =useState("");
    const [toolName, setToolName] =useState("");
    const [discription, setDiscription] =useState("");
    const [versionNo, setVersionNo] =useState("");
    const [status, setStatus] =useState("");
    const [createdBy, setCreatedBy] =useState("");
    const [updatedBy, setUpdatedBy] =useState("");
    const [createDate, setCreateDate] =useState(new Date());
    const [updateDate, setUpdateDate] =useState(new Date());

    useEffect(() => {
        setToolCode(selectedRow.tool_code);
        setToolName(selectedRow.tool_name);
        setDiscription(selectedRow.descr); 
        setVersionNo(selectedRow.version);
        setStatus(selectedRow.status);
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
    
          modalTitlePrimary: 'ITSM Tools Information',
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="toolCode"
                  name="toolCode"
                  helperText="Please enter tool Code"
                  placeholder="Tool Code"
                  defaultValue={selectedRow.tool_code ?? ""}
                  onChange={(e)=>setToolCode(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"host entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter tool Name"
                  id="toolName"
                  name="toolName"
                  defaultValue={ selectedRow.tool_name ?? ""}
                  placeholder="Tool Name"
                  onChange={(e)=>setToolName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"tool Name Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter discription"
                  id="discription"
                  name="discription"
                  defaultValue={ selectedRow.descr ?? ""}
                  placeholder="Discription"
                  onChange={(e)=>setDiscription(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"discription Entered is Incorrect."}
              />
              </div>
          </div>
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter version number"
                  id="versionNo"
                  name="versionNo"
                  defaultValue={ selectedRow.version ?? ""}
                  placeholder="Version Numner"
                  onChange={(e)=>setVersionNo(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"version No Entered is incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter status"
                  id="status"
                  name="status"
                  defaultValue={selectedRow.status ?? ""}
                  placeholder="Status"
                  onChange={(e)=>setStatus(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"status Entered is Incorrect."}
              />
              </div>
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
              </div>
              <div className="bx--row details-form-row">
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
            const data = {
                "tool_code": toolCode,
                "tool_name": toolName,
                "descr": discription,
                "version": versionNo,
                "status": status,
                "created_by": createdBy,
                "updated_by": updatedBy,
                "create_date": selectedRow.create_date ?? new Date().toJSON().slice(0,25),
                "update_date": new Date().toJSON().slice(0,25)
              }
              if(toolCode === "" || toolName === "" || discription === "" || versionNo ==="" || status === ""){
                ToasterApi.error('All fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateITSMTools ))
            }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewTool, 'tool Data inserted to db successfully!' ))
              }
             setToolCode(""); setToolName(""); setDiscription(""); setVersionNo("");setStatus("");
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
