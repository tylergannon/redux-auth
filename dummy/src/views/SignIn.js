import React from "react";
import { connect } from "react-redux";
import { EmailSignInForm } from "../../../src/views/bootstrap";
import { browserHistory } from "react-router";

class SignIn extends React.Component {
  render () {
    return (
      <div>
        <h1 className="page-header">Sign In</h1>

        <EmailSignInForm
          next={() => browserHistory.push("/account")}
          endpoint={this.props.pageEndpoint} />
      </div>
    );
  }
}

export default connect(({routes}) => ({routes}))(SignIn);
