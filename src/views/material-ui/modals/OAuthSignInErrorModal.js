import React from "react";
import red from 'material-ui/colors/red';
import { hideOAuthSignInErrorModal } from "../../../actions/ui";
import Icon from 'material-ui/Icon';
import Modal from "./Modal";

class OAuthSignInErrorModal extends React.Component {
  render () {
    return (
      <Modal
        {...this.props}
        containerClass="oauth-sign-in-error-modal"
        closeAction={hideOAuthSignInErrorModal}
        title="OAuth Sign In Error">
        <p
          className="inline-error-item"
          style={{paddingLeft: "20px", position: "relative", marginBottom: "28px"}}>
          <Icon
            viewBox="0 0 50 50"
            color={red[500]}
            style={{
              position: "absolute",
              left: 0,
            top: 3}}
            >
            error
          </Icon>
          There was an error authenticating your account. Please try again.
        </p>
      </Modal>
    );
  }
}

export default OAuthSignInErrorModal;
