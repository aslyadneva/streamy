import React, { Component } from 'react'; 
import { Field, reduxForm } from 'redux-form'; 

class StreamForm extends Component {
  renderError = ({error, touched}) => {
    //touched is a property on the meta object that returns a boolean if the user selects then 
    // deselects the form 
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      ); 
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (    
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // onSubmit will call the onSubmit props callback that is passed from it's parent component 
    // AKA the StreamForm doesn't handle any submit logic, only passes the submitted formValues 
    this.props.onSubmit(formValues)
  }

  // Redux form passes ALL its props to the render method!
  // HandleSubmit is one of the built in prop methods of Redux Form
  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        {/* // The component property sends all the props to the individual 'fields' as formProps */}
        <Field name="title" label="Enter Title" component={this.renderInput}/>
        <Field name="description" label="Enter Description" component={this.renderInput}/>
        <button className="ui button primary">Sumbit</button>
      </form>
    ); 
  }  
}

//If there are no mistakes, return an empty object 
//If something is wrong, return an object with the a key as the form title and value as the error message
//Ex. {title: 'You must enter a title'}
// Redux will match the key name of the error object with the Field name and render the error message through 
// the component property of the Field (through meta.error!!!)
const validate = (formValues) => {
  const errors = {} 
  if (!formValues.title) {
    errors.title = 'You must enter a title'
  } 
  if (!formValues.description) {
    errors.description = 'You must enter a description'
  }

  return errors; 
};

export default reduxForm({ form: 'streamForm', validate })(StreamForm); 
