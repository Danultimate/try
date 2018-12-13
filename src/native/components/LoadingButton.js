import React from "react";
import PropTypes from "prop-types";
import {Button, Text} from "native-base";

class LoadingButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false
    };
  }

  handleClick() {
    this.setState({ isLoading: true });

    // This probably where you would have an `ajax` call
    setTimeout(() => {
      // Completed of async action, set loading state back
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const { isLoading } = this.state;
    console.log(this.props.style)
    return (
    <Button
        style={this.props.style}
        disabled={isLoading}
        onPress={!isLoading ? this.handleClick : null}
      >
        <Text>{isLoading ? 'Loading...' : 'Loading state'}</Text>
    </Button>
    );
  }
}

LoadingButton.propTypes = {
    error: PropTypes.string
  };
  
LoadingButton.defaultProps = {
error: null
};


export default LoadingButton;
