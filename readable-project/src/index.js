import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// import App from './App';
import Readable from './Readable'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Readable />, document.getElementById('root'));
registerServiceWorker();
