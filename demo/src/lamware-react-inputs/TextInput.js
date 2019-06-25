import React from 'react';
import './styles.css';


class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        if(value.length !== 0 && this.props.validate){
            let errors = this.props.validate(value);
            this.setState({errors});
        }
        else{
            this.setState({errors: []});
        }
        this.props.onChange(this.props.name, value);
    }

    getValidationMarkup() {
        if(this.props.value && this.props.value.length !== 0){
            if(this.state.errors.length > 0){
                return (
                    <span className="LRI-validated-check-failed">
                        ✕
                    </span>
                )
            }
            else{
                return (
                    <span className="LRI-validated-check-passed">
                        ✓
                    </span>
                )
            }
        }
    }

    render() {
        let errorMarkup = [];
        this.state.errors.forEach((e) => errorMarkup.push(<li key={e}>{e}</li>));
        
        return (
            <div className="LRI-form-row">
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
                        />
                    </div>
                </div>
                <div className="LRI-validated-check">
                    { this.getValidationMarkup() }
                </div>
                <div className="LRI-form-error-section">
                    { errorMarkup }
                </div>
            </div>
        );
    }
}

export default TextInput;