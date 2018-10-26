import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../actions/member';
import { shopify } from '../actions/shopify';
import {getContents} from '../actions/contents';
import API from '../constants/api';

export function getSellerData() {

  API.get('/sellers')
  .then((res)=>{ 
    console.log('getSellerData succeed')
    console.log(res.data)
    return res.data
  })
  .catch((res)=>{ 
    console.log('Error @getSellerData:')
    console.log(res)
  })
}

class Dashboard extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    fetchContent: PropTypes.func.isRequired,
    contents: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
  }

  static defaultProps = {
    match: null,
  }


  componentDidMount = () => {
    const { fetchData, fetchContent } = this.props;
    fetchData();
    fetchContent();
  }

  render = () => {
    const { Layout, member, memberLogout, match, contents } = this.props;

    const id = (match && match.params && match.params.id) ? match.params.id : null;
    const shopify_client = shopify();

    console.log('this are the collectios')
    console.log(contents)
    //const seller_data = getSellerData();

    return (<Layout 
      member={member} 
      logout={memberLogout} 
      shopify={shopify_client}
      contentId={id}
      contents={contents}
      //seller={seller_data}
      />);
  }
}



const mapStateToProps = state => ({
  member: state.member || {},
  contents: state.contents || [],
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
  fetchContent: getContents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
