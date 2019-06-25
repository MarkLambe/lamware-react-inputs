import React from 'react';
import './styles.css';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if(this.props.onClick){
            this.props.onClick();
        }
    }


    render() {
        let errorMarkup = [];
        this.state.errors.forEach((e) => errorMarkup.push(<li key={e}>{e}</li>));
        let validatedCheckClass = "LRI-validated-check";

        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        
                    </div> 
                    <div className="LRI-form-field-content">
                        <button type="submit" className="LRI-button">Submit</button>
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

export default Button

