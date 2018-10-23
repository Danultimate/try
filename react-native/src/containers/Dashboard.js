import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';

import Shopify from "shopify-buy";
const acessToken = "c00853c510a8221f272e03e862d884d7";
const storeName = "descubre-belleza.myshopify.com";

const shopify = Shopify.buildClient({
  domain: storeName,
  storefrontAccessToken: acessToken
});



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

    return <Layout member={member} logout={memberLogout} shopify={shopify}/>;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  shopify: state.shopify || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
