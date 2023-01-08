import React from "react";
import EmpListTableRow from "./EmpListTableRow";

const EmpListTable = ({employees, handler}) => {
    if(employees.length === 0)
        return <p>There are no employees to display!</p>
    return (
        <table className="table-list">
            <thead>
            <tr key='headings'>
                <th>First name</th>
                <th>Lastname</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {employees.map(emp => <EmpListTableRow empData={emp} key={emp.idEmployee} handler={handler}/> )}
            </tbody>
        </table>
    );
}
export default EmpListTable;