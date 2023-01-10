import React from "react";
import DeptListTableRow from "./DeptListTableRow";
import {useTranslation} from "react-i18next";


const DeptListTable = ({depts, handler}) => {
    const {t} = useTranslation();
    if (depts.length === 0)
        return <p>{t('dept.list.empty')}</p>
    return (
        <table id="DeptsList" className="table-list">
            <thead>
            <tr key='headings'>
                <th>{t('dept.fields.name')}</th>
                <th>{t('dept.fields.loc')}</th>
                <th>{t('list.options.title')}</th>
            </tr>
            </thead>
            <tbody>
            {depts.map(dept => <DeptListTableRow key={dept.idDepartment} deptData={dept} handler={handler}/>)}
            </tbody>
        </table>
    );
}
export default DeptListTable;