import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import {
  Sidebar,
  Menu
} from 'semantic-ui-react';

class Sider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebar: [
        { name: 'Home', icon: 'home', route: '/' },
        { name: 'Upload', icon: 'upload', route: '/upload' },
        { name: 'Telaah', icon: 'line graph', route: '/telaah' },
        { name: 'Satker', icon: 'users', route: '/satker' }
      ]
    }
  }

  render() {
    return (
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="left"
        fixed="left"
        icon='labeled'
        inverted
        vertical
        width='thin'
        visible={this.props.visible}
        onHide={ this.props.handleToggleSidebar }
        style={{ height: '100vh', paddingTop: 75, zIndex: 1 }}
      >
        {this.state.sidebar.map( (value, key) =>
          <Link to={value.route} key={key}>
            <Menu.Item
              key={key}
              name={value.name}
              icon={value.icon}
              style={{ fontSize: 20 }}
            />
          </Link>
        )}
      </Sidebar>
    );
  }
}

export default Sider;