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
            <button 
                type={this.props.type || 'button'}
                className={buttonClasses}
                disabled={this.props.disabled || false}
                onClick={this.handleClick}>{this.props.label || "Submit"}</button>
        );
    }
}

Button.defaultProps = {
    _isLRIElement: true
};

export default Button

