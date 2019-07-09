import React from 'react';
import Enzyme from 'enzyme';
import  { TextInput, Select, Radio, Form, Checkbox, Datepicker, Button } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('form component with children renders', () => {
    const wrapper = Enzyme.shallow(
        <Form>
            <TextInput 
                label="My label"
                name="some_name"
                value="some_value"
                onChange="some_func"
                required />
        </Form>
    );
    const p = wrapper.find(TextInput);
    expect(p).toHaveLength(1);
});

test('form component with children renders', () => {
    /*
    I'm not 'deep' testing Datepicker since it's react-datepicker
    */

    const wrapper = Enzyme.shallow(
        <Form>
            <Datepicker />
        </Form>
    );
    const p = wrapper.find(Datepicker);
    expect(p).toHaveLength(1);
});

test('form component with lots of children renders', () => {

    /*
    Test all LRI components. 
    I'm not 'deep' testing Datepicker since it's react-datepicker, it is shallow tested above.
    */

    const OPTION_STRINGS = ['First', 'Second', 'Third'];
    const OPTION_OBJECTS = [{id: 0, name: 'First'}, {id: 1, name: 'Second'}, {id: 2, name: 'Third'}];
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    let regexValidation = function(value) {
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

    const wrapper = Enzyme.mount(
        <Form>
            <TextInput 
                label="Some label"
                name="text_input"
                value="some_value"
                onChange="some_func"
                required />

            <TextInput 
                label="Some label"
                name="text_input_with_validation"
                value="some_value"
                onChange="some_func"
                validator={regexValidation} />

            <span>Other form children, like text, are still rendered like this.</span>

            <Select
                label="Some label"
                options={OPTION_STRINGS}
                name="select_from_strings"
                value="some_value"
                onChange="some_func" />
                
            <Select
                label="Some label"
                options={OPTION_OBJECTS}
                name="select_from_objects"
                value="some_value"
                onChange="some_func"
                valueKey="id"
                labelKey="name"
                required />

            <Radio
                label="Some label"
                name="radio_from_strings"
                value="some_value"
                onChange="some_func"
                options={OPTION_STRINGS} />

            <Radio
                label="Some label"
                name="radio_from_objects"
                value="some_value"
                onChange="some_func"
                options={OPTION_OBJECTS}
                valueKey="id"
                labelKey="name"
                required/>

            <Checkbox
                label="Some label"
                onChange="some_func"
                value="some_value"
                name="checkbox" />

        </Form>
    );
    expect(wrapper.find(TextInput)).toHaveLength(2);
    expect(wrapper.find(Select)).toHaveLength(2);
    expect(wrapper.find(Radio)).toHaveLength(2);
    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
});