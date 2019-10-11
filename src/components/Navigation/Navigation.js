import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const Navigation = (props) => {
  let nav = props.user ?
    <Navbar bg="dark" expand="lg" variant="dark">
      <Link to='/'><Navbar.Brand>Herbaldashery Cookbook</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={ Link } to='/'>Home</Nav.Link>
          <Nav.Link as={ Link } to='/recipes'>Recipes</Nav.Link>
          <Nav.Link as={ Link } to='/mealPlans'>Meal Plans</Nav.Link>
          <Nav.Link as={ Link } to='/categories'>Categories</Nav.Link>
          {props.user.role === 'Admin' &&
            <NavDropdown title="Admin" id="basic-nav-dropdown">
              <NavDropdown.Item as={ Link } to='/users'>Users</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          }
        </Nav>
        <Navbar.Text id="welcome-text"> Welcome, {props.user.name}</Navbar.Text>
        <Link to='' onClick={props.handleLogout}><Button variant="secondary" className="nav-button">LogOut</Button></Link>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    :
    <Navbar bg="dark" expand="lg" variant="dark">
      <Link to='/'><Navbar.Brand>Herbaldashery Cookbook</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>   
        <Link to='/login'><Button variant="secondary" className="nav-button">Log In</Button></Link>
        <Link to='/signup'><Button variant="secondary" className="nav-button">Sign Up</Button></Link>
        
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>;

  return (
    <div className='NavBar'>
      {nav}
    </div>
  );
};

export default Navigation;