import './ModalBox.scss'
import { ComposedModal,Button,ModalHeader,ModalFooter,ModalBody} from 'carbon-components-react';


export default function ConfirmModal(props) {

  const [open,setOpen]=[props.open,props.setOpen]

  return (<div >
    
        {open?
          <ComposedModal preventCloseOnClickOutside hasForm onClose={()=>setOpen(false)} size={props.size? props.size:"md"}  open={open}>
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
          </ ModalBody>
            <ModalFooter>
              <Button
                kind="secondary"
                onClick={() => { setOpen(false); }}>
                Cancel
              </Button>
              <Button
                kind={props.danger?"danger":"primary"}
                onClick={() => { props.modalAction() ;setOpen(false); }}>
                {props.primaryAction}
              </Button>
            </ModalFooter>
</ComposedModal>:null}</div>

);
}
