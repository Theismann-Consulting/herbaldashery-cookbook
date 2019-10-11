import React, { Component } from 'react';
import { Button, Form, } from 'react-bootstrap';
import categoryService from '../utils/categoryService';
import 'react-quill/dist/quill.snow.css';


class CategoryForm extends Component {

  state = {
    name: '',
    description: '',
    greeting: 'Add New Category',
    message:'',
  };

  async componentDidMount(){
    if(this.props.match && this.props.match.params.id) {
      const category = await categoryService.getCategory(this.props.match.params.id);
      console.log(category);
      this.setState({
        name: category.category.name,
        description: category.category.description,
        greeting: `Edit ${category.category.name} Category`,
        
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await categoryService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/categories/${this.props.match.params.id}`);
      } else {
        await categoryService.create(this.state);
        this.props.updateCategories();
        this.updateMessage('Category Created Successfully');
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
              <Form.Label>Category Name</Form.Label>
              <Form.Control name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
            </Form.Group>
            <Button className='btn-sm float-right' variant="success" type="submit" onClick={this.handleSubmit}>
              Create
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;{this.state.message}
          </Form>
        </div>
    );
  }
}

export default CategoryForm;