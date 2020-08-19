import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';

// import 'semantic-ui-css/semantic.min.css';
import './index.scss';

import Store from '~/state/Store';
import App from '~/containers/App';

ReactDOM.render(
  <StoreProvider store={Store}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
