import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
const ContsDeptTable = ({departments}) => {
    const {t} = useTranslation()
    if (departments.length === 0)
        return (<></>);
    return(<>
        <h3>{t('cont.fields.respDept')}</h3>
        <table id="responsibleDepartment" className="table-list-resDept">
            <thead>
            <tr>
                <th>{t('cont.fields.respDept')}</th>
                <th>{t('dept.fields.loc')}</th>
            </tr>
            </thead>
            <tbody>
            {departments.map(dept => (
                <tr>
                    <td data-label="Department"><Link
                        to={`/departments/details/${!dept.idDepartment ? '' : dept.idDepartment}`}>{dept.name}</Link></td>
                    <td data-label="Location">{dept.location}</td>
                </tr>))}
            </tbody>
        </table>
    </>);
}
export default ContsDeptTable;