import {useState,useEffect} from 'react';
import {Dropdown,Button } from 'carbon-components-react'

const FieldMapping = (props) => {
  const [disabled,setDisabled]=useState(true)
  const [fieldMapping, setFieldMapping] = useState({})
  useEffect(() => {
    if(Object.keys(fieldMapping).length > 5){
      setDisabled(false)
    }
  },[fieldMapping])
return (<>
      <span className="field-mapping-title">
        Please select column header for every field :
      </span>
      <br /> <br />
      <div className="bx--row">
        <div className="bx--col">
          <p> Ticket Id : </p>
        </div>
        <div className="bx--col">
          <Dropdown
            ariaLabel="Dropdown"
            id="carbon-dropdown-example"
            items={props.items}
            label="Options"
            onChange={(event) =>{setFieldMapping({...fieldMapping, "TicketIdField": event.selectedItem.label})}}
           />
        </div>
<div className="bx--col">
  <p> Ticket Created Date : </p>
</div>
<div className="bx--col">
<Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={props.items}
      label="Options"
      onChange={(event) =>{setFieldMapping({...fieldMapping, "CreatedDateField": event.selectedItem.label})}}
    />
</div>
</div>
<div className="bx--row" style={{marginTop:"20px"}}>
<div className="bx--col">
  <p> Short Description : </p>
</div>
<div className="bx--col">
<Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={props.items}
      onChange={(event) =>setFieldMapping({...fieldMapping, "ShortDescField": event.selectedItem.label})}
      label="Options"
    />
</div>
<div className="bx--col">
  <p> Description : </p>
</div>
<div className="bx--col">
<Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={props.items}
      onChange={(event) =>setFieldMapping({...fieldMapping, "DescField": event.selectedItem.label})}
      label="Options"
    />
</div>
</div>
<div className="bx--row" style={{marginTop:"20px"}}>
<div className="bx--col">
  <p> Assigned Group : </p>
</div>
<div className="bx--col">
<Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={props.items}
      onChange={(event) =>setFieldMapping({...fieldMapping, "AssignedGroupField": event.selectedItem.label})}
      label="Options"
    />
</div>
<div className="bx--col">
  <p> Resolution Notes : </p>
</div>
<div className="bx--col">
<Dropdown
      ariaLabel="Dropdown"
      id="carbon-dropdown-example"
      items={props.items}
      onChange={(event) =>setFieldMapping({...fieldMapping, "NotesField": event.selectedItem.label})}
      label="Options"
    />
</div>
</div>

<br /> <br /> 

<Button 
onClick={()=>props.onProcess(fieldMapping)}
disabled={disabled}
>
  Process
</Button>

</> )
}

export default FieldMapping;