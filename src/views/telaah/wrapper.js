import React, { Component } from 'react';
import {
  Icon,
  Menu,
  Segment
} from 'semantic-ui-react';

function telaahWrapper(key, title, WrappedComponent) {
  class Content extends Component {
    constructor() {
      super();
      this.state = {
        expand: true,
        keterangan: []
      }
    }
  
    handleActionClick = () => {
      this.setState({
        expand: !this.state.expand
      })
    }

    handleKeteranganClick = key => {
      let copyKeterangan = JSON.parse(JSON.stringify(this.state.keterangan));
      copyKeterangan[key] = !copyKeterangan[key];

      this.setState({
        keterangan: copyKeterangan
      });
      console.log(this.state.keterangan);
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
              <WrappedComponent 
                content={this.props.content} 
                keterangan={this.state.keterangan}
                onKeteranganChange={this.handleKeteranganClick} 
              />
            }
          </Segment>
        </Segment>
      );
    }
  }
  
  return Content;
}

export default telaahWrapper;