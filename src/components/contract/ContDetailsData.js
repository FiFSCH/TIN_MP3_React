import React from "react";
import {Link} from "react-router-dom";
import {getFormattedDate} from "../../helpers/dateHelper";
import ContsDeptTable from "./ContsDeptTable";
import {useTranslation} from "react-i18next";

const ContDetailsData = ({contData}) => {
    const {t} = useTranslation()
    return (
        <>
            <form className="form">
                <label htmlFor="desc">{t('cont.fields.desc')}: </label>
                <input type="text" id="desc" name="desc" value={contData.description} disabled/>
                <label htmlFor="startDate">{t('cont.fields.start')}: </label>
                <input type="date" id="startDate" name="startDate"
                       value={contData.startDate ? getFormattedDate(contData.startDate) : ''} disabled/>
                <label htmlFor="dueDate">{t('cont.fields.end')}: </label>
                <input type="date" id="dueDate" name="dueDate"
                       value={contData.dueDate ? getFormattedDate(contData.dueDate) : ''} disabled/>
                <div className="form-buttons">
                    <Link to={`/contracts/edit/${contData.idContract}`} className="list-actions-button-edit">
                        {t('form.options.edit')}
                    </Link>
                    <Link to="/contracts" className="button-cancel">
                        {t('form.options.cancel')}
                    </Link>
                </div>
            </form>
            <ContsDeptTable departments={contData.departments}/>
        </>
    );
}
export default ContDetailsData;