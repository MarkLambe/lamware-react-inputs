import React from 'react';
import './styles.css';
import { Button } from './index';

const required_validator = (value) => value && (typeof(value) !== 'string' || value.length > 0) ? [] : ['Value is required'];
const options_validator = (value, options) =>  value && options.includes(value) ? [] : ['Invalid option'];

class Form extends React.Component {
    constructor(props) {
        super(props);

        let validationRules = {};
        let errors = {};
        this.props.children.forEach((c) => {
            validationRules[c.props.name] = [];
            errors[c.props.name] = [];
            if(c.props.required === true){
                validationRules[c.props.name].push(required_validator);
                if(c.props.options){
                    let options = c.props.options.map((o) => typeof(o) === 'string' ? o : String(o[c.props.valueKey || 'pk']));
                    let f = (v) => options_validator(v, options);
                    validationRules[c.props.name].push(f);
                }
            }
            if(c.props.validator){
                validationRules[c.props.name].push(c.props.validator);
            }
        });

        this.state = {
            validationRules,
            errors, 
            showErrors: false,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getChildren = this.getChildren.bind(this);
        this.updateFormAboutChange = this.updateFormAboutChange.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.getNewProps = this.getNewProps.bind(this);
        this.updateErrors = this.updateErrors.bind(this);
        this.getErrorsForChild = this.getErrorsForChild.bind(this);
    }

    componentDidMount(){
        React.Children.forEach(this.props.children, child => {
            this.updateErrors(child.props.name, child.props.value);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.isFormValid()){
            this.setState({showErrors: false});
            this.props.onSubmit();
        }
        else{
            this.setState({showErrors: true});
        }
        
    }

    getChildren() {
        const childrenWithRef = React.Children.map(this.props.children, child =>
            React.cloneElement(child, this.getNewProps(child))
        );
        return childrenWithRef;
    }

    getErrorsForChild(childName) {
        return this.state.showErrors ?  this.state.errors[childName] : [];
    }

    getNewProps(child) {
        return { 
            _hasLRIForm: true,
            _updateFormAboutChange: this.updateFormAboutChange, 
            errors: this.getErrorsForChild(child.props.name),
            showValidationMessages: this.state.showErrors
        }
    }

    updateErrors(name, value){
        let {errors} = this.state;
        errors[name] = [];
        this.state.validationRules[name].forEach((validator) => {
            let res = validator(value);
            errors[name] = errors[name].concat(res);
        });
        this.setState({errors});
    }

    updateFormAboutChange(name, value, onChange) {
        this.updateErrors(name, value);
        onChange(name, value);
    }

    isFormValid() {
        let isValid = true;
        Object.keys(this.state.errors).forEach((k) => {
            if(this.state.errors[k].length > 0) isValid = false;
        });
        return isValid;
    }

    render() {
        return (
            <div className="LRI-form-page">
                <div className="LRI-form-header">
                    {this.props.title || ''}
                </div>

                <form className="LRI-form" onSubmit={this.handleSubmit}>
                    { this.getChildren() }
                    <Button disabled={ !this.isFormValid() && this.state.showErrors }/>
                </form>
            </div>
        );
    }
}

export default Form

