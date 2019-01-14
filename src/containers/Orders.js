import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getOrderData } from '../actions/orders';

class Orders extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: null
  };

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  };

  render = () => {
    const { Layout, member, fetchData } = this.props;

    return (<Layout member={member} fetchData={fetchData} />);
  }
}

const mapStateToProps = state => ({
  member: state.member || {}
});

const mapDispatchToProps = {
  fetchData: getOrderData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
