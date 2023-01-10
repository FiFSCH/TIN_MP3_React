import React from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const EmpListTableRow = ({empData, key, handler}) => {
    const {t} = useTranslation();
    return (
        <tr key={key}>
            <td data-label={t('emp.fields.firstName')}>{empData.firstName}</td>
            <td data-label={t('emp.fields.lastname')}>{empData.lastName}</td>
            <td data-label={t('emp.fields.phone-number')}>{empData.phoneNumber}</td>
            <td data-label={t('emp.fields.email')}>{empData.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/employees/details/${empData.idEmployee}`}
                              className="list-actions-button-details">
                        {t('list.options.details')}</Link>
                    </li>
                    <li>
                        <button className="list-actions-button-delete"
                                onClick={() => handler(empData.idEmployee)}>
                            {t('list.options.delete')}
                        </button>
                    </li>
                </ul>
            </td>
        </tr>
    );
}
export default EmpListTableRow