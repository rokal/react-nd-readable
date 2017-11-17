import React from 'react'
import { Grid} from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import NavBar from './NavBar'
import PostsPage from './posts/PostsPage'
import EditPostPage from './posts/EditPostPage'
import Sidebar from './Sidebar'

const MainLayout = ({ match, location }) => (
  <div>
    <NavBar params={match.params} />
    <Grid centered>
      <Grid.Column width={4} style={{ minHeight: '74vh' }}>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width={9} style={{ minHeight: '74vh' }}>
        <Route exact path={match.url} component={PostsPage} />
        <Route path={`${match.url}/:id`} component={EditPostPage} />
      </Grid.Column>
    </Grid>
  </div>
)
export default MainLayout
