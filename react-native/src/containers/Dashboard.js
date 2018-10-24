import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';

import { shopify, getSharableCollections } from '../actions/shopify';

import API from '../constants/api';
import axios from 'axios';

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

    // Test axios
    console.log('ok al menos entra aca ._.')
    const data = {
      'username': 3205845248,
      'password': ''
    }
    axios.get('https://localhost:5000/api/contents').then((res)=> {
      console.log('ok axios sirve 0 ')
    })
    .catch((res)=>{
      console.log('ok no sirvio 0 pero:')
      console.log(res)
    })
    API.get('/contents').then((res)=> {
      console.log('ok axios sirve 1')
    })
    .catch((res)=>{
      console.log('ok no sirvio 1 pero:')
      console.log(res)
    })
    API.post('/login_admin', data,{
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((response)=>{
      console.log('a ver si hizo esta shit: '+ response.data)
      API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
    })
    .catch((res)=>{
      console.log('ok no sirvio 2 pero:')
      console.log(res)
    })
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
