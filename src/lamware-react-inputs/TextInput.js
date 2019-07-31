import React from 'react';
import './styles.css';
import { getHeaderMarkup, getErrorMarkup } from './helpers';

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
        let inputClass = "LRI-input ";
        inputClass += this.props.small ? "LRI-input-small" : "LRI-input-medium";

        return (
            <div className='LRI-form-field'>
                { getHeaderMarkup(this.props) }
                <div className="LRI-form-field-content">
                    <input 
                        name={this.props.name} 
                        onChange={this.handleChange}
                        value={this.props.value || ''}
                        className={inputClass}
                        placeholder={this.props.placeholder || this.props.label}
                        disabled={this.props.disabled || false} 
                        type={this.props.type || 'text'} />
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