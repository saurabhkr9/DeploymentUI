import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput } from 'carbon-components-react';
import {addNewAction, updateAction} from '../../../redux/actions/projectAction'
import { projectAction } from '../../../redux/reducers/project-slice';


export const ProjectModulesAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    console.log(selectedRow);
    const [product, setProduct] =useState("");
    const [moduleName, setModuleName] =useState("");
    const [createdBy, setCreatedBy] =useState("");
    const [createDate, setCreateDate] =useState("");
    const [updateDate, setUpdateDate] =useState("");

    const [type, setType] =useState("");
    const [nestedElement, setNestedElement] =useState("");
    const [incSysId, setIncSysId] =useState("");
    const [incId, setIncId] =useState("");
    const [incUrl, setIncUrl] =useState("");
    const [incStatus, setIncStatus] =useState("");

    useEffect(() => {
        setProduct(selectedRow.product);
        setModuleName(selectedRow.module_name);
        setCreatedBy(selectedRow.created_by); 
        setCreateDate(selectedRow.create_date);
        setUpdateDate(selectedRow.update_date);
        setType(selectedRow.features === undefined ? "" : selectedRow.features.type);
        setNestedElement(selectedRow.features === undefined ? "" : selectedRow.features.nestedelement);
        setIncSysId(selectedRow.features === undefined ? "" : selectedRow.features.incident_sys_id);
        setIncId(selectedRow.features === undefined ? "" : selectedRow.features.incident_id);
        setIncUrl(selectedRow.features === undefined ? "" : selectedRow.features.incident_url);
        setIncStatus(selectedRow.features === undefined ? "" : selectedRow.features.incident_status);
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
    
          modalTitlePrimary: `${selectedRow.product ?? "Give Product Module Information"}`,
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="product"
                  name="product"
                  helperText="Please enter product"
                  placeholder="Product"
                  defaultValue={selectedRow.product ?? ""}
                  onChange={(e)=>setProduct(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Product entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter tool Name"
                  id="moduleName"
                  name="moduleName"
                  defaultValue={selectedRow.module_name ?? ""}
                  placeholder="Module Name"
                  onChange={(e)=>setModuleName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Module Name Entered is Incorrect."}
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
                  invalidText={"createdBy Entered is Incorrect."}
              />
              </div>
          </div>

          {selectedRow.id !== undefined && <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
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
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter update date"
                  id="updateDate"
                  name="updateDate"
                  defaultValue={selectedRow.update_date.replace(/[A-Z]/g," ") ?? new Date().toJSON().slice(0,25).replace(/[A-Z]/g," ")}
                  placeholder="Update Date"
                  onChange={(e)=>setUpdateDate(e.target.value)}
                  disabled={true}
                  invalid={false}
                  invalidText={"update date Entered is Incorrect."}
              />
              </div>
              </div>}

              <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
                <span className="subHeading-for-features">Features</span>
              </div>
              </div>

            <div className="bx--row details-form-row">
            <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter type"
                  id="type"
                  name="type"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.type }
                  placeholder="Type"
                  onChange={(e)=>setType(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Type Entered is incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter nested element"
                  id="nestedelement"
                  name="nestedelement"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.nestedelement}
                  placeholder="Nested Element"
                  onChange={(e)=>setNestedElement(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"nested element Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter incident sys id"
                  id="incident_sys_id"
                  name="incident_sys_id"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.incident_sys_id }
                  placeholder="Nested Element"
                  onChange={(e)=>setIncSysId(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"nested element Entered is Incorrect."}
              />
              </div>
            </div>
            <div className="bx--row details-form-row">
            <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter incident id"
                  id="incident_id"
                  name="incident_id"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.incident_id }
                  placeholder="Type"
                  onChange={(e)=>setIncId(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"incident id Entered is incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter incident url"
                  id="incident_url"
                  name="incident_url"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.incident_url }
                  placeholder="Incident URL"
                  onChange={(e)=>setIncUrl(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"incident url Entered is Incorrect."}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter incident_status"
                  id="incident_status"
                  name="incident_status"
                  defaultValue={selectedRow.features === undefined ? "" : selectedRow.features.incident_status } 
                  placeholder="Incident Status"
                  onChange={(e)=>setIncStatus(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"incident status Entered is Incorrect."}
              />
              </div>
            </div>

          </Form>
          </div>,
          modalAction:  async () => {
            const data = {
                "product": product,
                "module_name": moduleName,
                "created_by": createdBy,
                "features": {
                  "type": type,
                  "nestedlement": nestedElement,
                  "incident_sys_id": incSysId,
                  "incident_id": incId,
                  "incident_url": incUrl,
                  "incident_status": incStatus
                },
                "create_date": selectedRow.create_date ?? new Date().toJSON().slice(0,25),
                "update_date": new Date().toJSON().slice(0,25)
              }

              if(product === "" || moduleName === "" || createdBy === "" || createDate ==="" || updateDate === ""){
                ToasterApi.error('All fields are required')
                return;
              }

              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateProjectModules))
              }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewProjectModule, 'Project Module Added successfully.'))
              }

             setProduct(""); setModuleName(""); setCreatedBy(""); setCreateDate("");setUpdateDate("");
             
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
