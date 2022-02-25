import { ComposedModal,Button,ModalHeader,ModalFooter,ModalBody} from 'carbon-components-react';
import './Modal.scss';
     
const Modal = (props) => {
    const [open,setOpen]=[props.open]
  return (
    <ComposedModal
    preventCloseOnClickOutside
    onClose={()=>setOpen(false)}
    size={props.size? props.size:"md"}
    open={props.open && open}
    >
    <ModalHeader>
    <span className="modal-header-primary">
         {props.modalTitlePrimary} 
    </span>
    <div className="bx--form__helper-text">{props.modalTitleSecondary}</div>
    </ModalHeader>
    <ModalBody hasForm>
    <div>
        {props.modalBody}
    </div>   
    </ModalBody>
      <ModalFooter>
        <Button
          kind="secondary"
          onClick={props.secondaryButtonAction1 }>
          {props.secondaryButtonText1}
        </Button>
        <Button
          kind="secondary"
          onClick={props.secondaryButtonAction2 }>
          {props.secondaryButtonText2}
        </Button>
        <Button
          kind={props.danger?"danger":"primary"}
          onClick={props.primaryAction}>
          {props.primaryButtonText}
        </Button>
      </ModalFooter>
</ComposedModal>
  )
};

export default Modal;
