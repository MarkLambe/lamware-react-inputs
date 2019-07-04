import React from 'react';
import './styles.css';
import Datepicker from 'react-datepicker';
import { getValidationFeedback } from './helpers'


class CustomDatepickerInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <button
              className="LRI-datepicker-button"
              onClick={this.handleClick}
              disabled={this.props.disabled || false}>
              {this.props.value || 'Select Date'}
            </button>
          )
    }
}

class LRIDatepicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(value) {
        if(this.props._hasLRIForm){
            this.props._updateFormAboutChange(this.props.name, value, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, value);
        }
    }

    render() {
        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        { this.props.label }
                    </div> 
                    <div className="LRI-form-field-content">
                        <Datepicker
                            customInput={<CustomDatepickerInput />}
                            dateFormat={ this.props.dateFormat || 'dd/MMM/yyyy' }
                            selected={this.props.value}
                            onChange={this.handleChange}
                            disabled={this.props.disabled || false} />
                    </div>
                </div>
                { getValidationFeedback(this.props.showValidationMessages, this.props.errors) }
            </div>
        );
    }
}

LRIDatepicker.defaultProps = {
    _isLRIElement: true
};

export default LRIDatepicker;