import React from "react";
import {Link} from "react-router-dom";
import formMode from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

const FormButtons = ({mode, cancelPath, error}) => {
    const {t} = useTranslation()
    const submitButtonLabel = mode === formMode.NEW ? t('form.options.add') : t('form.options.edit');
    return (
        <div className="form-buttons">
            <p id="errorsSummary" className="errors-text">{error}</p>
            <input type="submit" value={submitButtonLabel} className="button-submit"/>
            <Link to={cancelPath} className="button-cancel">{t('form.options.cancel')}</Link>
        </div>
    );
}
export default FormButtons;