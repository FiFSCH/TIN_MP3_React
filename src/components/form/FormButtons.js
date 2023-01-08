import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";

const FormButtons = ({mode, cancelPath, error}) => {
    const submitButtonLabel = mode === formMode.NEW ? 'Add' : 'Edit';
    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{error}</p>
            <input type="submit" value={submitButtonLabel} className="button-submit"/>
            <Link to={cancelPath} className="button-cancel">Cancel</Link>
        </div>
    );
}
export default FormButtons;