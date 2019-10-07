import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import userService from '../../utils/userService';

class UserEditPage extends Component {
  state = {
    user: ''
  }

  async componentDidMount() {
    const user = await userService.getUser(this.props.match.params.id);
    this.setState({user: user.user});
  };

  render() {
    return (
      <div className="body">
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Header className="text-right">{this.state.user.role}</Card.Header>
          <Card.Body>
            <Card.Title>{this.state.user.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.state.user.email}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">Edit User</Card.Link>
            <Card.Link href="#">Delete User</Card.Link>
          </Card.Body>
        </Card>
      </div>
    )
  };
};

export default UserEditPage;