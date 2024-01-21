import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ResponsiveAppBar from './Navbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode does:
  // - Your components will re-render an extra time to find bugs caused by impure rendering.
  // - Your components will re-run Effects an extra time to find bugs caused by missing Effect cleanup.
  // - Your components will be checked for usage of deprecated APIs.
  <React.StrictMode>
    <ResponsiveAppBar />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
