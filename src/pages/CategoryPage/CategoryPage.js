import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem, Container, Row } from 'react-bootstrap';
import categoryService from '../../utils/categoryService';

class CategoriesPage extends Component {
  state = {
    categories: [],
    loading: true,
  }

  async componentDidMount(){
    const categories = await categoryService.getCategories();
    console.log(categories.categories);
    this.setState({
      categories: categories.categories,
      loading: false,
    });
  };

  async componentDidUpdate(prevProps, prevState){
    if (this.state.categories.categories !== prevState.categories.categories) {
      const categories= await categoryService.getCategories();

      this.setState({ categories: categories.categories });
    }
  }

  render() {
    if(this.state.loading){
      return(
        <div>Loading...</div>
      )
    }
    return (
      <Container>
        <Row className="justify-content-center">
        {this.props.user.role === 'Admin' &&
          <Button className="float-right" variant="info" as={ Link } to='/categories/new'>Create Category</Button>}
        </Row>
        <Row className="justify-content-center">
          {this.state.categories.map((category, idx) =>
          
          <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Body>
              <Card.Title>{ category.name }</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{category.description}</ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Button variant="info" as={ Link } to={`/categories/${category._id}`}>View Category</Button>
            </Card.Body>
          </Card>
          )}
        </Row>
      </Container>
    );
  };
};

export default CategoriesPage;
