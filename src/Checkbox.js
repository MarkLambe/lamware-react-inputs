import React from 'react';
import './styles.css';


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
        const value = this.props.value;

        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        
                    </div> 
                    <div className="LRI-form-field-content LRI-checkable-section">
                        <div className="LRI-checkable-option">
                            <input
                                id={this.props.name}
                                type="checkbox" 
                                name={this.props.name}
                                value={value}
                                onChange={this.handleChange} />
                            <label 
                                htmlFor={this.props.name}>
                                <span className="LRI-checkbox">{ this.props.label }</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="LRI-validated-check">

                </div>
                <div className="LRI-form-error-section">
                    
                </div>
            </div>
        );
    }
}

export default Checkbox

