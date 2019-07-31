import React from 'react';

export function getHeaderMarkup(props){
    let headerClass = props.small || props.description ? "LRI-form-field-header-small" : "LRI-form-field-header-medium";
    let headerText = '';
    
    if(props.description){
        headerText = props.description;
    }
    else if((props.label && props.value && props.value.length > 0 && !props._isLRICheckbox) || 
        (props._isLRIRadio || props._isLRIDatepicker)){
        headerText = props.label;
    }
    return (
        <div className={headerClass}>
            { headerText }
        </div>
    );
}


export function getErrorMarkup(showValidationMessages, errors) {
    if(!showValidationMessages || errors === undefined) return;
    if(errors.length > 0){
        let errorMarkup = [];
        errors.forEach((e, i) => {
            errorMarkup.push(
                <div key={i}> {e} </div>
            );
        });
        return errorMarkup;
    }
}

export function getLRIChildren(children){
    return React.Children.toArray(children).filter((c) => {
        return c && c.props && c.props._isLRIElement === true;
    });
}