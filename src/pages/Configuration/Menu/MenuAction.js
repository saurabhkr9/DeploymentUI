import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput } from 'carbon-components-react';
import {addNewAction, updateAction} from '../../../redux/actions/projectAction'
import { projectAction } from '../../../redux/reducers/project-slice';


export const MenuAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    
    const [parentMenu, setParentMenu] =useState("");
    const [menuName, setMenuName] =useState("");
    const [createdBy, setCreatedBy] =useState("");
    const [updatedBy, setUpdatedBy] =useState("");
    const [createDate, setCreateDate] =useState(new Date());
    const [updateDate, setUpdateDate] =useState(new Date());

    useEffect(() => {
        setParentMenu(selectedRow.parent_menu);
        setMenuName(selectedRow.menu_name);
        setCreatedBy(selectedRow.created_by); 
        setUpdatedBy(selectedRow.updated_by); 
        setCreateDate(selectedRow.create_date);
        setUpdateDate(selectedRow.updateDate);
    },[selectedRow])

    const section = {
        accessHubModal: {
    
          modalTitlePrimary: 'Menu Information',
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
              <div className="bx--col details-form-col">
              <TextInput
                  id="parentMenu"
                  name="parentMenu"
                  helperText="Please enter tool Code"
                  placeholder="Parent Menu"
                  defaultValue={selectedRow.parent_menu ?? ""}
                  onChange={(e)=>setParentMenu(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"parent menu entered is not valid"}
              />
              </div>
              <div className="bx--col details-form-col">
              <TextInput
                  helperText="Please enter Menu Name"
                  id="menuName"
                  name="menuName"
                  defaultValue={ selectedRow.menu_name ?? ""}
                  placeholder="Tool Name"
                  onChange={(e)=>setMenuName(e.target.value)}
                  required
                  invalid={false}
                  invalidText={"Menu Name Entered is Incorrect."}
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
          </Form>
          </div>,
          modalAction:  async () => {
            const data = {
                "parent_menu": Number(parentMenu),
                "menu_name": menuName,
                "created_by": createdBy,
                "updated_by": updatedBy,
                "create_date": selectedRow.create_date ?? new Date().toJSON().slice(0,25),
                "update_date": new Date().toJSON().slice(0,25)
              }
              if(parentMenu === "" || menuName === "" ){
                ToasterApi.error('All fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateAction(data,selectedRow.id, props.url, projectAction.updateMenus ))
            }else{
                  await dispatch(addNewAction(data, props.url, projectAction.addNewMenu, 'Menu Data inserted to db successfully!' ))
              }
             setParentMenu(""); setMenuName("");
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
