 import ToasterNotification from './ToasterNotification';



import React from 'react';
import PropTypes from 'prop-types';
import { ToasterApi } from './ToasterApi';
import './Toaster.scss'


const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool
};


class Toaster extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        toasts: []
      };
  }

  componentDidMount() {

      // subscribe to new toast notifications
      this.subscription = ToasterApi.onToast(this.props.id)
          .subscribe(toast => {
              // clear toasts when an empty toast is received
              if (!toast.message) {
                  // filter out toasts without 'keepAfterRouteChange' flag
                  const toasts = this.state.toasts.filter(x => x.keepAfterRouteChange);

                  // remove 'keepAfterRouteChange' flag on the rest
                  toasts.forEach(x => delete x.keepAfterRouteChange);

                  this.setState({ toasts });
                  return;
              }

              // add toast to array
              this.setState({ toasts: [...this.state.toasts, toast] });
              if(ToasterApi.toastTimeout){
                setTimeout(()=>{
                  this.removeToast(toast)
                },ToasterApi.toastTimeout)
              }
              
          });

  }

  componentWillUnmount() {
      // unsubscribe & unlisten to avoid memory leaks
      this.subscription.unsubscribe();

  }

  removeToast(toast) {
      this.setState({ toasts: this.state.toasts.filter(x => x !== toast) })
  }

  render() {
      const { toasts } = this.state;
      if (!toasts.length) return null;
      return (
         
          <div >
              {toasts.map((toast, index) =>
                  <div key={index}>
                      <ToasterNotification  toast={toast} />
                  </div>
              )}
              
          </div>
          
      );
  }
}

Toaster.propTypes = propTypes;
export { Toaster };