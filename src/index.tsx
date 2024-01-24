import React from 'react';
import ReactDOM from 'react-dom/client';

import AviasalesApp from './views/components/AviasalesApp';
import './assets/fonts/fonts.scss';
import './base/reset.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AviasalesApp />
  </React.StrictMode>
);
