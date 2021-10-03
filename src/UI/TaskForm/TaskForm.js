import './TaskForm.scss';
import { TextInput } from 'carbon-components-react';
export const TaskForm = (props) => {

    return(
        <>
        <div class="bx--grid">
        <div class="bx--row">
    <div class="     taskFormCol">
        <p>id:</p>
    <TextInput
        id="test2"
        defaultValue={props.task.id}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
    <div class="bx--col taskFormCol">
    <p>Title:</p>
    <TextInput
        id="test2"
        defaultValue={props.task.title}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
    <div class="bx--col taskFormCol">
    <p>Owner:</p>
    <TextInput
        id="test2"
        defaultValue={props.task.owner}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
         </div>
         <div class="bx--row">
    <div class="bx--col taskFormCol">
    <p>Description</p>
    <TextInput
        id="test2"
        defaultValue={props.task.des}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
    <div class="bx--col taskFormCol">
    <p>Status</p>
    <TextInput
        id="test2"
        defaultValue={props.task.status}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
    <div class="bx--col taskFormCol">
    <p>End Date</p>
    <TextInput
        id="test2"
        defaultValue={props.task.endDate}
        invalidText="A valid value is required"
        placeholder="Placeholder text"
      />
    </div>
         </div>
</div>
        </>
)};