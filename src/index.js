import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
 * React.StrictMode is being removed for the following reasons:
 * 1. Development-Only Warnings: The additional warnings provided by StrictMode 
 *    are causing confusion and are not currently providing significant value.
 * 2. Third-Party Library Issues: Certain third-party libraries used in this project 
 *    mau not fully be compatible with StrictMode, leading to unnece originssary warnings.
 * 3. Double Rendering: StrictMode intentionally double-invokes lifecycle methods 
 *    to detect side effects, but this is causing unexpected behaviors during development.
 * 
 * Note: Removing StrictMode does not affect the production build and the decision
 *       can be revisited later as needed.
 */
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>

);
