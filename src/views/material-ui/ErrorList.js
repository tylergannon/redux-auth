import React, { PropTypes } from "react";
import red from 'material-ui/colors/red';
import Immutable from "immutable";
import Icon from 'material-ui/Icon';

class ErrorList extends React.Component {
  static propTypes = {
    errors: PropTypes.object
  };

  static defaultProps = {
    errors: Immutable.fromJS([])
  };

  renderErrorList () {
    let errorCount = (this.props.errors || Immutable.fromJS([])).size;

    if (errorCount > 0) {
      // pluralize message
      let errorWord = "error";
      errorWord += (errorCount === 1) ? "" : "s";

      return (
        <div className="has-error">
          <p>Please correct the following {errorWord}:</p>
          {this.props.errors.map((err, i) => {
            return (
              <p
                key={i}
                className="control-label modal-error-item"
                style={{paddingLeft: "20px", position: "relative"}}>

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
                {err}
              </p>
            );
          })}
        </div>
      );
    } else {
      return (
        <p style={{paddingLeft: "20px", position: "relative"}}>
          <Icon
            viewBox="0 0 50 50"
            style={{
              position: "absolute",
              left: 0,
              top: 3}}
            color={red[500]}
            >
            error
          </Icon>
          There was an error processing this form.
          Please check each field and try again.
        </p>
      );
    }
  }

  render () {
    return (
      <div className="auth-error-message">
        {this.renderErrorList()}
      </div>
    );
  }
}

export default ErrorList;
