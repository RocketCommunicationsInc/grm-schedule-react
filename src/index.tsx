import React from 'react';
import ReactDOM from 'react-dom/client';
import { TTCGRMProvider } from '@astrouxds/mock-data';
import App from 'components/App';
import AppProvider from 'providers/AppProvider';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const options = {
  alertsPercentage: 0 as const,
  initial: 50,
  limit: 50,
};

root.render(
  <React.StrictMode>
    <TTCGRMProvider options={options}>
      <AppProvider>
        <App />
      </AppProvider>
    </TTCGRMProvider>
  </React.StrictMode>
);
