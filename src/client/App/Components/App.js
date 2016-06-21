import React, { Component, PropTypes } from 'react';
import Loading from './Loading';
import Main from './Main';
import Sidebar from './Sidebar';

class App extends Component {
  componentDidMount() {
    // TODO: make the below function take in user_id as argument
    this.props.loadDocs();
  }

  render() {
    const { loading } = this.props;

    return (
      <div className="row">
        <Sidebar />
        {loading ? <Loading /> : <Main />}
      </div>
    );
  }
}

App.propTypes = {
  loadDocs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default App;
