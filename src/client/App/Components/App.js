import React, { Component, PropTypes } from 'react';
import Loading from './Loading';
import Main from './Main';

class App extends Component {
  componentDidMount() {
    this.props.loadDocs();
  }

  render() {
    const { loading } = this.props;

    return (
      loading ? <Loading /> : <Main />
    );
  }
}

App.propTypes = {
  loadDocs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default App;
