import {useState} from 'react';
import readXlsxFile from 'read-excel-file'
import {  FileUploader} from "carbon-components-react";
import Modal from '../../../components/ModalWithThreeButtons';
import FieldMapping from './FieldMapping'

const standardFile = ["SR/INC Id", "Assigned Group", "Created Date", "Resolution_Comments", "Status", "Description"]

const Uploader = (props) => {
    const [file, setFile] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [uploadButtonLabel, setUploadButtonLabel] = useState("Upload File")
    const [fileStatus, setfileStatus] = useState("edit");
    const [headerData, setHeaderData] = useState([]);
    const [items, setItems] = useState([]);
    const [needMapping, setNeedMapping] = useState(false);
    const [mapping, setMapping] = useState(null)
    const [validMessage, setValidMessage] = useState("successfull");

    const onFileChange = (event) => {
      setFile(event.target.files[0]);
      setOpenModal(true);
    }

    const processFile = (fieldMapping = null) => {
        if(!fieldMapping){
          validation();
        }
        setMapping(fieldMapping)
    };

    const sendDataToServer = () => {
        // Create an object of formData
        const fileData = new FormData();
    
        //  Update the formData object
        fileData.append("file", file, file.name);

        let body = ""
        if(mapping){
          body = {"file":fileData, fields: mapping}
        }else{
          body = {"file":fileData}
        }

        console.log(body);

        props.onResponce(true)
 
          //  fetch(
          //    "http://localhost:8000/upload",
          //    {
          //      method: "POST",
          //      body: body
          //    }
          //  )
          //    .then((response) => response.json())
          //    .then((response) => {
          //        console.log(response);
                 
          //        props.onResponce(response)
          //    })
          //    .catch((error) => {console.log(error);})
    }

    const mappingFields = () => {
      validation("needMapping");
    }

    const validation = (action = "") => {
      let flag = action;
      setOpenModal(false);
      setUploadButtonLabel("Uploading");
      setfileStatus("uploading");
      readXlsxFile(file).then((rows) => {
        setUploadButtonLabel("Validating");
        setHeaderData(rows[0]);
        const dropdownItems = rows[0].map(item=>{
          return {
            id: item,
            label: item,
          }
        })

        for(let i = 0; i < standardFile.length; i++){
          if(!rows[0].includes(standardFile[i])){
            setValidMessage(`${file.name} doesn't includes the required header: ${standardFile[i]}`);
            flag = "error";
            break;
          }
        }

        if(flag === "needMapping"){
          setNeedMapping(true);
        }else{
          sendDataToServer();
        }

        setItems(dropdownItems);
        setfileStatus("complete");
        setUploadButtonLabel("Validated")
      })
    }
    return(
      <div className="bx--grid bx--grid--full-width">
        <div className="bx--row file-uploader">
          <div className="bx--col fileUploader-container">
            <FileUploader
              accept={[".xlsx"]}
              buttonKind="primary"
              buttonLabel={uploadButtonLabel}
              onChange={(e)=>onFileChange(e)}
              filenameStatus={fileStatus}
              iconDescription="Clear file"
              labelDescription="only .xlsx files at 500mb or less"
              labelTitle="Data Quality Checker"
            />
          </div>
        </div>
        <br />
        {fileStatus === "complete" &&  
        <div className="bx--row validMessage">
          {validMessage === "successfull"
            ?
            ""
            :
            <>
            <span className="validation-message">{validMessage}</span>
            <br /> <br/>
            <span className="validation-message">Please check all the required file headers in the description, then try again .</span>
            </>
          }
        </div>}
          <Modal
          open={openModal}
          modalTitlePrimary="Confirmation"
          modalTitleSecondary="Please confirm that your file has all required header"
          modalBody="Please confirm that your file has all required header"
          primaryAction={()=>processFile()}
          secondaryButtonAction1={()=>setOpenModal(false)}
          secondaryButtonAction2={()=>mappingFields()}
          primaryButtonText="Yes"
          secondaryButtonText1="No"
          secondaryButtonText2="Need Mapping"
          />
          {
          needMapping
          ?
          <div>
            <FieldMapping
            items={items}
            onProcess={(map)=>processFile(map)}
            />
          </div>
          : 
          ""
          }
      </div>
    )
}

export default Uploader