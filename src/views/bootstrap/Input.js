import React from "react"
import PropTypes from 'prop-types'
import { Input } from 'reactstrap';
import Immutable from "immutable";

class AuthInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    errors: PropTypes.object,
    groupclassname: PropTypes.string
  };

  static defaultProps = {
    label: "",
    value: null,
    errors: Immutable.fromJS([])
  };

  handleInput (ev) {
    this.props.onChange(ev.target.value);
  }

  renderErrorList () {
    if (this.props.errors.size) {
      return (
        <div className='auth-error-message has-error'>
          {this.props.errors.map((err, i) => {
            return (
              <p className="control-label inline-error-item"
                 style={{paddingLeft: "20px", position: "relative", marginBottom: "28px"}}
                 key={i}>

                <i className="fas fa-exclamation"
                           style={{
                             position: "absolute",
                             left: 0,
                             top: 2
                           }}
                /> {this.props.label} {err}
              </p>
            );
          })}
        </div>
      );
    } else {
      return <span />;
    }
  }

  render () {
    return (
      <div>
        <Input {...this.props}
               className={(this.props.errors.size) ? "is-invalid" : "is-valid"}
               onChange={this.handleInput.bind(this)} />
        {this.renderErrorList()}
      </div>
    );
  }
}

export default AuthInput;
