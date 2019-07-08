# lamware-react-inputs
Simple, lightweight form inputs for React apps.

This is currently a work in progress that I use to deliver projects. 

It provides customised TextInput, Select, Select, Radio, Button, Form, Checkbox, and Datepicker (react-datepicker) components.

## Installation

The package can be installed via NPM:

```
npm install lamware-react-inputs --save
```

Example:

At the moment inputs require use of a form. Here's a simple example, two text inputs, one with custom validation:

```js
import React from "react";
import { Form, TextInput } from 'lamware-react-inputs';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


class App extends React.Component {
  constructor() {
    super();
    this.state = {
        formData: {
            text_input: {value: null, translation: 'Text Input'},
            text_input_with_validation: {value: null, translation: 'Text Input With Validation (Email)'},
        },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit() {
    alert('Submitted!');
  }

  handleInputChange(name, value){
    let formData = {...this.state.formData};
    formData[name].value = value;
    this.setState({formData});
  }

  regexValidation(value) {
    let errors = [];
    if(value === null){
      errors.push('Required');
    }
    else if(value.length < 3){
        errors.push('Too Short');
    }
    else if(!value.match(EMAIL_REGEX)){
        errors.push("Not a valid email")
    }
    return errors;
  }

    render() {
        const {formData} = this.state;
        return (
            <Form title="Demo!" validate={this.validateForm} onSubmit={this.handleSubmit}>
                    <TextInput 
                    label={formData.text_input.translation}
                    name="text_input"
                    value={formData.text_input.value}
                    onChange={this.handleInputChange} 
                    required />

                    <TextInput 
                    label="Text Input With Validation"
                    name="text_input_with_validation"
                    value={formData.text_input_with_validation.value}
                    onChange={this.handleInputChange} 
                    validator={this.regexValidation} />
                </Form>
        )
    }
}

export default App;
```