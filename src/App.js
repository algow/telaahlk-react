import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { isAuthenticated } from './helpers/index';
import Login from './views/Login';
import Header from './components/header';
import Sider from './components/sider';
import Profil from './views/Profil';
import Upload from './views/Upload';
import Telaah from './views/telaah/Telaah';
import Satker from './views/Satker';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sider: {
        visible: false
      }
    }
  }

  toggleSidebar = () => {
    this.setState({sider: {visible: !this.state.sider.visible}});
  }

  render() {
    return(
      <div style={{backgroundColor: '#e5e5e5', height: '100vh' }}>
        <SemanticToastContainer />
        <Grid
          textAlign="center"
          style={{ height: '100%', marginTop: '0' }}
          verticalAlign="middle"
        >
          {
            isAuthenticated() ? 
            <Router>
            <main className="content-right" style={{ fontSize: 18 }}>
              <Header handleToggleSidebar={this.toggleSidebar} />
              <Sider visible={this.state.sider.visible} handleToggleSidebar={this.toggleSidebar} />
              <Switch>
                <Route exact path="/" render={ props => <Profil {...props} /> } />
                <Route exact path="/upload" render={ props => <Upload {...props} /> } />
                <Route exact path="/telaah" render={ props => <Telaah {...props} /> } />
                <Route exact path="/satker" render={ props => <Satker {...props} /> } />
              </Switch>
            </main>
            </Router>
            :
            <Grid.Column style={{ maxWidth: 600 }}>
              <Login />
            </Grid.Column>
          }
        </Grid>
      </div>
    )
  }
}

export default App;
