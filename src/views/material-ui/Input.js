import React, {PropTypes} from "react";
import red from 'material-ui/colors/red';
import TextField from "material-ui/TextField";
import Icon from 'material-ui/Icon';
import Immutable from "immutable";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AuthInput extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    errors: PropTypes.object
  };

  static defaultProps = {
    label: "",
    value: null,
    errors: Immutable.fromJS([])
  };

  handleInput (ev) {
    ev.preventDefault();
    this.props.onChange(ev.target.value);
  }

  renderErrorList () {
    if (this.props.errors.size) {
      return (
        <div className='auth-error-message'>
          {this.props.errors.map((err, i) => {
            return (
              <p className="inline-error-item"
                 style={{paddingLeft: "20px", position: "relative", marginBottom: "28px"}}
                 key={i}>
                <Icon
                  viewBox="0 0 50 50"
                  color={red[500]}
                  style={{
                    position: "absolute",
                    left: 0,
                  top: 0}}
                  >
                  error
                </Icon>
                {this.props.floatingLabelText} {err}
              </p>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <MuiThemeProvider>
        <TextField
          fullWidth={true}
          id={this.props.className}
          {...this.props}
          errorText={this.renderErrorList()}
          onChange={this.handleInput.bind(this)} />
      </MuiThemeProvider>
    );
  }
}

export default AuthInput;
