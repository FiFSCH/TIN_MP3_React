import React from "react";

const FormInput = ({error, name, type, placeholder, value, onChange, label, required}) => {
    const className = error === '' ? '' : 'error-input';
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return (
        <>
            <label htmlFor={name}>{label}:
                {required && <abbr title="required" aria-label="required">*</abbr>}</label>
            <input type={type} className={className} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
            <span id={errorSpanId} className="errors-text">{error}</span>
        </>
    );
}
export default FormInput;