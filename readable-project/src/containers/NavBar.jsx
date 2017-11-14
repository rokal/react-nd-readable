import React from 'react'
import { Menu, Header } from 'semantic-ui-react'

const NavBar = (props) => {
  return (
    <Menu borderless>
      <Menu.Item >
        <Header as="h2"> Readable - RND </Header>
      </Menu.Item>
    </Menu>
  )
}
export default NavBar