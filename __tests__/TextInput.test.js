import React from 'react';
import Enzyme from 'enzyme';
import  { TextInput, Form } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('change event calls onChange (without form)', () => {
    const onInput = jest.fn();
    const event = {target: {name: "my_input", value: 4}};
    const wrapper = Enzyme.mount(
        <TextInput 
            name="my_input"
            onChange={onInput}/>
    );

    const p = wrapper.find('.LRI-input');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_input', 4);
});

test('change event calls onChange (with form)', () => {
    const onInput = jest.fn();
    const event = {target: {name: "my_form_input", value: 6}};
    const wrapper = Enzyme.mount(
        <Form>
            <TextInput 
                name="my_form_input"
                onChange={onInput}/>
        </Form>
    );

    const p = wrapper.find('.LRI-input');
    p.simulate('change', event)
    expect(onInput).toBeCalledWith('my_form_input', 6);
});