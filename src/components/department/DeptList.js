import React from "react";
import {Link} from "react-router-dom";
import {getDeptsApiCall} from "../../apiCalls/deptApiCalls";

const DeptList = () => {
    const deptList = getDeptsApiCall();
    return (
        <main>
            <h2>Departments</h2>
            <table id="DeptsList" className="table-list">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {deptList.map(dept => (<tr key={dept.id}>
                    <td data-label="Name">{dept.name}</td>
                    <td data-label="Location">{dept.loc}</td>
                    <td>
                        <ul className="list-actions">
                            <li><Link to={`/departments/details/${dept.id}`}
                                      className="list-actions-button-details">Details</Link></li>
                            <li><Link to={`/departments/delete/${dept.id}`} className="list-actions-button-delete"
                                      onClick="return confirm('Are you sure?')">Delete</Link></li>
                        </ul>
                    </td>
                </tr>))}
                </tbody>
            </table>
            <p><Link to="/departments/add" className="button-add">Add new department</Link></p>
        </main>
    );
}
export default DeptList;