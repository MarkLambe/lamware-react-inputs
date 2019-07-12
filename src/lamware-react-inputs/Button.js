import React from 'react';
import './styles.css';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        if(this.props.onClick){
            this.props.onClick();
        }
    }


    render() {
        let buttonClasses = this.props.small ? "LRI-button LRI-button-small" : "LRI-button LRI-button-medium";
        return (
            <div className="LRI-form-field">
                <div className="LRI-form-field-content">
                <button 
                    type={this.props.type || 'button'}
                    className={buttonClasses}
                    disabled={this.props.disabled || false}
                    onClick={this.handleClick}>{this.props.label || "Submit"}</button>
                </div>
            </div>
        );
    }
}

Button.defaultProps = {
    _isLRIElement: true
};

export default Button

