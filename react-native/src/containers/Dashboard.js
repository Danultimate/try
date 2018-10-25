import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';

import { shopify, getSharableCollections } from '../actions/shopify';

import API from '../constants/api';

export function getSellerData() {

  API.get('/sellers')
  .then((res)=>{ 
    console.log('getSellerData succeed')
    console.log(res.data)
    return res.data
  })
  .catch((res)=>{ 
    console.log('Erro @getSellerData:')
    console.log(res)
  })
}

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
    const seller_data = getSellerData();
    return <Layout member={member} logout={memberLogout} shopify={shopify_client} seller={seller_data}/>;
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
