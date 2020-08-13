import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  };
  onChange = (e) => {
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    console.log('SUBMIT ', this.state.text);
    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmitForm} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search users...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
