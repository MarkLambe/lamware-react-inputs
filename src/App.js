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
            text_input: {value: null, translation: 'Name'},
            no_label_text_input: {value: null, translation: 'Name'},
            small_text_input: {value: null, translation: 'Name'},
            text_input_with_validation: {value: null, translation: 'Email'},
            select_from_strings: {value: null, translation: 'Select Thing'},
            select_from_objects: {value: null, translation: 'Select Thing'},
            radio_from_strings: {value: null, translation: 'Radio Things'},
            radio_from_objects: {value: null, translation: 'Radio Things'},
            checkbox: {value: null, translation: 'Check me'},
            date: {value: null, translation: 'Date'},
        },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getSidebarMarkUp = this.getSidebarMarkUp.bind(this);
    this.getConditionallyRenderedMarkup = this.getConditionallyRenderedMarkup.bind(this);
    this.tester = this.tester.bind(this);
  }

  tester() {
    this.handleInputChange('select_from_strings', null);
    this.handleInputChange('select_from_objects', null);
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
                  value={formData.text_input.value} />

                <TextInput 
                  description="Same with no label (still has placeholder) takes up less space"
                  placeholder={formData.no_label_text_input.translation}
                  name="no_label_text_input"
                  value={formData.no_label_text_input.value} />

                <TextInput 
                  description="Using the 'small' prop"
                  label={formData.small_text_input.translation}
                  name="small_text_input"
                  value={formData.small_text_input.value}
                  small />

                <TextInput 
                  description="Basic input with email regex (onsubmit)"
                  label="Text Input With Validation"
                  name="text_input_with_validation"
                  value={formData.text_input_with_validation.value} 
                  validator={this.regexValidation} />

                <Select
                  label={formData.select_from_strings.translation}
                  options={OPTION_STRINGS}
                  name="select_from_strings"
                  value={formData.select_from_strings.value} />
                  
                <Select
                  label="Small input"
                  options={OPTION_OBJECTS}
                  name="select_from_objects"
                  value={formData.select_from_objects.value} 
                  valueKey="id"
                  labelKey="name"
                  required 
                  small/>

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
                  description="Conditionally render datepicker"
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