import React from "react";
import DeptListTableRow from "./DeptListTableRow";


const DeptListTable = ({depts}) => {
    if (depts.length === 0)
        return <p>There are no departments to display!</p>
    return (
        <table id="DeptsList" className="table-list">
            <thead>
            <tr key='headings'>
                <th>Name</th>
                <th>Location</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {depts.map(dept => <DeptListTableRow key={dept.idDepartment} deptData={dept}/>)}
            </tbody>
        </table>
    );
}
export default DeptListTable;