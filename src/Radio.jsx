import React from 'react';
import './styles.css';


class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: null};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        this.setState({value});
        this.props.onChange(this.props.name, value);
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
            markup.push(
                <div key={this.props.name + '-' + value} className="LRI-checkable-option">
                    <input
                        id={this.props.name + '-' + value}
                        type="radio" 
                        name={this.props.name}
                        value={value}
                        onChange={this.handleChange} />
                    <label htmlFor={this.props.name + '-' + value}><span className="LRI-radio">{label}</span></label>
                </div>
            );
        });
        return markup;
    }

    getValidationMarkup() {
        if(this.props.value){
            return (
                <span className="LRI-validated-check-passed">
                    ✓
                </span>
            )
        }
    }

    render() {
        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        { this.props.label }
                    </div> 
                    <div className="LRI-form-field-content LRI-checkable-section">
                        { this.getRadioMarkup() }
                    </div>
                </div>
                <div className="LRI-validated-check">
                    { this.getValidationMarkup() }
                </div>
                <div className="LRI-form-error-section">

                </div>
            </div>
        );
    }
}

export default Radio

