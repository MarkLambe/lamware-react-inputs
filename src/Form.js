import React from 'react';
import './styles.css';


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className="LRI-form-page">
                <div className="LRI-form-header">
                    {this.props.title || ''}
                </div>

                <form className="LRI-form" onSubmit={this.handleSubmit}>
                    {this.props.children}
                </form>
            </div>
        );
    }
}

export default Form

