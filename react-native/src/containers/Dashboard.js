import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';

import { shopify, getSharableCollections } from '../actions/shopify';

class Dashboard extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  }

  render = () => {
    const { Layout, member, memberLogout } = this.props;
    const shopify_client = shopify();
    const collections = getSharableCollections();
    return <Layout member={member} logout={memberLogout} shopify={shopify_client}/>;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
