import {useState, useEffect} from 'react';

const FileProcessor = (props) => {
    const [Fields, setFields] = useState("")

    useEffect(() =>{
        if(props.data.response2){
            const data = props.data.response2;
            let TicketDataFields = "";
            for(let i=0;i<data.length;i++) {
                TicketDataFields += data[i] + ", ";
            }
            setFields(TicketDataFields);

            const obj = props.data.resp_relt_df;
            console.log(obj);
        }
    },[props])

    

    return(

        <div className="bx--grid">
            <div className="bx--row">
                <p>
                 {/* <b>Ticket Data Fields: </b>{Fields} */}
                </p>
            </div>
            <div className="bx--row">
                <div className="bx--col">

                </div>
                <div className="bx--col">

                </div>
            </div>
        </div>
    )
}

export default FileProcessor;