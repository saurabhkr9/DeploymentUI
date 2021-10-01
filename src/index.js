import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store'
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/Header';

const appContext=process.env.REACT_APP_CONTEXT_URL

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Header />
  
  <BrowserRouter basename={appContext}>
            <App basename={appContext}/>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
