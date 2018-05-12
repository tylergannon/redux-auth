import React from "react"
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ErrorList from "../ErrorList";
import { connect } from "react-redux";

class BaseModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    errorAddr: PropTypes.array,
    closeBtnLabel: PropTypes.string
  };

  static defaultProps = {
    isOpen: false,
    errorAddr: null,
    closeBtnLabel: "Ok"
  };

  close () {
    this.props.dispatch(this.props.onClose());
  }

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  getErrorList () {
    let [base, ...rest] = this.props.errorAddr;
    return <ErrorList errors={this.props.auth.getIn([
      base, this.getEndpoint(), ...rest
    ])} />
  }

  render () {
    let body = (this.props.errorAddr)
      ? this.getErrorList()
      : this.props.children;

    return (
      <Modal
        isOpen={this.props.isOpen}
        className={`redux-auth-modal ${this.props.className}`}
        onClose={this.close.bind(this)}>
        <ModalHeader closeButton>
          <ModalTitle>{this.props.title}</ModalTitle>
        </ModalHeader>

        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button
            onClick={this.close.bind(this)}
            className={`${this.props.containerClass}-close`}>
            {this.props.closeBtnLabel}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(state => ({ auth: state.get('auth') }))(BaseModal);
