import React from 'react';
import rootReducer from './modules/root-reducer'
import MainLayout from './containers/MainLayout'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import ReduxToastr from 'react-redux-toastr'
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
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
      </div>
    </Router >
  </Provider>
)

export default App
