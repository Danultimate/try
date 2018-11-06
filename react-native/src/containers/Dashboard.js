import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logout, getMemberData } from '../actions/member';
import { shopify } from '../actions/shopify';
import {getContents} from '../actions/contents';



class Dashboard extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    //fetchContent: PropTypes.func.isRequired,
    // contents: PropTypes.shape({
    //   isLoading: PropTypes.bool.isRequired,
    //   error: PropTypes.string
    // }).isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({})
    })
  };

  static defaultProps = {
    match: null
  };

  componentDidMount = () => {
    const { fetchData, fetchContent } = this.props;
    //registerForPushNotificationsAsync();
    fetchData();
    // fetchContent();
  };

  render = () => {
    const { Layout, member, memberLogout, match } = this.props;

    const id =
      match && match.params && match.params.id ? match.params.id : null;
//    const shopify_client = shopify();

    return (<Layout 
      member={member} 
      logout={memberLogout} 
      //shopify={shopify_client}
      // contentId={id}
      // contents={feed}
      />);
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
  contents: state.contents || [],
  seller: state.seller || [],
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
  //fetchContent: getContents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
