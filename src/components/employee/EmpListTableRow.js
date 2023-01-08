import React from "react";
import {Link} from "react-router-dom";

const EmpListTableRow = ({empData, key}) => {
    return (
        <tr key={key}>
            <td data-label="First Name">{empData.firstName}</td>
            <td data-label="Lastname">{empData.lastName}</td>
            <td data-label="Phone number">{empData.phoneNumber}</td>
            <td data-label="Email">{empData.email}</td>
            <td>
                <ul className="list-actions">
                    <li><Link to={`/employees/details/${empData.idEmployee}`}
                              className="list-actions-button-details">
                        Details</Link>
                    </li>
                    <li><Link to={`/employees/delete/${empData.idEmployee}`} className="list-actions-button-delete"
                              onClick="return window.confirm('Are you sure?')">
                        Delete</Link>
                    </li>
                </ul>
            </td>
        </tr>
    );
}
export default EmpListTableRow