import React, { Component } from 'react';
import { getUserData, removeUserData } from '../helpers/index';
import {
  Menu,
  Responsive,
  Button,
  Icon,
  Dropdown
} from 'semantic-ui-react';

class Headers extends Component {
  render() {
    const trigger = <span>{ getUserData().nama }</span>;

    return (
      <Menu borderless inverted color="teal" fixed="top" size="large">
        <Menu.Item style={{ width:230, fontSize:17 }}>
          <Responsive minWidth={720} maxWidth={1920}>
            HEADER
          </Responsive>
          <Responsive minWidth={720} maxWidth={1920}>
            <Button
              icon
              color="teal"
              style={{ marginLeft: "50px" }}
              onClick={ this.props.handleToggleSidebar }
            >
              <Icon name="sidebar" />
            </Button>
          </Responsive>
        </Menu.Item>

        <Menu.Menu position="right">
          <Responsive minWidth={720} maxWidth={1920}>
            <Dropdown
              trigger={trigger}
              icon={null}
              className="link item"
              style={{ height: '100%' }}
            >
              <Dropdown.Menu >
                <Dropdown.Item
                  onClick={ () => {
                    removeUserData();
                    window.location.reload();
                  }}
                >
                  <Icon name='sign-out' />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Responsive>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Headers;