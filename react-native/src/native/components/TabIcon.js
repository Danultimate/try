import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ""
};

const TabIcon = props => (
  <Icon
    type="FontAwesome"
    name={props.iconName}
    style={{ width: 28, color: props.focused ? "#0089FF" : "#A492D1" }}
  />
);

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

// class TabIcon extends React.Component {
//   render() {
//     console.log(this);
//     var color = this.props.focused
//       ? this.props.activeTintColor //'#3b5998'
//       : this.props.inactiveTintColor; //'#93a8d5'
//
//     let componentBody = (
//       <Icon
//         style={{ color: color, width: 40, height: 40 }}
//         name={this.props.iconName}
//         size={30}
//       />
//     );
//
//     return componentBody;
//   }
// }

export default TabIcon;
