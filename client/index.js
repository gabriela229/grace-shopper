import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, {saveState} from './store';
import { HashRouter as Router } from 'react-router-dom';
import Main from './Components/Main';

store.subscribe(() => {
  saveState({cart: store.getState().cart});
});


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('root')
);
