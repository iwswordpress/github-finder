import React, { Component } from 'react';
import './App.css';

class App extends Component {
  foo = () => 'BarBar';

  render() {
    const name = 'Craig';
    const loading = false;
    const showName = true;
    return (
      <div className='App'>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <h1>
            Hello {showName && name.toLocaleUpperCase()} {1 + 1} from React{' '}
            {this.foo()}
          </h1>
        )}
      </div>
    );
  }
}

export default App;
