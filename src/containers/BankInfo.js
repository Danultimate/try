import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateBankInfo } from '../actions/bankInfo';

class UpdateProfile extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    errorMessage: null,
    successMessage: null,
  }

  onFormSubmit = (data) => {
    const { onFormSubmit } = this.props;
    return onFormSubmit(data)
      .then(mes => {
        this.setState({ successMessage: "Tus datos se guardaron satisfactoriamente", errorMessage: null })})
      .catch((err) => { this.setState({ errorMessage: "Intenta de nuevo", successMessage: null }); throw err; });
  }

  render = () => {
    const {
      member,
      Layout,
      isLoading,
    } = this.props;

    const { successMessage, errorMessage } = this.state;

    return (
      <Layout
        member={member}
        loading={isLoading}
        error={errorMessage}
        success={successMessage}
        onFormSubmit={this.onFormSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: updateBankInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
