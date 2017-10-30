import React from 'react'
import { Grid} from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import NavBar from './NavBar'
import PostsPage from './posts/PostsPage'

const MainLayout = ({ match, location }) => (
  <div>
    <NavBar />
    <Grid centered>
      <Grid.Column width={12} style={{ minHeight: '74vh' }}>
        <Route exact path={match.url} component={PostsPage} />
        <Route path={`${match.url}/:id`} render={({match}) => <div>Post : {match.params.id}</div>} />
      </Grid.Column>
    </Grid>
  </div>
)
export default MainLayout
