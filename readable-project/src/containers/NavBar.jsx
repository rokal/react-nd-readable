import React from 'react'
import { Menu, Header, Dropdown, Input } from 'semantic-ui-react'

const options = [
  { key: 'page', text: 'This Page', value: 'page' },
  { key: 'org', text: 'This Organization', value: 'org' },
  { key: 'site', text: 'Entire Site', value: 'site' },
]

const NavBar = (props) => (
  <Menu borderless>
    <Menu.Item >
      <Header as="h2"> Readable - RND </Header>
    </Menu.Item>

    <Menu.Menu position='right'>
      <Menu.Item name='help' >
        <Input
          action={<Dropdown button basic floating options={options} defaultValue='page' />}
          icon='search'
          iconPosition='left'
          placeholder='Search...'
        />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
)
export default NavBar