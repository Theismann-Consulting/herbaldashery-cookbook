import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import userService from '../../utils/userService';
import UserEditPage from '../UserEditPage/UserEditPage';

const UsersPage = (props) => {

  return (
    <div className="body">
      <Button className="float-right" variant="info" as={ Link } to='/signup'>Create User</Button>
      {props.users.map((user, idx) =>
      
      <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
        <Card.Header className="text-right">{user.role}</Card.Header>
        <Card.Body>
          <Card.Title>{ user.name }</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{user.email}</ListGroupItem>
        </ListGroup>
        <Card.Body>
        <Button variant="info" as={ Link } to={`/users/${user._id}`}>View User</Button>
        </Card.Body>
      </Card>
      )}
          
    </div>
  );
};

export default UsersPage;
