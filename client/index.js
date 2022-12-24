import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

//Step-user2b: import this //es6 code from website https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//Step-user2c: import this //es6 code from npmjs website https://www.npmjs.com/package/react-bootstrap-table2-paginator
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>{<App />}</BrowserRouter>);


