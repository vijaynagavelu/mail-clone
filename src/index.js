import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Routerpage from './Routerpage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <style>
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap');
    </style> */}
    <Routerpage />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//      Root
//       |
//      App
//       |
//    [Content]
//       |
//   [SubContent]