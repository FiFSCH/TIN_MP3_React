import React from "react";
import EmpListTableRow from "./EmpListTableRow";
import {useTranslation} from "react-i18next";

const EmpListTable = ({employees, handler}) => {
    const {t} = useTranslation();
    if(employees.length === 0)
        return <p>{t('emp.list.empty')}</p>
    return (
        <table className="table-list">
            <thead>
            <tr key='headings'>
                <th>{t('emp.fields.firstName')}</th>
                <th>{t('emp.fields.lastname')}</th>
                <th>{t('emp.fields.phone-number')}</th>
                <th>{t('emp.fields.email')}</th>
                <th>{t('list.options.title')}</th>
            </tr>
            </thead>
            <tbody>
            {employees.map(emp => <EmpListTableRow empData={emp} key={emp.idEmployee} handler={handler}/> )}
            </tbody>
        </table>
    );
}
export default EmpListTable;