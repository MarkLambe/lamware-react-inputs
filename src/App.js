import React from "react";
import { TextInput, Select, Radio, Form, Checkbox, Datepicker } from './lamware-react-inputs/index';
import './App.css';

const OPTION_STRINGS = ['2016', '2017', '2018'];
const OPTION_OBJECTS = [{id: 0, name: 'First'}, {id: 1, name: 'Second'}, {id: 2, name: 'Third'}];
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        formData: {
            text_input: {value: null, translation: 'Text Input'},
            text_input_with_validation: {value: null, translation: 'Text Input With Validation (Email)'},
            select_from_strings: {value: null, translation: 'Select From Strings'},
            select_from_objects: {value: null, translation: 'Select From Objects'},
            radio_from_strings: {value: null, translation: 'Radio From Strings'},
            radio_from_objects: {value: null, translation: 'Radio From Objects'},
            checkbox: {value: null, translation: 'Checkbox'},
            date: {value: null, translation: 'Datepicker'},
        },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSidebarMarkUp = this.getSidebarMarkUp.bind(this);
    this.getConditionallyRenderedMarkup = this.getConditionallyRenderedMarkup.bind(this);
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

  getSidebarMarkUp() {
    let markup = [];
    Object.keys(this.state.formData).forEach((o) => {
      let name = this.state.formData[o].translation;
      let value = this.state.formData[o].value;
      if(typeof(value) === 'boolean'){
        value = value ? 'True' : 'False';
      }
      else if(value === null){
        value = 'null';
      }
      else if(typeof(value) === 'object'){
        value = new Intl.DateTimeFormat('en-IE', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
      }).format(new Date(value));
      }
      markup.push(
        <div key={o} className="sidebar-line">{name} -> {value}</div>
      );
    });
    return markup;
  }

  getConditionallyRenderedMarkup() {
    if(this.state.formData.checkbox.value){
      return (
        <Datepicker
          label={this.state.formData.date.translation}
          name="date"
          value={this.state.formData.date.value}
          required />
      );
    }
  }

  render() {
    const {formData} = this.state;
    return (
      <div className="page-box">
        <div className="form-box">
          <Form title="Demo!" onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                <TextInput 
                  label={formData.text_input.translation}
                  name="text_input"
                  value={formData.text_input.value}
                  required />

                <TextInput 
                  label="Text Input With Validation"
                  name="text_input_with_validation"
                  value={formData.text_input_with_validation.value} 
                  validator={this.regexValidation} />

                <span>Other form children, like text, are still rendered like this.</span>

                <Select
                  label={formData.select_from_strings.translation}
                  options={OPTION_STRINGS}
                  name="select_from_strings"
                  value={formData.select_from_strings.value} />
                  
                <Select
                  label={formData.select_from_objects.translation}
                  options={OPTION_OBJECTS}
                  name="select_from_objects"
                  value={formData.select_from_objects.value} 
                  valueKey="id"
                  labelKey="name"
                  required />

                <Radio
                  label={formData.radio_from_strings.translation}
                  name="radio_from_strings"
                  value={formData.radio_from_strings.value}
                  options={OPTION_STRINGS} />

                <Radio
                  label={formData.radio_from_objects.translation}
                  name="radio_from_objects"
                  value={formData.radio_from_objects.value}
                  options={OPTION_OBJECTS}
                  valueKey="id"
                  labelKey="name" 
                  required />

                <Checkbox
                  label={this.state.formData.checkbox.translation}
                  value={this.state.formData.checkbox.value}
                  name="checkbox" />

                { this.getConditionallyRenderedMarkup() }


          </Form>
        </div>
        <div className="sidebar">
          { this.getSidebarMarkUp() }
        </div>
      </div>
    );
  }
}

export default App;