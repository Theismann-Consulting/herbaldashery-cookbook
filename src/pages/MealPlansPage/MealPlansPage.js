import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem, Container, Row } from 'react-bootstrap';
import mealPlanService from '../../utils/mealPlanService';

class MealPlansPage extends Component {
  state = {
    mealPlans: [],
    loading: true,
  }

  async componentDidMount(){
    const mealPlans = await mealPlanService.getMealPlans();
    console.log(mealPlans.mealPlans);
    this.setState({
      mealPlans: mealPlans.mealPlans,
      loading: false,
    });
  };

  async componentDidUpdate(prevProps, prevState){
    if (this.state.mealPlans.mealPlans !== prevState.mealPlans.mealPlans) {
      const mealPlans= await mealPlanService.getMealPlans();

      this.setState({ mealPlans: mealPlans.mealPlans });
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
        {this.props.user.role === 'Admin' && <Button className="float-right" variant="info" as={ Link } to='/mealPlans/new'>Create MealPlan</Button>}
        </Row>
        <Row className="justify-content-center">
          {this.state.mealPlans.map((mealPlan, idx) =>
          
          <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Body>
              <Card.Title>{ mealPlan.name }</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{mealPlan.description}</ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Button variant="info" as={ Link } to={`/mealPlans/${mealPlan._id}`}>View MealPlan</Button>
            </Card.Body>
          </Card>
          )}
        </Row>
      </Container>
    );
  };
};

export default MealPlansPage;
