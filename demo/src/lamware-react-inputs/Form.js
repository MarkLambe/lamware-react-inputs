import React from 'react';
import './styles.css';
import { Button } from './index';


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    isFormValid() {
        let errors = [];
        this.props.children.forEach((child) => {
            if(child.props.validation){
                let value = this.props.data[child.props.name].value;
                let label = this.props.data[child.props.name].translation || child.props.name;
                console.log(child.props.validation);
                console.log(typeof(child.props.validation));
                if(typeof(child.props.validation === 'function')){
                    errors.push(child.props.validation(value, child.props.name, label));
                }
                else if(typeof(child.props.validation) === 'object'){
                    if(child.props.validation.required && (!value || value.length === 0)){
                        errors.push(label + ' is required');
                    }
                    if(child.props.validation.minLength && value.length < child.props.validation.minLength){
                        errors.push(label + ' is too short');
                    }
                }
            }
        });
        return errors.length === 0;
    }

    render() {
        return (
            <div className="LRI-form-page">
                <div className="LRI-form-header">
                    {this.props.title || ''}
                </div>

                <form className="LRI-form" onSubmit={this.handleSubmit}>
                    {this.props.children}

                    <Button disabled={ !this.isFormValid() } />
                </form>
            </div>
        );
    }
}

export default Form

