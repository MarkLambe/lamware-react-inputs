import React from 'react';
import { getLRIChildren } from '../src/lamware-react-inputs/helpers'
import Enzyme from 'enzyme';
import  { TextInput, Form, Checkbox } from '../src/lamware-react-inputs';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('form component renders', () => {
    const wrapper = Enzyme.mount(
        <Form>
            <TextInput />
            <TextInput />
            <span></span>
            <span></span>
            <Checkbox />
        </Form>
    );
    let res = getLRIChildren(wrapper.props().children).length;

    expect(res).toBe(3);
});