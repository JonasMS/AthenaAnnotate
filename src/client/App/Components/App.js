import React, { Component, PropTypes } from 'react';
import Loading from './Loading';
import Main from './Main';

class App extends Component {
  componentDidMount() {
    // TODO: make the below function take in user_id as argument
    this.props.loadDocs();
  }

  render() {
    const { loading } = this.props;

    return (
      // if its loading from DB, show loading page until its done
      loading ? <Loading /> : <Main />
    );
  }
}

App.propTypes = {
  loadDocs: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default App;
