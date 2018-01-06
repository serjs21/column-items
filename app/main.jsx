import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import app from './components/reducers/data-reducers'
import App from './components/App'

let store      = createStore(app);
window.__store = store;
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.body.appendChild(document.createElement('div'))
);
