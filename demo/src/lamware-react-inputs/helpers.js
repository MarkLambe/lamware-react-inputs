import React from 'react';

function getValidationMarkup(showValidationMessages, errors) {
    if(!showValidationMessages) return;
    if(errors.length > 0){
        return (
            <span className="LRI-validated-check-failed">
                😕
            </span>
        )
    }
    else{
        return (
            <span className="LRI-validated-check-passed">
                👍🏻
            </span>
        )
    }
}

function getErrorMarkup(showValidationMessages, errors) {
    if(!showValidationMessages) return;
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

export function getValidationFeedback(showValidationMessages, errors) {
    return (
        <div className="LRI-feedback-section">
            <div className="LRI-validated-check">
                { getValidationMarkup(showValidationMessages, errors) }
            </div>
            <div className="LRI-form-error-section">
                { getErrorMarkup(showValidationMessages, errors) }
            </div>
        </div>
    );
}