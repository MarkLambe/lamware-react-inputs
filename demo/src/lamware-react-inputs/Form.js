import React from 'react';
import './styles.css';
import { Button } from './index';

const REQUIRED_VALIDATOR = (value) => value && value.length > 0 ? [] : ['required'];

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validationRules: {},
            errors: {}, 
            showErrors: false
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getChildren = this.getChildren.bind(this);
        this.updateFormAboutChange = this.updateFormAboutChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }
    
    componentDidMount() {
        let validationRules = {};
        let errors = [];
        this.props.children.forEach((c) => {
            validationRules[c.props.name] = [];
            errors[c.props.name] = [];
            if(c.props.required === true){
                validationRules[c.props.name].push(REQUIRED_VALIDATOR);
            }
            if(c.props.validator){
                validationRules[c.props.name].push(c.props.validator);
            }
        });
        this.setState({validationRules});
        this.setState({errors});
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = this.props.validate();
        if(errors.length > 0){
            this.setState({errors, showErrors: true});
        }
        else{
            this.onSubmit();
        }
    }

    getChildren() {
        const childrenWithRef = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { updateFormAboutChange: this.updateFormAboutChange, errors: this.state.errors[child.props.name] })
        );
      
        return childrenWithRef;
    }

    updateFormAboutChange(name, value, onChange) {
        let {errors} = this.state;
        errors[name] = [];
        this.state.validationRules[name].forEach((validator) => {
            let res = validator(value);
            errors[name] = errors[name].concat(res);
        });
        this.setState({errors});
        onChange(name, value);
    }

    isFormValid() {
        return true;
    }

    render() {
        return (
            <div className="LRI-form-page">
                <div className="LRI-form-header">
                    {this.props.title || ''}
                </div>

                <form className="LRI-form" onSubmit={this.handleSubmit}>
                    { this.getChildren() }
                    <Button disabled={ this.isFormValid() }/>
                </form>
            </div>
        );
    }
}

export default Form

