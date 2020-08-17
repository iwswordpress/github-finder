import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // async componentDidMount() {
  //   console.log('Client_ID: ', process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   console.log('Client_SECRET: ', process.env.REACT_APP_GITHUB_CLIENT_SECRET);

  //   this.setState({ loading: true });
  //   console.log('get data via async/await...');
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ users: res.data, loading: false });
  //   console.log(res.data);
  // }
  searchUsers = async (text) => {
    console.log('[APP] search term ', text);
    this.setState({ loading: true });
    console.log('get data via async/await...');
    const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    console.log('URl: ', url);
    const res = await axios.get(url);
    this.setState({ users: res.data.items, loading: false });
    console.log(res.data.items);
  };
  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    //setTimeout(() => this.setState({ alert: null }), 7000);
  };

  closeAlert = () => {
    this.setState({ alert: null });
  };
  render() {
    const { users, loading } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fa fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} closeAlert={this.closeAlert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                      closeAlert={this.closeAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
