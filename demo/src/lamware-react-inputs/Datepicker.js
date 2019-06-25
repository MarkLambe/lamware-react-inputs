import React from 'react';
import './styles.css';
import Datepicker from 'react-datepicker';


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
              onClick={this.handleClick}>
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
        this.props.onChange(this.props.name, value);
    }

    render() {
        let validatedCheckClass = "LRI-validated-check";
        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        { this.props.label }
                    </div> 
                    <div className="LRI-form-field-content">
                        <Datepicker
                            customInput={<CustomDatepickerInput />}
                            dateFormat={ this.props.dateFormat || "DD/MMM/YYYY" }
                            selected={this.props.value}
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div className={validatedCheckClass}>

                </div>
                <div className="LRI-form-error-section">
                </div>
            </div>
        );
    }
}

export default LRIDatepicker;