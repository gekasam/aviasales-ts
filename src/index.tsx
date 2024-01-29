import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import AviasalesApp from './components/AviasalesApp';
import './assets/fonts/fonts.scss';
import './base/reset.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AviasalesApp />
    </Provider>
  </React.StrictMode>
);
