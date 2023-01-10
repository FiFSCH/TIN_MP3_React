import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const DeptListTableRow = ({key, deptData, handler}) => {
    const {t} = useTranslation()
    return (<tr key={key}>
        <td data-label={t('dept.fields.name')}>{deptData.name}</td>
        <td data-label={t('dept.fields.loc')}>{deptData.location}</td>
        <td>
            <ul className="list-actions">
                <li><Link to={`/departments/details/${deptData.idDepartment}`}
                          className="list-actions-button-details">{t('list.options.details')}</Link></li>
                <li><button className="list-actions-button-delete"
                            onClick={() =>handler(deptData.idDepartment)}>{t('list.options.delete')}</button></li>
            </ul>
        </td>
    </tr>)
}
export default DeptListTableRow;