import React from "react";
import {Link} from "react-router-dom";
import DeptContsTable from "./DeptContsTable";
import {useTranslation} from "react-i18next";

const DeptDetailsData = ({deptData}) => {
    const {t} = useTranslation()
    return (
        <>
            <form className="form">
                <label htmlFor="name">{t('dept.fields.name')}: </label>
                <input type="text" id="name" name="name" placeholder="" value={deptData.name} disabled/>
                <label htmlFor="location">{t('dept.fields.loc')}: </label>
                <input type="text" id="location" name="location" placeholder=""
                       value={deptData.location} disabled/>
                <div className="form-buttons">
                    <Link to={`/departments/edit/${deptData.idDepartment}`} className="list-actions-button-edit">
                        {t('form.options.edit')}
                    </Link>
                    <Link to="/departments" className="button-cancel">
                        {t('form.options.cancel')}
                    </Link>
                </div>
            </form>
            <DeptContsTable contracts={deptData.contracts}/>
        </>)
};
export default DeptDetailsData;