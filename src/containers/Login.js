import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login, fbLogin } from '../actions/member';

class Login extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    locale: PropTypes.string,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onFormWithFBSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
  }

  static defaultProps = {
    locale: null,
  }

  state = {
    errorMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  onFormWithFBSubmit = (data) => {
    const { onFormWithFBSubmit } = this.props;
    return onFormWithFBSubmit(data)
      .catch((err) => { this.setState({ errorMessage: err }); throw err; });
  }

  render = () => {
    const {
      member,
      locale,
      Layout,
      isLoading,
      successMessage,
    } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        member={member}
        locale={locale}
        loading={isLoading}
        error={errorMessage}
        success={successMessage}
        onFormSubmit={this.onFormSubmit}
        onFormWithFBSubmit={this.onFormWithFBSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  locale: state.locale || null,
  isLoading: state.status.loading || false,
  successMessage: state.status.success || '',
});

const mapDispatchToProps = {
  onFormSubmit: login,
  onFormWithFBSubmit: fbLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
