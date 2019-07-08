import React from 'react';
import Enzyme from 'enzyme';
import  { Select, Form } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const OPTION_OBJECTS = [{id: 0, name: 'First'}, {id: 1, name: 'Second'}, {id: 2, name: 'Third'}];


test('Select displays (without form)', () => {

    const wrapper = Enzyme.mount(
        <Select 
            name="my_select"
            options={OPTION_OBJECTS} />
    );
    
    expect(wrapper.find(Select)).toHaveLength(1);
});

test('Select displays (with form)', () => {

    const wrapper = Enzyme.mount(
        <Form>
            <Select 
                name="my_form_select"
                options={OPTION_OBJECTS} />
        </Form>
    );

    expect(wrapper.find(Select)).toHaveLength(1);
});