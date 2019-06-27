import React from 'react';
import './styles.css';
import { getValidationFeedback } from './helpers'


class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: false,
            value: '',
            localOptions: null
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

    componentWillReceiveProps(nextProps) {
        let localVal = this.state.value;
        let localOptions = {};
        nextProps.options.forEach((o) => {
            let value = '', label = '';
            if(typeof(o) === 'object'){
                let valueKey = this.props.valueKey || 'pk';
                let labelKey = this.props.labelKey || 'name';
                value = o[valueKey];
                label = o[labelKey];
            }
            else if(typeof(o) === 'string'){
                value = label = o;
            }
            if(String(value) === String(nextProps.value)){
                localVal = label;
            }
            localOptions[value] = label;
        });
        this.setState({localOptions});
        this.setState({value: localVal});
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
        let optionsList = [];

        Object.keys(this.state.localOptions).forEach((k) => {
            if(this.state.value === null || this.state.value.length === 0 || this.state.localOptions[k].toUpperCase().includes(this.state.value.toUpperCase())){
                optionsList.push(
                    <div key={k} className="LRI-select-option" onClick={() => this.optionSelected(k, this.state.localOptions[k])}> 
                        {this.state.localOptions[k]} 
                    </div>
                )
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
            let val = this.props.value ? this.state.localOptions[this.props.value] : '';
            this.setState({value: val});
        }
    }

    render() {
        return (
            <div className="LRI-form-row">
                <div className="LRI-form-field">
                    <div className="LRI-form-field-header">
                        {this.state.value.length > 0 ? this.props.label : ''}   
                    </div> 
                    <div className="LRI-form-field-content">
                        <input
                            name={this.props.name} 
                            value={this.state.value}
                            className="LRI-input"
                            placeholder={'Search for ' + this.props.label}
                            onFocus={ this.onFocus }
                            onChange={this.handleChange}
                        />
                        { this.getListMarkup() }
                    </div>
                </div>
                { getValidationFeedback(this.props.showValidationMessages, this.props.errors) }
            </div>
        );
    }
}

export default Select