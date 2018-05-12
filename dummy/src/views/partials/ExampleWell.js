import React from "react"
import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader } from 'reactstrap';

class ExampleWell extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render () {
    return (
      <Card>
        <CardHeader>
          Example
        </CardHeader>
        <CardBody>
          {this.props.children}
        </CardBody>
      </Card>
    );
  }
}

export default ExampleWell;
