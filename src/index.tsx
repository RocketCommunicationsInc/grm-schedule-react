import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import AppProvider from 'providers/AppProvider';
import { TTCGRMProvider } from '@astrouxds/mock-data';
import './index.css';

const contactsOptions = {
  initial: 50,
  limit: 50,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TTCGRMProvider options={contactsOptions}>
      <AppProvider>
        <App />
      </AppProvider>
    </TTCGRMProvider>
  </React.StrictMode>
);
