import React from 'react';
import './styles.css';
import { getHeaderMarkup, getErrorMarkup } from './helpers';

class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){

    }

    handleChange(value) {
        this.setState({value});

        if(this.props._hasLRIForm){
            this.props._updateFormAboutChange(this.props.name, value, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, value);
        }
    }

    getRadioMarkup() {
        return this.props.options.map((option, index) => {
            let type = typeof(option);
            if(type === 'object'){
                let key = option[this.props.valueKey || 'pk'];
                let label = option[this.props.labelKey || 'name'];
                return (
                    <div key={index} className="LRI-checkable-option">
                        <input
                            id={this.props.name + '-' + key}
                            type="radio" 
                            name={this.props.name}
                            value={key}
                            onChange={() => this.handleChange(key)} 
                            disabled={this.props.disabled || false}
                            checked={String(this.props.value) === String(key)} />
                        <label htmlFor={this.props.name + '-' + key}><span className="LRI-radio">{label}</span></label>
                    </div>
                );
            }
            else if(['string', 'number', 'boolean'].includes(type)){
                return (
                    <div key={index} className="LRI-checkable-option">
                        <input
                            id={this.props.name + '-' + option}
                            type="radio" 
                            name={this.props.name}
                            value={option}
                            onChange={() => this.handleChange(option)} 
                            disabled={this.props.disabled || false}
                            checked={String(this.props.value) === String(option)} />
                        <label htmlFor={this.props.name + '-' + option}><span className="LRI-radio">{option}</span></label>
                    </div>
                );
            }
            else{
                return null;
            }
        });
    }

    render() {
        return (
            <div className="LRI-form-field">
                { getHeaderMarkup(this.props) }
                <div className="LRI-form-field-content LRI-checkable-section">
                    { this.getRadioMarkup() }
                </div>
                <div className="LRI-form-field-error">
                    { getErrorMarkup(this.props.showValidationMessages, this.props.errors) }
                </div>
            </div>
        );
    }
}

Radio.defaultProps = {
    _isLRIElement: true,
    _isLRIRadio: true
};

export default Radio;

