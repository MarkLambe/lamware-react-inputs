import React from 'react';

export function getValidationMarkup(showValidationMessages, errors) {
    if(!showValidationMessages || errors === undefined) return;
    if(errors.length > 0){
        return (
            <span>
                😕
            </span>
        )
    }
    else{
        return (
            <span>
                👍🏻
            </span>
        )
    }
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