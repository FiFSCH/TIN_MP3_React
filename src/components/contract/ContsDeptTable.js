import React from "react";
import {Link} from "react-router-dom";
const ContsDeptTable = ({departments}) => {
    if (departments.length === 0)
        return (<></>);
    return(<>
        <h3>Departments< /h3>
        <table id="responsibleDepartment" className="table-list-resDept">
            <thead>
            <tr>
                <th>Responsible Department</th>
                <th>Location</th>
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