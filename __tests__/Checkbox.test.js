import React from 'react';
import Enzyme from 'enzyme';
import  { Checkbox, Form } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Checkbox displays (without form)', () => {

    const wrapper = Enzyme.mount(
        <Checkbox 
            name="my_checkbox" />
    );
    
    expect(wrapper.find(Checkbox)).toHaveLength(1);
});

test('Checkbox displays (with form)', () => {

    const wrapper = Enzyme.mount(
        <Form>
            <Checkbox 
                name="my_form_select" />
        </Form>
    );

    expect(wrapper.find(Checkbox)).toHaveLength(1);
});

test('Checkbox calls onChange (without form)', () => {

    const onInput = jest.fn();
    const event = {target: {name: "my_checkbox", checked: true}};

    const wrapper = Enzyme.mount(
        <Checkbox 
            name="my_checkbox"
            onChange={onInput} />
    );
    
    const p = wrapper.find('#my_checkbox');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_checkbox', true);
});

test('Checkbox calls onChange (with form)', () => {

    const onInput = jest.fn();
    const event = {target: {name: "my_checkbox", checked: false}};

    const wrapper = Enzyme.mount(
        <Form>
            <Checkbox 
                name="my_checkbox"
                onChange={onInput} />
        </Form>
    );
    
    const p = wrapper.find('#my_checkbox');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_checkbox', false);
});