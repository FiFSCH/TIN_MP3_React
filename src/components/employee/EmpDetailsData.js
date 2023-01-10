import React from "react";
import {getFormattedDate} from "../../helpers/dateHelper";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
const EmpDetailsData = ({empData}) => {
    const {t} = useTranslation();
    return (
        <form className="form">
            <label htmlFor="fname">{t('emp.fields.firstName')}: </label>
            <input type="text" id="fname" name="fname" value={empData.firstName} disabled/>
            <label htmlFor="lname">{t('emp.fields.lastname')}: </label>
            <input type="text" id="lname" name="lname" value={empData.lastName} disabled/>
            <label htmlFor="employedFrom">{t('emp.fields.employed-since')}: </label>
            <input type="date" id="employedFrom" name="employedFrom"
                   value={empData.dateFrom ? getFormattedDate(empData.dateFrom) : ""} disabled/>
            <label htmlFor="employedTo">{t('emp.fields.employment-termination')}: </label>
            <input type="date" id="employedTo" name="employedTo"
                   value={empData.dateTo ? getFormattedDate(empData.dateTo) : ""} disabled/>
            <label htmlFor="phone">{t('emp.fields.phone-number')}: </label>
            <input type="text" id="phone" name="phone" value={empData.phoneNumber} disabled/>
            <label htmlFor="email">{t('emp.fields.email')}: </label>
            <input type="email" id="email" name="email" value={empData.email} disabled/>
            <label htmlFor="supervisor"><Link
                to={`/employees/details/${!empData.supervised_by  ? '' : empData.supervised_by.idEmployee } `}>{t('emp.fields.supervisor')}: </Link></label>
            <input type="text" id="supervisor" name="supervisor"
                   value={!empData.supervised_by ? '' : (empData.supervised_by.firstName + ' ' + empData.supervised_by.lastName)}
                   disabled required/>
            <label htmlFor="dept"><Link
                to={`/departments/details/${!empData.idDepartment ? '' : empData.idDepartment}`}>{t('emp.fields.department')}: </Link></label>
            <input type="text" id="dept" name="dept"
                   value={!empData.worksIn ? '' : (empData.worksIn.name + ', ' + empData.worksIn.location)}
                   disabled/>

            <div className="form-buttons">
                <Link to={`/employees/edit/${empData.idEmployee}`} className="list-actions-button-edit">
                    {t('form.options.edit')}
                </Link>
                <Link to="/employees" className="button-cancel">
                    {t('form.options.cancel')}
                </Link>
            </div>
        </form>
        );
}
export default EmpDetailsData;