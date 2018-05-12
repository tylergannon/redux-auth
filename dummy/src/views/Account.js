import React from "react";
import { connect } from "react-redux";
import { SignOutButton } from "../../../src/views/bootstrap";
import { browserHistory } from "react-router";

class Account extends React.Component {
  render () {
    return (
      <div>
        <h1 className="page-header">Account page</h1>
        <p>This page should only visible to authenticated users.</p>
        <SignOutButton next={() => browserHistory.push("/")} />
      </div>
    );
  }
}

export default connect(({auth}) => ({auth}))(Account);
