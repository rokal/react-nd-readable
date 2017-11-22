import React from 'react';
import thunk from 'redux-thunk'
import ReduxToastr from 'react-redux-toastr'
import {Grid} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './modules/root-reducer'

import Home from './views/Home'
import CategoryView from './views/CategoryView'
import PostDetailsView from './views/PostDetailsView'
import NavBar from './views/NavBar'


const composeMW = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeMW(
    applyMiddleware(thunk)
  )
)

const Readable = (props) => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Grid centered>
          <Grid.Column width={16} style={{ minHeight: '74vh' }}>
            <Switch>
              <Route path='/:categoryId/:postId' component={PostDetailsView} />
              <Route path='/:categoryId' component={CategoryView} />
              <Route exact path='/' component={Home} />
            </Switch>
          </Grid.Column>
        </Grid>

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

export default Readable
