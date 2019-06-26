import React from 'react';
import './styles.css';


class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isDirty: false};
        this.handleChange = this.handleChange.bind(this);
        this.getValidationMarkup = this.getValidationMarkup.bind(this);
        this.getErrorMarkup = this.getErrorMarkup.bind(this);
    }
    
    handleChange(e) {
        let value = e.target.value;
        this.setState({isDirty: true});
        if(this.props.updateFormAboutChange){
            this.props.updateFormAboutChange(this.props.name, value, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, value);
        }
    }

    getValidationMarkup() {
        if(!this.state.isDirty || !this.props.errors) return;
        
        if(this.props.errors.length > 0){
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

    getErrorMarkup() {
        if(!this.state.isDirty || !this.props.errors) return;
        if(this.props.errors.length > 0){
            let errorMarkup = [];
            this.props.errors.forEach((e, i) => {
                errorMarkup.push(
                    <div key={i}> {e} </div>
                );
            });
            return errorMarkup;
        }
    }

    render() {
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
                    { this.getErrorMarkup() }
                </div>
            </div>
        );
    }
}

export default TextInput;