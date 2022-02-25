import './DataQualityCheck.scss';
import {useState} from 'react';
import Uploader from './FileUploader/Uploader.js';
import FileProcessor from './FileProcessor/FileProcessor.js';
import Results from './FileProcessor/Results'

const DataQualityCheck = () => {
    const [response, setresponse] = useState(false)
    const handleResponse = (response) => {
        setresponse(response);
    }
  return (
    <div className="bx--grid bx--grid--full-width">
        { 
        response ? 
        <div className="bx--row data-quality-results">
        <Results />
        </div>
        : 
        <div className="bx--row data-quality-page">
            <div className="bx--col-lg-4 data-quality-check-desc-container">
                <span className="data-quality-check-title">
                    Data Quality Check
                </span>
                <p className="data-quality-check-para">
                     Here goes the discription of this page.
                </p>
                <p className="data-quality-check-para">
                    standards to check the quality of data
                </p>
                <p className="data-quality-check-para">
                    With a standard File Format
                </p>
            </div>
            <div className="bx--col-lg-7">
                <div className="data-quality-upload-container">
                    <Uploader
                    onResponce={(res)=>handleResponse(res)}
                    />
                </div>
                <div className="data-quality-processor-container">
                    {/* <FileProcessor data={response} /> */}
                </div>
            </div>
        </div>
       
        }
    </div>
  );
}

export default DataQualityCheck;