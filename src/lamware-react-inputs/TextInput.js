import React from 'react';
import './styles.css';
import { getValidationMarkup, getErrorMarkup } from './helpers';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        if(this.props._hasLRIForm){
            this.props._updateFormAboutChange(this.props.name, value, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, value);
        }
    }

    render() {
        return (
            <div className="LRI-form-field">
                <div className="LRI-form-field-header">
                    {this.props.value && this.props.value.length > 0 ? this.props.label : ''}
                </div>
                <div className="LRI-form-field-content">
                    <input 
                        name={this.props.name} 
                        onChange={this.handleChange}
                        value={this.props.value || ''}
                        className="LRI-input"
                        placeholder={this.props.label}
                        disabled={this.props.disabled || false} />
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

TextInput.defaultProps = {
    _isLRIElement: true
};

export default TextInput;