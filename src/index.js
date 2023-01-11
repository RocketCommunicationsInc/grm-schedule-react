import React from 'react';
import ReactDOM from 'react-dom/client';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';

import App from 'components/App';
import AppProvider from './providers/AppProvider';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
