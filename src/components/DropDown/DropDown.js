import { Dropdown} from 'carbon-components-react';

const DropdownComponent = (props) => {
    const textField = props.textField
    return (
        <div style={{ width: "100%" }}>
            <Dropdown light={props.noLight ? false : true}
              id={props.id ?? "default"}
              titleText={props.title ?? null}
              helperText={props.helperText ?? "Select an option"}
              label={props.label ?? ""}
              items={props.items}
              itemToString={(item) => (item ? item[textField] : '')}
              initialSelectedItem={props.initialSelectedItem !== undefined && props.initialSelectedItem[0]}
              onChange={({selectedItem})=>props.onChange(selectedItem)}
              size={props.size ?? "lg"}
            />
        </div>
    )
}

export default DropdownComponent;