import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Dashboard from '../dashboard';
import SettingsMenu from '../settingsMenu';
import ApiItem from '../apiItem';
import Page404 from '../page404';
class App extends Component {

  render () {
    const tokenBrowser = localStorage.getItem('token');
    if(!this.props.token && !tokenBrowser) {
      return <Redirect to="/" />
    } else return (
      <div className="app">
        <Switch>
          <Route path='/settings' exact component={SettingsMenu}/>
          <Route path='/dashboard' exact component={Dashboard}/>
          <Route path='/dashboard/:id' render={
            ({match}) => {
              const {id} = match.params;
              return <ApiItem apiId={id} />
            }
          }/>
          <Route path='*' component={Page404}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({token}) => {
  return {
    token
  }
};

export default connect(mapStateToProps)(App);