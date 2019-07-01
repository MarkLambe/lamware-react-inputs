import React from 'react';
import './styles.css';
import { Button } from './index';
import { getLRIChildren } from './helpers'

const required_validator = (value) => value && (typeof(value) !== 'string' || value.length > 0) ? [] : ['Value is required'];
const options_validator = (value, options) =>  value && options.includes(value) ? [] : ['Invalid option'];

class Form extends React.Component {
    constructor(props) {
        super(props);

        let validationRules = {};
        let errors = {};
        getLRIChildren(this.props.children).forEach((c) => {
            validationRules[c.props.name] = this.getValidationForChild(c);
            errors[c.props.name] = [];
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
        this.getValidationForChild = this.getValidationForChild.bind(this);
    }

    componentDidMount(){
        getLRIChildren(this.props.children).forEach((child) => {
            this.updateErrors(child.props.name, child.props.value);
        });
    }

    getValidationForChild(child) {
        let rules = [];
        if(child.props.required === true){
            rules.push(required_validator);
            if(child.props.options){
                let options = child.props.options.map((o) => typeof(o) === 'string' ? o : String(o[child.props.valueKey || 'pk']));
                let f = (v) => options_validator(v, options);
                rules.push(f);
            }
        }
        if(child.props.validator){
            rules.push(child.props.validator);
        }
        return rules;
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
        return React.Children.map(this.props.children, (child) => {
            if(child){
                return React.cloneElement(child, this.getNewProps(child))
            }
        });
    }

    getErrorsForChild(childName) {
        return this.state.showErrors ?  this.state.errors[childName] : [];
    }

    getNewProps(child) {
        let newProps = {};
        if(child && child.props && child.props._isLRIElement){
            newProps = { 
                _hasLRIForm: true,
                _updateFormAboutChange: this.updateFormAboutChange, 
                errors: this.getErrorsForChild(child.props.name),
                showValidationMessages: this.state.showErrors
            }
        }
        return newProps;
    }

    componentWillReceiveProps(nextProps) {
        let { validationRules } = this.state;
        let update = false;
        getLRIChildren(nextProps.children).forEach((child) => {
            if(!this.state.validationRules[child.name]){
                validationRules[child.props.name] = this.getValidationForChild(child);
                this.updateErrors(child.props.name, child.props.value);
                update = true;
            }
        });
        if(update){
            this.setState(validationRules);
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

