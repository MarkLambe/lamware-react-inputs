import React from 'react';
import Enzyme from 'enzyme';
import  { Radio, Form } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
const OPTION_OBJECTS = [{id: 0, name: 'First'}, {id: 1, name: 'Second'}, {id: 2, name: 'Third'}];


test('Radio displays (without form)', () => {

    const wrapper = Enzyme.mount(
        <Radio 
            name="my_select"
            valueKey="id"
            options={OPTION_OBJECTS} />
    );
    
    expect(wrapper.find(Radio)).toHaveLength(1);
});

test('Radio displays (with form)', () => {

    const wrapper = Enzyme.mount(
        <Form>
            <Radio 
                name="my_form_select"
                valueKey="id"
                options={OPTION_OBJECTS} />
        </Form>
    );

    expect(wrapper.find(Radio)).toHaveLength(1);
});

test('Radio calls onChange (without form)', () => {

    const onInput = jest.fn();
    const event = {target: {name: "my_radio", value: 4}};

    const wrapper = Enzyme.mount(
        <Radio 
            name="my_radio"
            valueKey="id"
            options={OPTION_OBJECTS}
            onChange={onInput} />
    );
    
    const p = wrapper.find('#my_radio-0');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_radio', 4);
});

test('Radio calls onChange (with form)', () => {

    const onInput = jest.fn();
    const event = {target: {name: "my_radio", value: 4}};

    const wrapper = Enzyme.mount(
        <Form>
            <Radio 
                name="my_radio"
                valueKey="id"
                options={OPTION_OBJECTS}
                onChange={onInput} />
        </Form>
    );
    
    const p = wrapper.find('#my_radio-0');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_radio', 4);
});