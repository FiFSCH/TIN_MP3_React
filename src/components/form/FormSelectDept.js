import React from "react";

const FormSelectDept = ({error, name, collection, placeholder, onChange, label, required}) => {
    const className = error === '' ? '' : 'error-input';
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    return(
        <>
            <label htmlFor={name}>{label}:  {required && <abbr title="required" aria-label="required">*</abbr>}</label>
            <select name={name} id={name} onChange={onChange} className={className}>
                <option disabled selected value="">--{placeholder}--</option>
                {collection.map(obj => (
                    <option value={obj.idDepartment}>{obj.name}, {obj.location}</option>
                ))}
            </select>
            <span id={errorSpanId} className="errors-text">{error}</span>
        </>
    );
}
export default FormSelectDept;