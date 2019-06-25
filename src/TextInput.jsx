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


    render() {
        const value = this.props.value;

        let errorMarkup = [];
        this.state.errors.forEach((e) => errorMarkup.push(<li key={e}>{e}</li>));
        let validatedCheckClass = "LRI-validated-check";
        if(value.length !== 0){
            if(this.state.errors.length > 0){
                validatedCheckClass += " LRI-validated-check-failed";
            }
            else{
                validatedCheckClass += " LRI-validated-check-passed";
            }
        }
        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        {this.props.value.length > 0 ? this.props.label : ''}   
                    </div> 
                    <div className="LRI-form-field-content">
                        <input 
                            name={this.props.name} 
                            onChange={this.handleChange}
                            value={value}
                            className="LRI-input"
                            placeholder={this.props.label}
                        />
                    </div>
                </div>
                <div className={validatedCheckClass}>

                </div>
                <div className="LRI-form-error-section">
                    { errorMarkup }
                </div>
            </div>
        );
    }
}

export default TextInput;