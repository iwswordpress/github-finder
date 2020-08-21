import React, { Fragment, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import axios from 'axios';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    console.log('[APP] search term ', text);
    setLoading(true);
    console.log('get data via async/await...');
    const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    console.log('URl: ', url);
    const res = await axios.get(url);
    setUsers(res.data.items);
    setLoading(false);
    console.log(res.data.items);
  };

  const getUser = async (username) => {
    console.log('get data via async/await...');
    setLoading(true);
    const url = `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    console.log('URl: ', url);
    const res = await axios.get(url);

    console.log(res.data);
    setUser(res.data.items);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    console.log('get data via async/await...');
    setLoading(true);
    const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:desc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;

    console.log('URl: ', url);
    const res = await axios.get(url);

    console.log(res.data);

    setRepos(res.data);
    setLoading(false);
  };
  //Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar title='Github Finder' icon='fa fa-github' />
        <div className='container'>
          <Alert alert={alert} closeAlert={closeAlert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                    closeAlert={closeAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
