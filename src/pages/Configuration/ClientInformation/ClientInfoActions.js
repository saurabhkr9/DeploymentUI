import React , { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ConfirmModal from '../../../components/ModalBox';
import { ToasterApi } from '../../../components/Toaster';

import { Form, TextInput } from 'carbon-components-react';
import {addITSMTools, updateITSMTools} from '../../../redux/actions/projectAction'

export const ClientInfoAction = (props) => {
    let dispatch = useDispatch();
    const selectedRow = props.selectedRow;
    const [clientName, setClientName] =useState("");
    const [clientCode, setClientCode] =useState("");
    const [discription, setDiscription] =useState("");
    const [versionNo, setVersionNo] =useState("");
    const [status, setStatus] =useState("");

    useEffect(() => {
        setClientName(selectedRow.tool_code);
        setClientCode(selectedRow.tool_name);
        setDiscription(selectedRow.descr); 
        setVersionNo(selectedRow.version_no);
        setStatus(selectedRow.status);
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
    
          modalTitlePrimary: 'Client\'s Information',
          primaryAction:'Submit',
          modalTitleSecondary: 'This info will be submitted to the master data',
          modalBody:  <div id="bx--grid">
          <Form className="details-form"  method="none" id="login">
          <div className="bx--row details-form-row">
            <div className="bx--col details-form-col">
            <TextInput
                id="clientname"
                name="clientname"
                defaultValue=""
                helperText="Please enter client name"
                placeholder="New Client Name"
                onChange={(e)=>setClientName(e.target.value)}
                required
                invalid={false}
                invalidText={"client name entered is not valid"}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter owner name"
                id="ownername"
                name="ownername"
                defaultValue=""
                placeholder="Owner Name"
                onChange={(e)=>setClientCode(e.target.value)}
                required
                invalid={false}
                invalidText={"Owner Name Entered is Incorrect."}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter "
                id=""
                name=""
                defaultValue=""
                placeholder="Field 1"
                onChange={()=>console.log("pressed")}
                
                invalid={false}
                invalidText={""}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter "
                id=""
                name=""
                defaultValue=""
                placeholder="Field 2"
                onChange={()=>console.log("pressed")}
                
                invalid={false}
                invalidText={""}
            />
            </div>
            </div>

            <div className="bx--row details-form-row">
            <div className="bx--col details-form-col">
            <TextInput
                id=""
                name=""
                defaultValue=""
                helperText="Please enter"
                placeholder="Field 3"
                onChange={()=>console.log("enter ")}
                invalid={false}
                invalidText={""}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter"
                id=""
                name=""
                defaultValue=""
                placeholder="Field 4"
                onChange={()=>console.log("enter")}
                invalid={false}
                invalidText={"Entered is Incorrect."}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter "
                id=""
                name=""
                defaultValue=""
                placeholder="Field 5"
                onChange={()=>console.log("pressed")}
                
                invalid={false}
                invalidText={""}
            />
            </div>
            <div className="bx--col details-form-col">
            <TextInput
                helperText="Please enter "
                id=""
                name=""
                defaultValue=""
                placeholder="Field 6"
                onChange={()=>console.log("pressed")}
                
                invalid={false}
                invalidText={""}
            />
            </div>
            </div>
          </Form>
          </div>,
          modalAction:  async () => {
            const data = {
                "tool_code": clientName,
                "tool_name": clientCode,
                "descr": discription,
                "version_no": versionNo,
                "status": status
              }
              if(clientName === "" || clientCode === "" || discription === "" || versionNo ==="" || status === ""){
                ToasterApi.error('All fields are required')
                return;
              }
              if(selectedRow.id !== undefined){
                  await dispatch(updateITSMTools(data,selectedRow.id))
            }else{
                  await dispatch(addITSMTools(data))
              }
              setClientName(""); setClientCode(""); setDiscription(""); setVersionNo("");setStatus("");
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

