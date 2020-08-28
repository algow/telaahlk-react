import React, { Component } from 'react';
import {
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';

function telaahWrapper(key, title, WrappedComponent) {
  class Content extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expand: false
      }
    }
  
    handleActionClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    }
    
    render() {
      return(
        <Segment stacked>
          <Menu 
            inverted
            pointing
            size='huge'  
          >
            <Menu.Item 
              header
              active={true}
            >
              {title}
            </Menu.Item>
            <Menu.Menu
              position='right'
              style={{backgroundColor: '#3d3d3d'}}
            >
              <Menu.Item
                name='expand'
                onClick={this.handleActionClick}
              >
                <Icon name={this.state.expand ? 'compress' : 'expand'} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Segment>
            { this.state.expand && 
              <WrappedComponent content={this.props.content} />
            }
          </Segment>
        </Segment>
      );
    }
  }
  
  return Content;
}

export default telaahWrapper;