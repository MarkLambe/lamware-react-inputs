import React from 'react';
import './styles.css';
import { getHeaderMarkup, getErrorMarkup } from './helpers';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.checked;
        this.setState({value});
        this.props.onChange(this.props.name, value);
    }

    render() {
        return (
            <div className="LRI-form-field">
                { getHeaderMarkup(this.props) }
                <div className="LRI-form-field-content LRI-checkable-section">
                    <div className="LRI-checkable-option">
                        <input
                            id={this.props.name}
                            type="checkbox" 
                            name={this.props.name}
                            checked={this.props.value || false}
                            onChange={this.handleChange} 
                            disabled={this.props.disabled || false} />
                        <label 
                            htmlFor={this.props.name}>
                            <span className="LRI-checkbox">{ this.props.label }</span>
                        </label>
                    </div>
                </div>
                <div className="LRI-form-field-error">
                    { getErrorMarkup(this.props.showValidationMessages, this.props.errors) }
                </div>
            </div>
        );
    }
}

Checkbox.defaultProps = {
    _isLRIElement: true,
    _isLRICheckbox: true
};

export default Checkbox

