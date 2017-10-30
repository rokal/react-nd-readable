import React from 'react'
import { Menu, Header, Icon, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <Menu borderless>
      <Menu.Item >
        <Header as="h2"> Readable - RND </Header>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item name='help' >
          <Button color='green' type='button' as={Link} to={`/posts/create`}>
            <Icon name='plus' /> New post
        </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
export default NavBar