import React from 'react';
import rootReducer from './modules/root-reducer'
import MainLayout from './containers/MainLayout'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const composeMW = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeMW(
    applyMiddleware(thunk)
  )
)

const App = (props) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route path='/posts' component={MainLayout} />
          <Redirect from='/' to='/posts' />
        </Switch>
      </div>
    </Router >
  </Provider>
)

export default App
