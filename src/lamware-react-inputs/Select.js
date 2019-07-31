import React from 'react';
import './styles.css';
import { getHeaderMarkup, getErrorMarkup } from './helpers';


class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.getListMarkup = this.getListMarkup.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.setOptionsBoxRef = this.setOptionsBoxRef.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {        
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({value});
    }

    setOptionsBoxRef(node) {
        this.optionsBoxRef = node;
    }

    optionSelected(selectedValue, selectedLabel) {
        this.setState({value: selectedLabel})

        if(this.props._hasLRIForm){
            this.props._updateFormAboutChange(this.props.name, selectedValue, this.props.onChange)
        }
        else {
            this.props.onChange(this.props.name, selectedValue);
        }

        this.setState({displayList: false});
    }

    getListMarkup() {
        if(!this.state.displayList){
            return;
        }
        let optionClass = this.props.small ? 'LRI-select-option-small' : 'LRI-select-option-medium';

        let optionsList = this.props.options.map((option, index) => {
            let type = typeof(option);
            if(type === 'object'){
                let key = option[this.props.valueKey || 'pk'];
                let label = option[this.props.labelKey || 'name'];
                return (
                    <div key={index} className={optionClass} onClick={() => this.optionSelected(key, label)}> 
                        {label} 
                    </div>
                );
            }
            else if(['string', 'number', 'boolean'].includes(type)){
                return (
                    <div key={index} className={optionClass} onClick={() => this.optionSelected(option, option)}> 
                        {option} 
                    </div>
                );
            }
            else{
                return null;
            }
        });
        return (
            <div className="LRI-select-list" ref={this.setOptionsBoxRef}>
                { optionsList }
            </div>
        );
    }

    onFocus() {
        this.setState({value: ''});
        this.setState({displayList: true});
    }

    handleClick(e){
        if (this.optionsBoxRef && !this.optionsBoxRef.contains(e.target)) {
            this.setState({displayList: false});
            let selectedOption = this.props.options.find((option) => {
                let type = typeof(option);
                if(type === 'object'){
                    if(option[this.props.valueKey || 'pk'] === this.props.value){
                        return option[this.props.valueKey || 'pk'];
                    }
                    else{
                        return false;
                    }
                }
                else if(['string', 'number', 'boolean'].includes(type)){
                    return option === this.props.value;
                }
                else{
                    return false;
                }
            });
            
            this.setState({value: selectedOption || ''});
        }
    }

    render() {
        let inputClass = "LRI-input ";
        inputClass += this.props.small ? "LRI-input-small" : "LRI-input-medium";

        return (
            <div className="LRI-form-field">
                { getHeaderMarkup(this.props) }
                <div className="LRI-form-field-content">
                    <input
                        name={this.props.name} 
                        value={this.state.value}
                        className={inputClass}
                        placeholder={this.props.label}
                        onFocus={ this.onFocus }
                        onChange={this.handleChange}
                        disabled={this.props.disabled || false} />
                        { this.getListMarkup() }
                </div>
                <div className="LRI-form-field-error">
                    { getErrorMarkup(this.props.showValidationMessages, this.props.errors) }
                </div>
            </div>
        );
    }
}

Select.defaultProps = {
    _isLRIElement: true
};

export default Select