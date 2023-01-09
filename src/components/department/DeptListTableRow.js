import React from "react";
import {Link} from "react-router-dom";

const DeptListTableRow = ({key, deptData, handler}) => {
    return (<tr key={key}>
        <td data-label="Name">{deptData.name}</td>
        <td data-label="Location">{deptData.location}</td>
        <td>
            <ul className="list-actions">
                <li><Link to={`/departments/details/${deptData.idDepartment}`}
                          className="list-actions-button-details">Details</Link></li>
                <li><button to={`/departments/delete/${deptData.idDepartment}`} className="list-actions-button-delete"
                            onClick={() =>handler(deptData.idDepartment)}>Delete</button></li>
            </ul>
        </td>
    </tr>)
}
export default DeptListTableRow;