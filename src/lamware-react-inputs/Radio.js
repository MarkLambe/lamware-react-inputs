import React from 'react';
import './styles.css';
import { getValidationMarkup, getErrorMarkup } from './helpers';

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        this.setState({value});

        if(this.props._hasLRIForm){
            this.props._updateFormAboutChange(this.props.name, value, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, value);
        }
    }

    getRadioMarkup() {
        let markup = [];
        this.props.options.forEach((o) => {
            let value = '',  label = '';
            if(typeof(o) === 'object'){
                let valueKey = this.props.valueKey || 'pk';
                let labelKey = this.props.labelKey || 'name';
                value = o[valueKey];
                label = o[labelKey];
            }
            else if(typeof(o) === 'string'){
                value = label = o;
            }
            else if(typeof(o) === 'number' || typeof(o) === 'boolean'){
                value = label = o;
                label = label.toString();
            }
            markup.push(
                <div key={this.props.name + '-' + value} className="LRI-checkable-option">
                    <input
                        id={this.props.name + '-' + value}
                        type="radio" 
                        name={this.props.name}
                        value={value}
                        onChange={this.handleChange} 
                        disabled={this.props.disabled || false}
                        checked={String(this.props.value) === String(value)} />
                    <label htmlFor={this.props.name + '-' + value}><span className="LRI-radio">{label}</span></label>
                </div>
            );
        });
        return markup;
    }

    render() {
        let headerClass = "LRI-form-field-header ";
        headerClass += this.props.small ? "LRI-form-field-header-small" : "LRI-form-field-header-medium";

        return (
            <div className="LRI-form-field">
                <div className={headerClass}>
                    { this.props.label }
                </div>
                <div className="LRI-form-field-content LRI-checkable-section">
                    { this.getRadioMarkup() }
                </div>
                <div className="LRI-form-field-emoji">
                    { getValidationMarkup(this.props.showValidationMessages, this.props.errors) }
                </div>
                <div className="LRI-form-field-error">
                    { getErrorMarkup(this.props.showValidationMessages, this.props.errors) }
                </div>
            </div>
        );
    }
}

Radio.defaultProps = {
    _isLRIElement: true
};

export default Radio

