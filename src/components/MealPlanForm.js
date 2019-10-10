import React, { Component } from 'react';
import { Button, Form, Container, Toast, Col } from 'react-bootstrap';
import mealPlanService from '../utils/mealPlanService';
import userService from '../utils/userService';
import 'react-quill/dist/quill.snow.css';


class MealPlanForm extends Component {

  state = {
    name: '',
    assignedUsers: [],
    assignedUserNames: [],
    assignedUsersInput: '',
    assignedUsersRemove: '',
    greeting: 'Add New MealPlan',
    message:'',
    allUsers: [this.getAllUsers()],
  };

  async componentDidMount(){
    if(this.props.match && this.props.match.params.id) {
      const mealPlan = await mealPlanService.getMealPlan(this.props.match.params.id);
      this.setState({
        name: mealPlan.mealPlan.name,
        assignedUsers: mealPlan.mealPlan.assignedUsers,
        greeting: `Edit ${mealPlan.mealPlan.name} mealPlan`,
      })
    }
  }

  async getAllUsers(){
    let users = await userService.getUsers();
    this.setState({
      allUsers: users.users,
    });
  }

  getUserName = async (u) => {
    console.log(u);
    if(u._id){
      return u.name;
    } else {
      let user = await userService.getUser(u);
      return user.user.name;
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleAssignUser = async () => {
    let assignedUsers = [...this.state.assignedUsers];
    let assignedUserNames = [...this.state.assignedUserNames];
    let uName = await this.getUserName(this.state.assignedUsersInput);
    assignedUsers.push(this.state.assignedUsersInput);
    assignedUserNames.push(uName);
    this.setState({
      assignedUsers: assignedUsers,
      assignedUserNames: assignedUserNames,
      assignedUsersInput: '',
    });
  }  

  handleUnAssignUser = () => {
    let selection = this.state.assignedUsersRemove;
    let assignedUsers = [...this.state.assignedUsers];
    let assignedUserNames = [...this.state.assignedUserNames];
    let u;
    if(selection._id){
      assignedUsers.filter(function(val, idx, arr){
        if(val._id == selection._id){
          u = idx;
        }
      });
      assignedUsers.splice(u, 1);
    } else {
      assignedUsers.filter(function(val, idx, arr){
        if(val == selection){
          assignedUserNames.splice(idx, 1)
        }
        u = idx;
      },
      );
      assignedUsers.splice(u, 1);
    }
    this.setState({
      assignedUsers: assignedUsers,
      assignedUserNames: assignedUserNames,
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await mealPlanService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/mealPlans/${this.props.match.params.id}`);
      } else {
        await mealPlanService.create(this.state);
        this.props.updateMealPlans();
        this.updateMessage('MealPlan Created Successfully');
        setTimeout(function(){this.updateMessage('')}.bind(this),3000);
      }
    } catch (err) {
      this.updateMessage(err.message);
      setTimeout(function(){this.updateMessage('')}.bind(this),3000);
    }
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
        <div>
        <h3>{this.state.greeting}</h3>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>MealPlan Name</Form.Label>
              <Form.Control name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formAssignedUsers">
                <Form.Label>Select Users</Form.Label>
                <Form.Control as="select" name="assignedUsersInput" onChange={this.handleChange} multiple>
                  <option selected disabled>None</option>
                  {this.state.allUsers.map((user, idx) =>
                    <option value={`${user._id}`}>{user.name}</option>
                  )}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleAssignUser}>Assign User</Button>
              </Form.Group>
              <Form.Group as={Col} controlId="formMealPlan">
                <Form.Label>Remove MealPlan</Form.Label>
                <Form.Control as="select" name="assignedUsersRemove" onChange={this.handleChange} multiple>
                  {this.state.assignedUsers.map((assignedUser, idx) => {
                    if(assignedUser._id){
                      return <option value={`${assignedUser._id}`} >{assignedUser.name}</option>
                    } else {
                      return <option value={`${assignedUser}`} >{this.state.assignedUserNames[idx]}</option>
                    }
                  })}
                </Form.Control>
                  <Button className='btn-sm' variant='info' onClick={this.handleUnAssignUser}>Un-Assign User</Button>
              </Form.Group>
            </Form.Row>
            <Button className='btn-sm float-right' variant="primary" type="submit" onClick={this.handleSubmit}>
              Create
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;{this.state.message}
          </Form>
        </div>
    );
  }
}

export default MealPlanForm;