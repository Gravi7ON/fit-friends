import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-router/history-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>
);
