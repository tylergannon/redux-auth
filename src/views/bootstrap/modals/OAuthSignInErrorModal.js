import React from "react";
import Modal from "./Modal";
import { hideOAuthSignInErrorModal } from "../../../actions/ui";

class OAuthSignInErrorModal extends React.Component {
  render () {
    return (
      <Modal
        isOpen={this.props.show}
        className="oauth-sign-in-error-modal"
        onClosed={hideOAuthSignInErrorModal}
        title="OAuth Sign In Error">
        <p>
        <i className="fas fa-exclamation" /> There was an error
          authenticating your account. Please try again.
        </p>
      </Modal>
    );
  }
}

export default OAuthSignInErrorModal;
