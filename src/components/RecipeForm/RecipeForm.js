import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Toast } from 'react-bootstrap';
import recipeService from '../../utils/recipeService';
import ingredientService from '../../utils/ingredientService';
import categoryService from '../../utils/categoryService';
import mealPlanService from '../../utils/mealPlanService';
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class RecipeForm extends Component {

  state = {
    name: '',
    prepTime: '',
    cookTime: '',
    instructions: '',
    instructionsHtml: '',
    instructionsString: '',
    ingredients: [],
    contributor: '',
    category: [],
    description: '',
    mealPlan: [],
    greeting: 'Create a New Recipe',
    allIngredients: [this.getAllIngredients()],
    allCategories: [this.getAllCategories()],
    allMealPlans: [this.getAllMealPlans()],
    message: '',
  };

  quill = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        ['link', 'image', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    },

    placeholder: 'What steps are needed to make the recipe...',
  };

  async componentDidMount(){
    if(this.props.match && this.props.match.params.id) {
      const recipe = await recipeService.getRecipe(this.props.match.params.id);
      console.log(recipe);
      this.setState({
        name: recipe.recipe.name,
        prepTime: recipe.recipe.prepTime,
        cookTime: recipe.recipe.cookTime,
        instructions: recipe.recipe.instructions,
        ingredients: recipe.recipe.ingredients,
        contributor: recipe.recipe.contributor,
        category: recipe.recipe.category,
        description: recipe.recipe.description,
        mealPlan: recipe.recipe.mealPlan,
        greeting: `Edit ${recipe.recipe.name} Recipe`,
        
      })
    }
  }

  async getAllIngredients() {
    await ingredientService.getIngredients();
  };

  async getAllCategories() {
    await categoryService.getCategories();
  };

  async getAllMealPlans() {
    await mealPlanService.getMealPlans();
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  instructions = {};

  quillHandleChange = (content, delta, source, editor) => {
    this.instructions.delta = editor.getContents(content);
    this.instructions.html = content;
    this.instructions.string = editor.getText(content);
  }

  quillSave = () => {
    this.setState({
      instructions: this.instructions.delta,
      instructionsHtml: this.instructions.html,
      instructionsString: this.instructions.string,
    })
    this.updateMessage("Instructions Saved")
    setTimeout(function(){this.updateMessage('')}.bind(this),3000);
  }
  

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await recipeService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/recipes/${this.props.match.params.id}`);
      } else {
        await recipeService.create(this.state);
        this.props.history.push(`/recipes`);
      }
    } catch (err) {
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <Container>
        <div>
        <h3>{this.state.greeting}</h3>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description || ''} />
            </Form.Group>

            <Form.Group controlId="formPrepTime">
              <Form.Label>Prep Time</Form.Label>
              <Form.Control name='prepTime' placeholder="Enter Prep Time in Min" onChange={this.handleChange} value={this.state.prepTime || ''} />
              <Form.Text className="text-muted">
                Please input Preparation Time in Minutes
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formCookTime">
              <Form.Label>Cook Time</Form.Label>
              <Form.Control name='cookTime' placeholder="Enter Cook Time in Min" onChange={this.handleChange} value={this.state.cookTime || ''} />
              <Form.Text className="text-muted">
                Please input Cooking Time in Minutes
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formInstructions">
              <Form.Label>Instructions <div className="font-italic">{this.state.message}</div></Form.Label>
              <Button className="float-right btn-sm" onClick={this.quillSave}>Save</Button>
              <ReactQuill 
                modules={this.quill.modules}
                placeholder={this.quill.placeholder}
                // defaultValue={this.state.instructionsInput}
                onChange={this.quillHandleChange}
                value={this.state.instructions || ''} 
              />
              <Form.Text className="text-muted">
                Make sure to save the Instructions before moving on.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control as="select" name="ingredients" onChange={this.handleChange} value={this.state.ingredients} multiple>
                <option value=''>None</option>
                {this.state.allIngredients.map((ingredient, idx) =>
                <option value={`${ingredient._id}`}>{ingredient.amount} {ingredient.name}</option>
                )}
              </Form.Control>
              <Form.Text as={Link} to="/ingredients/new">Add New Ingredient </Form.Text>
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Select Category</Form.Label>
              <Form.Control as="select" name="category" onChange={this.handleChange} value={this.state.category} multiple >
                <option value='Unassigned'>None</option>
                {this.state.category.map((category, idx) =>
                <option value={`${category._id}`}>{category.name}</option>
                )}
              </Form.Control>
              <Form.Text as={Link} to="/categories/new">Add New Category </Form.Text>
            </Form.Group>

            <Form.Group controlId="formMealPlans">
              <Form.Label>Select Meal Plans</Form.Label>
                <Form.Control as="select" name="mealPlans" onChange={this.handleChange} value={this.state.mealPlan} multiple >
                <option value=''>None</option>
                {this.state.mealPlan.map((mealPlan, idx) =>
                <option value={`${mealPlan._id}`}>{mealPlan.name}</option>
                )}
              </Form.Control>
              <Form.Text as={Link} to="/ingredients/new">Add New MealPlan </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    );
  }
}

export default RecipeForm;