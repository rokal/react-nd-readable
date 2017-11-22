import React from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <Menu borderless>
      <Menu.Item >
        <Link to='/'><Header color='blue' as="h2"> Readable - RND </Header></Link>
      </Menu.Item>
    </Menu>
  )
}
export default NavBar