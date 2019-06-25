import React from "react";
import { TextInput, Select, Radio, Form, Checkbox, Datepicker } from './lamware-react-inputs/index';
import './App.css';

const OPTION_STRINGS = ['First', 'Second', 'Third'];
const OPTION_OBJECTS = [{id: 0, name: 'First'}, {id: 1, name: 'Second'}, {id: 2, name: 'Third'}];
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
        formData: {
            text_input: {value: null, validation: {required: true, minLength: 4}, translation: 'Text Input'},
            text_input_with_validation: {value: null, validation: {required: true}, translation: 'Text Input With Validation (Email)'},
            select_from_strings: {value: null, validation: {required: true}, translation: 'Select From Strings'},
            select_from_objects: {value: null, validation: {required: true}, translation: 'Select From Objects'},
            radio_from_strings: {value: null, validation: {required: true}, translation: 'Radio From Strings'},
            radio_from_objects: {value: null, validation: {required: true}, translation: 'Radio From Objects'},
            checkbox: {value: null, translation: 'Checkbox'},
            date: {value: null, validation: {required: true}, translation: 'Datepicker'},
        },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSidebarMarkUp = this.getSidebarMarkUp.bind(this);
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
        if(value.length < 3){
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
        value =value.format('DD/MM/YYYY');
      }
      markup.push(
        <div key={o} className="sidebar-line">{name} -> {value}</div>
      );
    });
    return markup;
  }

  render() {
    const {formData} = this.state;
    return (
      <div className="page-box">
        <div className="form-box">
          <Form title="Demo!" onSubmit={this.handleSubmit} data={formData}>
                <TextInput 
                  label={formData.text_input.translation}
                  name="text_input"
                  value={formData.text_input.value}
                  onChange={this.handleInputChange} />

                <TextInput 
                  label="Text Input With Validation"
                  name="text_input_with_validation"
                  value={formData.text_input_with_validation.value}
                  onChange={this.handleInputChange} 
                  validation={this.regexValidation} />

                <Select
                  label={formData.select_from_strings.translation}
                  options={OPTION_STRINGS}
                  name="select_from_strings"
                  value={formData.select_from_strings.value}
                  onChange={this.handleInputChange} />
                  
                <Select
                  label={formData.select_from_objects.translation}
                  options={OPTION_OBJECTS}
                  name="select_from_objects"
                  value={formData.select_from_objects.value}
                  onChange={this.handleInputChange} 
                  valueKey="id"
                  labelKey="name" />

                <Radio
                  label={formData.radio_from_strings.translation}
                  name="radio_from_strings"
                  value={formData.radio_from_strings.value}
                  onChange={this.handleInputChange}
                  options={OPTION_STRINGS} />

                <Radio
                  label={formData.radio_from_objects.translation}
                  name="radio_from_objects"
                  value={formData.radio_from_objects.value}
                  onChange={this.handleInputChange}
                  options={OPTION_OBJECTS}
                  valueKey="id"
                  labelKey="name" />

                <Checkbox
                  label={formData.checkbox.translation}
                  onChange={this.handleInputChange}
                  value={formData.checkbox.value}
                  name="checkbox" />

                <Datepicker
                  label={formData.date.translation}
                  name="date"
                  value={formData.date.value}
                  onChange={this.handleInputChange} />

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